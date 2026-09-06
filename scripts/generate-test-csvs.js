import { writeFile } from "node:fs/promises";

const q = (value) => {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const csv = (headers, rows) => [headers.join(","), ...rows.map((row) => headers.map((header) => q(row[header])).join(","))].join("\n") + "\n";

const fmtDate = (date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const round = (value) => Math.round(value * 100) / 100;

const accounts = [
  ["1000-GEN", "100000", "Main Operating Bank - GBP", "Assets", "Current Assets", "Cash & Cash Equivalents", "United Kingdom", "Finance"],
  ["1010-GEN", "101000", "Main Operating Bank - USD", "Assets", "Current Assets", "Cash & Cash Equivalents", "United States", "Finance"],
  ["1020-GEN", "102000", "Merchant Clearing Account", "Assets", "Current Assets", "Cash & Cash Equivalents", "Global", "Finance"],
  ["1100-GEN", "110000", "Trade Receivables - Enterprise", "Assets", "Current Assets", "Receivables", "Global", "Finance"],
  ["1110-GEN", "111000", "Trade Receivables - SMB", "Assets", "Current Assets", "Receivables", "Global", "Finance"],
  ["1120-GEN", "112000", "Allowance for Credit Losses", "Assets", "Current Assets", "Receivables", "Global", "Finance"],
  ["1200-GEN", "120000", "Inventory - Hardware Kits", "Assets", "Current Assets", "Inventory", "Global", "Operations"],
  ["1210-GEN", "121000", "Inventory - Replacement Parts", "Assets", "Current Assets", "Inventory", "Global", "Operations"],
  ["1300-GEN", "130000", "Prepaid Software", "Assets", "Current Assets", "Prepaid Expenses", "Global", "Technology"],
  ["1310-GEN", "131000", "Prepaid Insurance", "Assets", "Current Assets", "Prepaid Expenses", "Global", "Finance"],
  ["1500-GEN", "150000", "Computer Equipment", "Assets", "Non-Current Assets", "Property, Plant & Equipment", "Global", "Technology"],
  ["1510-GEN", "151000", "Furniture and Fixtures", "Assets", "Non-Current Assets", "Property, Plant & Equipment", "Global", "Operations"],
  ["1520-GEN", "152000", "Accumulated Depreciation", "Assets", "Non-Current Assets", "Property, Plant & Equipment", "Global", "Finance"],
  ["1600-GEN", "160000", "Capitalized Platform Development", "Assets", "Non-Current Assets", "Intangible Assets", "Global", "Engineering"],
  ["2000-GEN", "200000", "Trade Payables - Vendors", "Liabilities", "Current Liabilities", "Accounts Payable", "Global", "Finance"],
  ["2010-GEN", "201000", "Accrued Expenses", "Liabilities", "Current Liabilities", "Accrued Liabilities", "Global", "Finance"],
  ["2020-GEN", "202000", "Payroll Taxes Payable", "Liabilities", "Current Liabilities", "Payroll Liabilities", "Global", "People"],
  ["2030-GEN", "203000", "Deferred Revenue - Annual Plans", "Liabilities", "Current Liabilities", "Deferred Revenue", "Global", "Sales"],
  ["2040-GEN", "204000", "VAT / Sales Tax Payable", "Liabilities", "Current Liabilities", "Tax Liabilities", "Global", "Finance"],
  ["2500-GEN", "250000", "Bank Loan - Term Facility", "Liabilities", "Non-Current Liabilities", "Borrowings", "Global", "Finance"],
  ["2510-GEN", "251000", "Lease Liability", "Liabilities", "Non-Current Liabilities", "Lease Liabilities", "Global", "Operations"],
  ["3000-GEN", "300000", "Ordinary Share Capital", "Equity", "Shareholders Equity", "Paid-in Capital", "Global", "Corporate"],
  ["3010-GEN", "301000", "Share Premium", "Equity", "Shareholders Equity", "Paid-in Capital", "Global", "Corporate"],
  ["3100-GEN", "310000", "Opening Retained Earnings", "Equity", "Shareholders Equity", "Retained Earnings", "Global", "Corporate"],
  ["3200-GEN", "320000", "FX Translation Reserve", "Equity", "Shareholders Equity", "Other Reserves", "Global", "Finance"],
  ["4000-UK", "400000", "Subscription Revenue - UK Mid-Market", "Revenue", "Operating Revenue", "Subscription Revenue", "United Kingdom", "Sales"],
  ["4010-US", "401000", "Subscription Revenue - US Enterprise", "Revenue", "Operating Revenue", "Subscription Revenue", "United States", "Sales"],
  ["4020-EU", "402000", "Subscription Revenue - Europe Enterprise", "Revenue", "Operating Revenue", "Subscription Revenue", "Europe", "Sales"],
  ["4100-GEN", "410000", "Implementation Services Revenue", "Revenue", "Operating Revenue", "Services Revenue", "Global", "Professional Services"],
  ["4110-GEN", "411000", "Training Services Revenue", "Revenue", "Operating Revenue", "Services Revenue", "Global", "Professional Services"],
  ["4200-GEN", "420000", "Hardware Kit Sales", "Revenue", "Operating Revenue", "Product Revenue", "Global", "Operations"],
  ["4300-GEN", "430000", "Partner Referral Revenue", "Revenue", "Non-Operating Income", "Partner Income", "Global", "Sales"],
  ["5000-GEN", "500000", "Cloud Hosting Costs", "Expenses", "Cost of Goods Sold", "Cloud Infrastructure", "Global", "Technology"],
  ["5010-GEN", "501000", "Payment Processing Fees", "Expenses", "Cost of Goods Sold", "Payment Costs", "Global", "Finance"],
  ["5020-GEN", "502000", "Implementation Contractor Costs", "Expenses", "Cost of Goods Sold", "Delivery Costs", "Global", "Professional Services"],
  ["5030-GEN", "503000", "Hardware Kit Component Costs", "Expenses", "Cost of Goods Sold", "Product Costs", "Global", "Operations"],
  ["6000-GEN", "600000", "Salaries - Engineering", "Expenses", "Operating Expenses", "Personnel Expenses", "Global", "Engineering"],
  ["6010-GEN", "601000", "Salaries - Sales", "Expenses", "Operating Expenses", "Personnel Expenses", "Global", "Sales"],
  ["6020-GEN", "602000", "Salaries - Customer Success", "Expenses", "Operating Expenses", "Personnel Expenses", "Global", "Customer Success"],
  ["6030-GEN", "603000", "Salaries - Finance and Admin", "Expenses", "Operating Expenses", "Personnel Expenses", "Global", "Finance"],
  ["6040-GEN", "604000", "Employer Payroll Taxes", "Expenses", "Operating Expenses", "Personnel Expenses", "Global", "People"],
  ["6100-GEN", "610000", "Digital Advertising", "Expenses", "Operating Expenses", "Sales & Marketing", "Global", "Marketing"],
  ["6110-GEN", "611000", "Events and Sponsorships", "Expenses", "Operating Expenses", "Sales & Marketing", "Global", "Marketing"],
  ["6120-GEN", "612000", "Sales Commissions", "Expenses", "Operating Expenses", "Sales & Marketing", "Global", "Sales"],
  ["6200-GEN", "620000", "Office Rent", "Expenses", "Operating Expenses", "Facilities & Overhead", "United Kingdom", "Operations"],
  ["6210-GEN", "621000", "Utilities", "Expenses", "Operating Expenses", "Facilities & Overhead", "United Kingdom", "Operations"],
  ["6220-GEN", "622000", "Insurance Expense", "Expenses", "Operating Expenses", "Facilities & Overhead", "Global", "Finance"],
  ["6300-GEN", "630000", "Software Subscriptions", "Expenses", "Operating Expenses", "Technology & IT", "Global", "Technology"],
  ["6310-GEN", "631000", "Security and Compliance Tools", "Expenses", "Operating Expenses", "Technology & IT", "Global", "Technology"],
  ["6400-GEN", "640000", "Professional Fees - Legal", "Expenses", "Operating Expenses", "Professional Fees", "Global", "Finance"],
  ["6410-GEN", "641000", "Professional Fees - Accounting", "Expenses", "Operating Expenses", "Professional Fees", "Global", "Finance"],
  ["6500-GEN", "650000", "Travel and Accommodation", "Expenses", "Operating Expenses", "Travel & Entertainment", "Global", "Sales"],
  ["6510-GEN", "651000", "Meals and Entertainment", "Expenses", "Operating Expenses", "Travel & Entertainment", "Global", "Sales"],
  ["6600-GEN", "660000", "Bad Debt Expense", "Expenses", "Operating Expenses", "Credit Losses", "Global", "Finance"],
  ["6700-GEN", "670000", "Depreciation Expense", "Expenses", "Operating Expenses", "Depreciation & Amortization", "Global", "Finance"],
  ["6710-GEN", "671000", "Amortization Expense", "Expenses", "Operating Expenses", "Depreciation & Amortization", "Global", "Finance"],
  ["7000-GEN", "700000", "Interest Income", "Revenue", "Non-Operating Income", "Financial Income", "Global", "Finance"],
  ["7100-GEN", "710000", "Interest Expense", "Expenses", "Non-Operating Expenses", "Finance Costs", "Global", "Finance"],
  ["7200-GEN", "720000", "Corporation Tax Expense", "Expenses", "Tax Expense", "Income Taxes", "Global", "Finance"]
].map(([AccountKey, AccountNumber, AccountName, Category_L1, Subcategory_L2, DetailGroup_L3, Region, Department]) => ({
  AccountKey,
  AccountNumber,
  AccountName,
  Category_L1,
  Subcategory_L2,
  DetailGroup_L3,
  Region,
  Department
}));

const rows = [];
let seq = 20000;
const pushLine = (id, date, accountNumber, description, amount, type) => {
  rows.push({
    TransactionID: id,
    Date: fmtDate(date),
    AccountNumber: accountNumber,
    Description: description,
    Amount: round(amount).toFixed(2),
    Type: type
  });
};

const journal = (date, lines, description) => {
  const id = `TEST-${seq++}`;
  const total = round(lines.reduce((sum, line) => sum + line.amount, 0));
  if (Math.abs(total) > 0.01) throw new Error(`${id} is unbalanced by ${total}`);
  lines.forEach((line, index) => pushLine(id, date, line.account, `${description} - Line ${index + 1}`, line.amount, line.amount >= 0 ? "Debit" : "Credit"));
};

const months = Array.from({ length: 12 }, (_, i) => i);
for (const month of months) {
  const season = 1 + month * 0.018 + (month === 2 || month === 10 ? 0.09 : 0);
  const date = (day) => new Date(2026, month, day);
  const subUk = round((72000 + month * 2100) * season);
  const subUs = round((104000 + month * 2800) * season);
  const subEu = round((61000 + month * 1700) * season);
  const services = round((24000 + (month % 4) * 6500) * season);
  const training = round((6500 + (month % 3) * 1800) * season);
  const hardware = round((18000 + (month % 5) * 4200) * season);
  const totalRevenue = round(subUk + subUs + subEu + services + training + hardware);

  journal(date(3), [
    { account: "110000", amount: subUk + subEu + services },
    { account: "111000", amount: training + hardware },
    { account: "400000", amount: -subUk },
    { account: "401000", amount: -subUs },
    { account: "402000", amount: -subEu },
    { account: "410000", amount: -services },
    { account: "411000", amount: -training },
    { account: "420000", amount: -hardware },
    { account: "101000", amount: subUs }
  ], "Monthly revenue recognition");

  journal(date(6), [
    { account: "100000", amount: round(totalRevenue * 0.64) },
    { account: "102000", amount: round(totalRevenue * 0.11) },
    { account: "110000", amount: -round(totalRevenue * 0.52) },
    { account: "111000", amount: -round(totalRevenue * 0.23) }
  ], "Customer cash receipts and merchant clearing");

  const cloud = round(totalRevenue * 0.155);
  const processing = round(totalRevenue * 0.026);
  const contractor = round(services * 0.34);
  const component = round(hardware * 0.47);
  journal(date(8), [
    { account: "500000", amount: cloud },
    { account: "501000", amount: processing },
    { account: "502000", amount: contractor },
    { account: "503000", amount: component },
    { account: "200000", amount: -round(cloud + processing + contractor + component) }
  ], "Monthly cost of sales accrual");

  const payroll = {
    "600000": 38500 + month * 450,
    "601000": 31800 + month * 520,
    "602000": 22400 + month * 310,
    "603000": 17600 + month * 180,
    "604000": 15200 + month * 160
  };
  const payrollTotal = round(Object.values(payroll).reduce((sum, value) => sum + value, 0));
  journal(date(15), [
    ...Object.entries(payroll).map(([account, amount]) => ({ account, amount: round(amount) })),
    { account: "202000", amount: -round(payrollTotal * 0.19) },
    { account: "100000", amount: -round(payrollTotal * 0.81) }
  ], "Payroll and employer taxes");

  const marketing = round(19000 + month * 850 + (month === 2 || month === 8 ? 14000 : 0));
  const software = round(12500 + month * 240);
  const rent = 9200;
  const professional = round(7800 + (month % 2) * 1600);
  journal(date(19), [
    { account: "610000", amount: marketing },
    { account: "611000", amount: month === 5 || month === 10 ? 12500 : 2500 },
    { account: "630000", amount: software },
    { account: "620000", amount: rent },
    { account: "640000", amount: professional },
    { account: "201000", amount: -round(marketing + (month === 5 || month === 10 ? 12500 : 2500) + software + rent + professional) }
  ], "Operating expense accrual");

  const commission = round(totalRevenue * 0.055);
  journal(date(22), [
    { account: "612000", amount: commission },
    { account: "201000", amount: -commission }
  ], "Sales commission accrual");

  const depreciation = 4200;
  const amortization = 6100;
  journal(date(26), [
    { account: "670000", amount: depreciation },
    { account: "671000", amount: amortization },
    { account: "152000", amount: -depreciation },
    { account: "160000", amount: -amortization }
  ], "Depreciation and amortization");

  if (month % 3 === 0) {
    journal(date(27), [
      { account: "120000", amount: 28000 + month * 900 },
      { account: "200000", amount: -(28000 + month * 900) }
    ], "Inventory replenishment");
  }

  if (month === 0) {
    journal(date(1), [
      { account: "100000", amount: 360000 },
      { account: "101000", amount: 140000 },
      { account: "150000", amount: 185000 },
      { account: "151000", amount: 42000 },
      { account: "250000", amount: -220000 },
      { account: "300000", amount: -250000 },
      { account: "301000", amount: -180000 },
      { account: "310000", amount: -77000 }
    ], "Opening balance injection for test company");
  }

  if (month === 6) {
    journal(date(12), [
      { account: "160000", amount: 95000 },
      { account: "100000", amount: -95000 }
    ], "Capitalized product development milestone");
  }

  if (month === 11) {
    journal(date(28), [
      { account: "710000", amount: 14500 },
      { account: "100000", amount: -14500 }
    ], "Annual loan interest payment");
    journal(date(29), [
      { account: "720000", amount: 22500 },
      { account: "204000", amount: -22500 }
    ], "Corporation tax accrual");
  }
}

const accountHeaders = ["AccountKey", "AccountNumber", "AccountName", "Category_L1", "Subcategory_L2", "DetailGroup_L3", "Region", "Department"];
const transactionHeaders = ["TransactionID", "Date", "AccountNumber", "Description", "Amount", "Type"];

await writeFile("Test_ChartOfAccounts.csv", csv(accountHeaders, accounts));
await writeFile("Test_Transactions.csv", csv(transactionHeaders, rows));

console.log(`Generated Test_ChartOfAccounts.csv with ${accounts.length} accounts.`);
console.log(`Generated Test_Transactions.csv with ${rows.length} journal lines across ${new Set(rows.map((row) => row.TransactionID)).size} journal entries.`);
