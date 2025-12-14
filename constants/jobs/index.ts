export const featureNameToShortDisplayName: Record<string, string> = {
  q_industry_match: "Industry Exp.",
  q_seniority_match: "Exp. Level",
  q_job_skill_match: "Skill",
};
export const featureNameToDisplayName: Record<string, string> = {
  q_industry_match: "Industry Experience",
  q_seniority_match: "Experience Level",
  q_job_skill_match: "Skills",
};

export const APPLICANTS_LIMIT = 200;
export const APPLICANTS_LOWER_LIMIT = 25;
export const LESS_EQUAL_TO_25_TEXT = "Less than 25";
export const LESS_EQUAL_TO_25_APPLICANTS_TEXT = `${LESS_EQUAL_TO_25_TEXT} applicants`;

export const DEFAULT_WELCOME_MESSAGE = "Great! You've just unlocked your Chat with me, Orion!";

export const SECOND = 1000;
export const IDLE_TAB_TIME = 60 * 60 * SECOND;

export const JOB_HASHED_ID_LENGTH = 24;

export const EMPTY_JOB_CONDITION_NAME: Record<string, string> = {
  companyCategory: "Industry",
  minYearsOfExperienceRange: "Required Experience",
  daysAgo: "Date Posted",
  roleType: "Role Type",
  companyStages: "Company Stage",
  skills: "Skill",
  companies: "Company",
  jobTypes: "Job Type",
  workModel: "Work Model",
  isH1BOnly: "H1b",
  annualSalaryMinimum: "Salary",
  seniority: "Experience Level",
  jobTitle: "Job Title",
};
