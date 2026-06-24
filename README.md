# AIEG Prospect Research Workbench

Synthetic portfolio demo showing a human-in-the-loop AI-assisted prospect research workbench for AI Enablement Group.

## What this app demonstrates

This demo shows how AI can help a human team:

- define an ICP
- review a fictitious prospect list
- generate simulated research briefs
- score prospect fit and confidence
- see risk and uncertainty flags
- make a human review decision
- save reviewer notes and review status locally in the browser
- inspect a traceability trail showing what was used, inferred, and requires human review

## Safety boundaries

This is a public-safe portfolio demo.

It does not:

- use real companies
- use real contacts
- use real prospect records
- scrape websites
- contact real people
- connect to external business systems
- send emails or messages
- run scheduled jobs
- expose a public AI endpoint
- run Hermes live inside the app

All data is synthetic and fictitious.

## Hermes positioning

This is a Hermes-assisted workflow demo, not a Hermes-powered live backend.

Hermes was used as part of the design and build-orchestration process to help structure the workflow, define synthetic scenarios, shape research-brief logic, validate safety boundaries, and support QA planning.

The in-app “Generate Research Brief” action is simulated. It reveals prewritten synthetic research packets for demo purposes.

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
