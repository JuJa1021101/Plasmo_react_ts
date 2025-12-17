import dayjs from "dayjs"

import { executeSequentially, type ExecutableFunction } from "./utils/executor"
import { getLabelText } from "./utils"
import similarity from "./utils/similarity"

// 要求
/**
 * 1. 能够爬取到页面上所有的表单项
 *  - 整理表单项的label 和 表单的类型 type,如果是select 类型，获取到所有选项
 *  - 基础表单的类型包括文本框、下拉框
 *  - form list（education 信息（））包含基础的表单类型
 *  - 将所有的信息打印在console里
 *
 * 2. 能够将提供的 mock 的数据填入到表单中
 *
 * 3. 填充完成后统计完成情况。
 */

type TRule = {
  label: string
  type: string
  options?: string[]
  element?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  value?: any
}

type MockDataItem = {
  name?: string
  value?: string | string[]
  Education?: Array<{
    Degree: string
    Discipline: string[]
    School: string
    Start: string
    End: string
    isCurrent: boolean
    gpa?: string
  }>
}

// 直接导入 mock 数据
import mockData4327952003 from '../../mocks/4327952003.json'
import mockData6909295 from '../../mocks/6909295.json'

// 创建 mock 数据映射
const MOCK_DATA_MAP: Record<string, MockDataItem[]> = {
  "4327952003": mockData4327952003,
  "6909295": mockData6909295
}

export class GreenhouseAutoFill {
  formRules: TRule[] = []
  mockData: MockDataItem[] = []
  filledFields: string[] = []
  unfilledFields: string[] = []
  totalFields: number = 0

  constructor() {
    this.loadMockData()
  }

  // 加载 mock 数据
  loadMockData() {
    try {
      const url = new URL(window.location.href)
      const token = url.searchParams.get("token")

      // 根据 token 加载对应的 mock 数据
      if (token && MOCK_DATA_MAP[token]) {
        this.mockData = MOCK_DATA_MAP[token]
      } else {
        this.mockData = []
      }
    } catch (error) {
      this.mockData = []
    }
  }

  extractFields(): TRule[] {
    const result: TRule[] = []

    // 1. 提取所有文本输入框（包括更多类型）
    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input:not([type]), input[type="number"]'
    )
    inputs.forEach((input) => {
      const label = this.findLabelForInput(input)
      if (label && label !== "Unknown" && !this.shouldSkipElement(input)) {
        result.push({
          label,
          type: "text",
          element: input
        })
      }
    })

    // 2. 提取所有文本域
    const textareas = document.querySelectorAll<HTMLTextAreaElement>("textarea")
    textareas.forEach((textarea) => {
      const label = this.findLabelForInput(textarea)
      if (label && label !== "Unknown" && !this.shouldSkipElement(textarea)) {
        result.push({
          label,
          type: "textarea",
          element: textarea
        })
      }
    })

    // 3. 提取所有下拉框
    const selects = document.querySelectorAll<HTMLSelectElement>("select")
    selects.forEach((select) => {
      const label = this.findLabelForInput(select)
      if (label && label !== "Unknown" && !this.shouldSkipElement(select)) {
        const options = Array.from(select.options)
          .map((opt) => opt.text.trim())
          .filter((text) => text && text !== "Select..." && text !== "--")

        result.push({
          label,
          type: "select",
          options,
          element: select
        })
      }
    })

    // 4. 提取教育信息部分
    const educationSection = document.querySelector(
      '[id*="education"], [class*="education"]'
    )
    if (educationSection) {
      result.push({
        label: "Education",
        type: "education"
      })
    }

    this.formRules = result
    this.totalFields = result.length

    return result
  }

  // 查找输入框对应的 label
  findLabelForInput(
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ): string {
    // 方法1: 通过 label 标签的 for 属性
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`)
      if (label) {
        const text = getLabelText(label)
        if (text) return text
      }
    }

    // 方法2: 查找父级 label
    let parent = element.parentElement
    let depth = 0
    while (parent && depth < 5) {
      if (parent.tagName === "LABEL") {
        const text = getLabelText(parent)
        if (text) return text
      }
      parent = parent.parentElement
      depth++
    }

    // 方法3: 查找最近的 field 容器中的 label
    const fieldContainer = element.closest(".field, .form-field, [class*='field'], [class*='question']")
    if (fieldContainer) {
      const label = fieldContainer.querySelector("label, .label, [class*='label'], legend")
      if (label) {
        const text = getLabelText(label)
        if (text) return text
      }
    }

    // 方法4: 查找前面的兄弟元素
    let sibling = element.previousElementSibling
    let siblingDepth = 0
    while (sibling && siblingDepth < 3) {
      if (sibling.tagName === "LABEL" || sibling.classList.contains("label")) {
        const text = getLabelText(sibling)
        if (text) return text
      }
      sibling = sibling.previousElementSibling
      siblingDepth++
    }

    // 方法5: 使用 aria-label 或 placeholder
    const ariaLabel = element.getAttribute("aria-label")
    if (ariaLabel) return ariaLabel.trim()

    const placeholder = element.getAttribute("placeholder")
    if (placeholder && placeholder.length > 2) return placeholder.trim()

    // 方法6: 使用 name 属性
    const name = element.getAttribute("name")
    if (name) {
      // 将 name 转换为可读的标签
      return name
        .replace(/_/g, " ")
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/\s+/g, " ")
    }

    return "Unknown"
  }

  shouldSkipElement(element: Element): boolean {
    // 跳过隐藏元素
    if (
      element instanceof HTMLElement &&
      (element.offsetParent === null ||
        window.getComputedStyle(element).display === "none")
    ) {
      return true
    }

    // 跳过教育信息区域内的具体字段，交由 fillEducation 统一处理
    if (element.closest('[id*="education"], [class*="education"]')) {
      return true
    }

    return false
  }

  async fillForm() {
    // 提取所有字段
    this.extractFields()

    // 生成执行序列
    const sequenceFuncCollector: ExecutableFunction[] = []

    for (let rule of this.formRules) {
      const actions = this.getFormElementExecutor(rule)
      if (actions && actions.length > 0) {
        sequenceFuncCollector.push(...actions)
      }
    }

    // 执行填充
    await executeSequentially(...sequenceFuncCollector)

    // 统计结果
    this.handleFilledInfo()
  }

  getFormElementExecutor(rule: TRule): ExecutableFunction[] {
    const actions: ExecutableFunction[] = []

    // 处理教育信息
    if (rule.type === "education") {
      actions.push({
        func: () => this.fillEducation(),
        delay: 500
      })
      return actions
    }

    // 查找匹配的 mock 数据
    const mockItem = this.findMatchingMockData(rule.label)

    if (!mockItem) {
      this.unfilledFields.push(rule.label)
      return actions
    }

    // 根据类型填充
    if (rule.type === "text" || rule.type === "textarea") {
      const element = rule.element as HTMLInputElement | HTMLTextAreaElement
      if (element) {
        actions.push({
          func: () => this.fillInputTextField(element, mockItem.value as string),
          delay: 300
        })
        this.filledFields.push(rule.label)
      }
    } else if (rule.type === "select") {
      const element = rule.element as HTMLSelectElement
      if (element) {
        actions.push({
          func: () => this.fillSelectField(element, mockItem.value),
          delay: 300
        })
        this.filledFields.push(rule.label)
      }
    }

    return actions
  }

  // 查找匹配的 mock 数据
  findMatchingMockData(label: string): MockDataItem | null {
    const normalizedLabel = label.toLowerCase().trim()

    // 精确匹配
    let match = this.mockData.find(
      (item) => item.name?.toLowerCase().trim() === normalizedLabel
    )

    if (match) {
      return match
    }

    // 模糊匹配 - 降低阈值到 0.4
    let bestMatch: MockDataItem | null = null
    let bestScore = 0

    for (const item of this.mockData) {
      if (!item.name) continue

      const score = similarity(
        normalizedLabel,
        item.name.toLowerCase().trim()
      )

      if (score > 0.4 && score > bestScore) {
        bestScore = score
        bestMatch = item
      }
    }

    return bestMatch
  }

  handleFilledInfo() {
    // 只统计成功填充的字段数以及未填充的字段
    console.log(`成功填充字段数: ${this.filledFields.length}`)
    console.log(`未填充字段数: ${this.unfilledFields.length}`)
    
    if (this.unfilledFields.length > 0) {
      console.log("未填充字段:")
      this.unfilledFields.forEach((field) => {
        console.log(`- ${field}`)
      })
    }
  }

  // 填充时需要的一些基础方法
  fillInputTextField = async (
    element: HTMLInputElement | HTMLTextAreaElement,
    value: string
  ) => {
    if (!element || !value) {
      return
    }

    try {
      // 聚焦元素
      element.focus()

      // 设置值
      element.value = value

      // 触发事件
      element.dispatchEvent(new Event("input", { bubbles: true }))
      element.dispatchEvent(new Event("change", { bubbles: true }))
      element.dispatchEvent(new Event("blur", { bubbles: true }))
    } catch (error) {
      // 静默处理错误
    }
  }

  fillSelectField = async (
    element: HTMLSelectElement,
    value: string | string[]
  ) => {
    if (!element) {
      return
    }

    try {
      const targetValue = Array.isArray(value) ? value[0] : value

      // 检查是否为 Select2 或类似的可搜索下拉框
      // 尝试查找关联的 Select2 容器
      const select2Container = element.nextElementSibling;
      const isSelect2 = select2Container && select2Container.classList.contains('select2-container');

      if (isSelect2) {
          // 1. 点击容器以打开下拉框
          const selection = select2Container.querySelector('.select2-selection');
          if (selection instanceof HTMLElement) {
              selection.click();
              await new Promise(r => setTimeout(r, 300)); // 增加等待时间

              // 2. 查找并输入搜索词
              const searchField = document.querySelector('body > .select2-container--open .select2-search__field') as HTMLInputElement;
              if (searchField) {
                  searchField.value = targetValue;
                  searchField.dispatchEvent(new Event('input', { bubbles: true }));
                  await new Promise(r => setTimeout(r, 1500)); // 增加等待时间以应对网络延迟

                  // 3. 选择匹配项
                  const resultsContainer = document.querySelector('.select2-results__options');
                  if (!resultsContainer) {
                      return;
                  }
                  
                  const results = resultsContainer.querySelectorAll('.select2-results__option');

                  let targetOption: HTMLElement | null = null;
                  for (const opt of Array.from(results)) {
                      const text = opt.textContent?.trim().toLowerCase() || '';
                      if (text === targetValue.toLowerCase()) {
                          targetOption = opt as HTMLElement;
                          break;
                      }
                  }

                  if (!targetOption && results.length > 0) {
                      const firstOpt = results[0] as HTMLElement;
                      if (!firstOpt.classList.contains('select2-results__option--load-failure') && !firstOpt.textContent?.includes('No results')) {
                          targetOption = firstOpt;
                      }
                  }

                  if (targetOption) {
                      targetOption.click();
                      // 触发一个 change 事件，以通知任何监听器
                      element.dispatchEvent(new Event('change', { bubbles: true }));
                      return;
                  }
              }
          }
      }

      // 查找匹配的选项
      const options = Array.from(element.options)
      let matchedOption: HTMLOptionElement | null = null

      // 精确匹配
      matchedOption = options.find(
        (opt) => opt.text.trim().toLowerCase() === targetValue.toLowerCase()
      ) || null

      // 模糊匹配 - 降低阈值到 0.4
      if (!matchedOption) {
        let bestScore = 0
        for (const option of options) {
          const score = similarity(
            option.text.trim().toLowerCase(),
            targetValue.toLowerCase()
          )
          if (score > 0.4 && score > bestScore) {
            bestScore = score
            matchedOption = option
          }
        }
      }

      if (matchedOption) {
        element.value = matchedOption.value
        element.dispatchEvent(new Event("change", { bubbles: true }))
        element.dispatchEvent(new Event("blur", { bubbles: true }))
      }
    } catch (error) {
      // 静默处理错误
    }
  }

  async fillEducation() {
    // 查找教育信息数据
    const educationData = this.mockData.find((item) => item.Education)
    if (!educationData || !educationData.Education) {
      return
    }

    const educations = educationData.Education

    // 1. 确保有足够的教育信息输入框 (通过点击添加按钮)
    for (let i = 0; i < educations.length; i++) {
      if (i > 0) {
        const addButtons = document.querySelectorAll<HTMLButtonElement>('button, a')
        let addButton: HTMLButtonElement | null = null
        
        for (const btn of addButtons) {
          const text = btn.textContent?.toLowerCase() || ''
          // 优先匹配包含 education 的添加按钮
          if (text.includes('add') && (text.includes('education') || text.includes('another'))) {
            addButton = btn
            break
          }
          // 后备：匹配一般的添加按钮
          if (!addButton && (text.includes('add') || btn.className.toLowerCase().includes('add'))) {
             addButton = btn
          }
        }
        
        if (addButton) {
          addButton.click()
          // 等待新字段出现
          await new Promise((resolve) => setTimeout(resolve, 800))
        }
      }
    }

    // 2. 获取教育信息字段（全局查找，避免容器定位错误）
    // 过滤条件：只处理位于 education 区域内的字段
    const filterEducationFields = (elements: Element[]) => {
      return elements.filter(el => el.closest('[id*="education"], [class*="education"]'));
    };

    const schoolFields = filterEducationFields(Array.from(document.querySelectorAll<HTMLElement>('input[name*="school"], input[id*="school"], select[name*="school"], select[id*="school"]')));
    const degreeSelects = filterEducationFields(Array.from(document.querySelectorAll<HTMLSelectElement>('select[name*="degree"], select[id*="degree"]')));
    const disciplineSelects = filterEducationFields(Array.from(document.querySelectorAll<HTMLSelectElement>('select[name*="discipline"], select[id*="discipline"], select[name*="major"]')));
    const gpaInputs = filterEducationFields(Array.from(document.querySelectorAll<HTMLInputElement>('input[name*="gpa"], input[id*="gpa"]')));

    // 日期字段：尝试区分单输入框和分月/年输入框
    const startInputs = filterEducationFields(Array.from(document.querySelectorAll<HTMLInputElement>('input[name*="start"]:not([name*="month"]):not([name*="year"]), input[id*="start_date"]')));
    const startMonthFields = filterEducationFields(Array.from(document.querySelectorAll<HTMLElement>('[name*="start"][name*="month"], [id*="start_month"]')));
    const startYearFields = filterEducationFields(Array.from(document.querySelectorAll<HTMLElement>('[name*="start"][name*="year"], [id*="start_year"]')));
    
    const endInputs = filterEducationFields(Array.from(document.querySelectorAll<HTMLInputElement>('input[name*="end"]:not([name*="month"]):not([name*="year"]), input[id*="end_date"]')));
    const endMonthFields = filterEducationFields(Array.from(document.querySelectorAll<HTMLElement>('[name*="end"][name*="month"], [id*="end_month"]')));
    const endYearFields = filterEducationFields(Array.from(document.querySelectorAll<HTMLElement>('[name*="end"][name*="year"], [id*="end_year"]')));

    // 4. 填充数据
    for (let i = 0; i < educations.length; i++) {
      const edu = educations[i]

      // 填充 School
      if (schoolFields[i]) {
        if (schoolFields[i] instanceof HTMLInputElement) {
          await this.fillInputTextField(schoolFields[i] as HTMLInputElement, edu.School)
        } else if (schoolFields[i] instanceof HTMLSelectElement) {
          await this.fillSelectField(schoolFields[i] as HTMLSelectElement, edu.School)
        }
      } else {
        console.warn(`   ⚠️ 第 ${i + 1} 条 School 输入框未找到`)
      }

      // 填充 Degree
      if (degreeSelects[i]) {
        await this.fillSelectField(degreeSelects[i], edu.Degree)
      }

      // 填充 Discipline
      if (disciplineSelects[i] && edu.Discipline && edu.Discipline.length > 0) {
        await this.fillSelectField(disciplineSelects[i], edu.Discipline[0])
      }

      // 填充 GPA
      if (gpaInputs[i] && edu.gpa) {
        await this.fillInputTextField(gpaInputs[i], edu.gpa)
      }

      // 填充 Start Date
      if (startInputs[i]) {
        const formattedDate = dayjs(edu.Start).format("MM/YYYY")
        await this.fillInputTextField(startInputs[i], formattedDate)
      } else if (startMonthFields[i] && startYearFields[i]) {
        const date = dayjs(edu.Start)
        // 尝试填充月 (优先 Select, 其次 Input)
        if (startMonthFields[i] instanceof HTMLSelectElement) {
           await this.fillSelectField(startMonthFields[i] as HTMLSelectElement, date.format("MMMM"))
        } else if (startMonthFields[i] instanceof HTMLInputElement) {
           await this.fillInputTextField(startMonthFields[i] as HTMLInputElement, date.format("MM"))
        }
        // 尝试填充年
        if (startYearFields[i] instanceof HTMLSelectElement) {
           await this.fillSelectField(startYearFields[i] as HTMLSelectElement, date.format("YYYY"))
        } else if (startYearFields[i] instanceof HTMLInputElement) {
           await this.fillInputTextField(startYearFields[i] as HTMLInputElement, date.format("YYYY"))
        }
      }

      // 填充 End Date
      if (!edu.isCurrent) {
        if (endInputs[i]) {
          const formattedDate = dayjs(edu.End).format("MM/YYYY")
          await this.fillInputTextField(endInputs[i], formattedDate)
        } else if (endMonthFields[i] && endYearFields[i]) {
          const date = dayjs(edu.End)
          if (endMonthFields[i] instanceof HTMLSelectElement) {
             await this.fillSelectField(endMonthFields[i] as HTMLSelectElement, date.format("MMMM"))
          } else if (endMonthFields[i] instanceof HTMLInputElement) {
             await this.fillInputTextField(endMonthFields[i] as HTMLInputElement, date.format("MM"))
          }
          if (endYearFields[i] instanceof HTMLSelectElement) {
             await this.fillSelectField(endYearFields[i] as HTMLSelectElement, date.format("YYYY"))
          } else if (endYearFields[i] instanceof HTMLInputElement) {
             await this.fillInputTextField(endYearFields[i] as HTMLInputElement, date.format("YYYY"))
          }
        }
      }
      
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    this.filledFields.push("Education")
  }
}
