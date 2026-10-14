# Reserving and Valuation: IBNR, Life Reserves and Ind AS 117 / IFRS 17

*Knowledge area: Reserving and valuation. Audience: actuarial analysts in Indian life and general insurers. Draft for coaching use; items marked [Verify] need SME confirmation against current standards, IRDAI regulations and circulars.*

## 1. Why reserves matter

An insurer sells a promise, and the cost of that promise is unknown when the premium is collected. Reserves are the liability the insurer carries for that promise. If they are too low, profit is overstated and policyholders are at risk. If they are too high, capital is trapped and prices look uncompetitive. The actuary's job is to give a defensible best estimate and be honest about the uncertainty around it.

The word "reserve" splits into two families that behave very differently:

- **General insurance (motor, health, fire, marine):** short-tail and long-tail claims. The main question is how much will eventually be paid on claims that have already happened. This is claims reserving.
- **Life insurance (term, endowment, ULIP, annuity):** long-dated promises. The main question is the present value of future benefits and expenses less future premiums. This is policy valuation.

## 2. General insurance claims reserves

A general insurer holds several liabilities for past events:

- **Outstanding claims (case reserves):** claims reported and estimated by the claims team.
- **IBNR (incurred but not reported):** claims that have happened but are not yet reported to the insurer.
- **IBNER (incurred but not enough reported):** development on claims already reported, where case estimates prove too low or too high.
- **Unearned premium reserve (UPR):** the part of premium relating to the unexpired period of cover.

In practice many teams call the total of the IBNR and IBNER pieces "IBNR" for simplicity. Be clear which one you mean when you speak to the claims team.

## 3. The run-off triangle

Claims data is arranged by **accident year** (rows) and **development year** (columns). Each cell is cumulative paid or incurred claims. Only the upper left is known; the lower right triangle is what you estimate.

Illustrative cumulative paid claims, in Rs. crore:

| Accident year | Dev 1 | Dev 2 | Dev 3 | Dev 4 |
|---|---|---|---|---|
| 2022 | 40 | 62 | 70 | 72 |
| 2023 | 45 | 70 | 79 | |
| 2024 | 50 | 77 | | |
| 2025 | 55 | | | |

## 4. Chain ladder method

Chain ladder assumes past development patterns repeat. Steps:

1. Compute age-to-age factors for each row: for 2022, Dev 2 / Dev 1 = 62 / 40 = 1.55.
2. Average them across rows (simple, volume-weighted or excluding outliers) to get selected factors.
3. Multiply the latest diagonal by the cumulative factors to get **ultimate claims**.
4. Reserve = ultimate minus paid to date.

Using the table: the Dev 1 to 2 factors are 1.55, 1.556 and 1.54, so select about 1.55. The Dev 2 to 3 factors are 1.129 and 1.129, so select about 1.13. The Dev 3 to 4 factor is 72 / 70 = 1.029, so select about 1.03.

For accident year 2024, paid is 77 crore at Dev 2. Remaining development is 1.13 x 1.03 = 1.164. Ultimate is about 77 x 1.164 = **Rs. 89.6 crore**, so the outstanding reserve is about Rs. 12.6 crore.

For accident year 2025, paid is 55 crore at Dev 1. Cumulative factor to ultimate is 1.55 x 1.13 x 1.03 = 1.804. Ultimate is about **Rs. 99.2 crore**, reserve about Rs. 44.2 crore.

Notice that the 2025 estimate rests on a single early data point multiplied by 1.8. A small error in 55 becomes a large error in the ultimate. This is the weakness of chain ladder on immature years.

## 5. Bornhuetter-Ferguson (BF) and loss ratio methods

- **Expected loss ratio method:** ultimate = earned premium x expected loss ratio (ELR). Stable but ignores actual emergence.
- **Bornhuetter-Ferguson:** ultimate = paid to date + (expected ultimate x percentage still to develop). It blends prior expectation with actual experience. For immature years, BF is more stable than chain ladder.

Example: 2025 earned premium is Rs. 140 crore and the ELR is 72%, giving expected ultimate of about Rs. 100.8 crore. Chain ladder says 55 is about 55.4% developed (1 / 1.804), so 44.6% remains. BF ultimate = 55 + 100.8 x 0.446 = **Rs. 100.0 crore**. Here BF and chain ladder agree closely. If the ELR had been 80%, BF would be about Rs. 108 crore. That gap is the cost of a prior that may be wrong.

**Practical rule:** use chain ladder for mature years, BF or ELR for immature years, and always show the range.

## 6. Judgement points in non-life reserving

- Large single claims and catastrophe events (floods, cyclones) distort factors. Remove or treat separately.
- Changes in claims handling speed or case reserving practice break the "past repeats" assumption.
- Health and motor third-party lines have very different tails. Motor third party in India can run for years through MACT tribunals. [Verify the typical development period used internally.]
- Reinsurance recoveries must be reserved separately from gross.

## 7. Life insurance reserves

For traditional life products the reserve is the present value of future benefits and expenses less the present value of future premiums, using prescribed or best estimate assumptions plus margins. Indian practice has historically followed IRDAI's regulations on assets, liabilities and solvency, with the Appointed Actuary certifying that reserves are adequate. [Verify: the current IRDAI valuation regulation and any recent changes to the valuation basis.]

Key inputs: mortality or morbidity, lapse, expense inflation, interest or discount rate, and bonus assumptions for participating business. The reserve roll-forward (opening reserve + premiums + interest - claims - expenses - release = closing reserve) should always be reconciled to the model output.

## 8. Ind AS 117 / IFRS 17 building blocks

IFRS 17 replaces IFRS 4 and measures insurance contracts on a current basis. India's equivalent is Ind AS 117. Its application to insurers in India depends on notification dates and IRDAI and MCA decisions. [Verify: the effective date and phasing of Ind AS 117 for Indian insurers.]

The **General Measurement Model (GMM)** liability for a group of contracts has these blocks:

1. **Fulfilment cash flows:** best estimate future cash flows, discounted at current rates.
2. **Risk adjustment (RA):** compensation for non-financial risk uncertainty.
3. **Contractual service margin (CSM):** the unearned profit, released to the income statement as service is provided.

Contracts are grouped by portfolio, annual cohort (year of issue) and profitability (onerous, no significant risk of becoming onerous, other). Other models are the **Premium Allocation Approach (PAA)**, commonly used for short-duration general insurance, and the **Variable Fee Approach (VFA)** for contracts with direct participation features such as ULIPs and participating products.

## 9. CSM worked example

A group of term policies has present value of future premiums Rs. 100 crore, present value of claims and expenses Rs. 70 crore, and risk adjustment Rs. 8 crore.

Fulfilment cash flows = 70 + 8 - 100 = -22 crore (net inflow). On day one the CSM is set to **Rs. 22 crore** so no profit is recognised upfront.

If at the next valuation the group is expected to have Rs. 3 crore higher claims on future service, the CSM falls by about 3 crore to 19 crore before release. If the loss exceeded the CSM, the excess would go straight to profit or loss as a loss on an onerous group.

Typical CSM movement: opening + new business - release for service provided + interest accretion +/- assumption changes on future service = closing.

Key distinction: changes relating to **future service** adjust the CSM. Changes relating to **past or current service** go straight to profit or loss.

## 10. Common mistakes and coaching points

- Applying chain ladder to an immature year without checking it against BF.
- Mixing paid and incurred triangles without reconciling case reserve changes.
- Forgetting that factors from a pre-Covid or pre-regulation period may no longer apply.
- Treating the CSM as a cash balance. It is an unearned profit measure, not an asset.
- Running IFRS 17 grouping too coarsely and mixing profitable and onerous contracts.
- Presenting a point estimate without a range.

## 11. Practice questions

1. Why is chain ladder unreliable for the latest accident year, and what would you use instead? *(Because it multiplies one small early data point by a large factor; use BF or an expected loss ratio, and show the range.)*
2. A group of contracts has fulfilment cash flows of -Rs. 15 crore on day one. What is the initial CSM and what P&L is recognised? *(CSM is Rs. 15 crore and no profit is recognised on day one.)*
3. In an IFRS 17 movement, a change in expected future claims on future coverage arrives. Where does it go? *(It adjusts the CSM, unless the group becomes onerous, in which case the excess hits profit or loss.)*
