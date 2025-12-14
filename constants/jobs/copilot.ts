import { type components } from "~/schema"

export const PRESET_TYPE = "PRESET_TYPE"

export const BASIC_FILTES: (keyof components["schemas"]["FilterResult"])[] = [
  "jobTitle",
  "jobTypes",
  "city",
  "minYearsOfExperienceRange",
  "daysAgo",
  // "suggestSeniority",
  "seniority",
  "companyCategory",
  "annualSalaryMinimum",
  "isH1BOnly",
  "excludeStaffingAgency",
  "workModel",
  "radiusRange"
]
