# Investments, Money Markets and FX

*Knowledge area: Investment portfolio, money markets and foreign exchange. Audience: bank treasury managers in India. Draft for coaching use; items marked [Verify] need SME confirmation against current RBI directions and market conventions.*

## 1. The treasury's three trading and investing roles

Bank treasury in India typically runs three linked activities:

- **Investment portfolio:** government securities (G-secs), state development loans (SDLs), treasury bills and corporate bonds held for SLR, liquidity, income and trading.
- **Money market desk:** short-term borrowing and lending to balance daily liquidity.
- **Forex desk:** customer and proprietary FX flows, and management of the bank's net open position.

Each is subject to limits approved by the board, with a clear separation between front office (dealing), mid office (risk and limit monitoring) and back office (settlement).

## 2. The G-sec portfolio

Government securities form the bulk of most Indian bank investment books because they satisfy SLR and are the best collateral for repo borrowing. Their credit risk is low, but their **interest rate risk is high**. A rise in yields reduces prices.

Key concepts:

- **Yield to maturity (YTM)** is the annualised return if held to maturity. Price and yield move inversely.
- **Duration** estimates price sensitivity. A portfolio with modified duration of 5 loses about 5 percent of its value if yields rise 1 percent.
- **PV01 (or DV01)** is the rupee change in value for a one basis point move in yield. A portfolio of Rs 10,000 crore with modified duration 4 has a PV01 of roughly 10,000 crore x 4 x 0.0001 = Rs 4 crore per basis point.

### Worked example: MTM impact

A bank holds Rs 5,000 crore (market value) of G-secs in its Available for Sale (AFS) book with modified duration of 4. Yields rise by 25 basis points.

Approximate change in value = 5,000 crore x 4 x 0.25% = Rs 50 crore loss.

If the bank also holds Rs 20,000 crore in HTM securities with the same duration, the same yield move creates an unrealised notional loss of about Rs 200 crore on that book. It would not hit the profit and loss account, and would not be marked to market in the accounts, but it still reduces economic value. This is why EVE and MTM views must be read together with the accounting classification.

## 3. Classification: HTM, AFS and FVTPL

Banks classify investments into categories, which determine accounting treatment. RBI issued revised investment classification and valuation directions with effect from a recent financial year. [Verify: the current RBI Master Direction on classification, valuation and operation of investment portfolio, including the effective date, category names and any transition provisions.]

| Category | Intent | Valuation | Where gains and losses go |
|---|---|---|---|
| **Held to Maturity (HTM)** | Hold to collect contractual cash flows | Amortised cost, no MTM | No effect on P&L until sale; premium amortised |
| **Available for Sale (AFS)** | Collect cash flows and sell when beneficial | Fair value | Changes generally go to a reserve (equity), with realised gains to P&L on sale |
| **Fair Value through P&L (FVTPL)**, including held for trading | Trading, short-term gain | Fair value | Changes go to P&L every period |

[Verify: exact terminology, treatment of AFS changes and HTM ceiling as a percentage of NDTL. Earlier rules capped HTM at 25 percent of NDTL, with SLR securities within it. Confirm the current cap and transfer rules.]

Practical rules:

- Classification is decided **at the time of purchase** and documented. Transfers between categories are restricted and typically need board approval and are allowed at limited intervals. [Verify.]
- Selling a sizeable portion of HTM can trigger restrictions. Do not treat HTM as a free parking place for losses.
- HTM protects reported earnings from volatility but does not remove the economic risk. It also limits flexibility.
- FVTPL and AFS expose the P&L or reserves to market moves, so they need tight limits: duration, PV01, stop-loss and exposure by issuer.

## 4. Money markets

The money market is where banks lend and borrow for tenors up to one year.

- **Call and notice money:** overnight and up to 14 days, between banks and certain participants.
- **Repo and reverse repo (including triparty repo):** borrowing or lending against G-sec collateral. RBI's liquidity adjustment facility (LAF) provides standing repo and reverse repo, and the **marginal standing facility (MSF)** provides overnight borrowing at a higher rate against SLR securities within limits. [Verify: current repo, standing deposit facility and MSF rates, and the policy corridor.]
- **Certificates of deposit (CDs)** issued by banks and **commercial paper (CP)** issued by companies and NBFCs.
- **Treasury bills:** 91-, 182- and 364-day government paper.

The daily job: forecast the cash position, then lend surplus or borrow the shortfall at the best available rate, keeping CRR average on track and within counterparty and borrowing limits. Borrowing in the market should stay within the prudential limits set by RBI and the board. [Verify: current limits on call borrowing and lending as a share of capital.]

### Worked example: choosing funding

On a day the bank needs Rs 500 crore for 7 days. Options:

- Triparty repo against G-secs at, say, 6.60 percent.
- Call money at 6.70 percent.
- CD issuance for 3 months at 7.10 percent, which would term out funding but at higher cost.

Cost of 7-day repo funding for Rs 500 crore = 500 crore x 6.60% x 7/365 = about Rs 0.63 crore. Call money costs about Rs 0.64 crore. The difference is small, but repo uses up collateral and the call market uses up counterparty limits. If the need is recurring, ALCO may prefer term funding. These rates are illustrative only.

## 5. Foreign exchange basics

Banks in India deal in FX for customers (imports, exports, remittances) and manage their own exposure.

- **Spot:** settlement in two business days. **Forward:** settlement on a future date at a rate set today, priced by interest rate differentials (forward premium or discount). **FX swap:** a spot and an opposite forward, used to fund in one currency using another.
- **Net open position (NOP):** the bank's overall FX exposure, subject to an overnight limit approved by RBI and the board. [Verify: current NOP and aggregate gap limits as per RBI.]
- **Daylight and overnight limits, stop-loss and counterparty limits** govern the trading book.

### Worked example: hedging an exposure

An importer with a bank has to pay USD 2 million in 90 days. Spot is Rs 84.00. The bank sells a 90-day forward. With a forward premium of about 2.0 percent per annum on the rupee, forward rate is roughly 84.00 x (1 + 0.02 x 90/365) = about Rs 84.41.

The importer locks in a cost of 2,000,000 x 84.41 = about Rs 16.88 crore, regardless of where spot goes. If spot rises to Rs 86 the importer is protected, and if spot falls to Rs 82 the importer does not benefit. The bank, having bought USD forward from the market to cover, runs the book so the NOP stays within limits.

All spot and rate numbers here are illustrative.

## 6. Risk limits and controls

A treasury risk framework usually includes:

- **Market risk limits:** duration or modified duration, PV01, stop-loss, Value at Risk, and exposure by issuer, rating and sector.
- **Counterparty and settlement limits.**
- **Independent valuation** of positions using market sources such as FIMMDA or FBIL benchmarks. [Verify.]
- **Front, mid and back office segregation** and regular reporting to ALCO and the board.

## 7. Common mistakes and coaching points

- Using HTM to hide losses, without considering economic value and flexibility.
- Ignoring PV01 and duration when sizing a position, then being surprised by MTM losses.
- Concentrating in one tenor or issuer, such as a heavy SDL position.
- Forgetting that pledged securities are not freely available for SLR or liquidity needs.
- Leaving an FX exposure unhedged because the rate view is "obvious".
- Chasing a few basis points in money market pricing while breaching counterparty limits.

## 8. Practice questions

1. A portfolio of Rs 8,000 crore has modified duration 3.5. Approximately how much does it lose if yields rise 20 basis points?
*(About 8,000 crore x 3.5 x 0.20% = Rs 56 crore.)*

2. Why might a treasurer prefer to hold a G-sec in HTM rather than AFS, and what is the trade-off?
*(HTM avoids MTM volatility in reported earnings and reserves, but limits the ability to sell, and economic losses still exist. AFS offers flexibility but exposes reserves to yield moves.)*

3. An exporter will receive USD 1 million in 60 days and fears the rupee will strengthen. What basic hedge can the bank offer?
*(A forward sale of USD for rupees in 60 days, locking in today's forward rate and removing the rate risk.)*
