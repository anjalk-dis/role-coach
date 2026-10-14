# Solvency, Capital, ALM and Communicating Results

*Knowledge area: Solvency, capital and communication. Audience: actuarial analysts in Indian life and general insurers. Draft for coaching use; items marked [Verify] need SME confirmation against current IRDAI regulations, circulars and effective dates.*

## 1. What solvency is

Solvency is the insurer's ability to meet its obligations to policyholders even when things go wrong. Regulators therefore require insurers to hold assets in excess of liabilities by a buffer that reflects risk.

In India, IRDAI has used a **solvency margin** framework: **available solvency margin (ASM)** compared with **required solvency margin (RSM)**.

**Solvency ratio = ASM / RSM.** The regulatory control level has historically been 150%, meaning the insurer must hold 1.5 times the required margin. [Verify: current control level and any change under IRDAI regulations.]

## 2. Available solvency margin

ASM is, broadly, admissible assets minus liabilities (policy reserves, claims liabilities and other liabilities), with several adjustments:

- Only **admissible assets** count, with limits on exposure to a single issuer or asset class.
- Certain items are excluded or haircut.
- For life insurers, the treatment of policyholders' and shareholders' funds is kept separate. [Verify: current rules on fund-wise ASM and treatment of unrealised gains.]

Analysts commonly compute ASM from the balance sheet and a reconciliation of admissible assets, so data accuracy matters more than modelling complexity.

## 3. Required solvency margin

For **life insurers**, RSM is broadly a percentage of mathematical reserves plus a percentage of the sum at risk, with different factors by product type (linked, non-linked, health, group). For **general insurers**, RSM is the higher of amounts based on premium and on claims. [Verify: the exact factors, which IRDAI has set in regulations and which may have been updated.]

### Worked example (life, illustrative only)

Mathematical reserves: Rs. 40,000 crore. Sum at risk: Rs. 1,50,000 crore. Suppose factors of 4% on reserves and 0.3% on sum at risk apply. [Verify: illustrative factors, not actual.]

RSM = 40,000 x 4% + 1,50,000 x 0.3% = 1,600 + 450 = **Rs. 2,050 crore**.

If ASM is Rs. 3,500 crore, solvency ratio = 3,500 / 2,050 = **171%**, above a 150% control level.

### What moves the ratio

- **Equity or bond market fall** reduces the value of assets, so ASM falls. A Rs. 150 crore fall in ASM from 3,500 to 3,350 gives a ratio of 163%.
- **New business growth** raises reserves and sum at risk, so RSM rises.
- **Profit or capital infusion** raises ASM. A Rs. 400 crore capital raise gives 3,900 / 2,050 = 190%.
- **Reinsurance changes** reduce sum at risk and RSM, within allowable limits.
- **Dividends** reduce ASM.

## 4. Risk-based capital direction

IRDAI has indicated a move towards a **risk-based capital (RBC)** regime, linking required capital to the actual risks held: insurance, market, credit and operational. This is broadly similar to Solvency II or the Swiss Solvency Test in philosophy. [Verify: the current status, timeline and design of the Indian RBC framework, including any parallel run, and whether it applies to life, general or both.]

An analyst should understand the logic even before the rules are final:

- A risk-based approach charges more capital for riskier assets (equity, lower-rated bonds) and riskier liabilities (long guarantees, concentrated health books).
- It rewards diversification and strong ALM.
- It forces the business to think about capital efficiency by product and by asset allocation.
- Internal measures such as **ORSA (own risk and solvency assessment)** and economic capital sit alongside the regulatory measure. [Verify: ORSA requirements under current IRDAI corporate governance and risk management guidelines.]

## 5. Asset-liability management (ALM)

ALM is about aligning what you own with what you owe. A life insurer sells a 25-year endowment at a guaranteed return and invests premiums in bonds. If the bonds mature at year 10 and rates have fallen, reinvestment at lower yields creates a loss on the guarantee. This is **reinvestment risk**; the opposite risk, **disinvestment** when rates rise, hits the market value of bonds.

Core concepts:

- **Duration:** sensitivity of value to a change in interest rates. If liabilities have duration 12 and assets 8, a fall in rates raises liabilities more than assets, which hurts the surplus.
- **Duration gap** = asset duration minus liability duration, adjusted for size.
- **Cash flow matching** and **key rate durations** for finer matching.
- **Long-term government security availability:** the Indian bond market has limited supply at very long tenors, making true matching of 30-year liabilities difficult. [Verify: current supply of long-dated G-Secs and any regulatory relaxations on infrastructure bonds.]

### Worked example

Liabilities of Rs. 10,000 crore with duration 12. Assets of Rs. 10,000 crore with duration 8. Interest rates fall by 1 percentage point (100 bps).

- Liability value rises by about 12% x 10,000 = Rs. 1,200 crore.
- Asset value rises by about 8% x 10,000 = Rs. 800 crore.
- Net surplus falls by about **Rs. 400 crore**, before convexity and other effects.

Compare this with the Rs. 3,500 crore ASM above. A Rs. 400 crore hit takes the ratio from 171% to about (3,500 - 400) / 2,050 = **151%**, close to the control level. This is how interest rate risk becomes a solvency issue.

For general insurers, ALM is shorter-dated but still matters. Claims are paid within a few years for most lines, so the portfolio is typically more liquid with lower duration, while motor third-party and long-tail liability still require longer-dated assets.

## 6. Communicating actuarial results

Technical work only creates value when the reader acts on it. Most readers in finance, product, sales and the board are not actuaries.

### Structure for a result

1. **Headline:** the number and what it means. "Solvency ratio is 163%, down from 171%, still above the 150% control level."
2. **Drivers:** two or three reasons, with sizes. "Market fall: minus 8 points. New business growth: minus 3 points. Profit: plus 3 points."
3. **Uncertainty:** the range or sensitivity. "A further 100 bps fall in rates would take us to about 150%."
4. **Judgement made:** assumptions that matter, and who agreed to them.
5. **Recommendation or decision needed.**

### Movement analysis

A good movement analysis (often called an analysis of change or waterfall) walks from the opening to the closing number in steps: new business, expected unwind, experience variances, assumption changes, market movements, and other. If the steps do not add up to the closing figure, the analysis is not finished.

### Plain language examples

- Instead of "A/E mortality is 115% with Z of 0.5", say "Deaths ran about 15% above expectation, but the sample is small, so we have only partly moved our assumption."
- Instead of "the CSM release pattern is based on coverage units", say "profit is recognised in step with the cover we provide each year."

### Handling pushback

A sales head may ask why the lapse assumption is 12% when the last quarter showed 9%. Do not argue from authority. Show the data by cohort and duration, explain why a single quarter is noisy, offer to review when more data exists, and state what you will watch.

## 7. Common mistakes and coaching points

- Reporting the solvency ratio without saying what moved it.
- Treating regulatory solvency as the whole picture and ignoring ALM and sensitivity.
- Using a single point estimate where a range is needed.
- Quoting factors or thresholds from memory when they may have changed. Always check the latest regulation.
- Burying the conclusion on slide 12.
- Hiding judgement. State clearly where the Appointed Actuary or management made a call.
- Skipping reconciliation to the finance team's ledger.

## 8. Practice questions

1. ASM is Rs. 2,400 crore and RSM is Rs. 1,500 crore. What is the solvency ratio and how much headroom is there against a 150% control level? *(160%; ASM could fall by Rs. 150 crore before reaching 150%, since 1.5 x 1,500 = 2,250.)*
2. Why does a duration gap make a life insurer vulnerable to falling interest rates? *(Liabilities rise more than assets when rates fall, so surplus shrinks.)*
3. How would you present a 10-point solvency ratio drop to the board in three sentences? *(State the new ratio versus control level, give the two or three drivers with sizes, then give the sensitivity and the action proposed.)*
