import { AutoFillBase } from "./base"
import type { ExecutableFunction } from "./utils/executor"

export class TemplateAutoFill extends AutoFillBase {
  shouldSkipElement(
    element: Element,
    type?: "input" | "textarea" | "select" | "checkbox"
  ): boolean {
    throw new Error("Method not implemented.")
  }

  formatUserInfo() {}

  getFillingLabels() {
    return []
  }

  getInputElements(label: Element): [Element[], string] {
    throw new Error("Method not implemented.")
  }

  getTextAreaElements(label: Element): [HTMLTextAreaElement[], string] {
    throw new Error("Method not implemented.")
  }

  getSelectElements(label: Element): [HTMLSelectElement[], string] {
    throw new Error("Method not implemented.")
  }

  processUnNormalElements(label: Element): ExecutableFunction[] {
    return []
  }

  async executeAdditionalTasks() {
    await this.uploadFiles()
  }

  getFormElements(label: Element) {
    return {}
  }
}
