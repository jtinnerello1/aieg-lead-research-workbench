import type { IcpProfile, SyntheticLead } from './types';

export const demoNotice =
  'Synthetic demo data only. No real companies, contacts, CRM records, scraping, or outreach are used.';

export const icpProfile: IcpProfile = {
  name: 'AI Enablement Group SMB Revenue Operations ICP',
  companySizeRange: '75–250 employees',
  targetIndustries: [
    'Managed services',
    'Home services',
    'Specialty manufacturing',
    'Healthcare services',
    'B2B distribution',
  ],
  targetRegions: ['United States', 'Philippines support operations', 'Remote-friendly teams'],
  priorityPainPoints: [
    'Manual lead research and inconsistent qualification',
    'CRM records missing context and next-step guidance',
    'Sales teams spending too much time preparing before outreach',
    'Operational knowledge spread across spreadsheets, inboxes, and tribal memory',
  ],
  buyingSignals: [
    'Recent growth in sales or operations headcount',
    'New CRM or process-improvement initiative',
    'High volume of inbound inquiries or quote requests',
    'Visible need for faster research, better prioritization, or cleaner handoffs',
  ],
  disqualifiers: [
    'Company appears too small for workflow leverage',
    'No clear operational pain signal',
    'Highly regulated workflow requiring deeper compliance review before demo-stage qualification',
    'Request appears focused on fully automated outreach rather than human-reviewed qualification',
  ],
};

export const syntheticLeads: SyntheticLead[] = [
  {
    id: 'brightpath-dental',
    companyName: 'BrightPath Dental Group',
    industry: 'Healthcare services',
    region: 'Southeast United States',
    employeeCount: 180,
    summary:
      'Fictitious multi-location dental services group with centralized intake and separate office-level follow-up workflows.',
    painSignals: [
      'Lead intake appears split across phone, web forms, and office-level callbacks.',
      'Potential handoff friction between central operations and local offices.',
      'High value depends on speed-to-lead and consistent follow-up quality.',
    ],
    buyingSignals: [
      'Recent expansion into additional local markets.',
      'Centralized operations model creates repeatable workflow improvement opportunity.',
      'Patient inquiry routing creates measurable response-time value.',
    ],
    possibleUseCases: [
      'Inquiry triage and routing support',
      'CRM note standardization',
      'Follow-up readiness checklist',
    ],
    aiResearchSummary:
      'Simulated AI summary: BrightPath looks like a strong fit because it has enough operational scale, repeatable intake workflows, and clear revenue impact from faster review and cleaner handoffs. Human review should confirm whether intake and CRM processes are centralized before qualification.',
    fitScore: 88,
    confidenceScore: 82,
    scoreBand: 'High Fit',
    riskFlags: [
      {
        severity: 'Medium',
        category: 'Human Review Required',
        text: 'Confirm whether intake data is centralized before assuming CRM improvement scope.',
      },
    ],
    recommendedAction: 'Qualified',
    reviewStatus: 'Needs Review',
    reviewerNotes: 'Review operational structure before CRM export.',
    scoringBreakdown: {
      industryFit: 18,
      companySizeFit: 19,
      painPointFit: 22,
      buyingSignalFit: 21,
      operationalComplexity: 13,
      riskPenalty: -5,
    },
    crmPreview: {
      leadStatus: 'Research Qualified',
      suggestedSegment: 'Healthcare services / multi-location SMB',
      suggestedNextStep: 'Human reviewer should validate intake workflow and CRM ownership.',
      summaryForCrm:
        'Synthetic high-fit lead. Multi-location healthcare services group with likely intake routing and CRM handoff friction. Strong candidate for human-reviewed AI workflow discovery.',
      humanReviewRequired: true,
    },
    auditTrail: [
      {
        step: 'Synthetic profile loaded',
        used: ['Industry', 'employee count', 'operating context'],
        inferred: ['Likely intake routing friction'],
        requiresHumanReview: ['Whether CRM and intake are centralized'],
        output: 'Lead moved to research summary stage.',
      },
      {
        step: 'ICP fit scored',
        used: ['Healthcare services industry', '180 employees', 'multi-location model'],
        inferred: ['Revenue impact from faster response and consistent handoffs'],
        requiresHumanReview: ['Decision-maker and current CRM process'],
        output: 'High Fit with 88 fit score and 82 confidence score.',
      },
    ],
  },
  {
    id: 'harborpoint-manufacturing',
    companyName: 'HarborPoint Manufacturing',
    industry: 'Specialty manufacturing',
    region: 'Midwest United States',
    employeeCount: 210,
    summary:
      'Fictitious specialty manufacturer with custom quote requests, distributor coordination, and engineering review before sales follow-up.',
    painSignals: [
      'Custom requests may require manual review before qualification.',
      'Sales and engineering handoffs likely slow quote readiness.',
      'Lead value depends on identifying fit before consuming technical resources.',
    ],
    buyingSignals: [
      'High-friction quoting workflow.',
      'Cross-functional qualification between sales and operations.',
      'Likely need for structured CRM notes and pre-review scoring.',
    ],
    possibleUseCases: [
      'Quote-intake classification',
      'Technical-fit triage',
      'CRM-ready qualification summary',
    ],
    aiResearchSummary:
      'Simulated AI summary: HarborPoint is a strong fit for AI-assisted qualification because custom manufacturing inquiries often require structured triage before sales or engineering time is used. Human review should confirm whether the current bottleneck is lead intake, technical review, or quoting.',
    fitScore: 91,
    confidenceScore: 78,
    scoreBand: 'High Fit',
    riskFlags: [
      {
        severity: 'Medium',
        category: 'Data Gap',
        text: 'The demo profile does not confirm current CRM or quote-management tools.',
      },
    ],
    recommendedAction: 'Qualified',
    reviewStatus: 'Needs Review',
    reviewerNotes: 'Validate quoting bottleneck before recommending use case.',
    scoringBreakdown: {
      industryFit: 20,
      companySizeFit: 20,
      painPointFit: 24,
      buyingSignalFit: 22,
      operationalComplexity: 14,
      riskPenalty: -9,
    },
    crmPreview: {
      leadStatus: 'Research Qualified',
      suggestedSegment: 'Specialty manufacturing / quote-heavy SMB',
      suggestedNextStep: 'Review quoting workflow and sales-engineering handoff process.',
      summaryForCrm:
        'Synthetic high-fit manufacturing lead with likely quote triage and technical review friction. Good candidate for AI-assisted qualification workflow discovery.',
      humanReviewRequired: true,
    },
    auditTrail: [
      {
        step: 'Synthetic operating signal reviewed',
        used: ['Custom quote context', 'employee count', 'sales-engineering handoff clue'],
        inferred: ['Manual qualification likely consumes technical staff time'],
        requiresHumanReview: ['Current quoting process and CRM fields'],
        output: 'Lead advanced to high-fit scoring review.',
      },
    ],
  },
  {
    id: 'sunriver-home-services',
    companyName: 'SunRiver Home Services',
    industry: 'Home services',
    region: 'Florida',
    employeeCount: 95,
    summary:
      'Fictitious regional home-services company with field teams, inbound service requests, and seasonal demand spikes.',
    painSignals: [
      'Likely volume spikes make manual inquiry prioritization difficult.',
      'Field service dispatch and sales follow-up may compete for attention.',
      'Missed or slow follow-up can directly affect revenue.',
    ],
    buyingSignals: [
      'Regional scale above owner-operator stage.',
      'Repeatable inquiry qualification workflow.',
      'Clear business value from faster response and better lead prioritization.',
    ],
    possibleUseCases: [
      'Service-request triage',
      'Lead urgency scoring',
      'CRM handoff summary',
    ],
    aiResearchSummary:
      'Simulated AI summary: SunRiver appears to be a good fit for practical lead qualification support because it likely handles a steady flow of service inquiries where urgency, geography, and job type affect priority. Human review should confirm whether the company has enough lead volume to justify workflow changes.',
    fitScore: 81,
    confidenceScore: 74,
    scoreBand: 'High Fit',
    riskFlags: [
      {
        severity: 'Low',
        category: 'Weak Signal',
        text: 'Lead volume is inferred from company type and size, not confirmed.',
      },
    ],
    recommendedAction: 'Qualified',
    reviewStatus: 'Needs Review',
    reviewerNotes: 'Confirm inquiry volume and seasonality.',
    scoringBreakdown: {
      industryFit: 18,
      companySizeFit: 17,
      painPointFit: 20,
      buyingSignalFit: 18,
      operationalComplexity: 11,
      riskPenalty: -3,
    },
    crmPreview: {
      leadStatus: 'Research Qualified',
      suggestedSegment: 'Home services / regional operator',
      suggestedNextStep: 'Validate inbound lead volume and dispatch handoff process.',
      summaryForCrm:
        'Synthetic high-fit home-services lead with likely inquiry prioritization and response-time opportunity. Human review required before outreach planning.',
      humanReviewRequired: true,
    },
    auditTrail: [
      {
        step: 'Pain signal identified',
        used: ['Home services category', 'regional operating model', '95 employees'],
        inferred: ['Seasonal lead-volume spikes'],
        requiresHumanReview: ['Actual inbound volume and dispatch process'],
        output: 'Lead scored as high fit with moderate confidence.',
      },
    ],
  },
  {
    id: 'northstar-logistics',
    companyName: 'Northstar Logistics Partners',
    industry: 'Logistics services',
    region: 'United States / Philippines support desk',
    employeeCount: 240,
    summary:
      'Fictitious logistics services company with distributed operations and internal support coordination across time zones.',
    painSignals: [
      'Distributed teams may create inconsistent CRM notes and handoffs.',
      'Operational exceptions can distract sales and account teams.',
      'Lead and account context may be fragmented across systems.',
    ],
    buyingSignals: [
      'Cross-time-zone support model.',
      'Operational complexity creates need for structured summaries.',
      'Potential value from cleaner qualification and account handoff records.',
    ],
    possibleUseCases: [
      'Lead-to-account context summary',
      'Internal handoff assistant',
      'CRM field completion support',
    ],
    aiResearchSummary:
      'Simulated AI summary: Northstar is a medium-to-high fit because the distributed operations model suggests handoff and documentation friction. The fit is not purely lead generation; the stronger use case may be CRM readiness and internal context capture.',
    fitScore: 76,
    confidenceScore: 68,
    scoreBand: 'Medium Fit',
    riskFlags: [
      {
        severity: 'Medium',
        category: 'ICP Mismatch',
        text: 'The strongest use case may be internal handoff improvement rather than lead qualification.',
      },
      {
        severity: 'Medium',
        category: 'Human Review Required',
        text: 'Confirm whether revenue team owns the problem or operations owns it.',
      },
    ],
    recommendedAction: 'Hold',
    reviewStatus: 'Needs Review',
    reviewerNotes: 'Hold until use case owner is clearer.',
    scoringBreakdown: {
      industryFit: 13,
      companySizeFit: 20,
      painPointFit: 19,
      buyingSignalFit: 16,
      operationalComplexity: 15,
      riskPenalty: -7,
    },
    crmPreview: {
      leadStatus: 'Hold',
      suggestedSegment: 'Logistics / distributed operations',
      suggestedNextStep: 'Clarify whether need is lead qualification, CRM hygiene, or operations handoff.',
      summaryForCrm:
        'Synthetic medium-fit lead. Distributed operations suggest workflow friction, but use case ownership requires human review before qualification.',
      humanReviewRequired: true,
    },
    auditTrail: [
      {
        step: 'Use case fit reviewed',
        used: ['Distributed support model', 'employee count', 'operations context'],
        inferred: ['CRM and handoff friction'],
        requiresHumanReview: ['Revenue owner versus operations owner'],
        output: 'Lead placed on Hold pending human review.',
      },
    ],
  },
  {
    id: 'evergreen-specialty-foods',
    companyName: 'Evergreen Specialty Foods',
    industry: 'Specialty foods distribution',
    region: 'Pacific Northwest',
    employeeCount: 65,
    summary:
      'Fictitious specialty foods distributor with a smaller team and mixed retail, wholesale, and hospitality customers.',
    painSignals: [
      'Customer segments may require different qualification paths.',
      'Order and lead data may be spread across simple tools.',
      'Smaller team may have limited bandwidth for process change.',
    ],
    buyingSignals: [
      'Possible need for customer segmentation and inquiry routing.',
      'Repeatable lead qualification could help if volume is high enough.',
    ],
    possibleUseCases: [
      'Customer-segment classification',
      'Inquiry summary drafting',
      'Manual CRM cleanup checklist',
    ],
    aiResearchSummary:
      'Simulated AI summary: Evergreen may benefit from AI-assisted classification, but it is below the preferred employee-size range and may not have enough operational scale for a full workbench implementation. Human review should confirm lead volume before moving forward.',
    fitScore: 58,
    confidenceScore: 70,
    scoreBand: 'Low Fit',
    riskFlags: [
      {
        severity: 'High',
        category: 'ICP Mismatch',
        text: 'Company size is below the preferred ICP range for this demo workflow.',
      },
    ],
    recommendedAction: 'Disqualified',
    reviewStatus: 'Needs Review',
    reviewerNotes: 'Likely too small unless lead volume is unusually high.',
    scoringBreakdown: {
      industryFit: 13,
      companySizeFit: 7,
      painPointFit: 14,
      buyingSignalFit: 12,
      operationalComplexity: 8,
      riskPenalty: -6,
    },
    crmPreview: {
      leadStatus: 'Disqualified',
      suggestedSegment: 'Specialty distribution / below-size ICP',
      suggestedNextStep: 'Do not export unless human reviewer confirms unusual volume or strategic fit.',
      summaryForCrm:
        'Synthetic low-fit lead. Potential workflow need exists, but company size appears below preferred ICP for this portfolio demo.',
      humanReviewRequired: true,
    },
    auditTrail: [
      {
        step: 'Disqualifier reviewed',
        used: ['65 employee count', 'mixed customer base'],
        inferred: ['Limited scale for full workflow implementation'],
        requiresHumanReview: ['Actual lead volume'],
        output: 'Lead marked Low Fit and recommended for disqualification.',
      },
    ],
  },
];
