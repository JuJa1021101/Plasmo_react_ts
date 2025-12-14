export const shouldSkipLabel = (label: Element): boolean => {
  const className = label.className
  return className && className.includes("offscreen")
}

export function getLabelText(label: Element): string {
  let text = label.textContent.trim().split("\n")[0]
  return text ? text.replace(/[✱*]/g, "").trim() : ""
}

export function removeSpecialCharacters(text) {
  // 使用正则表达式匹配所有非字母、数字和空格的字符，并替换为空字符串
  return text.replace(/[^a-zA-Z0-9\s]/g, "")
}
