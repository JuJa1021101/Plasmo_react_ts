import dayjs from "dayjs"
import type { PlasmoCSConfig } from "plasmo"

import type { Education, WorkExperienceItem } from "~core/types"

import { executeSequentially, type ExecutableFunction } from "./utils/executor"

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

type TRule = { label: string; type: string; options?: string[] }
export class GreenhouseAutoFill {
  formRules: TRule[]

  extractFields(): TRule[] {
    // TODO: 1. 实现提取字段的包含要求1里面的信息
    const result: TRule[] = []
    this.formRules = []
    return []
  }

  async fillForm() {
    // TODO: 2. 结合extractFields 将 mock 数据填入到页面中
    // 实现 getFormElementExecutor 方法 生成每条执行的action
    const sequenceFuncCollector = []
    for (let rule of this.formRules) {
      const action = this.getFormElementExecutor(rule)
      const actions = Array.isArray(action) ? action : [action]
      sequenceFuncCollector.push(...actions)
    }

    await executeSequentially(...sequenceFuncCollector)
  }

  getFormElementExecutor(rule: TRule): ExecutableFunction[] {
    return []
  }

  handleFilledInfo() {
    // TODO: 3. 统计完成情况
  }

  // 填充时需要的一些基础方法
  fillInputTextField = async (
    element: HTMLInputElement | HTMLTextAreaElement
  ) => {
    // TODO: 实现填充输入文本字段的函数
  }

  fillSelectField = async (element: HTMLSelectElement) => {
    // TODO: 实现填充输入文本字段的函数
  }

  async fillEducation() {
    // TODO: 实现填充教育信息的函数
  }
}
