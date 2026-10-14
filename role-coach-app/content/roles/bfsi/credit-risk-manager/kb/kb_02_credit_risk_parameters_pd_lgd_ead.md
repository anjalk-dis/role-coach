# Credit Risk Parameters: PD, LGD and EAD

*Knowledge area: Credit risk parameters. Audience: credit risk managers. Draft for coaching use; items marked [Verify] need SME confirmation.*

## 1. The core equation

**Expected Loss (EL) = PD × LGD × EAD**

- **PD (Probability of Default):** the likelihood that a borrower defaults over a given horizon, usually 12 months.
- **LGD (Loss Given Default):** the share of the exposure the lender loses if default happens, after recoveries and costs. LGD = 1 − recovery rate.
- **EAD (Exposure at Default):** how much the borrower owes at the moment of default, including any undrawn limits they draw down before defaulting.

**Example:** a Rs 10 crore working-capital exposure with PD 2%, LGD 40%, EAD Rs 10 crore. EL = 0.02 × 0.40 × 10 crore = **Rs 8 lakh**.

**Expected vs unexpected loss:** expected loss is a cost of doing business. It should be priced into the loan and covered by provisions. **Unexpected loss** is the volatility of losses around that expectation, and it's what **capital** is held against. Basel IRB formulas compute capital for unexpected loss at a 99.9% confidence level.

## 2. Probability of Default (PD)

### How PD is estimated
- **Retail portfolios** (cards, personal loans, mortgages): application scorecards and behavioural scorecards, usually built with **logistic regression** on bureau data, application data and repayment behaviour. Customers are pooled into homogeneous segments or score bands, and each pool gets a PD.
- **Wholesale / corporate portfolios:** **internal rating models** combine financial ratios (leverage, interest cover, profitability, liquidity) with qualitative factors (management quality, industry outlook, market position). Each rating grade maps to a PD through a **master scale**. External ratings and market-implied PDs are used as benchmarks.
- **Low-default portfolios** (banks, sovereigns, large corporates): few internal defaults, so institutions use external data, expert judgement and conservative statistical techniques.

### Through-the-cycle vs point-in-time
- **Point-in-time (PIT) PD** reflects current conditions. It rises in a downturn and falls in a boom. IFRS 9 ECL requires PIT, forward-looking PDs.
- **Through-the-cycle (TTC) PD** is a long-run average across an economic cycle. It moves mainly when the borrower's own risk changes, not with the economy. Basel regulatory capital typically uses TTC or hybrid PDs, which stops capital requirements swinging wildly with the cycle (reduces procyclicality).
- Most real models are hybrids somewhere between the two.

### Calibration and floors
- A model can *rank* borrowers well and still be poorly *calibrated*: predicted PDs don't match observed default rates. Both matter.
- Basel sets **PD floors** for IRB banks. [Verify: Basel II floor was 0.03%; the finalised Basel III reforms raise the corporate PD floor to 0.05%, with differing floors for some retail classes.]

## 3. Loss Given Default (LGD)

### Drivers of LGD
- **Collateral** type, value and liquidity: property vs receivables vs unsecured.
- **Seniority:** senior secured vs subordinated.
- **Recovery process:** legal environment, time to recover, workout costs. In India, recovery routes include SARFAESI enforcement, Debt Recovery Tribunals and the Insolvency and Bankruptcy Code (IBC).
- **Economic conditions:** collateral values fall in downturns, so LGD rises.

### Estimation approaches
- **Workout LGD:** the most common. Track every defaulted account to closure and discount all recoveries and costs back to the default date. LGD = 1 − (PV of recoveries − PV of costs) / EAD.
- **Market LGD:** from the prices of defaulted bonds or loans shortly after default.
- **Implied LGD:** derived from credit spreads.

### Downturn LGD and regulatory values
- Basel requires IRB banks to use **downturn LGD**, reflecting losses in an economic downturn.
- Under the **Foundation IRB** approach, banks estimate PD but use supervisory LGDs. [Verify: Basel II supervisory LGD for senior unsecured corporate exposures was 45%. The finalised Basel III reforms set it at 40% for non-financial corporates and 45% for financial institutions.]
- IFRS 9 uses **unbiased PIT LGD**, without downturn conservatism, with forward-looking adjustments.

### Typical ranges (illustrative only)
Well-secured home loans often show low LGDs (roughly 10–25%). Unsecured personal loans and credit cards are much higher (often 60–85%). Corporate senior secured loans fall in between, and outcomes vary widely. Always rely on the institution's own data.

## 4. Exposure at Default (EAD)

- For a fully drawn term loan, EAD ≈ outstanding balance plus accrued interest.
- For **revolving facilities** (credit cards, overdrafts, cash-credit lines), borrowers in distress tend to draw down their limits *before* they default. So:

**EAD = Drawn balance + CCF × Undrawn limit**

where the **CCF (credit conversion factor)** estimates how much of the undrawn amount will be drawn by default.

**Example:** a cash-credit limit of Rs 5 crore with Rs 3 crore drawn and a CCF of 50%. EAD = 3 + 0.5 × 2 = **Rs 4 crore**.

- Off-balance-sheet items such as guarantees and letters of credit also get CCFs. Under Basel standardised rules these are set by the regulator.
- For lifetime ECL, EAD is projected period by period using the amortisation schedule, expected prepayments and drawdown behaviour.

## 5. Model validation and monitoring

A model is only useful if it keeps working. Validation should be **independent** of model development.

| What we test | Common metrics | What it tells you |
|---|---|---|
| **Discrimination** (rank-ordering) | Gini coefficient, AUC/ROC, KS statistic | Does the model separate good borrowers from bad? Retail scorecards often target a Gini of roughly 0.4–0.6 or more. |
| **Calibration** (accuracy of levels) | Binomial test, Hosmer–Lemeshow, observed vs predicted default rates by grade | Do predicted PDs match actual default rates? |
| **Stability** | Population Stability Index (PSI), Characteristic Stability Index | Has the population changed since development? Rule of thumb: PSI < 0.1 stable, 0.1–0.25 monitor, > 0.25 significant shift. |
| **Backtesting** | Out-of-time testing, realised vs predicted LGD and EAD | Does performance hold on new data? |

**Model risk management:** keep a model inventory, independent validation, documented use and limitations, approved overrides, and periodic review. Supervisory guidance such as the US Federal Reserve's SR 11-7 is widely used as a benchmark.

**Overrides:** credit officers sometimes override model ratings. Track override rates and their performance. High override rates suggest either a weak model or weak discipline.

## 6. IFRS 9 vs Basel at a glance

| | Basel (capital) | IFRS 9 (provisions) |
|---|---|---|
| PD | TTC or hybrid, 12-month, with floors | PIT, 12-month and lifetime, forward-looking |
| LGD | Downturn, with floors | Unbiased, PIT, forward-looking |
| EAD | Regulatory CCFs or own estimates | Behavioural, projected over life |
| Purpose | Unexpected loss → capital | Expected loss → provisions |
| Conservatism | Required | Not allowed (unbiased) |

## 7. Coaching points and common mistakes

- Confusing ranking power with calibration. A high-Gini model can still be miscalibrated.
- Using Basel parameters directly in IFRS 9 without removing conservatism.
- Ignoring drawdown before default on revolving lines. This understates EAD.
- Ignoring time and cost in LGD. A recovery received four years after default is worth much less than its face value.
- Treating PSI drift as a statistics problem only. It often signals a change in sourcing strategy or customer mix that the business should know about.

## 8. Practice questions

1. A borrower has PD 3%, LGD 45%, EAD Rs 2 crore. What's the expected loss? *(Rs 2.7 lakh.)*
2. Why does EAD for a credit card usually exceed the current balance? *(Distressed borrowers draw on their unused limit before they default.)*
3. Your new PD model has a Gini of 0.65, but observed defaults in the top grade are double the predicted PD. What's the problem? *(Discrimination is good but calibration is off. Recalibrate.)*
