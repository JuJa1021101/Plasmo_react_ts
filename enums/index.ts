export enum RESUME_PROCESS_STATUS {
  WAITING = 1,
  READY = 2,
  // NOTE: 3 is not completed by backend yet.
  FAIL = 3
}

export enum UPLOADING_STATUS {
  INIT,
  UPLOADING,
  SUCCESS
}

export enum VISITOR_STORAGE_KEYS {
  VISITOR_FILTERS = "visitor_filters",
  VISITOR_NOUN_STRANDARDS = "visitor_noun_standards",
  VISITOR_ID = "visitor_id",
  DEVICE_ID = "device_id"
}

export enum AB_TEST_STORAGE_KEYS {
  ONBOARDING = "ab_onboarding"
}

export enum AB_ONBOARDING_VERSION {
  V2 = "v2",
  V3 = "v3"
}

export enum ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  STAGING = "staging",
  LOCAL = "local",
  PREPROD = "preprod"
}

export enum BUILD_ENV {
  DEVELOPMENT = ENV.DEVELOPMENT,
  PRODUCTION = ENV.PRODUCTION,
  PREPROD = ENV.PREPROD,
  STAGING = ENV.STAGING
}

export enum RUNTIME_ENV {
  DEVELOPMENT = ENV.DEVELOPMENT,
  PRODUCTION = ENV.PRODUCTION,
  STAGING = ENV.STAGING,
  LOCAL = ENV.LOCAL
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

export enum FILTERS_MESSAGE {
  EMPTY = "empty filters",
  INVALID = "invalid filters"
}

export enum USER_STORAGE_KEY {
  USER_ID = "userid",
  VISIT_RESUME_PAGE = "visit_resume_page",
  RESUME_LAST_POPUP_TIME = "resume_last_popup_time",
  TURBO_SURVEY_POPUPED = "user_turbo_survey_popuped",
  TURBO_OFFICE_HOUR_LAST_POPUP_TIME = "turbo_office_hour_last_popup_time"
}

export enum QUERY_KEYS {
  UTM_SOURCE = "utm_source",
  SHARE_ID = "share_id",
  REDIRECT = "redirect",
  LOGIN = "login",
  INVITER_ID = "inviter_id",
  UTM_CAMPAIGN = "utm_campaign",
  IMP_ID = "imp_id",
  UTM_ID = "utm_id",
  POS = "pos",
  RETARGET = "retarget"
}

export enum USER_VISIT_STATE {
  list_never_reached = 0,
  list_reached_within_1_days = 1,
  list_reached_over_1_days = 2
}

export enum MENU_KEY {
  LIST = "list",
  RESUME = "resume",
  PROFILE = "profile",
  CADIDATES = "candidates"
}

export enum TRAFFIC_AB_STATUS {
  on = "on",
  off = "off"
}

export enum USER_CLIENT_TYPES {
  unknown = -1,
  web = 0,
  mobile_web = 1,
  app = 2
}

export enum LANDING_ROUTE_KEY {
  RESUME_AI = "resume_ai",
  JOB_MATCHING = "job_matching",
  INSIDER_CONNECTIONS = "insider_connections",
  AI_COPILOT_ORION = "ai_copilot_orion",
  H1B_JOBS = "h1b_jobs",
  ABOUT_US = "about_us",
  BLOG = "blog",
  INTERN_LIST = "intern_list",
  NEW_GRAD = "new_grad",
  JOBRIGHT_FOR_GOOD = "jobright_for_good",

  // tools
  AI_JOB_ASSISTANT = "ai_job_assistant",
  AI_COVER_LETTER_GENERATOR = "ai_cover_letter_generator",
  AI_RESUME_HELPER = "ai_resume_helper",
  AI_JOB_TRACKER = "ai_job_tracker",
  TOOLS_ASSEMBLE = "tools_assemble",

  // blog
  LINKEDIN_101_GUIDE = "linkedin_101_guide",
  UNLIMATE_GUIDE_TO_H1B = "unlimited_guide_to_h1b",
  LAND_TOP_INTERNSHIP = "land_top_internship",

  MASTERING_INTERVIEWS = "MASTERING_INTERVIEWS",
  ENERGIZE_YOUR_JOB_SEARCH = "ENERGIZE_YOUR_JOB_SEARCH",
  HOW_TO_WRITE_A_RESUME = "HOW_TO_WRITE_A_RESUME",
  HOW_TO_GET_A_INTERNSHIP = "HOW_TO_GET_A_INTERNSHIP",

  // Information
  PRIVACY_POLICY = "privacy_policy",
  TERMS_OF_SERVICE = "terms_of_service",

  // enterprise
  FOR_EMPLOYER = "/enterprise/invite",

  DIVIDER = "divider"
}

export enum IFRAME_EVENTS {
  EXECUTE_IFRAME_FUNCTION = "EXECUTE_IFRAME_FUNCTION",
  UPDATE_IFRAME_DATA = "UPDATE_IFRAME_DATA"
}
