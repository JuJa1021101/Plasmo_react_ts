import { isEqual } from "lodash-es"

import { isEmpty } from "./lang"

interface KeyValue {
  [key: string]: any
}

export function diffValues(target: KeyValue, source: KeyValue): string[] {
  const sourceKeys = Object.keys(source)
  return sourceKeys.filter(
    (key) => target.hasOwnProperty(key) && !isEqual(target[key], source[key])
  )
}

// 1: null to value; 2: value to value; 3: value to null
export function diffStatus(next: KeyValue, prev: KeyValue): KeyValue {
  const keys = [
    "excludeStaffingAgency",
    "isH1BOnly",
    "minYearsOfExperienceRange",
    "daysAgo"
  ]
  const sourceKeys = Object.keys(next)

  return keys.reduce((acc, key) => {
    if (sourceKeys.includes(key)) {
      if (
        (isEmpty(prev[key]) && !isEmpty(next[key])) ||
        (prev[key] === false && next[key] === true)
      ) {
        acc[key] = 1
      } else if (
        (!isEmpty(prev[key]) && isEmpty(next[key])) ||
        (prev[key] === true && next[key] === false)
      ) {
        acc[key] = 3
      } else if (next.hasOwnProperty(key) && !isEqual(prev[key], next[key])) {
        acc[key] = 2
      }
    }

    return acc
  }, {} as KeyValue)
}
