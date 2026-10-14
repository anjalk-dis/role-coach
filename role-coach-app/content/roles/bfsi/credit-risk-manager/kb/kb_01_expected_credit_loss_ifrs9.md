# Expected Credit Loss under IFRS 9 / Ind AS 109

*Knowledge area: Expected Credit Loss. Audience: credit risk managers. Draft for coaching use; items marked [Verify] need SME confirmation against current standards and circulars.*

## 1. Why ECL exists

IFRS 9 *Financial Instruments* replaced IAS 39 for accounting periods beginning on or after 1 January 2018. Under IAS 39, banks used an **incurred loss** model: a provision was recognised only after a loss event had occurred, such as a missed payment or bankruptcy. The 2008 financial crisis showed this was "too little, too late". Losses were recognised only once they had already happened.

IFRS 9 introduced an **expected credit loss (ECL)** model. Lenders must provide for losses they *expect*, using reasonable and supportable forward-looking information, from the day a loan is originated.

**Ind AS 109** is India's converged equivalent of IFRS 9. It applies to Indian NBFCs and other entities in phases under the Ind AS roadmap from financial year 2018-19. Indian scheduled commercial banks have so far continued under RBI's Income Recognition, Asset Classification and Provisioning (IRACP) norms. RBI has proposed moving banks to an ECL-based framework. [Verify: the current status and effective date of RBI's ECL directions for banks. Draft directions proposed an effective date of 1 April 2027.]

## 2. The three-stage model

Every exposure in scope (loans, debt securities at amortised cost or FVOCI, loan commitments, financial guarantees) is allocated to one of three stages.

| Stage | Description | Loss allowance | Interest revenue |
|---|---|---|---|
| **Stage 1** | Performing. No significant increase in credit risk since initial recognition. | **12-month ECL**: losses from default events possible in the next 12 months | On gross carrying amount |
| **Stage 2** | Significant increase in credit risk (SICR) since initial recognition, but not credit-impaired | **Lifetime ECL** | On gross carrying amount |
| **Stage 3** | Credit-impaired (in default) | **Lifetime ECL** | On net carrying amount (gross minus allowance) |

The step from Stage 1 to Stage 2 is the **"cliff effect"**. Moving from 12-month to lifetime ECL can multiply the provision several times, especially for long-tenor loans such as mortgages.

## 3. Significant increase in credit risk (SICR)

SICR is the most judgement-heavy part of IFRS 9. It compares the risk of default **now** with the risk of default **at origination**. The test is relative, not absolute: a loan originated as high-risk that stays high-risk may remain in Stage 1.

Common SICR triggers used in practice:

- **Quantitative:** lifetime PD has increased by more than a set threshold since origination. Examples: a relative increase such as PD doubling, or a downgrade of a set number of internal rating notches. Thresholds are set by each institution.
- **Qualitative:** the borrower is placed on the watchlist, a loan is restructured or forborne, adverse industry news, a breached covenant, a significant drop in collateral value.
- **Backstop:** IFRS 9 contains a **rebuttable presumption** that credit risk has increased significantly when contractual payments are **more than 30 days past due**. An institution can rebut it only with reasonable and supportable evidence.

**Low credit risk simplification:** an exposure with low credit risk at the reporting date, for example investment-grade, can be assumed to have had no SICR.

## 4. Default and credit-impaired (Stage 3)

IFRS 9 does not define default precisely. It requires a definition consistent with internal credit risk management. It contains a **rebuttable presumption that default occurs no later than 90 days past due**. Typical Stage 3 indicators: 90+ days past due, bankruptcy, a distressed restructuring, the borrower's significant financial difficulty, or an asset purchased or originated at a deep discount that reflects incurred losses.

**POCI assets** (purchased or originated credit-impaired) are a special case. They are credit-impaired at initial recognition, so they always carry lifetime ECL, and interest is recognised using a credit-adjusted effective interest rate.

## 5. Measuring ECL

At its core:

**ECL = PD × LGD × EAD**, summed over the relevant horizon and discounted to the reporting date at the effective interest rate (EIR).

- **12-month ECL** uses the probability of default occurring in the next 12 months.
- **Lifetime ECL** sums marginal PDs for each future period over the remaining life of the exposure. Each is multiplied by that period's LGD and EAD, then discounted.

ECL must be:

1. **Unbiased and probability-weighted:** evaluate a range of outcomes, not just the most likely one. Most banks run three to five macroeconomic scenarios (for example base, upside, downside, severe downside) and weight them. Because losses are non-linear, the weighted ECL is usually higher than the base-case ECL.
2. **Time value of money:** losses are discounted.
3. **Forward-looking:** reflect reasonable and supportable information about current conditions and forecasts, such as GDP, unemployment, interest rates and house prices. Macro variables are linked to PD and LGD through satellite or "macro-overlay" models.

**IFRS 9 parameters vs Basel parameters:** IFRS 9 requires **point-in-time (PIT)**, unbiased estimates. Basel regulatory capital uses **through-the-cycle (TTC)** PDs, **downturn LGD** and regulatory floors. Banks usually start from Basel models and adjust them for IFRS 9. Remove conservatism and floors, convert TTC to PIT, and extend from a 12-month to a lifetime horizon.

## 6. Simplified approach

For trade receivables and contract assets without a significant financing component (and optionally lease receivables), entities can use the **simplified approach**: always recognise lifetime ECL, often with a **provision matrix** based on ageing buckets. No SICR tracking is needed.

## 7. Moving back between stages (cures)

Staging is symmetric. If credit risk improves, an exposure can move back from Stage 2 to Stage 1, or from Stage 3 to Stage 2. Many institutions and supervisors apply **probation or cure periods** before transferring back, for example a number of consecutive months of performance, to avoid exposures flip-flopping between stages. Restructured exposures often carry longer probation. [Verify: probation periods depend on institution policy and the local regulator.]

## 8. Management overlays

Models can't capture everything, for example a pandemic, a sudden sector shock or a new product without history. Institutions apply **post-model adjustments (PMAs) or management overlays**. Good practice: every overlay is documented, quantified, approved by an appropriate committee, linked to a specific risk, and has a plan to be released or absorbed into models. Auditors and regulators scrutinise overlays closely.

## 9. Worked example

A Rs 50 lakh home loan, 15 years remaining, originated at an internal rating with a 12-month PD of 0.8%.

- **Stage 1:** 12-month PD 0.8%, LGD 20% (well-secured), EAD Rs 50 lakh. 12-month ECL ≈ 0.008 × 0.20 × 50,00,000 = **Rs 8,000** (before discounting).
- The borrower loses their job and is now 40 days past due. The 30-days-past-due backstop is triggered, so the loan moves to **Stage 2**.
- Lifetime PD (cumulative over the remaining life, under weighted scenarios) is now, say, 12%. Lifetime ECL ≈ 0.12 × 0.20 × 50,00,000 ≈ **Rs 1.2 lakh** (a simplification: in practice it's computed period by period and discounted).
- The provision rises about fifteen-fold from the staging transfer alone: the cliff effect.
- If the borrower reaches 90+ days past due, the loan moves to **Stage 3**. Lifetime ECL now uses a PD of 100%, so ECL ≈ LGD × EAD ≈ Rs 10 lakh, and interest is recognised on the net amount.

## 10. Common mistakes and coaching points

- Treating SICR as an absolute threshold ("all BB loans are Stage 2") instead of a relative comparison with origination.
- Relying only on days past due. That's a lagging indicator; IFRS 9 expects forward-looking, borrower-specific signals to trigger Stage 2 *before* arrears.
- Using a single macro scenario. This understates ECL because losses are non-linear.
- Overlays with no documented rationale or exit plan.
- Forgetting off-balance-sheet exposures (undrawn limits, guarantees) in EAD.
- Confusing the IFRS 9 default definition with the regulatory NPA definition. Many institutions align them deliberately to avoid confusion.

## 11. Quick practice questions (for coaching)

1. A corporate loan was originated at 1% 12-month PD. Its PD is now 2.5%, but it's current on payments. Is that SICR? *(Depends on the institution's threshold. A 2.5x relative increase would trigger SICR under many policies, so Stage 2 is likely even without arrears.)*
2. Why might a bank's ECL rise sharply even if no loans have defaulted? *(Worse macro forecasts raise forward-looking PDs, and SICR transfers to Stage 2 bring in lifetime ECL.)*
3. A Stage 3 loan is restructured and the borrower pays for two months. Can it move straight back to Stage 1? *(Usually not. Probation or cure periods apply, and it typically passes through Stage 2.)*
