# Deployment Guide

## Recommended Deployment Mode

Use the generated `report-data.json` file online. Do not upload the raw CSV files unless the site is protected behind authentication.

## Generate Deployment Data

Run:

```bash
npm run prepare:data
```

This creates `report-data.json`.

The generated file:

- Summarizes ledger data by month, account, and debit/credit type.
- Replaces raw transaction IDs with synthetic IDs.
- Removes original transaction descriptions.
- Keeps enough data for statements, charts, filters, ratios, and drilldowns.
- Includes source reconciliation metadata such as source line count, balanced entries, debits, credits, and date coverage.

## Upload These Files

For a static hosting deployment, upload:

- `index.html`
- `app.js`
- `styles.css`
- `report-data.json`

## Do Not Upload These Files Publicly

Keep these private unless the deployment is protected by login/auth:

- `Transactions.csv`
- `ChartOfAccounts.csv`

## Local Development

The app tries to load `report-data.json` first. If it is missing, it falls back to the raw CSV files for local development.

Run locally:

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Refreshing The Report In The Browser

The dashboard includes an `Upload CSVs` control in the header.

Use it to:

1. Select `ChartOfAccounts.csv`.
2. Select `Transactions.csv`.
3. Click `Generate report`.

The report refreshes immediately in the browser. The uploaded CSV contents are processed locally in the browser session and are not uploaded to a server by this static app.

After reviewing the refreshed dashboard, click `Export report-data.json`. Replace the hosted `report-data.json` with that downloaded file to update the online dashboard without publishing the raw CSVs.

## Security Note

`report-data.json` still contains financial amounts by month and account. It is safer than raw transaction CSVs, but it is not anonymous. For highly sensitive reporting, deploy behind authentication.
