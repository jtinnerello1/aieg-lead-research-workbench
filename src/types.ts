export type ReviewStatus = 'Needs Review' | 'Qualified' | 'Hold' | 'Disqualified';
export type ScoreBand = 'High Fit' | 'Medium Fit' | 'Low Fit' | 'Disqualified';
export type RiskSeverity = 'Low' | 'Medium' | 'High';

export type IcpProfile = {
  name: string;
  companySizeRange: string;
  targetIndustries: string[];
  targetRegions: string[];
  priorityPainPoints: string[];
  buyingSignals: string[];
  disqualifiers: string[];
};

export type RiskFlag = {
  severity: RiskSeverity;
  category: string;
  text: string;
};

export type ScoringBreakdown = {
  industryFit: number;
  companySizeFit: number;
  painPointFit: number;
  buyingSignalFit: number;
  operationalComplexity: number;
  riskPenalty: number;
};

export type AuditTrailEntry = {
  step: string;
  used: string[];
  inferred: string[];
  requiresHumanReview: string[];
  output: string;
};

export type SyntheticLead = {
  id: string;
  companyName: string;
  industry: string;
  region: string;
  employeeCount: number;
  summary: string;
  painSignals: string[];
  buyingSignals: string[];
  possibleUseCases: string[];
  aiResearchSummary: string;
  fitScore: number;
  confidenceScore: number;
  scoreBand: ScoreBand;
  riskFlags: RiskFlag[];
  recommendedAction: ReviewStatus;
  reviewStatus: ReviewStatus;
  reviewerNotes: string;
  scoringBreakdown: ScoringBreakdown;
researchBrief: {
  companySnapshot: string;
  businessModel: string;
  likelyOperationalPain: string[];
  aiOpportunity: string[];
  suggestedDiscoveryQuestions: string[];
  recommendedNextStep: string;
  humanValidationNeeded: string[];
};
  auditTrail: AuditTrailEntry[];
};
