export enum RENDER_STEP {
  INITIAL = 0,
  FILLING = 1,
  FILLED = 2,
  FAILED = 3
}

export enum MESSAGE_EVENTS {
  autoFillResultFromIframe = "autoFillResultFromIframe",
  updateResultFromIframe = "updateResultFromIframe",
  sendHttpStatusIframe = "sendHttpStatusIframe"
}

export enum PROFILE_CURRENT_STAGE {
  NO_FILTER = 1,
  NO_RESUME = 10, // TO ONBOARDING RESUME
  // RESUME_NO_FILTER = 11, // TO ONBOARDING RESUME

  RESUME_PARSING = 21, // TO_MATCHING
  FILTE_RESUME_READY = 30, // TO_GET_JOB_LIST

  FAILED_RESUME = 40, // RESUME_FAILED
  FAILED_WITHOUT_FILTER = 41, // NO_FILTER_FAILED

  V3_TO_SEEKER_TYPE = 50,
  V3_RUSH_TO_BASIC_PREF = 51,
  V3_NO_RUSH_TO_BASIC_PREF = 52,
  V3_TO_CAREER_GOAL = 53,
  V3_TO_ADVANCED_PREF = 54,
  V3_RUSH_TO_RESUME = 55,
  V3_NOT_RUSH_TO_RESUME = 56
}

export enum FIELD_TYPE {
  TEXT = "text",
  CHECKBOX = "checkbox",
  SELECT = "select",
  SELECT_ORIGINAL = "select-original", // 原生select
  MULTI_SELECT = "multi-select",
  EMPLOYMENT = "employment",
  EDUCATION = "education"
}
