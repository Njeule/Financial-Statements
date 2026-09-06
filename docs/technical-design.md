# FS Reports Technical Design

## Architecture

The dashboard remains a static local web application:

- `index.html`: entry point.
- `styles.css`: visual system and responsive layout.
- `app.js`: CSV loading, finance model, rendering, interaction handlers.
- `ChartOfAccounts.csv`: account hierarchy and reporting dimensions.
- `Transactions.csv`: general ledger lines.

No dependency install is required. The app is served with:

```bash
npm run dev
```

## Data Flow

1. Browser fetches both CSVs.
2. CSV parser converts each file into objects.
3. Transactions are joined to chart of accounts by `AccountNumber`.
4. Dates are parsed from `dd/MM/yyyy`.
5. Each row receives reporting fields:
   - Month
   - Quarter
   - Category
   - Subcategory
   - Detail group
   - Region
   - Department
6. Presentation signs are calculated separately from ledger signs.
7. Views consume filtered ledger rows.

## Sign Convention

Ledger amount remains unchanged for reconciliation.

Presentation amount converts credit-nature categories to positive reporting values:

- Revenue: inverted.
- Liabilities: inverted.
- Equity: inverted.
- Assets: unchanged.
- Expenses: unchanged.

This keeps reconciliations and financial statement presentation separate.

## New Modules To Add Inside `app.js`

The current single-file implementation can remain, but should be organized into clearer sections:

- Data parsing.
- Finance metrics.
- Reconciliations.
- Variance analytics.
- Exceptions engine.
- Rendering helpers.
- View renderers.
- Event binding.

Recommended new functions:

- `pageNarrative(view, rows)`
- `monthlyVariance(rows)`
- `reconciliationSummary(rows, allRows)`
- `cfoExceptions(rows)`
- `commonSizePnl(lines, revenue)`
- `commonSizeBalance(lines, totalAssets)`
- `profitBridge(rows)`
- `drilldownSummary(rows, target)`
- `selectedLedgerExport(rows, target)`

## UI Components To Add

Because this is vanilla JavaScript, components are rendering functions:

- `NarrativePanel`
- `ExceptionCards`
- `ReconciliationPanel`
- `ProfitBridgeChart`
- `DrilldownInspector`
- `CommonSizeStatementTable`
- `DenseLedgerTable`
- `ResponsiveChartFrame`

## Testing Approach

Use three levels of verification:

1. Syntax:

```bash
node --check app.js
```

2. HTTP serving:

```powershell
Invoke-WebRequest -Uri http://127.0.0.1:5173/ -UseBasicParsing
```

3. Browser review:

- Open `http://127.0.0.1:5173`.
- Check all tabs.
- Apply each filter.
- Click statement rows.
- Export ledger.
- Review desktop and mobile viewport behavior.

## Quality Bar

Implementation is complete only when:

- All 13 backlog items are represented in the interface.
- The first viewport is dense and useful.
- Each report page has narrative insight.
- Drilldown totals reconcile.
- No known layout overlaps exist.
- The dashboard still runs without dependency installation.

