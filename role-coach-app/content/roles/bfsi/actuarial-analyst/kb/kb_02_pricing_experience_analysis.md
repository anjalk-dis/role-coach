# Pricing and Experience Analysis: Mortality, Lapse and Loss Ratios

*Knowledge area: Pricing and experience analysis. Audience: actuarial analysts in Indian life and general insurers. Draft for coaching use; items marked [Verify] need SME confirmation against current tables, regulations and circulars.*

## 1. The pricing loop

Pricing and experience analysis are one loop. You set assumptions, price the product, sell it, observe what actually happens, compare it with the assumptions, and revise. An analyst who only does one half of the loop will miss the point. Experience studies exist to feed pricing, reserving and risk management.

Every price rests on a few assumption families: claims (mortality, morbidity, claim frequency and severity), persistency (lapse and surrender), expenses (acquisition and maintenance), investment return, and capital cost.

## 2. Mortality experience: actual versus expected

The standard tool is the **A/E ratio**: actual deaths divided by expected deaths.

- **Actual** deaths come from claims records, counted by the date of death within the study period.
- **Expected** deaths = exposure x expected mortality rate (q) from the reference table.
- **Exposure** is the time each life was in force and at risk during the period, measured in life-years. A policy in force for six months of the study year contributes 0.5 life-years.

Common reference tables in India include the Indian Assured Lives Mortality tables published by the Institute of Actuaries of India, and reinsurer tables used for pricing. [Verify: the current IALM table in use and any recent IAI table releases.]

### Worked example

A term portfolio has 2,00,000 life-years of exposure in the year, with an expected rate of 1.2 deaths per 1,000. Expected deaths = 200,000 x 0.0012 = **240**. Actual deaths are **276**.

A/E = 276 / 240 = **115%**.

Is that real? A rough test: deaths approximate a Poisson count, so the standard deviation is about the square root of 240, roughly 15.5. Actual is 36 above expected, about 2.3 standard deviations. That is suggestive but not conclusive. Check:

- Was there a Covid wave or heat event in the period?
- Did the mix shift towards older ages, smokers, or a new digital channel with lighter underwriting?
- Were there a few very large claims that inflate the count by amount?

Always measure A/E by **count** and by **sum assured (amount)**. A portfolio can look fine by count and poor by amount if high-value policies die more often.

## 3. Credibility

Small portfolios produce noisy experience. **Credibility** blends your own experience with an external benchmark:

Revised estimate = Z x own experience + (1 - Z) x benchmark

Z rises with the amount of data. A common approach is limited fluctuation credibility, where full credibility needs a stated number of claims, often cited in the region of 1,082 claims for a 90% confidence level and 5% accuracy. [Verify: the thresholds your actuarial function uses.] A square-root rule is often used for partial credibility: Z = square root of (actual claims / full credibility claims).

Example: 270 claims, full credibility 1,082. Z = square root of (270 / 1082) = about 0.50. If own A/E is 115% and the benchmark is 100%, the blended A/E is about 107.5%.

## 4. Morbidity and health claims

Health and critical illness products need frequency and severity separately.

- **Claim frequency** = number of claims / exposure.
- **Average claim size** = incurred claims / number of claims.
- **Incurred claim ratio (ICR)** = incurred claims / earned premium.

Medical inflation, hospital network changes, and the share of day-care procedures all move severity. Repricing of health products in India is regulated and typically needs IRDAI filing or approval. [Verify: the current rules on health premium revision and any annual caps.]

## 5. Lapse and persistency

Persistency measures how much of a cohort is still in force at a given point. In India, the 13th month and 61st month persistency ratios are widely quoted, by both count and premium. [Verify: the IRDAI definition of persistency ratio and the disclosed bases.]

Persistency matters because acquisition cost is paid upfront. A policy that lapses in year 2 never repays its commission.

### Worked example

A cohort of 10,000 policies, annual premium Rs. 50,000 each. Lapse in year 1 is 12%, in year 2 is 8%.

- In force after year 1: 10,000 x 0.88 = 8,800.
- In force after year 2: 8,800 x 0.92 = 8,096.
- Premium due in year 3 on the cohort: 8,096 x Rs. 50,000 = **Rs. 40.48 crore**, against Rs. 50 crore at the start.

If the true year 2 lapse were 12%, in-force would be 7,744 and year 3 premium Rs. 38.72 crore, a shortfall of about Rs. 1.76 crore per year on this one cohort.

Study lapse by duration, channel (agency, bancassurance, digital), premium payment mode, premium band and product. Pooled averages hide the real story. Channel mix shifts are the most common cause of aggregate persistency moves.

## 6. Loss ratios in general insurance

- **Claims ratio** = incurred claims / earned premium.
- **Expense ratio** = expenses and commission / written or earned premium.
- **Combined ratio** = claims ratio + expense ratio. Below 100% means an underwriting profit.

Example: earned premium Rs. 500 crore, incurred claims Rs. 390 crore, expenses and commission Rs. 130 crore. Claims ratio 78%, expense ratio 26%, combined ratio 104%. The insurer relies on investment income to make a profit.

Segment the loss ratio by line, vehicle class, geography, channel and policy year. Remember that incurred claims include the change in IBNR and outstanding reserves, so the same reserving judgement from knowledge area 1 shows up here.

## 7. Profit testing and pricing

A **profit test** projects, policy by policy or cell by cell, premiums, claims, expenses, commission, reserve changes, tax, and capital requirement. Outputs include:

- **Profit signature**: profit emerging each year.
- **IRR** and **breakeven year**.
- **Value of new business (VNB)** and **VNB margin** = VNB / annualised premium equivalent.
- **Return on capital** measured against the hurdle rate.

Example: a savings product with annual premium Rs. 1 lakh, commission 25% in year 1, and expenses Rs. 8,000 in year 1. Year 1 strain is large; profit emerges only if the policy persists. This is why lapse assumptions dominate profit test sensitivity.

Always run sensitivities: mortality +10%, lapse +/- 20% relative, expenses +10%, discount rate -100 bps. Show which assumption moves VNB the most. Indian product rules on surrender values, commission and expense limits shape what can be priced. [Verify: current IRDAI product, commission and expense of management regulations.]

## 8. Common mistakes and coaching points

- Quoting an A/E ratio without exposure, period or count versus amount basis.
- Ignoring random noise in small samples and over-reacting to a single quarter.
- Using policy count where premium weighting is needed, or the reverse.
- Treating pooled lapse as if it applied to every channel.
- Not separating one-off events (Covid, a large claim) from trend.
- Pricing on today's experience without allowing for margin and future improvement or deterioration.
- Forgetting data quality checks: duplicates, missing death dates, claim date versus reporting date.

## 9. Practice questions

1. A portfolio had 150 expected deaths and 165 actual. What is A/E, and what would you check before calling it a trend? *(A/E is 110%. About one standard deviation; check exposure, mix, large claims, event effects and amount basis.)*
2. Why does a higher year 2 lapse hurt profit more than the same lapse in year 8? *(Acquisition costs are not yet recovered; early lapses leave a loss on the policy.)*
3. Claims ratio is 80% and expense ratio is 28%. What is the combined ratio and what does it mean? *(108%; an underwriting loss that must be covered by investment income.)*
