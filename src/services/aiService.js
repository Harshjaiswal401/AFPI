// Service to connect AeroBot directly to OpenRouter AI API

const DEFAULT_API_KEY = "";

const SYSTEM_PROMPT = `You are AeroBot, the AI Sentinel and Regulatory Intelligence Node (v4.2-DGCA) for AeroIndex — the National Airfare Price Index & Intelligence Platform under the Ministry of Civil Aviation (MoCA), Government of India, and the Directorate General of Civil Aviation (DGCA).

You are speaking directly to Officer Harsh Jaiswal (Senior Director & Chief Aviation Intelligence Officer).

Context & Capabilities:
- Today's Date: September 2026.
- Monitored Corridors: 15 key Indian domestic routes including DEL-BOM, DEL-BLR, BOM-BLR, MAA-DEL, CCU-DEL, HYD-BOM, PNQ-DEL, GOI-BOM, IXC-BOM, AMD-DEL, PAT-DEL (DEL-PAT), LKO-DEL, GAU-DEL, COK-DEL, BBI-DEL.
- Airlines Monitored: IndiGo (6E), Air India (AI), Vistara (UK), SpiceJet (SG), Akasa Air (QP), Alliance Air (9I).
- Active Surges & Events:
  * DEL-PAT: +62% surge during Chhath Puja festive rush, IndiGo holding 68% market share. Show-Cause notice recommended under Aircraft Rules Rule 135 & ARC §4.2(b).
  * BOM-GOI: +41% post-monsoon disruption recovery on Air India.
  * CCU-DEL: +55% Durga Puja return surge on IndiGo.
- Regulatory Standards:
  * Section 4.2(b) & Rule 135 of Aircraft Rules, 1937 (Tariff transparency & cost-plus principle).
  * Section 65B of Indian Evidence Act, 1872 for cryptographic scraper evidence admissibility.
  * CCPA 2023 Guidelines for Prevention and Regulation of Dark Patterns (drip pricing on OTAs like MakeMyTrip, Cleartrip, Yatra).
  * UDAN Regional Connectivity Scheme fare cap benchmarks (~₹2,500/hr).
- Tone: Highly professional, authoritative, analytical, concise, and structured with bullet points and bold highlights. Address Officer Harsh Jaiswal respectfully (e.g., "Jai Hind Officer Harsh Jaiswal", "Sir").`;

export async function askAeroBot(userQuery, conversationHistory = []) {
  const apiKey = import.meta.env?.VITE_OPENROUTER_API_KEY || DEFAULT_API_KEY;
  const model = import.meta.env?.VITE_AI_MODEL || "google/gemini-2.5-flash";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: "user", content: userQuery }
  ];

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AeroIndex DGCA Platform"
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.4,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("OpenRouter API returned error:", response.status, errText);
      // Fallback to secondary model if primary fails
      return await fallbackModel(apiKey, messages);
    }

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    throw new Error("Invalid response format from OpenRouter");
  } catch (error) {
    console.error("OpenRouter fetch failed:", error);
    // Intelligent local fallback if offline or network error
    return getLocalIntelligenceFallback(userQuery);
  }
}

async function fallbackModel(apiKey, messages) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AeroIndex DGCA Platform"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages,
        temperature: 0.4,
        max_tokens: 600
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data.choices[0]?.message?.content;
    }
  } catch (e) {
    console.error("Secondary fallback error:", e);
  }
  return getLocalIntelligenceFallback(messages[messages.length - 1].content);
}

function getLocalIntelligenceFallback(query) {
  const lower = query.toLowerCase();
  if (lower.includes('del-pat') || lower.includes('chhath') || lower.includes('patna')) {
    return `⚠️ **SURGE ALERT TRIGGERED on DEL-PAT**\n\n- **Carrier:** IndiGo (68% Market Share)\n- **Median Fare:** ₹6,804 (Surged +62% vs ₹4,200 base)\n- **Anomaly Score:** Z-Score +3.42σ\n- **Regulatory Finding:** Artificial capacity restriction identified in economy buckets during Chhath Puja.\n\nRecommended Action: Immediate statutory Show-Cause Notice dispatch under Rule 135.`;
  }
  if (lower.includes('indigo') || lower.includes('compliance')) {
    return `📊 **DGCA Compliance Summary: IndiGo (6E)**\n\n- **Fleet On-Time Index:** 88.4%\n- **Surge Violation Count (Q3):** 3 corridors (DEL-PAT, CCU-DEL, BOM-GOI)\n- **Dynamic Price Velocity:** +14.2% / 48 hrs pre-departure\n- **Status:** 1 Show-Cause Notice Pending Hearing on 24 Sep 2026.`;
  }
  if (lower.includes('crypto') || lower.includes('ledger') || lower.includes('hash')) {
    return `🔒 **Cryptographic Ledger Status:**\n\n- **Active Chain:** Block #8841-A\n- **Latest Merkle Root:** \`0x9F4C...81E2\`\n- **Snapshot Count:** 1,284,320 validated rows\n- **Integrity Seal:** 100% Verified by DGCA Central Node.`;
  }
  return `Jai Hind Officer Harsh Jaiswal. Real-time telemetry across all 15 domestic corridors confirms continuous monitoring. The national airfare price index is currently operating with standard variance across scheduled carriers.`;
}
