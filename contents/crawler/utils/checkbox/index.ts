export async function fillCheckbox(
  element: HTMLInputElement,
  needClick: boolean = true
) {
  // checked item should not be clicked again
  console.log("[Debug] Fill Checkbox:", element)

  if (element.checked) {
    return
  }

  element.focus()
  element.dispatchEvent(
    new Event("focus", { bubbles: true, cancelable: false })
  )

  element.checked = true
  if (needClick) {
    element.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: false })
    )
  }

  element.dispatchEvent(
    new Event("change", { bubbles: true, cancelable: false })
  )

  element.blur()
  element.dispatchEvent(new Event("blur", { bubbles: true, cancelable: false }))
  return
}
