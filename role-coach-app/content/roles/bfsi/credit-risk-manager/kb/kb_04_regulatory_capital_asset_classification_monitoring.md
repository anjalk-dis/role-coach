# Regulatory Capital, Asset Classification and Portfolio Monitoring

*Knowledge area: Regulatory capital and portfolio monitoring. Audience: credit risk managers. Draft for coaching use; items marked [Verify] need SME confirmation against the latest Basel standards and RBI master directions/circulars.*

## Part A: Regulatory capital (Basel)

### 1. Why capital matters for credit risk
Provisions cover **expected** losses. Capital absorbs **unexpected** losses, so the bank stays solvent in a bad year. Every loan consumes capital in proportion to its **risk-weighted assets (RWA)**. This is why credit risk managers care about risk weights: they drive the return on capital of each lending decision.

**Capital adequacy ratio (CRAR / CAR) = Eligible capital ÷ Total RWA** (credit + market + operational risk RWA).

### 2. Basel minimums
| | Basel III minimum | RBI requirement for Indian banks [Verify] |
|---|---|---|
| Common Equity Tier 1 (CET1) | 4.5% | 5.5% |
| Tier 1 | 6% | 7% |
| Total capital | 8% | 9% |
| Capital Conservation Buffer (CCB) | 2.5% | 2.5% |
| **Total incl. CCB** | **10.5%** | **11.5%** |

Other buffers may apply on top: a countercyclical buffer, and surcharges for domestic or global systemically important banks (D-SIBs / G-SIBs).

### 3. Approaches to credit-risk RWA
- **Standardised approach:** the regulator assigns risk weights by exposure type and external rating. Illustratively, corporate risk weights range from about 20% for the highest-rated borrowers to 150% for the lowest, with unrated corporates often at 100%. Regulatory retail portfolios and residential mortgages get lower weights, typically varying by loan-to-value. [Verify current risk-weight tables. RBI also adjusts risk weights to manage specific risks; for example, in November 2023 it raised risk weights on certain unsecured consumer credit and on bank lending to NBFCs by 25 percentage points.]
- **Foundation IRB:** the bank estimates PD; supervisory values are used for LGD and EAD.
- **Advanced IRB:** the bank estimates PD, LGD and EAD, subject to regulatory approval and floors.
- Indian banks currently use the standardised approach for credit risk.

**Basel III final reforms ("Basel 3.1")** make standardised approaches more risk-sensitive, restrict IRB use for some portfolios, add parameter floors, and introduce an **output floor**: IRB RWA can't fall below 72.5% of standardised RWA once fully phased in.

### 4. Credit risk mitigation
Eligible collateral (cash, government securities), guarantees from better-rated entities, and netting can reduce RWA. Recognition follows strict eligibility rules, with **haircuts** for volatility and currency mismatch.

## Part B: Asset classification in India (IRACP norms)

### 5. Special Mention Accounts (SMA): early stress
RBI requires lenders to flag stress before an account becomes NPA:

| Category | Loans other than revolving facilities: principal or interest overdue for |
|---|---|
| SMA-0 | Up to 30 days |
| SMA-1 | More than 30 days, up to 60 days |
| SMA-2 | More than 60 days, up to 90 days |

For revolving facilities such as cash credit or overdraft, SMA-1 and SMA-2 are based on the outstanding balance staying continuously above the sanctioned limit or drawing power for 31–60 and 61–90 days. [Verify against current norms.]

Large borrowers are reported to RBI's **Central Repository of Information on Large Credits (CRILC)**. [Verify: the reporting threshold is aggregate exposure of Rs 5 crore and above.]

### 6. Non-Performing Assets (NPA)
A term loan becomes an **NPA** when interest or principal stays **overdue for more than 90 days**. Cash-credit and overdraft accounts become NPA when they stay "out of order" for 90 days. Agricultural loans follow crop-season rules.

**Key points:**
- Classification is **borrower-wise**, not facility-wise. If one facility of a borrower is NPA, all their facilities with that bank are NPA.
- Overdue status is determined **on a day-end basis**. Since RBI's November 2021 clarification, an NPA account can be upgraded to standard only when **all** arrears of interest and principal are paid, not partially. [Verify.]
- Income on NPAs isn't recognised on an accrual basis.

### 7. NPA sub-categories and provisioning (illustrative) [Verify all percentages]
| Category | Definition | Indicative provision |
|---|---|---|
| Standard | Performing | General provision, often 0.40%; lower for agriculture and SME, higher for some sectors such as commercial real estate |
| Sub-standard | NPA for 12 months or less | 15% (higher if unsecured) |
| Doubtful | Sub-standard for 12 months | 100% of the unsecured portion, plus on the secured portion: 25% (up to 1 year as doubtful), 40% (1–3 years), 100% (over 3 years) |
| Loss | Identified as uncollectible | 100% |

Many banks provide **above** these minimums. The **provision coverage ratio (PCR)**, provisions ÷ gross NPA, is a key metric investors and boards watch.

### 8. Stressed asset resolution
RBI's **Prudential Framework for Resolution of Stressed Assets** (June 2019) requires lenders to review a borrower's account within 30 days of default (the "review period"). For large exposures, lenders sign an inter-creditor agreement (ICA) and implement a resolution plan within set timelines; delays trigger **additional provisions**. [Verify: currently an additional 20% if not implemented within 180 days from the end of the review period, and a further 15% after 365 days.] Unresolved cases may go to insolvency under the IBC.

**Restructuring** a borrower in financial difficulty generally leads to downgrade and closer monitoring. Upgrade requires satisfactory performance over a specified period.

## Part C: Portfolio monitoring and early warning

### 9. Core portfolio metrics
- **Gross and net NPA ratio**: lagging indicators.
- **SMA buckets and delinquency (DPD) buckets**: 1–30, 31–60, 61–90, 90+.
- **Roll rates / flow rates**: the share of accounts moving from one bucket to the next each month. For example, if 25% of the 31–60 bucket rolls into 61–90, that's a strong forward indicator of future NPAs.
- **Vintage analysis**: track delinquency by origination month or quarter at the same months-on-book. If recent vintages are deteriorating faster than older ones at the same age, underwriting or sourcing has weakened, even if overall NPAs still look fine.
- **Credit cost**: provisions as a percentage of average loans.
- **Concentration**: top borrowers, sectors, geographies.
- **Rating migration matrices**: how many borrowers were upgraded or downgraded over the period.

### 10. Early warning signals (EWS)
Good EWS frameworks combine data from multiple sources:
- **Account conduct:** cheque or ECS/NACH bounces, limits continuously maxed out, delayed interest servicing, falling credit turnover in the account.
- **Financial:** declining sales or margins, rising receivable or inventory days, covenant breaches, delays in submitting financials.
- **Bureau:** new borrowing elsewhere, delinquency with other lenders, multiple recent enquiries.
- **External:** rating downgrades, negative news, litigation, promoter share pledges, GST filing gaps, sector stress.
- **Behavioural (retail):** rising credit-card utilisation, minimum-payment-only behaviour, salary credits stopping.

Signals feed a **watchlist**. Watchlisted accounts get closer review, action plans and, under IFRS 9, often a Stage 2 transfer.

### 11. Stress testing
- **Sensitivity analysis:** shock one factor (PD up 50%, collateral values down 20%) and measure the impact on provisions and capital.
- **Scenario analysis:** a coherent macro story (for example, GDP growth falls, rates rise and unemployment rises) translated into PDs, LGDs and migrations through satellite models.
- **Reverse stress testing:** ask "what scenario would breach our minimum capital?" and work backwards.
- Results feed the bank's **ICAAP (Internal Capital Adequacy Assessment Process)**, capital planning, risk appetite calibration and limit setting.

### 12. Reporting to the board risk committee
A strong portfolio review is short and decision-oriented:
1. **Headline:** is risk within appetite? Show red, amber and green on the RAS metrics.
2. **What changed and why:** the top movements in NPAs, SMAs, concentrations and ECL.
3. **Forward look:** vintage and roll-rate trends, watchlist, emerging sector risks, stress test results.
4. **Asks:** decisions needed from the committee, such as limit changes, policy changes or overlays.

Lead with the "so what", not the data dump.

## Practice questions
1. A borrower's term loan is 75 days overdue. What's its classification, and what should you be doing? *(SMA-2. Intensify follow-up, engage the borrower, consider resolution options; under IFRS 9 it's very likely already Stage 2.)*
2. Overall NPAs are flat, but the last two quarterly vintages show twice the 6-month delinquency of earlier vintages. What does that tell you? *(New underwriting or sourcing quality has deteriorated. NPAs will rise later. Act now on credit policy or sourcing channels.)*
3. Why might a lender with a very high CRAR still be worried about its credit risk? *(Capital is a buffer, not a measure of portfolio quality. Concentration, deteriorating vintages or under-provisioning can quickly erode it.)*
