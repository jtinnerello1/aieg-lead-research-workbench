import { useMemo, useState } from 'react';
import { demoNotice, icpProfile, syntheticLeads } from './data';
import type { ReviewStatus, SyntheticLead } from './types';

const statusOptions: ReviewStatus[] = ['Needs Review', 'Qualified', 'Hold', 'Disqualified'];

function getRiskLevel(lead: SyntheticLead) {
  if (lead.riskFlags.some((flag) => flag.severity === 'High')) return 'High';
  if (lead.riskFlags.some((flag) => flag.severity === 'Medium')) return 'Medium';
  return 'Low';
}

function scoreClass(score: number) {
  if (score >= 80) return 'score score-high';
  if (score >= 65) return 'score score-medium';
  return 'score score-low';
}

export default function App() {
  const [selectedLeadId, setSelectedLeadId] = useState(syntheticLeads[0].id);
  const [statusByLead, setStatusByLead] = useState<Record<string, ReviewStatus>>(
    Object.fromEntries(syntheticLeads.map((lead) => [lead.id, lead.reviewStatus])),
  );
  const [notesByLead, setNotesByLead] = useState<Record<string, string>>(
    Object.fromEntries(syntheticLeads.map((lead) => [lead.id, lead.reviewerNotes])),
  );

  const selectedLead = useMemo(
    () => syntheticLeads.find((lead) => lead.id === selectedLeadId) ?? syntheticLeads[0],
    [selectedLeadId],
  );

  const summary = useMemo(() => {
    const highFit = syntheticLeads.filter((lead) => lead.scoreBand === 'High Fit').length;
    const needsReview = Object.values(statusByLead).filter((status) => status === 'Needs Review').length;
    const exportReady = Object.values(statusByLead).filter((status) => status === 'Qualified').length;

    return {
      total: syntheticLeads.length,
      highFit,
      needsReview,
      exportReady,
    };
  }, [statusByLead]);

  const selectedStatus = statusByLead[selectedLead.id];
  const selectedNotes = notesByLead[selectedLead.id];

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Hermes-assisted portfolio demo</p>
          <h1>AIEG Lead Research Workbench</h1>
          <p className="hero-copy">
            A synthetic, human-in-the-loop demo showing how AI can help research, qualify, score,
            and prepare leads for human review before any CRM action or outreach.
          </p>
        </div>
        <div className="hero-card">
          <strong>Demo boundary</strong>
          <p>{demoNotice}</p>
        </div>
      </section>

      <section className="notice-panel">
        <strong>About this demo:</strong> Hermes was used during the design and build process to help
        structure the workflow, define synthetic scenarios, shape the scoring logic, and validate the
        human-in-the-loop operating model. This app does not scrape real prospects, contact real
        people, update a CRM, run scheduled jobs, or perform automated outreach.
      </section>

      <section className="metrics-grid" aria-label="Workbench metrics">
        <Metric label="Synthetic leads" value={summary.total.toString()} />
        <Metric label="High fit" value={summary.highFit.toString()} />
        <Metric label="Need review" value={summary.needsReview.toString()} />
        <Metric label="Export ready" value={summary.exportReady.toString()} />
      </section>

      <section className="layout-grid">
        <aside className="panel icp-panel">
          <PanelHeading eyebrow="ICP setup" title={icpProfile.name} />
          <InfoRow label="Company size" value={icpProfile.companySizeRange} />
          <TagGroup label="Target industries" values={icpProfile.targetIndustries} />
          <TagGroup label="Priority pain points" values={icpProfile.priorityPainPoints} />
          <TagGroup label="Buying signals" values={icpProfile.buyingSignals} />
          <TagGroup label="Disqualifiers" values={icpProfile.disqualifiers} tone="warning" />
        </aside>

        <section className="panel lead-list-panel">
          <PanelHeading eyebrow="Synthetic lead list" title="Human review queue" />
          <div className="lead-list">
            {syntheticLeads.map((lead) => (
              <button
                className={lead.id === selectedLead.id ? 'lead-row active' : 'lead-row'}
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                type="button"
              >
                <span>
                  <strong>{lead.companyName}</strong>
                  <small>
                    {lead.industry} • {lead.employeeCount} employees
                  </small>
                </span>
                <span className={scoreClass(lead.fitScore)}>{lead.fitScore}</span>
              </button>
            ))}
          </div>
        </section>
      </section>

      <section className="detail-grid">
        <section className="panel detail-panel">
          <PanelHeading eyebrow="Lead detail" title={selectedLead.companyName} />
          <p className="muted">Synthetic demo company. Not based on a real business.</p>
          <p>{selectedLead.summary}</p>

          <div className="score-strip">
            <ScoreCard label="Fit score" value={selectedLead.fitScore} band={selectedLead.scoreBand} />
            <ScoreCard label="Confidence" value={selectedLead.confidenceScore} band="Human review required" />
            <ScoreCard label="Risk level" value={getRiskLevel(selectedLead)} band="Flagged items below" />
          </div>

          <h3>Simulated AI research summary</h3>
          <p className="ai-summary">{selectedLead.aiResearchSummary}</p>

          <div className="three-column">
            <ListBlock title="Pain signals" items={selectedLead.painSignals} />
            <ListBlock title="Buying signals" items={selectedLead.buyingSignals} />
            <ListBlock title="Possible use cases" items={selectedLead.possibleUseCases} />
          </div>
        </section>

        <section className="panel review-panel">
          <PanelHeading eyebrow="Human review" title="Reviewer decision" />
          <label className="field-label" htmlFor="review-status">
            Review status
          </label>
          <select
            id="review-status"
            value={selectedStatus}
            onChange={(event) =>
              setStatusByLead((current) => ({
                ...current,
                [selectedLead.id]: event.target.value as ReviewStatus,
              }))
            }
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <label className="field-label" htmlFor="review-notes">
            Reviewer notes
          </label>
          <textarea
            id="review-notes"
            value={selectedNotes}
            onChange={(event) =>
              setNotesByLead((current) => ({
                ...current,
                [selectedLead.id]: event.target.value,
              }))
            }
          />

          <div className="risk-list">
            <h3>Confidence / risk flags</h3>
            {selectedLead.riskFlags.map((flag) => (
              <div className="risk-card" key={`${selectedLead.id}-${flag.text}`}>
                <span className={`risk-pill risk-${flag.severity.toLowerCase()}`}>{flag.severity}</span>
                <strong>{flag.category}</strong>
                <p>{flag.text}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="detail-grid">
        <section className="panel crm-panel">
          <PanelHeading eyebrow="CRM export preview" title="Preview only — no CRM is connected" />
          <div className="crm-preview">
            <InfoRow label="Lead status" value={selectedStatus === 'Qualified' ? 'Research Qualified' : selectedLead.crmPreview.leadStatus} />
            <InfoRow label="Suggested segment" value={selectedLead.crmPreview.suggestedSegment} />
            <InfoRow label="Suggested next step" value={selectedLead.crmPreview.suggestedNextStep} />
            <InfoRow label="Human review required" value={selectedLead.crmPreview.humanReviewRequired ? 'Yes' : 'No'} />
          </div>
          <pre className="json-preview">
            {JSON.stringify(
              {
                companyName: selectedLead.companyName,
                fitScore: selectedLead.fitScore,
                confidenceScore: selectedLead.confidenceScore,
                reviewStatus: selectedStatus,
                reviewerNotes: selectedNotes,
                crmSummary: selectedLead.crmPreview.summaryForCrm,
              },
              null,
              2,
            )}
          </pre>
        </section>

        <section className="panel audit-panel">
          <PanelHeading eyebrow="Traceability" title="Used, inferred, requires review" />
          {selectedLead.auditTrail.map((entry) => (
            <article className="audit-card" key={`${selectedLead.id}-${entry.step}`}>
              <h3>{entry.step}</h3>
              <InfoRow label="Used" value={entry.used.join('; ')} />
              <InfoRow label="Inferred" value={entry.inferred.join('; ')} />
              <InfoRow label="Requires human review" value={entry.requiresHumanReview.join('; ')} />
              <p>{entry.output}</p>
            </article>
          ))}
        </section>
      </section>

      <footer className="footer-note">
        {demoNotice} Built as a public-safe portfolio example for AI Enablement Group.
      </footer>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PanelHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="panel-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TagGroup({ label, values, tone = 'default' }: { label: string; values: string[]; tone?: 'default' | 'warning' }) {
  return (
    <div className="tag-group">
      <h3>{label}</h3>
      <div>
        {values.map((value) => (
          <span className={tone === 'warning' ? 'tag tag-warning' : 'tag'} key={value}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScoreCard({ label, value, band }: { label: string; value: number | string; band: string }) {
  return (
    <div className="score-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{band}</small>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="list-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
