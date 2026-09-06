# Deployment Guide

## Recommended Deployment Mode

Deploy the app without raw CSV files and without a default `report-data.json` if you do not want static figures visible online.

The deployed dashboard starts blank and asks the user to upload the CSV files in the browser.

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

## Do Not Upload These Files Publicly

Keep these private unless the deployment is protected by login/auth:

- `Transactions.csv`
- `ChartOfAccounts.csv`
- `report-data.json`, unless you intentionally want default figures shown before upload

## Local Development

The app starts blank and waits for uploaded CSVs.

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

If you intentionally want to test with the generated JSON locally or in a private environment, open the app with:

```text
?demo=1
```

## Security Note

`report-data.json` still contains financial amounts by month and account. It is safer than raw transaction CSVs, but it is not anonymous. For highly sensitive reporting, deploy behind authentication.
