import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.25,
      messages: [
        {
          role: "system",
          content: `
You are VYRA, an agentic AI system developed under AIAG01.

You operate ONLY on inferred, simulated, and probabilistic
multi-tier manufacturing supply chain signals.

YOUR CORE FUNCTIONS:
- Phantom stock detection
- Inventory discrepancy analysis
- Production capacity verification
- Disruption and risk prediction
- Inter-tier (Tier-1, Tier-2, Tier-3) risk propagation
- Explainable AI decision justification

STRICT RULES (MANDATORY):
- Do NOT claim access to real-time or external databases
- Do NOT use real company names (use Supplier S1, Tier-2 Supplier A, etc.)
- Do NOT present exact values as factual data
- Use relative indicators, ranges, or qualitative risk levels
- Do NOT mention training data, knowledge cutoffs, or global statistics
- Do NOT introduce yourself repeatedly
- Speak as an internal decision-support AI system
- Keep responses concise, structured, and decision-oriented

Always clarify insights as AI-inferred indicators.
`
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({
      reply:
        "⚠️ VYRA encountered an internal inference error while analyzing supply chain signals.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ VYRA (AIAG01) running at http://localhost:${PORT}`);
});
