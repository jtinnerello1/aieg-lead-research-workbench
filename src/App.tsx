import { useEffect, useMemo, useState } from 'react';
import { demoNotice, icpProfile, syntheticProspects } from './data';
import type { ReviewStatus, ScoreBand, SyntheticProspect } from './types';

const statusOptions: ReviewStatus[] = ['Needs Review', 'Qualified', 'Hold', 'Disqualified'];
const scoreBandOptions: Array<'All' | ScoreBand> = ['All', 'High Fit', 'Medium Fit', 'Low Fit', 'Disqualified'];
const statusFilterOptions: Array<'All' | ReviewStatus> = ['All', ...statusOptions];
const reviewStorageKey = 'aieg-prospect-research-workbench-review-state';

type StoredReviewState = {
  statusByProspect?: Record<string, ReviewStatus>;
  notesByProspect?: Record<string, string>;
  generatedBriefsByProspect?: Record<string, boolean>;
};

function getRiskLevel(prospect: SyntheticProspect) {
  if (prospect.riskFlags.some((flag) => flag.severity === 'High')) return 'High';
  if (prospect.riskFlags.some((flag) => flag.severity === 'Medium')) return 'Medium';
  return 'Low';
}

function scoreClass(score: number) {
  if (score >= 80) return 'score score-high';
  if (score >= 65) return 'score score-medium';
  return 'score score-low';
}

function getDefaultStatuses() {
  return Object.fromEntries(syntheticProspects.map((prospect) => [prospect.id, prospect.reviewStatus]));
}

function getDefaultNotes() {
  return Object.fromEntries(syntheticProspects.map((prospect) => [prospect.id, prospect.reviewerNotes]));
}

function getDefaultGeneratedBriefs() {
  return Object.fromEntries(syntheticProspects.map((prospect) => [prospect.id, false]));
}

function loadStoredReviewState(): StoredReviewState {
  try {
    const savedState = window.localStorage.getItem(reviewStorageKey);
    return savedState ? (JSON.parse(savedState) as StoredReviewState) : {};
  } catch {
    return {};
  }
}

export default function App() {
  const storedReviewState = useMemo(loadStoredReviewState, []);
  const [selectedProspectId, setSelectedProspectId] = useState(syntheticProspects[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreBandFilter, setScoreBandFilter] = useState<'All' | ScoreBand>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | ReviewStatus>('All');
  const [statusByProspect, setStatusByProspect] = useState<Record<string, ReviewStatus>>({
    ...getDefaultStatuses(),
    ...storedReviewState.statusByProspect,
  });
  const [notesByProspect, setNotesByProspect] = useState<Record<string, string>>({
    ...getDefaultNotes(),
    ...storedReviewState.notesByProspect,
  });
  const [generatedBriefsByProspect, setGeneratedBriefsByProspect] = useState<Record<string, boolean>>({
    ...getDefaultGeneratedBriefs(),
    ...storedReviewState.generatedBriefsByProspect,
  });

  useEffect(() => {
    window.localStorage.setItem(
      reviewStorageKey,
      JSON.stringify({ statusByProspect, notesByProspect, generatedBriefsByProspect }),
    );
  }, [statusByProspect, notesByProspect, generatedBriefsByProspect]);

  const filteredProspects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return syntheticProspects.filter((prospect) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          prospect.companyName,
          prospect.industry,
          prospect.region,
          prospect.summary,
          prospect.aiResearchSummary,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesScoreBand = scoreBandFilter === 'All' || prospect.scoreBand === scoreBandFilter;
      const matchesStatus = statusFilter === 'All' || statusByProspect[prospect.id] === statusFilter;

      return matchesSearch && matchesScoreBand && matchesStatus;
    });
  }, [searchTerm, scoreBandFilter, statusFilter, statusByProspect]);

  const selectedProspect = useMemo(
    () => syntheticProspects.find((prospect) => prospect.id === selectedProspectId) ?? syntheticProspects[0],
    [selectedProspectId],
  );

  const summary = useMemo(() => {
    const highFit = syntheticProspects.filter((prospect) => prospect.scoreBand === 'High Fit').length;
    const needsReview = Object.values(statusByProspect).filter((status) => status === 'Needs Review').length;
    const briefsGenerated = Object.values(generatedBriefsByProspect).filter(Boolean).length;

    return {
      total: syntheticProspects.length,
      highFit,
      needsReview,
      briefsGenerated,
    };
  }, [generatedBriefsByProspect, statusByProspect]);

  const selectedStatus = statusByProspect[selectedProspect.id] ?? selectedProspect.reviewStatus;
  const selectedNotes = notesByProspect[selectedProspect.id] ?? '';
  const selectedBriefGenerated = generatedBriefsByProspect[selectedProspect.id] ?? false;

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Hermes-assisted workflow demo</p>
          <h1>AIEG Prospect Research Workbench</h1>
          <p className="hero-copy">
            A synthetic, human-in-the-loop demo showing how AI-assisted research can turn fictitious
            prospect information into a clear research brief for human review.
          </p>
        </div>
        <div className="hero-card">
          <strong>Demo boundary</strong>
          <p>{demoNotice}</p>
        </div>
      </section>

      <section className="notice-panel">
        <strong>About this demo:</strong> This is a simulated Hermes-assisted research experience.
        Hermes helped shape the workflow and synthetic scenarios during design, but Hermes is not
        running live inside this public app. The app does not scrape real prospects, contact real
        people, run scheduled jobs, or perform automated outreach.
      </section>

      <section className="metrics-grid" aria-label="Workbench metrics">
        <Metric label="Fictitious prospects" value={summary.total.toString()} />
        <Metric label="High fit" value={summary.highFit.toString()} />
        <Metric label="Need review" value={summary.needsReview.toString()} />
        <Metric label="Briefs generated" value={summary.briefsGenerated.toString()} />
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

        <section className="panel prospect-list-panel">
          <PanelHeading eyebrow="Fictitious prospect list" title="Human review queue" />

          <div className="filter-grid">
            <label className="field-label" htmlFor="prospect-search">
              Search prospects
            </label>
            <input
              id="prospect-search"
              placeholder="Search by company, industry, region, or summary"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <label className="field-label" htmlFor="fit-filter">
              Fit filter
            </label>
            <select
              id="fit-filter"
              value={scoreBandFilter}
              onChange={(event) => setScoreBandFilter(event.target.value as 'All' | ScoreBand)}
            >
              {scoreBandOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <label className="field-label" htmlFor="status-filter">
              Status filter
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'All' | ReviewStatus)}
            >
              {statusFilterOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="prospect-list">
            {filteredProspects.length > 0 ? (
              filteredProspects.map((prospect) => (
                <button
                  className={prospect.id === selectedProspect.id ? 'prospect-row active' : 'prospect-row'}
                  key={prospect.id}
                  onClick={() => setSelectedProspectId(prospect.id)}
                  type="button"
                >
                  <span>
                    <strong>{prospect.companyName}</strong>
                    <small>
                      {prospect.industry} • {prospect.employeeCount} employees • {statusByProspect[prospect.id]}
                    </small>
                  </span>
                  <span className={scoreClass(prospect.fitScore)}>{prospect.fitScore}</span>
                </button>
              ))
            ) : (
              <p className="empty-state">No fictitious prospects match the current filters.</p>
            )}
          </div>
        </section>
      </section>

      <section className="detail-grid">
        <section className="panel detail-panel">
          <PanelHeading eyebrow="Prospect detail" title={selectedProspect.companyName} />
          <p className="muted">Synthetic demo company. Not based on a real business.</p>
          <p>{selectedProspect.summary}</p>

          <div className="score-strip">
            <ScoreCard label="Fit score" value={selectedProspect.fitScore} band={selectedProspect.scoreBand} />
            <ScoreCard label="Confidence" value={selectedProspect.confidenceScore} band="Human review required" />
            <ScoreCard label="Risk level" value={getRiskLevel(selectedProspect)} band="Flagged items below" />
          </div>

          <div className="research-action-card">
            <div>
              <h3>Simulated research action</h3>
              <p>
                Generate a research brief for this fictitious prospect. This does not call a live
                AI service or scrape the web.
              </p>
            </div>
            <button
              className="action-button"
              onClick={() =>
                setGeneratedBriefsByProspect((current) => ({
                  ...current,
                  [selectedProspect.id]: true,
                }))
              }
              type="button"
            >
              {selectedBriefGenerated ? 'Regenerate Brief' : 'Generate Research Brief'}
            </button>
          </div>

          <h3>Simulated AI research summary</h3>
          <p className="ai-summary">{selectedProspect.aiResearchSummary}</p>

          <div className="three-column">
            <ListBlock title="Pain signals" items={selectedProspect.painSignals} />
            <ListBlock title="Buying signals" items={selectedProspect.buyingSignals} />
            <ListBlock title="Possible use cases" items={selectedProspect.possibleUseCases} />
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
              setStatusByProspect((current) => ({
                ...current,
                [selectedProspect.id]: event.target.value as ReviewStatus,
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
            placeholder="Add human review notes for this fictitious prospect."
            value={selectedNotes}
            onChange={(event) =>
              setNotesByProspect((current) => ({
                ...current,
                [selectedProspect.id]: event.target.value,
              }))
            }
          />

          <div className="risk-list">
            <h3>Confidence / risk flags</h3>
            {selectedProspect.riskFlags.map((flag) => (
              <div className="risk-card" key={`${selectedProspect.id}-${flag.text}`}>
                <span className={`risk-pill risk-${flag.severity.toLowerCase()}`}>{flag.severity}</span>
                <strong>{flag.category}</strong>
                <p>{flag.text}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="detail-grid">
        <section className="panel brief-panel">
          <PanelHeading eyebrow="Research brief" title="Generated packet for human review" />

          {selectedBriefGenerated ? (
            <>
              <div className="brief-preview">
                <InfoRow label="Company snapshot" value={selectedProspect.researchBrief.companySnapshot} />
                <InfoRow label="Business model" value={selectedProspect.researchBrief.businessModel} />
                <InfoRow label="Recommended next step" value={selectedProspect.researchBrief.recommendedNextStep} />
              </div>

              <div className="brief-grid">
                <ListBlock title="Likely operational pain" items={selectedProspect.researchBrief.likelyOperationalPain} />
                <ListBlock title="AI opportunity" items={selectedProspect.researchBrief.aiOpportunity} />
                <ListBlock title="Discovery questions" items={selectedProspect.researchBrief.suggestedDiscoveryQuestions} />
                <ListBlock title="Human validation needed" items={selectedProspect.researchBrief.humanValidationNeeded} />
              </div>

              <article className="brief-summary-card">
                <h3>Reviewer note</h3>
                <p>{selectedNotes || 'No reviewer note added yet.'}</p>
              </article>
            </>
          ) : (
            <div className="empty-state brief-empty-state">
              <h3>No research brief generated yet</h3>
              <p>Select “Generate Research Brief” above to reveal the simulated research packet.</p>
            </div>
          )}
        </section>

        <section className="panel audit-panel">
          <PanelHeading eyebrow="Traceability" title="Used, inferred, requires review" />
          {selectedProspect.auditTrail.map((entry) => (
            <article className="audit-card" key={`${selectedProspect.id}-${entry.step}`}>
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
