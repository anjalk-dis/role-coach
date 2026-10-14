# Portfolio Analytics: Vintages, Roll Rates, Migration and Concentration

*Knowledge area: Portfolio analytics. Audience: portfolio risk analysts. Draft for coaching use; items marked [Verify] need SME confirmation against current RBI circulars and internal policy.*

## 1. What the analyst is really doing

A portfolio risk analyst turns loan-level data into answers to four questions: Is the book getting better or worse? Where exactly is it deteriorating? How fast? And what will it look like in the next two to four quarters? The headline numbers (gross NPA, net NPA, credit cost) are lagging. Vintage curves, roll rates and migration matrices are the leading tools, because they show movement before it reaches the NPA line.

The craft has three layers: clean data, the right cut of the data, and an insight a decision-maker can act on. Most weak analysis fails at the first layer.

## 2. Getting the data right

Before any analysis, confirm the following with the data owner or by your own checks.

- **Grain:** one row per loan per month-end (a snapshot table), plus a static origination table (loan id, disbursal date, product, channel, branch, borrower segment, sanctioned amount, tenor, rate).
- **Days past due (DPD) definition:** how DPD is counted, when the clock starts, and how partial payments are treated. A one-day difference in definition shifts every bucket.
- **Reconciliation:** total outstanding in your dataset should tie to the general ledger or the regulatory return within a tolerance. If your book says Rs 4,820 crore and finance says Rs 4,795 crore, find the Rs 25 crore before presenting.
- **Treatment of write-offs, restructured and top-up loans:** decide explicitly and document it. A written-off loan that disappears from the snapshot will make delinquency look better than it is.

In SQL terms, most of this work is a self-join of the monthly snapshot table to itself on loan id, with month t joined to month t+1. Roll rates, migration matrices and cure rates are all built from that one join. In Excel, a pivot of opening bucket against closing bucket gives the same result for smaller books.

## 3. Vintage analysis

A **vintage curve** groups loans by origination period (for example the month or quarter of disbursal) and tracks a delinquency measure against **months on books (MOB)**, not against calendar date. Typical measure: the share of the original (or outstanding) amount that is 30+ DPD or 90+ DPD at each MOB.

Why use MOB: loans of different ages behave differently. New loans have not had time to default; seasoned loans have. Comparing a 2-year-old book to a 6-month-old book on the same calendar date is misleading. Aligning cohorts on MOB lets you compare like with like.

How to read a vintage chart:

- Each cohort is one line. If a recent cohort sits above older cohorts at the same MOB, underwriting or the customer mix has weakened.
- Most unsecured retail products show delinquency rising for the first 9 to 18 months and then flattening. A cohort that rises faster or higher is a warning.
- Look for **parallel shifts** across all cohorts at the same calendar month. That points to a macro or collections shock, not an underwriting problem.
- Slice by product, channel, branch, ticket size, bureau score band and geography. Weak cohorts are usually weak in one slice, such as a single DSA or one region.

**Worked example.** The January 2025 personal loan cohort disbursed Rs 200 crore. At MOB 9, Rs 9 crore is 30+ DPD, so 4.5%. The January 2024 cohort was 3.0% at MOB 9. The recent cohort is 1.5 percentage points worse at the same age. Slicing shows that one digital channel contributed Rs 80 crore of disbursals and Rs 6 crore of the 30+ DPD (7.5%), while all other channels together have Rs 3 crore on Rs 120 crore, or 2.5%. The insight is not "the cohort is bad" but "one channel is bad". The action is to tighten cut-offs or pause that channel.

## 4. Roll rates and flow rates

A **roll rate** is the percentage of balances in one delinquency bucket that move to a worse bucket next month. A **flow rate** often refers to the movement from the performing book into the first delinquent bucket, or from a bucket into NPA; teams use the terms loosely, so define yours.

Typical buckets: Current, 1-30, 31-60, 61-90, 90+ (NPA). These line up with the SMA-0, SMA-1, SMA-2 and NPA stages used in India (see the next knowledge document).

**Worked example (amounts in Rs crore).**

| Opening bucket (month t) | Opening balance | Rolled to next worse bucket by t+1 | Roll rate |
|---|---|---|---|
| Current to 1-30 | 4,000 | 120 | 3.0% |
| 1-30 to 31-60 | 200 | 60 | 30% |
| 31-60 to 61-90 | 80 | 40 | 50% |
| 61-90 to 90+ | 50 | 35 | 70% |

Chained together, a rupee in the 31-60 bucket has roughly 0.50 x 0.70 = 35% chance of reaching NPA, ignoring cures and part payments. A rupee in the 1-30 bucket has about 0.30 x 0.35 = 10.5%. Current loans are about 0.03 x 0.105, roughly 0.3%, over a three-to-four month horizon.

Uses:

- **Forecasting:** apply last six months' roll rates to today's bucket balances to project next quarter's NPA slippage. Rs 50 crore in the 61-90 bucket at a 70% roll implies about Rs 35 crore of new NPAs next month, before recoveries.
- **Collections effectiveness:** a rising roll rate from 1-30 to 31-60 with stable early-bucket volumes points to weaker collections, not weaker customers.
- **Cure rates:** track the reverse flow too. Falling cure rates are an early sign of stress.

Show roll rates by amount and count, and by product; blending secured and unsecured books hides everything.

## 5. Migration matrices

A **migration (transition) matrix** has opening grade or bucket on the rows and closing grade or bucket on the columns, with each row summing to 100%. The diagonal is stability; above or below the diagonal shows upgrades and downgrades.

Illustration for an internal rating scale over one year: if 82% of A-rated borrowers stay A, 14% fall to B and 4% fall further, but last year the same row was 90% / 8% / 2%, rating quality is eroding even though NPAs have not moved yet. Migration matrices also feed probability of default estimates and stage transfer analysis, but for the analyst the key skill is to compare this period's matrix to a stable reference and highlight the cells that changed most.

## 6. Concentration and HHI

Concentration risk arises when losses on a few names or sectors can hurt the whole book. Simple measures come first: top 10 borrowers as a percentage of the book, top 5 sectors, largest state, largest group exposure.

The **Herfindahl-Hirschman Index (HHI)** is the sum of squared shares. With shares as percentages, HHI ranges from near 0 to 10,000.

**Worked example.** A Rs 1,000 crore MSME book split 40% manufacturing, 30% trading, 20% services, 10% agri-allied. HHI = 40^2 + 30^2 + 20^2 + 10^2 = 1,600 + 900 + 400 + 100 = **3,000**. Equal 25% shares across four sectors would give 2,500, the minimum for four buckets. A move to 50/30/10/10 gives 2,500 + 900 + 100 + 100 = 3,600, showing concentration rising toward manufacturing even though no limit has been breached.

HHI is only as good as the grouping. Group borrowers under common ownership, and use consistent sector codes. Interpretation thresholds are a matter of internal policy; do not quote a regulator's HHI limit unless one is confirmed [Verify]. RBI's large exposure framework limits single and group borrower exposures relative to Tier 1 capital [Verify current limits].

## 7. Common mistakes and coaching points

- Comparing cohorts on calendar date instead of months on books.
- Using closing balance as the denominator for a roll rate; use the opening balance of the bucket.
- Not reconciling to the general ledger before presenting.
- Blending products and then explaining the blended trend. Slice first.
- Calling a rising delinquency percentage a deterioration when the denominator shrank (a book that stopped growing makes ratios look worse; a fast-growing book makes them look better, the "denominator effect").
- Presenting charts without a so-what.

## 8. Practice questions

1. Two cohorts have the same 90+ DPD percentage today, but one was disbursed 8 months ago and the other 30 months ago. Which is worse? *(The 8-month-old cohort, because it reached that level at a much younger age; compare at the same MOB.)*
2. Rs 80 crore sits in the 31-60 bucket and the historical roll rate to 61-90 is 50%. What is the expected 61-90 inflow next month? *(About Rs 40 crore from this bucket, before cures and part payments.)*
3. A portfolio's HHI rises from 2,800 to 3,400 with no new limit breach. What does it tell you? *(Exposure is concentrating in fewer sectors or names; worth flagging before it becomes a breach and checking which sector is growing.)*
