# AIEG Lead Research Workbench

Synthetic portfolio demo showing a human-in-the-loop AI lead research and qualification workbench for AI Enablement Group.

## What this app demonstrates

This demo shows how AI can help a human team:

- define an ICP
- review a synthetic lead list
- read AI-style research summaries
- score and qualify leads
- see confidence and risk flags
- make a human review decision
- preview CRM-ready records without connecting a CRM
- inspect a traceability trail showing what was used, inferred, and requires human review

## Safety boundaries

This is a public-safe portfolio demo.

It does not:

- use real companies
- use real contacts
- use real prospect records
- scrape websites
- contact real people
- update a CRM
- send emails or messages
- run scheduled jobs
- expose a public AI endpoint

All data is synthetic and fictitious.

## Hermes positioning

This is a Hermes-assisted workflow demo, not a Hermes-powered live backend.

Hermes was used as part of the design and build-orchestration process to help structure the workflow, define synthetic scenarios, shape scoring logic, validate safety boundaries, and support QA planning.

## Local development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Hostinger portfolio page

Use `HOSTINGER_PORTFOLIO_SECTION.md` for the copy, disclosures, usage instructions, and iframe placeholder that will be added to the Hostinger Website Builder portfolio page after deployment.
