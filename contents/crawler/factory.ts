import { GreenhouseAutoFill } from "./greenhouse"

const FACTORY_MAP = {
  greenhouse: GreenhouseAutoFill
}

export function getTargetName(): keyof typeof FACTORY_MAP {
  const hostURL = new URL(window.location.href)
  const domain = hostURL.hostname

  if (domain.includes("greenhouse") || hostURL.searchParams.get("gh_jid")) {
    return "greenhouse"
  }
}

let instance: any = null
class AutoFillFactory {
  static create() {
    let target: keyof typeof FACTORY_MAP = getTargetName()

    if (target) {
      instance = new FACTORY_MAP[target]()
      return instance
    }
  }
}

export default AutoFillFactory
