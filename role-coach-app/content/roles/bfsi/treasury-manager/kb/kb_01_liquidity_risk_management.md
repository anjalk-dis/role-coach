# Liquidity Risk Management: LCR, NSFR, CRR/SLR and Contingency Funding

*Knowledge area: Liquidity risk management. Audience: bank treasury managers in India. Draft for coaching use; items marked [Verify] need SME confirmation against current RBI circulars.*

## 1. Why liquidity risk matters

A bank is solvent when its assets exceed its liabilities. It is liquid when it can pay what is due, today and every day. A bank can be solvent and still fail if depositors or lenders withdraw faster than assets can be turned into cash. Banks transform maturities: they borrow short (deposits) and lend long (home loans, project loans). That transformation earns a margin and creates liquidity risk.

Treasury owns this risk day to day. Three questions guide the job:

- **Today:** can we meet every payment, including CRR maintenance and settlement obligations?
- **Next 30 days:** do we hold enough high quality liquid assets to survive a severe stress?
- **Over a year and beyond:** is long-term lending funded by stable sources?

## 2. Reserve requirements: CRR and SLR

**Cash Reserve Ratio (CRR)** is the share of net demand and time liabilities (NDTL) that a bank must keep as balances with RBI. It earns no interest. It is maintained on an average basis over a reporting fortnight, with a minimum daily balance requirement. [Verify: the current CRR percentage, the daily minimum and any incremental CRR measures.]

**Statutory Liquidity Ratio (SLR)** is the share of NDTL that must be held in unencumbered, approved liquid assets: mainly government securities, treasury bills and cash. [Verify: current SLR percentage and whether securities held under HTM and any LCR-related carve-outs are counted as per the latest circulars.]

Practical points for the treasurer:

- CRR is a cost. Holding too much idle balance loses interest; holding too little attracts penal interest. Treasury manages the average through the fortnight.
- SLR securities can be pledged for borrowing under the RBI's repo window, but pledged securities are not available for other uses. Track free versus encumbered holdings daily.
- Both ratios are calculated on NDTL, so a large deposit inflow raises the requirement automatically.

## 3. Liquidity Coverage Ratio (LCR)

LCR measures short-term resilience over a 30-day stress.

**LCR = stock of high quality liquid assets (HQLA) / total net cash outflows over the next 30 calendar days**

- **HQLA** is split into Level 1 (cash, balances with RBI above the CRR, government securities within SLR and, under RBI's facility, a share of mandatory SLR securities) and Level 2 assets (such as certain highly rated corporate bonds), which carry haircuts and caps. [Verify: current Facility to Avail Liquidity for LCR (FALLCR) percentage, Level 2 haircuts and caps.]
- **Net outflows** are outflows minus inflows. Outflows apply run-off rates to deposits and other liabilities (retail deposits run off less than wholesale or corporate deposits). Inflows are capped at a share of outflows. [Verify: current run-off factors, inflow cap.]
- The regulatory minimum is 100 percent, with RBI having phased this in earlier. [Verify: current minimum and any recent changes to run-off rates for digital or high-value deposits.]

### Worked example

A bank has the following on a given date (rupees in crore):

- Level 1 HQLA: 18,000
- Level 2 HQLA after haircuts: 2,000
- Total HQLA: 20,000
- Stressed outflows over 30 days: 26,000
- Eligible inflows after cap: 6,000
- Net outflows: 26,000 - 6,000 = 20,000

LCR = 20,000 / 20,000 = 100 percent.

Now suppose a Rs 2,000 crore corporate deposit that matured in 45 days (outside the window) is pulled forward and now matures in 25 days, with the corporate saying it will not renew. It enters the 30-day outflows at a high run-off. Net outflows rise to about Rs 22,000 crore and LCR falls to 20,000 / 22,000, about 91 percent. The treasurer's levers: buy more Level 1 G-secs, raise longer-dated funding, or negotiate the deposit extension.

This is why treasury looks at **maturity cliffs** and **concentration of large depositors**, not just the headline LCR.

## 4. Net Stable Funding Ratio (NSFR)

NSFR looks at the one-year horizon and prevents over-reliance on short-term wholesale funding to fund long-term assets.

**NSFR = available stable funding (ASF) / required stable funding (RSF)**

- ASF assigns weights to liabilities by stability: capital and long-term borrowings count fully, stable retail deposits get a high factor, wholesale funding under a year gets a low factor.
- RSF assigns weights to assets by how hard they are to liquidate: cash and Level 1 assets need little stable funding, long-term loans and illiquid assets need a lot.
- Minimum is 100 percent. [Verify: RBI's applicable NSFR guidelines and the specific ASF and RSF factors.]

Intuition: a 15-year home loan book funded with 3-month certificates of deposit will look weak on NSFR, even if LCR is healthy.

## 5. Structural liquidity statement (SLS)

The SLS places all cash inflows and outflows into time buckets by residual maturity, for example 1 day, 2 to 7 days, 8 to 14 days, 15 to 28 days, 29 days to 3 months, and so on up to over 5 years. [Verify: current RBI bucket structure and reporting periodicity.]

- **Gap** in each bucket = inflows minus outflows.
- RBI prescribes limits on the negative cumulative gap in the shortest buckets, typically stated as a percentage of outflows. [Verify: the prescribed limit, commonly cited as 5 percent in the 1-day bucket and 10 percent and 15 percent for early buckets, and 20 percent for the 29-day to 3-month area.]
- Behavioural assumptions matter. Savings and current account balances are partly stable core and partly volatile. The bank's treatment should be approved by ALCO and consistent with RBI guidance.

## 6. Contingency funding plan (CFP)

A CFP sets out what the bank does when liquidity tightens. It should include:

- **Early warning indicators:** falling LCR trend, rising cost of CDs, widening of the bank's CD spread over peers, large deposit withdrawals, rating action, adverse news, a drop in call market access.
- **Stress scenarios:** idiosyncratic (bank-specific rumour), market-wide (taper or credit event) and combined.
- **Sources of funds, ranked by speed and cost:** surplus CRR above minimum is not usable, but RBI's repo window and marginal standing facility (MSF) against SLR securities, sale or repo of G-secs, interbank borrowing, refinance from institutions, and then asset sales.
- **Roles and escalation:** who convenes the crisis team, who speaks to RBI, who communicates with depositors. Test the plan, do not just write it.

## 7. Common mistakes and coaching points

- Looking only at the headline LCR and missing the **maturity cliffs** inside the 30 days.
- Treating MSF or repo borrowing as business as usual funding. It is a backstop and signals stress if used repeatedly.
- Counting securities as liquid when they are already pledged or illiquid corporate paper.
- Ignoring **intraday liquidity** around payment and settlement windows.
- Assuming all retail deposits are stable. Large, rate-sensitive, digitally managed deposits can run faster than expected.
- Writing a CFP that has never been tested with a live drill.

Coaching prompt: when a learner shows a liquidity number, ask "what changes it by 10 points in three days?"

## 8. Practice questions

1. What is the difference between LCR and NSFR?
*(LCR is a 30-day stress measure of HQLA against net outflows. NSFR is a one-year structural measure of stable funding against the funding needs of assets.)*

2. A bank has HQLA of Rs 30,000 crore and net 30-day outflows of Rs 32,000 crore. What is the LCR and what can treasury do?
*(LCR is about 94 percent, below 100. Treasury can buy more Level 1 assets, extend deposit maturities, reduce short-term wholesale funding or negotiate renewals of large maturities.)*

3. Why is average CRR maintenance a treasury decision, not just a compliance task?
*(CRR earns no interest, so holding excess is a cost, while shortfalls attract penal interest. Treasury manages the daily and fortnightly average using inflow and outflow forecasts and money market operations.)*
