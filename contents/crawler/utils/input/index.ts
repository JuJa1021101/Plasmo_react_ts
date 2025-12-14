import { delay } from "../executor"

export async function fillDefaultInputField(
  element: HTMLInputElement | HTMLTextAreaElement,
  value
) {
  if (!element) {
    console.error("element is null")
    return
  }

  element.focus()

  // 设置值
  element.value = value

  const prototype = Object.getPrototypeOf(element)
  const setValue = Object.getOwnPropertyDescriptor(prototype, "value").set
  setValue.call(element, value)

  // 触发input事件
  element.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }))

  // 触发change事件
  element.dispatchEvent(
    new Event("change", { bubbles: true, cancelable: true })
  )

  // 触发可能的离焦验证
  element.dispatchEvent(new Event("blur"))

  element.dispatchEvent(
    new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13
    })
  )

  element.dispatchEvent(
    new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true,
      keyCode: 13
    })
  )

  // 失去焦点
  element.blur()

  element.dispatchEvent(
    new FocusEvent("focus", { bubbles: true, cancelable: true })
  )

  element.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true })
  )

  element.dispatchEvent(
    new Event("change", { bubbles: true, cancelable: true })
  )

  element.dispatchEvent(
    new FocusEvent("blur", { bubbles: true, cancelable: true })
  )
  console.info("element.value", element.value)
  // await delay(100)

  return
}
