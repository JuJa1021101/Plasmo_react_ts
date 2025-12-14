export type JobInfoType = {
  displayScore: number
  rankDesc: string
  isLiked: boolean
  applyTime: string
  impId: string
  jobNotes: {
    boostedFactor: number
    displayScore: number
    expectationScore: number
    featureScore: Record<string, number>
    featureWeight: Record<string, number>
    modelScore: number
    notesMap: Record<string, string>
    qualificationScore: number
    rankScore: number
  }
  jobResult: {
    applicantsCount: number
    jdLogo: string
    jobId: string
    jobTitle: string
    jobSeniority: string
    jobLocation: string
    jobTags: Array<string>
    publishTime: string
    publishTimeDesc: string
    salaryDesc: string
    employmentType: string
    firstTaxonomy: string
    jobSummary: string
    jobRecruiter: string
    jobRecruiterProfileUrl: string
    originalUrl: string
    applyLink: string
    isRemote: boolean
    isDeleted: boolean
    coreResponsibilities: Array<string>
    skillSummaries: Array<string>
    skillMatchingScores: Array<{
      displayName: string
      featureName: string
      score: number
    }>
    educationSummaries: Array<string>
    recommendationTags: Array<string>
    recommendationScores: Array<{
      featureName: string
      displayName: string
      score: number
    }>
    benefitsSummaries: Array<string>
    workModel: string
    source?: number
    socialConnections: Array<InsiderConnectionType>
    personalSocialConnections: {
      company: Array<InsiderConnectionType>
      school: Array<InsiderConnectionType>
    }
    minYearsOfExperience?: number
    qualifications?: {
      mustHave: string[]
      preferredHave: string[]
    }
  }
  companyResult: {
    companyId: string
    companyName: string
    companySize: string
    companyDesc: string
    companyCategories: string
    companyTwitterURL: string
    companyLinkedinURL: string
    companyCrunchbaseURL?: string
    companyFacebookURL: string
    companyLogo: string
    companyFoundYear: string
    companyLocation: string
    companyURL: string
    fundraisingCurrentStage: string
    fundraisingTotalFunding: string
    fundraisingKeyInvestors: Array<string>
    fundraisingLatestRounds: Array<{
      investmentType: string
      announcedOn?: string
      raisedAmountUsd?: string
      investorCount?: number
      leadInvestorName?: string
      postMoneyValuationUsd?: string
    }>
    leadership: Array<{
      pname?: string
      pstarted?: string
      ptitle?: string
      pfacebookUrl?: string
      plinkedinUrl?: string
      ptwitterUrl?: string
      plogoUrl?: string
    }>
    pressReferences: Array<{
      url: string
      postedOn: string
      title: string
      publisher: string
    }>
    grating?: {
      rating?: string
      url?: string
      count?: number
    }
    h1bAnnualJobCount: Array<{
      count: number
      year: string
    }>
    h1bTitleDistribution: Array<{
      count: number
      title: string
    }>
    isAgency: boolean
  }
  pos?: number
}

export type UseProfileType = {
  /** @description logined */
  logined?: boolean
  /** @description the email of current user */
  email?: string
  /** @description the userId of current user */
  userId?: string
  /**
   * Format: int32
   * @description currentStage
   */
  currentStage?: number
  /** @description the name of the resume if it has */
  resumeName?: string
  /** @description first name */
  firstName?: string
  /** @description full name */
  fullName?: string
  /** @description resume analysis error message */
  resumeErrMsg?: string
  /** @description pulling linkedin profile error message */
  linkedinProfileErrMsg?: string
  /** @description is linkedin url verified */
  linkedinUrlVerified?: boolean
  /**
   * Format: int32
   * @description 0-never get job list, 1-register in 24h, 2-viewed job list
   */
  isNew?: number
  /** @description client type history */
  clientTypes?: number[]
  /** @description linkedin url */
  linkedinUrl?: string
  /** @description show resume tailor popup when click apply job */
  showTailorPopup?: boolean
  /** @description show resume writer feedback popup */
  showResumeWriterFeedbackPopup?: boolean
  /** @description show resume export feedback popup */
  showResumeExportFeedbackPopup?: boolean
  /** @description show resume tailor feedback popup */
  showResumeTailorFeedbackPopup?: boolean
  linkedinResume?: boolean
}

export type EducationItem = {
  school: string
  start: string
  end: string
  degree: string
  discipline: string
}

export type FieldRule = {
  name: string
  xpath: string
  type: string
  required?: boolean
}

export type FieldAnswer = {
  name: string
  value: string
}
