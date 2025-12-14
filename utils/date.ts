import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { type components } from "~/schema"

import { isEmpty } from "./lang"

dayjs.extend(relativeTime)

const convertDate = (date: string = "", isCurrent?: boolean) => {
  if (isCurrent) {
    return "Present"
  }

  if (date?.length === 10 || date?.length === 7) {
    return dayjs(date).format("MMM YYYY")
    // } else if (date.length === 7) {
    // return dayjs(date).format("YYYY-MM");
  }

  return date
}

export const getResumeDateRange = ({
  startDate,
  completionDate,
  isCurrent
}: components["schemas"]["ResumeDates"]) => {
  const left = convertDate(startDate, false)
  const right = convertDate(completionDate, isCurrent)

  if (isEmpty(left) && isEmpty(right)) {
    return ""
  } else if (isEmpty(left) || isEmpty(right)) {
    return left || right
  } else {
    return `${left} - ${right}`
  }
}
