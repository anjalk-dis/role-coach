# ALM and Interest Rate Risk in the Banking Book

*Knowledge area: Asset-liability management and IRRBB. Audience: bank treasury managers in India. Draft for coaching use; items marked [Verify] need SME confirmation against current RBI circulars.*

## 1. What ALM is for

Asset-liability management (ALM) is the discipline of managing the balance sheet as a whole so that the bank earns a stable margin and remains liquid. A bank takes deposits at one maturity and repricing profile and lends at another. The mismatch generates profit and risk.

ALM is governed by the **Asset Liability Management Committee (ALCO)**, usually chaired by the CEO or MD and including the CFO, CRO, treasury head and business heads. ALCO approves limits, funding strategy, pricing direction and hedging, and reviews reports from treasury and the risk function.

Two risks sit at the centre: **liquidity risk** (covered separately) and **interest rate risk in the banking book (IRRBB)**: the risk that changes in rates reduce earnings or the economic value of the bank's non-trading balance sheet.

## 2. Sources of interest rate risk

- **Repricing risk:** assets and liabilities reprice at different times. Example: loans linked to the repo rate reprice immediately, while term deposits reprice only at maturity.
- **Basis risk:** two instruments reprice on different benchmarks. Example: loans linked to an external benchmark such as the repo rate, against deposits that follow the bank's own deposit card.
- **Yield curve risk:** short and long rates move differently, for example a steepening or flattening curve.
- **Optionality risk:** customers can prepay loans or withdraw term deposits early, changing cash flows when rates move.

India's shift to **external benchmark linked lending** for retail and MSME floating-rate loans means a large part of the loan book reprices quickly when RBI changes the policy rate, while deposits lag. This makes the net interest margin sensitive to rate cuts in particular. [Verify: current coverage of EBLR and reset requirements.]

## 3. Repricing gap analysis

The simplest tool is the **repricing gap statement**. Assets and liabilities are placed in time buckets by next repricing date (or maturity if fixed).

- **Gap = rate sensitive assets (RSA) minus rate sensitive liabilities (RSL)** in each bucket.
- Positive gap: more assets than liabilities reprice in that bucket. Net interest income (NII) rises when rates rise.
- Negative gap: NII falls when rates rise.

Approximate NII impact over a year from a parallel rate shift:

**Change in NII is about = Gap in the bucket x change in rate x fraction of the year remaining**

### Worked example

A bank has a cumulative one-year repricing gap of negative Rs 4,000 crore (liabilities exceed assets repricing within one year). Rates rise by 100 basis points (1 percentage point), applied from the start of the year.

Impact on NII is about -4,000 crore x 1% = -Rs 40 crore.

Using mid-bucket timing, if the average gap reprices halfway through the year, the first-year effect is closer to -Rs 20 crore, and the full effect appears in the next year. If the bank has annual NII of Rs 2,000 crore, a 1 percent hit to NII is Rs 20 crore in the first year. ALCO would compare this with its limit for NII sensitivity.

Strengths: simple, intuitive. Weaknesses: ignores timing within buckets, basis risk, optionality and the effect on the market value of long-term positions.

## 4. Duration and economic value

**Modified duration** measures how much the price of a bond (or the value of any stream of cash flows) changes for a 1 percent change in yield.

**Approximate % change in value is about = - modified duration x change in yield**

- A bond with modified duration 6 loses about 6 percent of value if yields rise 1 percent.
- Longer maturity, lower coupon means higher duration, and higher sensitivity.

**Economic Value of Equity (EVE)** applies this to the whole banking book: EVE is the present value of expected cash flows from assets, minus the present value of cash flows from liabilities, plus off-balance sheet items. **Duration gap analysis** estimates how EVE changes with rates.

- Positive **duration gap** (asset duration is longer than liability duration, adjusted for leverage): a rate rise reduces EVE.
- Banks with long-term fixed-rate assets funded by short-term deposits are typically exposed to rising rates in EVE terms.

## 5. EVE versus NII: two lenses, not rivals

| | **NII sensitivity (earnings)** | **EVE sensitivity (economic value)** |
|---|---|---|
| Horizon | Short, usually 1 to 3 years | Whole life of balance sheet |
| Question | How will profit change? | How will the value of equity change? |
| Balance sheet | Often assumes constant or planned | Run-off view of existing positions |
| Best at spotting | Near-term margin squeeze | Long-term structural mismatch |

A bank may look safe on NII (because deposits lag) yet show a large EVE loss (because the long fixed-rate book carries heavy duration). Regulators ask for both. RBI's IRRBB guidance prescribes standardised rate shock scenarios and expects banks to report impact on EVE and NII. [Verify: current RBI IRRBB framework, the prescribed rate shock scenarios, and any supervisory outlier threshold such as a percentage of Tier 1 capital for EVE.]

## 6. Behavioural assumptions

Contractual maturity is not behaviour. Key assumptions to be approved by ALCO and documented:

- **Non-maturity deposits (savings and current accounts):** split into a stable core (treated as long-dated, low rate sensitivity) and a volatile portion (treated as overnight).
- **Prepayments:** home loan prepayment rates change when rates fall and borrowers refinance.
- **Early withdrawal of term deposits:** penalty and customer behaviour affect the effective maturity.

Always run sensitivity on these assumptions. A model that is accurate on contractual flows and sloppy on behaviour will be wrong when it matters.

## 7. Funds transfer pricing (FTP)

FTP is how treasury charges business units for the funds they use and credits them for the funds they raise, so that each is measured on a **margin that reflects its own contribution** and not on the bank's overall rate position.

- A branch raising a 5-year term deposit is credited an FTP rate that reflects what that funding is worth to the bank at that tenor.
- A business lending a 20-year home loan is charged an FTP rate for that tenor, plus a liquidity premium if the funding is short.
- The central treasury holds the **residual interest rate risk** and manages it through ALM.

Good FTP aligns incentives: if long-tenor loans are charged properly, the business will price them for the true cost, and treasury is not left holding unrewarded risk. Poor FTP leads businesses to chase volume in mismatched products.

FTP curve components: base yield curve (often the government yield curve or swap curve) for the matching tenor, **plus** liquidity premium and any option cost. [Verify: bank-specific methodology; there is no single RBI-prescribed FTP method.]

## 8. Managing the position

Levers available to ALCO:

- **Pricing:** change deposit and loan rates, shift product mix toward floating or fixed.
- **Tenor:** lengthen or shorten the investment portfolio and funding.
- **Hedging:** interest rate swaps (such as OIS-linked swaps) or forward rate agreements within approved limits and regulation. [Verify: RBI rules on permissible derivatives and hedge accounting in banks.]
- **Securitisation or asset sales** to change the structure.

## 9. Common mistakes and coaching points

- Reporting only gap, with no duration or EVE view.
- Treating all savings deposits as overnight, or all as long term, without evidence.
- Ignoring basis risk when loans follow the repo and deposits do not.
- Looking at a parallel shock only. Test steepening, flattening and short-rate shocks.
- Not linking FTP to ALM, so the business is rewarded for risk it does not bear.
- Presenting numbers with no recommendation. ALCO wants action options with cost.

## 10. Practice questions

1. A bank is liability sensitive with a negative one-year gap of Rs 3,000 crore. If rates fall 50 basis points, what is the likely direction of NII impact?
*(NII rises. More liabilities than assets reprice, so funding costs fall more than asset yields. The rough annualised effect is 3,000 crore x 0.5% = Rs 15 crore, before timing adjustments.)*

2. Why might a bank show a small NII impact but a large EVE loss from a rate rise?
*(NII looks at the next one to three years, and deposits may lag. EVE captures the full life of long-dated fixed-rate assets, whose present value falls significantly when yields rise.)*

3. What problem does FTP solve for business units?
*(It separates the margin earned by the business from the bank's interest rate and liquidity positioning, so each unit is measured on its own contribution and priced products reflect real funding costs.)*
