import { escapeXPath, getFirstOrderedNode } from "~core/xpath"

const fillMyworkdayEdgeCase = async (
  domain: string,
  field: string[],
  filledFields: string[]
) => {
  if (!domain.includes("myworkdayjobs")) {
    return
  }
  const haveYouWorkXpath = `//legend//*[contains(text(), ${escapeXPath(
    field[0]
  )})]`
  const haveYouWorkRadioLabel = getFirstOrderedNode(haveYouWorkXpath, document)

  if (haveYouWorkRadioLabel) {
    const parentNode = haveYouWorkRadioLabel.parentNode.parentNode

    if (parentNode) {
      // 在父节点中查找所有的 label 子节点
      const labelNode = getFirstOrderedNode(
        `.//label[text()='${field[1]}']`,
        parentNode
      )
      if (labelNode) {
        const forattr = (labelNode as HTMLElement).getAttribute("for")
        if (forattr) {
          const radioButton = getFirstOrderedNode(
            "./parent::div//input",
            labelNode
          )
          if (radioButton) {
            console.log(haveYouWorkRadioLabel.textContent)
            const ele = radioButton as HTMLInputElement
            ele.click()
            ele.dispatchEvent(
              new Event("change", { bubbles: true, cancelable: false })
            )
            filledFields.push(haveYouWorkRadioLabel.textContent)
          }
        }
      }
    }
  }
}

export { fillMyworkdayEdgeCase }
