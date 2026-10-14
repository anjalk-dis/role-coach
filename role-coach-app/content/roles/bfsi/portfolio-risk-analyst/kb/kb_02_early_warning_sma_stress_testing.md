# Early Warning Signals, SMA Buckets and Stress Testing

*Knowledge area: Early warning and stress. Audience: portfolio risk analysts. Draft for coaching use; items marked [Verify] need SME confirmation against current RBI circulars and internal policy.*

## 1. The purpose of early warning

By the time an account is 90 days overdue, most of the value is already lost. An **early warning system (EWS)** tries to flag stress while there is still time to act: restructure, reduce limits, take additional security, accelerate collections, or exit. The analyst's job is to design, test and tune the signals, and to track whether they actually predict default.

A good EWS has three properties: it is **predictive** (flagged accounts default at a much higher rate than the average), **timely** (the lead time before default is long enough to act on), and **actionable** (every alert has an owner and a defined response).

## 2. SMA and NPA in the Indian context

RBI requires banks and NBFCs to classify stressed accounts as **Special Mention Accounts (SMA)** before they become NPAs. In outline:

| Category | Basis (principal or interest or other amount overdue) |
|---|---|
| SMA-0 | Up to 30 days overdue |
| SMA-1 | More than 30 and up to 60 days overdue |
| SMA-2 | More than 60 and up to 90 days overdue |
| NPA | More than 90 days overdue |

[Verify: exact wording, the treatment of revolving credit facilities such as cash credit and overdraft (where irregularity is based on outstanding exceeding the sanctioned limit or drawing power), and whether the same bucket rules apply to NBFCs. RBI's clarification on the definition of default and the "upgradation" of NPAs, issued in November 2021, should be checked.]

Large borrowers are also reported to the central repository (CRILC). The reporting threshold and the frequency of SMA reporting have been amended over time [Verify current threshold, believed to be Rs 5 crore and above]. For the analyst, the practical point is that SMA movement is observable, standardised and comparable across lenders, which makes it a core monitoring metric.

Note the difference between **dpd-based** and **non-dpd** triggers. SMA is a dpd-based flag. Strong EWS adds earlier, non-dpd signals.

## 3. Types of early warning indicators

**Behavioural (account level)**
- Salary or inflows falling in the current account; cheque or ECS/NACH mandate bounces
- Utilisation of working capital limits consistently near 100%
- Frequent small overdues, or paying only after reminders ("technical delinquency")
- Rising use of overdraft, ad hoc limit requests, or drawing on the limit just before month-end

**Financial (borrower level)**
- Declining sales, falling margins, rising debtor days and inventory days
- Falling DSCR or interest cover, rising leverage
- Delay in submitting stock statements, audited financials or GST filings
- Auditor qualifications, change of auditors, delayed statutory dues

**External and bureau**
- Deterioration in credit bureau score; new delinquencies with other lenders; a sharp rise in credit enquiries
- GST return filing gaps, or a fall in GST turnover compared with last year
- Adverse news, litigation, promoter pledge of shares, downgrade by a rating agency
- Sector shocks: input price spikes, regulatory changes, export demand drops

**Retail-specific**
- Salary credits stopping, first-EMI-default, missed EMI on another loan at the same customer
- High unsecured exposure across lenders (visible on the bureau)

## 4. Building and tuning an EWS

1. **Define the target.** For example, "becomes 60+ DPD within the next 6 months".
2. **Back-test each candidate signal.** For each signal, compute: the share of the book flagged, the default rate among flagged accounts versus unflagged, and the lead time.
3. **Balance hit rate and noise.** A signal that flags 40% of the book is useless to a team that can review 3%. Set thresholds so that the flagged population is workable.
4. **Combine signals into a score or tiering** (Red, Amber, Green), with different actions per tier.
5. **Close the loop.** Track what happened to each alert (reviewed, action taken, outcome), and recalibrate quarterly.

**Worked example.** A bank's MSME book has 20,000 accounts with Rs 3,000 crore outstanding. A rule flags accounts whose current account inflows fell more than 30% versus the 6-month average and whose limit utilisation exceeded 95%. It flags 800 accounts (4%). Back-testing on last year: 18% of flagged accounts became 60+ DPD within 6 months, against 2% for the rest. The lift is 18 / 2 = 9 times. Of all accounts that became 60+ DPD, the rule caught 800 x 18% = 144 out of roughly 144 + (19,200 x 2% = 384) = 528, or 27%. So the rule is sharp but narrow; adding a GST turnover signal could raise the capture rate. The analyst's recommendation is to keep this rule as "Red" and add a separate "Amber" rule rather than loosen it.

## 5. Stress testing for the analyst

A **stress test** asks "what happens to NPAs, provisions and capital if conditions worsen?" The types:

- **Sensitivity analysis:** shock one factor, for example "gross slippage ratio rises by 100 bps" or "top 10 borrowers' exposures downgrade by one notch".
- **Scenario analysis:** a coherent macro story, such as a sharp GDP slowdown plus an interest rate shock, mapped to default rates by segment through historical relationships.
- **Reverse stress test:** start from an unacceptable outcome (for example the capital ratio falling below a regulatory minimum) and work backwards to find the scenario that would cause it.
- **Sector stress:** apply a shock to a specific sector, such as a textile exporter portfolio facing tariffs, using that sector's exposure and its historical default behaviour.

Banks typically run these under ICAAP and supervisory stress testing. The analyst usually builds the portfolio-level engine; the macro scenarios come from the economics or risk team [Verify the current regulatory scenario definitions].

**Worked example (simple sensitivity).** A Rs 1,000 crore retail loan book has gross NPA of 3% (Rs 30 crore), provision coverage of 60% on NPAs, and a normal annual slippage of 2% of standard advances.

- Stress: slippage doubles to 4%. Standard advances are Rs 970 crore, so new NPAs = 4% x 970 = Rs 38.8 crore versus Rs 19.4 crore in the base case. Extra NPAs = Rs 19.4 crore.
- Extra provisions at 60% coverage = Rs 11.6 crore. If the bank's net profit on this book is Rs 20 crore, a third of it is wiped out.
- Check the pass-through to the capital ratio: Rs 11.6 crore provisions reduce capital by the after-tax amount (say 25% tax, so about Rs 8.7 crore) against risk-weighted assets of, say, Rs 750 crore. That is about 1.2 percentage points of capital ratio on this book alone, before any change in risk weights.

Always state the assumptions: coverage, tax, recovery, whether the book keeps growing, and whether management actions are included.

## 6. Common mistakes and coaching points

- Building an EWS on dpd alone, which is a lagging indicator.
- Not back-testing signals, so no one knows if they work.
- Too many alerts. If everything is red, nothing is.
- Stress scenarios that are too mild or too convenient. Challenge your own severity: has the sector seen this in the past?
- Forgetting second-round effects: a downgrade increases provisions and risk weights.
- Presenting a stress number without the assumptions and the sensitivity of the answer to them.
- Treating the SMA bucket as an end in itself rather than a trigger for action.

## 7. Practice questions

1. An account has no overdue instalments but its current account inflows have halved and GST filings are two months late. Why does this matter? *(They are non-dpd early warning signals of cash flow stress; the account should be reviewed before it reaches SMA.)*
2. Your EWS flags 30% of the book. What is the problem and what do you do? *(The flagged population is too large to act on; tighten thresholds or tier the alerts, and check the lift against the unflagged rate.)*
3. In a sensitivity test, slippage on a Rs 500 crore standard book rises from 2% to 3% and coverage is 50%. What is the extra provision? *(Extra NPAs = 1% x 500 = Rs 5 crore; extra provision = Rs 2.5 crore.)*
