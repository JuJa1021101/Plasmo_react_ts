export interface ExecutableFunction {
  func: (...args: any[]) => any
  delay?: number
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function executeSequentially(
  ...functions: (ExecutableFunction | ((...args: any[]) => any))[]
): Promise<void> {
  for (const item of functions) {
    let func: (...args: any[]) => any
    let delayTime: number = 1200

    if (typeof item === "function") {
      func = item
    } else if (typeof item === "object" && item.func) {
      func = item.func
      if (typeof item.delay === "number") {
        delayTime = item.delay
      }
    } else {
      console.warn("Skipping invalid argument:", item)
      continue
    }

    try {
      if (func.constructor.name === "AsyncFunction") {
        await func()
      } else {
        func()
      }
    } catch (error) {
      console.error(`Error in function ${func.name}:`, error)
    }

    console.info("delayTime", delayTime)
    // 使用指定的延迟时间
    await delay(delayTime)
  }
}
