# KYC, AML and CFT under the PMLA

*Knowledge area: KYC, anti-money laundering and countering financing of terrorism. Audience: compliance managers at Indian banks and NBFCs. Draft for coaching use; items marked [Verify] need SME confirmation against the current PMLA, PML Rules, RBI KYC Master Direction and FIU-IND guidance.*

## 1. The legal framework

India's AML/CFT regime rests on:

- **The Prevention of Money Laundering Act, 2002 (PMLA)** and the PML (Maintenance of Records) Rules, which define the obligations of "reporting entities" including banks and NBFCs.
- **RBI's Master Direction on Know Your Customer (KYC)**, which sets customer identification, due diligence and record-keeping requirements for regulated entities. [Verify: the current version and amendments.]
- **FIU-IND (Financial Intelligence Unit - India)**, which receives cash, suspicious and other transaction reports.
- **Sanctions and UN lists**, implemented under laws such as the Unlawful Activities (Prevention) Act, and the UNSC lists. [Verify: current procedure for freezing and updating lists.]

The three objectives are: know your customer, monitor transactions, and report to the authorities. All three have to work together.

## 2. Customer due diligence (CDD)

CDD has four steps:

1. **Identify** the customer and verify identity using officially valid documents (OVDs) or other permitted methods such as Aadhaar-based e-KYC or Video-based Customer Identification Process (V-CIP). [Verify: the list of OVDs and permitted digital methods.]
2. **Identify the beneficial owner** (see section 4).
3. **Understand the purpose and intended nature of the relationship.**
4. **Conduct ongoing due diligence**: monitor transactions against the customer's profile and keep records up to date.

Simplified measures can apply to low-risk situations, and small accounts have restricted features. Enhanced due diligence (EDD) applies to higher-risk customers.

## 3. Risk categorisation and EDD

Every customer must be classified by risk, normally low, medium or high. Factors:

- **Customer type:** individual, company, trust, partnership, NGO, politically exposed person (PEP).
- **Geography:** customers from or transacting with high-risk jurisdictions.
- **Product and channel:** cash-intensive products, non-face-to-face onboarding, correspondent or trade finance.
- **Transaction behaviour:** volumes and patterns inconsistent with the profile.
- **Occupation or business:** jewellers, real estate, money service businesses, crypto-related businesses, cash-heavy retailers.

**EDD** for high-risk customers typically includes senior management approval to onboard, source of funds and source of wealth verification, more frequent re-KYC, closer transaction monitoring and, for PEPs, approval and continuous monitoring. [Verify: specific RBI requirements for PEPs.]

**Periodic updation (re-KYC)** is risk-based: more frequent for high-risk and less frequent for low-risk customers. [Verify: the current periodicity and process for each risk category.]

## 4. Beneficial ownership

Companies and trusts hide behind layers of ownership. The compliance question is: who is the natural person who ultimately owns or controls this entity, or on whose behalf the transaction is conducted?

- For a company, look at the natural persons with a controlling ownership interest, or who exercise control by other means. [Verify: the ownership percentage thresholds for companies, partnerships and trusts in the PML Rules.]
- For a trust, identify the settlor, trustees, protector and beneficiaries.
- If no natural person is found through ownership or control, the senior managing official is treated as the beneficial owner. [Verify.]
- Do not accept "we couldn't find out" for a high-risk or complex structure. Escalate or decline.

## 5. Transaction monitoring

Monitoring uses rules and, increasingly, analytics to generate **alerts**. Common scenarios:

- Cash deposits just below reporting limits (structuring or "smurfing").
- Rapid movement of funds in and out of an account with no business rationale (pass-through or mule account).
- Transactions inconsistent with declared income or business.
- Sudden activity in a dormant account.
- Round-tripping in loan accounts, such as an early closure from unrelated third-party funds.
- Transactions with high-risk jurisdictions or sanctioned names.

An alert is not an STR. An alert is a prompt to investigate. Good practice is to document the investigation: who the customer is, what the alert is about, what explanation was sought and received, and the decision with reasons. Track alert ageing and false-positive rates, and tune scenarios with evidence.

## 6. Reporting to FIU-IND: CTR, STR and others

| Report | Trigger | Comment |
|---|---|---|
| **Cash Transaction Report (CTR)** | Cash transactions above the prescribed threshold, including integrally connected transactions | [Verify: current threshold, aggregation rule and filing timeline] |
| **Suspicious Transaction Report (STR)** | Transactions, including attempted ones, that give rise to reasonable ground of suspicion of money laundering, proceeds of crime or terrorist financing | [Verify: the filing timeline from the date the suspicion is established; no monetary threshold] |
| **Counterfeit Currency Report (CCR)** | Genuine cases of counterfeit notes | [Verify] |
| **Cross-border wire transfer reports** | As prescribed | [Verify] |

Key principles for STRs:

- There is no minimum amount. Suspicion, not proof, is the standard.
- **Attempted transactions** and customers who decline to give information can also be reported.
- **Tipping off is prohibited.** Do not tell the customer or any unauthorised person that an STR has been or will be filed.
- The Principal Officer designated under PMLA is responsible for filing; the Designated Director is responsible for overall compliance. [Verify: roles under the PML Rules.]
- Record the rationale. A well-written STR explains who, what, when, how, and why it is suspicious.
- Keep records for the prescribed period. [Verify: record retention periods.]

## 7. Sanctions and screening

Screen customers (at onboarding and on list updates), beneficial owners and, where relevant, counterparties against UN and other applicable lists. Handle matches carefully: confirm whether the match is true (name, date of birth, identifiers), escalate true matches immediately, and follow legal procedure for freezing and reporting. Name matching creates many false positives, so you need a defined disposition process and evidence.

## 8. Worked example: structured cash deposits

A branch of a mid-sized bank flags an alert on a savings account held by a salaried employee with declared annual income of about Rs 9 lakh. Over three weeks the account receives 14 cash deposits of Rs 45,000 to Rs 49,000 each, followed by same-day RTGS transfers to three unrelated individuals in other states.

Analysis:

1. The pattern is consistent with structuring (staying under an internal or regulatory cash reporting level) and pass-through activity. The cash total of roughly Rs 6.6 lakh in three weeks is far above what the profile suggests.
2. The investigator asks the relationship manager for an explanation and any documents. The customer says it is "family business money", but offers no records and the stated occupation does not mention business.
3. The investigator reviews the beneficiaries, finds that two receiving accounts also appear in other alerts, and checks adverse media. [Verify: internal alert linkage steps.]
4. Decision: the explanation is not credible and the activity lacks economic rationale, so the Principal Officer files an STR within the prescribed time, and the customer is re-categorised to high risk with EDD. [Verify: timeline.]
5. The branch is instructed not to discuss the STR with the customer. The account continues to be monitored. Exit is considered with legal and senior management input, not as a way of tipping off.

## 9. Common mistakes and coaching points

- Closing alerts with "customer is known to us" and no analysis.
- Treating KYC as a one-time onboarding checkbox rather than ongoing due diligence.
- Failing to identify beneficial owners of complex structures.
- Delaying an STR while waiting for "proof".
- Tipping off by telling the relationship manager to ask the customer pointed questions that reveal the suspicion.
- Not linking alerts across accounts for the same person or group.
- Rule thresholds that have not been tuned in years, flooding analysts with false positives.
- Outsourcing KYC to a third party without retaining accountability. The regulated entity remains responsible.

## 10. Practice questions

1. Is there a minimum amount for filing an STR?
   *(No. The test is reasonable suspicion, not a monetary threshold, and attempted transactions can also be reported.)*
2. What is the difference between an alert and an STR?
   *(An alert is a system-generated prompt to investigate. An STR is a formal report to FIU-IND after investigation concludes there are reasonable grounds for suspicion.)*
3. A relationship manager wants to ask a customer why they structured deposits, after the STR is filed. Should they?
   *(No. That risks tipping off, which is prohibited. Further queries should be handled through compliance and the Principal Officer.)*
