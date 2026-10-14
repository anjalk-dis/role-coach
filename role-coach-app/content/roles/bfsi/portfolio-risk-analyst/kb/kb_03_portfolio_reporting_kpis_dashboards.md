# Portfolio Reporting, KPIs, Credit Cost and Dashboards

*Knowledge area: Portfolio reporting. Audience: portfolio risk analysts. Draft for coaching use; items marked [Verify] need SME confirmation against current RBI circulars and internal policy.*

## 1. Reporting is where analysis becomes a decision

A dashboard nobody acts on is decoration. The portfolio report exists to answer, in order: What changed? Why did it change? Does it matter? What should we do? Management has limited time. Your job is to compress thousands of loans into a small number of well-chosen metrics and a clear narrative.

## 2. The core KPI set

Group KPIs into a small number of families, and use the same definitions every month.

**Size and growth**
- Gross advances, disbursals, net growth, share of each product or segment

**Asset quality**
- **Gross NPA (GNPA) ratio** = gross NPAs / gross advances
- **Net NPA (NNPA) ratio** = (gross NPAs minus provisions held against them) / (gross advances minus those provisions)
- **SMA-1 and SMA-2 as a percentage of advances**, the pipeline into NPA
- **Slippage ratio** = fresh NPAs in the period / opening standard advances (usually annualised)
- **Provision coverage ratio (PCR)** = provisions held against NPAs / gross NPAs
- 30+ DPD, 60+ DPD and 90+ DPD by product, and by amount and count

**Resolution**
- Upgradations, recoveries and write-offs; cure rates

**Cost and return**
- **Credit cost** = provisions and write-offs charged to the profit and loss account in the period / average advances (annualised)
- Net interest margin, risk-adjusted margin

**Risk structure**
- Concentration (top 10 borrowers, top sectors, HHI), restructured book as a share of advances, unsecured share

[Verify: the exact regulatory definitions of GNPA, NNPA, slippage and PCR used in your institution's published disclosures; they follow RBI's disclosure formats and can differ from management definitions.]

Be careful with ratios that mix flows and stocks. Slippage and credit cost are period flows measured over a base; compare quarterly numbers only after annualising consistently.

## 3. Credit cost, explained with numbers

Credit cost is the cost of risk per rupee lent. It is the metric that ties portfolio quality to profit.

**Worked example.** An NBFC has an average loan book of Rs 8,000 crore for the year. P&L impairment charge (provisions) is Rs 240 crore and write-offs net of recoveries that were not already provided for is Rs 40 crore.

Credit cost = (240 + 40) / 8,000 = 3.5%.

If last year it was 2.4%, credit cost rose by 110 bps, or about Rs 88 crore on the same base. To explain it, decompose it: how much from higher slippage, how much from lower recoveries, how much from lower coverage or model changes, how much from the growth in the unsecured share? Do the same decomposition by segment: a 1.1 percentage point rise might be driven by one product that is 15% of the book.

Be clear that credit cost depends on provisioning policy and accounting changes (for example a move to an expected-credit-loss framework), so a change might reflect methodology, not behaviour [Verify].

## 4. Risk-adjusted return and RAROC basics

A segment with a higher yield is not necessarily more profitable once risk is accounted for. **RAROC** (risk-adjusted return on capital) compares risk-adjusted profit with the capital the segment needs:

RAROC = (income minus operating cost minus expected loss) / economic or regulatory capital.

**Worked example.** Two segments, each Rs 1,000 crore of loans.

| | Prime salaried retail | Unsecured small business |
|---|---|---|
| Yield (interest and fees) | 11% | 21% |
| Cost of funds | 7% | 7% |
| Operating cost | 1.5% | 5% |
| Expected loss (credit cost) | 0.5% | 6% |
| Risk-adjusted profit before tax | 2.0% = Rs 20 crore | 3.0% = Rs 30 crore |
| Capital held (assumption) | 10% of loans = Rs 100 crore | 14% of loans = Rs 140 crore |
| Pre-tax RAROC | 20% | about 21% |

The unsecured segment earns more rupees but, per unit of capital, the gap is far smaller than the yield difference suggests, and its unexpected-loss risk is higher. If a stress year doubles its credit cost to 12%, its risk-adjusted profit becomes negative (21 minus 7 minus 5 minus 12 = minus 3%), while the prime segment stays positive. That is the story to tell: yield is not return.

The capital percentages above are illustrative assumptions. Use your institution's actual capital allocation method [Verify].

## 5. Dashboard design for risk

- **Start with one page.** Five to eight headline metrics with trend arrows, a clear status (on track, watch, breach) against risk appetite limits, and three bullet insights.
- **Show trends and context.** A number without a comparison (last month, last year, limit, peer) has no meaning. Use sparklines or twelve-month trend lines.
- **Show composition.** Put the segment or vintage view that explains the headline movement right beside it.
- **Use consistent definitions and time stamps.** Print "as of" dates and data sources. Footnote any definition change.
- **Choose chart types for the question:** lines for trends, bars for comparisons, heatmaps for roll-rate or migration matrices, scatter for risk versus return. Avoid 3D, dual axes that mislead, and truncated axes that exaggerate.
- **Highlight exceptions, not everything.** Use colour sparingly: a limit breach or a sharp movement should stand out.
- **Allow drill-down for analysts, but give leaders the summary.** Layers: executive page, segment page, account-level list of top exposures and alerts.
- **Automate refresh and reconcile** to the general ledger every cycle. A visible reconciliation line builds trust.

## 6. Telling the story to management

A reliable structure:

1. **Headline:** one sentence with the number and the so-what. "Credit cost rose to 3.5% from 2.4%, driven by unsecured small business loans disbursed in the last 18 months."
2. **Evidence:** two or three charts that prove it, such as a vintage curve and a roll-rate table.
3. **Root cause:** channel, geography, policy exception, collections capacity, macro.
4. **Outlook:** where it goes next, using roll rates or stress results, with a range rather than a single number.
5. **Recommendation:** specific options with trade-offs and an owner. For example "cut limit for Channel X by 30%, raise minimum bureau score by 20 points; expected effect is Rs 12 crore lower credit cost next year against Rs 150 crore lower disbursals".
6. **Caveats:** data gaps and what you will check next.

Tone: factual, calm and specific. Do not blame; frame as options. Anticipate the three hardest questions: "Is this temporary?", "Is it just one segment?" and "What is the worst case?" and have the numbers ready.

## 7. Common mistakes and coaching points

- Reporting too many metrics with no hierarchy.
- Changing definitions silently between months.
- Explaining a ratio movement without checking the denominator.
- Showing averages that hide a bad segment.
- Comparing yield between segments without adjusting for risk and capital.
- A final slide that says "monitor closely" instead of a decision.
- Over-precision. Say "about Rs 85 to 95 crore" when your model cannot support two decimals.

## 8. Practice questions

1. Average advances are Rs 2,500 crore, provisions charged for the year are Rs 60 crore and net write-offs not previously provided are Rs 15 crore. What is the credit cost? *(75 / 2,500 = 3.0%.)*
2. GNPA ratio falls from 4% to 3.5%, but the bank wrote off a large account. What do you check? *(Whether the improvement came from a write-off rather than recovery or upgrade; look at slippage, recoveries and the write-off-adjusted GNPA.)*
3. Why can a 20% yield product have a lower risk-adjusted return than a 12% yield product? *(Higher operating cost, expected loss and capital consumption can erode the extra yield; RAROC compares them on a risk-adjusted basis.)*
