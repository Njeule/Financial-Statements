# FS Reports Dashboard Improvement Implementation Plan

## Objective

Upgrade the current local FS Reports dashboard from a functional CFO prototype into a polished, executive-grade interactive financial reporting application. The next pass should improve visual quality, finance insight depth, drilldown usefulness, and report credibility while preserving the current CSV-driven workflow.

## Current Baseline

- Static local dashboard served from `index.html`, `app.js`, and `styles.css`.
- Source files: `ChartOfAccounts.csv` and `Transactions.csv`.
- Existing views: Overview, Income Statement, Balance Sheet, Cash & Working Capital, Ratios, Expenses, Ledger.
- Existing controls: month/category/department/region filters, search, reset, drilldown, filtered ledger export.
- Existing reconciliations: balanced journal count, active account count, ledger line count.

## Target Experience

The finished dashboard should feel like a CFO operating cockpit:

- Dense, decision-ready, and professionally formatted.
- First viewport should prioritize financial signals, not decoration.
- Every major figure should reconcile back to ledger lines.
- Each page should contain useful interpretation, not only charts.
- Drilldowns should answer “what makes up this number?” immediately.

## Phase 1: Visual And Layout Upgrade

### Item 1: Remove Oversized Decorative Icons

Replace the large icon graphics currently occupying report panel space with compact section-title icons and data-first content.

Implementation tasks:

- Remove large inline SVG placeholders from chart panels.
- Keep small 16px header icons only.
- Increase chart/table content height where icons are removed.
- Ensure every visible panel has useful information above the fold.

Acceptance criteria:

- No report panel contains a large decorative icon.
- Overview first viewport shows KPI cards, integrity bar, charts, ratios, and CFO readout without wasted space.
- Expense, balance, and cash views open directly on analysis content.

### Item 2: Make Charts Denser And More Executive-Grade

Improve charts so they look deliberate, readable, and presentation-ready.

Implementation tasks:

- Add chart titles, subtitles, and meaningful axis labels.
- Improve y-axis scaling for mixed positive/negative values.
- Add hover detail using SVG `<title>` and visible selected-state styling.
- Add data labels for key values only, not every mark.
- Use consistent finance colors across categories.
- Add empty-state messaging when filters remove data.

Acceptance criteria:

- Charts do not look sparse at 1366x768 or 1600x900.
- Negative operating results are visually obvious.
- Chart labels do not overlap bars, axes, or legends.
- Chart click targets visibly support drilldown/filtering where applicable.

### Item 3: Use Full-Width Layout Better

Reduce excessive whitespace and improve use of large screens.

Implementation tasks:

- Increase max dashboard width from prototype proportions to a wider analytical layout.
- Reduce empty vertical panel height.
- Make major overview panels align to the same top and bottom rhythm.
- Introduce grid variants for statement/table-heavy pages.

Acceptance criteria:

- At 1366x768, important content is visible without excessive scrolling.
- At 1600px+, the app uses space productively without stretching text awkwardly.
- Panels have consistent spacing and predictable alignment.

### Item 11: Compact The Header

Make the header more dashboard-like and less vertically expensive.

Implementation tasks:

- Combine brand, tabs, and filters into a tighter two-row layout.
- Reduce padding and button height while preserving clickability.
- Keep search wide enough for real use.
- Ensure sticky header does not consume too much viewport height.

Acceptance criteria:

- Header height is materially reduced.
- Tabs and filters remain readable and accessible.
- No text clipping in buttons or filter labels.

### Item 12: Better Table Formatting

Improve the ledger and drilldown table experience.

Implementation tasks:

- Add denser row spacing option for drilldown tables.
- Keep amount columns right-aligned with tabular numerals.
- Add sticky header and optional sticky first transaction/account column.
- Add selected-row hover state.
- Add compact transaction summary above drilldown tables.

Acceptance criteria:

- Ledger tables are scannable at high row counts.
- Horizontal scrolling is minimized on desktop.
- Amounts align cleanly and negative values remain visually distinct.

### Item 13: Improve Responsive Design

Make desktop and mobile layouts intentional.

Implementation tasks:

- Test at 1366x768, 1600x900, 1024x768, and mobile-width breakpoints.
- Convert multi-column panels into single-column mobile stacks.
- Reduce chart label density on small screens.
- Make tables horizontally scrollable only where unavoidable.

Acceptance criteria:

- No overlapping text or controls on small screens.
- KPI cards remain readable on mobile.
- Statement rows and filters remain usable without layout shifts.

## Phase 2: CFO Insight Layer

### Item 4: Add CFO Narrative Summaries Above Each Page

Add concise interpretation at the top of every report page.

Implementation tasks:

- Create a reusable `pageNarrative(view, rows)` function.
- Add one-sentence headline insight and two supporting bullets per page.
- Tailor narratives to current filter context.
- Include caveats where data limitations matter.

Acceptance criteria:

- Each page has a finance-specific narrative summary.
- Narratives update when filters change.
- Narrative text is concise and does not crowd the interface.

### Item 6: Add Monthly Variance Analytics

Show performance movement and volatility over time.

Implementation tasks:

- Calculate month-over-month revenue, gross profit, opex, EBIT, and cash movements.
- Identify best and worst months by revenue and operating result.
- Add run-rate metrics for revenue and opex.
- Add a volatility indicator using standard deviation or max/min spread.

Acceptance criteria:

- Overview includes best/worst month callouts.
- Trend panels include MoM movement where useful.
- Variance figures reconcile to monthly ledger aggregations.

### Item 8: Add Reconciliation Panel

Upgrade the existing integrity bar into a proper finance control panel.

Implementation tasks:

- Add drillable reconciliation section.
- Show balanced entries, total debits, total credits, net ledger total.
- Show mapped vs unmapped ledger rows.
- Show active vs inactive accounts.
- Show date coverage and transaction count.

Acceptance criteria:

- Reconciliation panel proves the dashboard ties to the source data.
- Any failed reconciliation is visibly highlighted.
- Values are filter-aware where appropriate and source-wide where appropriate.

### Item 10: Add CFO Exceptions

Automatically flag important financial risks or unusual conditions.

Implementation tasks:

- Create threshold rules:
  - Operating margin below 0%.
  - Opex above 70% of revenue.
  - COGS above 60% of revenue.
  - Current ratio below 1.2 or above 3.0.
  - Any month with EBIT below configured threshold.
  - Expense account concentration above 30% of total expenses.
- Display exception severity: critical, warning, info.
- Link each exception to the relevant view/drilldown.

Acceptance criteria:

- Dashboard shows CFO exception cards on Overview.
- Exceptions are filter-aware.
- Clicking an exception navigates to the relevant evidence.

## Phase 3: Financial Statement Depth

### Item 5: Improve Drilldown Behavior

Make drilldowns feel like a finance inspector, not just a table.

Implementation tasks:

- Add selected line summary: selected label, amount, transaction count, debit/credit split.
- Add mini account mix chart for selected line.
- Add top journal entries by absolute value.
- Add breadcrumb: statement line → account/subcategory → ledger lines.
- Add clear selection and export selected drilldown.

Acceptance criteria:

- Clicking a statement line immediately explains the selected balance.
- Drilldown totals tie to selected statement line.
- User can export only the selected drilldown.

### Item 7: Add Common-Size Statements

Add percentage analysis to statements.

Implementation tasks:

- Income Statement: add % of revenue column.
- Balance Sheet: add % of total assets column.
- Add toggle between amount-only and amount + common-size view.
- Ensure totals and subtotals are formatted consistently.

Acceptance criteria:

- Income statement shows amount and % revenue.
- Balance sheet shows amount and % total assets.
- Common-size percentages update with filters.

### Item 9: Add Bridge Charts

Use bridge/waterfall-style visuals to explain movement from revenue to operating result.

Implementation tasks:

- Build revenue → COGS → gross profit → opex → operating result bridge.
- Use clear positive/negative color semantics.
- Add monthly bridge option for selected month.
- Add click-through from bridge segments to ledger drilldown.

Acceptance criteria:

- Overview or Income Statement includes a readable profit bridge.
- Bridge totals match P&L metrics.
- Segments support drilldown.

## Delivery Sequence

1. Remove large icons and compact the header.
2. Improve chart and layout density.
3. Upgrade tables and responsive behavior.
4. Add page narratives.
5. Add variance analytics and CFO exceptions.
6. Add reconciliation panel.
7. Upgrade drilldown inspector.
8. Add common-size statements.
9. Add bridge charts.
10. Run browser review and fix visual defects.

## Risks And Constraints

- The current data has only 12 active accounts, so visual variety is naturally limited.
- No invoice/customer/vendor fields exist, so ageing and counterparty analytics cannot be accurate.
- No opening balances exist, so balance sheet and cash flow are GL movement views unless opening balances are added.
- Static dependency-free implementation is fast and portable, but advanced charting requires custom SVG work unless dependencies are reintroduced.

## Recommended Next Build Strategy

Keep the current dependency-free architecture for the next iteration. It loads instantly, requires no install, and is easy to share locally. Only introduce a charting library if the visual requirements outgrow maintainable custom SVG.

