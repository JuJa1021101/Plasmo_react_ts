// import { captureExceptionToSentry } from "./sentry"

export const isStringNumber = (orignalString: string) => {
  const value = Number(orignalString)

  return !isNaN(value)
}

export const isJSONString = (orignalString: string) => {
  try {
    JSON.parse(orignalString)
    return true
  } catch (error) {
    // captureExceptionToSentry(error);

    return false
  }
}

export const parsedJSONString = (orignalString: string) => {
  try {
    const parsed = JSON.parse(orignalString)

    return parsed
  } catch (error) {
    console.error("parsedJSONString error", error)
    // NOTE: 似乎没有sentry?
    // captureExceptionToSentry(error)
    return null
  }
}

/**
 * 移除对象中的不可序列化的值，防止在postmessage等必须发送可序列化对象的地方序列化失败
 * TODO: 后续可更更改为pickBy 更细致的判断
 */
export function cleanObject(obj: Object) {
  return parsedJSONString(JSON.stringify(obj))
}
