import type { components } from "~schema"

import type { FIELD_TYPE } from "./enums"

// 创建一个interface
export interface RuleItem {
  name: string
  value?: string
  selector: string
  type?: string
}

export interface Rules {
  fields: RuleItem[]
}

export interface RuleBaseItem {
  value: string
  selectorList: string[]
}

export interface Education {
  school: string
  degree: string
  discipline: string
  start: string
  end: string
}

export type UserInputItem = {
  question: string
  value: string
}

export type SubmitStatus = {
  status: "submit" | "filling"
  userid?: string
  url: string
  jobid?: string
  missingFields: string[]
  filledFields?: string[]
  totalFields?: string[]
  requiredFields?: string[]
  filledRequiredFields?: string[]
  userInput?: UserInputItem[]
  requestTime?: number
  fillTime?: number
  filledCount?: number
  totalCount?: number
  requiredCount?: number
  filledRequiredCount?: number
  formData?: any
}

export type fieldRequiredStatus = {
  label: string
  required: true | false | null
  options?: (
    | string
    | {
        label: string
        description: string
        required: boolean
        options: string[]
        type: "checkbox" | "select" | "text" | "file"
      }
  )[]
  type?: "checkbox" | "select" | "text" | "file" | "radio"
}

export type EducationItem = {
  organization: string
  degree: string
  major: string
  dates: {
    startDate: string
    completionDate: string
    isCurrent: boolean
  }
}

export type WorkExperienceItem = Record<string, any>

export type ProfileInfoType = {
  personalInfo?: {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    // location: string;
    linkedinUrl: string
    githubUrl?: string
    personalSite?: string
  }
  education?: EducationItem[]
  workExperience?: WorkExperienceItem[]
  skills?: string[]
}

export type FieldResponseEntity = {
  name: string
  value?: string
}

type CheckboxRule = {
  $label: HTMLElement
  options: string[]
  $checkboxs: HTMLElement[]
}

type TextRule = {
  $label: HTMLElement
  $input: HTMLInputElement
}

type SelectRule = {
  $label: HTMLElement
  $input: HTMLSelectElement
  options: string[]
}

type ListRule = {
  children: InputRule[]
  options: string[]
}

export type InputRule<T extends FIELD_TYPE = FIELD_TYPE> = {
  label: string
  required: boolean
  type: T
} & (T extends FIELD_TYPE.CHECKBOX ? CheckboxRule : {}) &
  (T extends FIELD_TYPE.TEXT ? TextRule : {}) &
  (T extends FIELD_TYPE.SELECT ? SelectRule : {}) &
  (T extends FIELD_TYPE.EDUCATION ? ListRule : {}) &
  (T extends FIELD_TYPE.EMPLOYMENT ? ListRule : {})
