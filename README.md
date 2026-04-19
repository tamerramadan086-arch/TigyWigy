# TigyWigy — Global L&D Platform

> **World-class learning, everywhere.**
> 120 modules · 7 world regions · 24 languages · 50+ countries · 10 learning categories

TigyWigy is a comprehensive **global Learning & Development (L&D) instructional design platform** providing culturally-contextualised, regulatory-aligned learning modules for organisations operating worldwide.

---

## Platform Overview

| Metric | Value |
|---|---|
| Total Modules | 120 |
| World Regions | 7 |
| Languages | 24 |
| Countries Covered | 50+ |
| Learning Categories | 10 |
| Certified Modules | 65+ |

---

## World Regions

| Region | Emoji | Modules | Key Languages |
|---|---|---|---|
| North America | 🌎 | 18 | English, French, Spanish |
| South America | 🌿 | 16 | Portuguese, Spanish |
| Europe | 🏛️ | 20 | English, German, French, Spanish, Italian, Dutch |
| Africa | 🦁 | 15 | English, French, Swahili, Arabic, Afrikaans |
| Middle East | 🕌 | 14 | Arabic, English, Hebrew, Turkish |
| Asia Pacific | 🌏 | 22 | Mandarin, Japanese, Hindi, English, Korean, Malay |
| Global / Universal | 🌍 | 15 | English + 7 languages |

---

## Learning Categories

| Category | Description |
|---|---|
| ⭐ Leadership Development | Situational leadership, coaching, executive presence, remote team management |
| 💻 Technical Skills | Agile, project management, data analysis, cybersecurity, financial modelling |
| 🛡️ Compliance & Ethics | GDPR, CCPA, LGPD, PIPL, anti-bribery (FCPA/UK Bribery Act), AML, labour law |
| 🤝 Diversity, Equity & Inclusion | Unconscious bias, cultural inclusion, gender equity, Indigenous awareness |
| 📱 Digital Transformation | AI literacy, Industry 4.0, digital skills, fintech, innovation |
| 💬 Communication & Soft Skills | Executive presence, negotiation, inclusive communication, global collaboration |
| ❤️ Health, Safety & Wellbeing | Mental health, OSHA/WHS/EU compliance, resilience, ergonomics |
| 🌐 Cultural Intelligence | CQ framework, cross-cultural communication, regional business culture |
| 📈 Sales & Customer Excellence | Consultative selling, CX, negotiation, customer journey |
| 💰 Finance & Business Acumen | Financial literacy, ASEAN markets, ESG reporting, financial modelling |

---

## Instructional Design Framework

TigyWigy is built on a rigorous, evidence-based instructional design foundation:

### ADDIE Model
All modules follow the **ADDIE** methodology:
1. **Analyse** — Learning needs analysis (LNA), audience profiling, cultural context mapping
2. **Design** — Bloom's Taxonomy objectives, assessment strategy, storyboarding
3. **Develop** — Content creation, localisation, accessibility review
4. **Implement** — LMS deployment, facilitator preparation, communication planning
5. **Evaluate** — Kirkpatrick's four levels: Reaction → Learning → Behaviour → Results

### Learning Science Principles
- **Spaced Repetition** — Optimal intervals for long-term retention
- **Andragogy (Knowles)** — Adult learning principles throughout
- **Cognitive Load Theory** — Chunked, scaffolded content design
- **Scenario-Based Learning** — Real-world application in all modules
- **Universal Design** — WCAG 2.1 AA accessibility for all digital content

### Global Localisation Standard (5 Levels)
| Level | What's Adapted |
|---|---|
| L1 | Human translation with native-speaker review |
| L2 | Examples, names, images, scenarios replaced |
| L3 | Regulatory references updated per jurisdiction |
| L4 | Visual design, RTL support, cultural imagery |
| L5 | In-country SME validation |

### Quality Standards
- WCAG 2.1 AA (accessibility)
- SCORM 2004 + xAPI (LMS compatibility)
- ISO 29993 (learning services quality)
- GDPR / regional data protection compliance

---

## Repository Structure

```
TigyWigy/
├── index.html                          # Main web application
├── css/
│   └── styles.css                      # Platform styles
├── js/
│   └── app.js                          # Application logic
├── data/
│   ├── global-modules.json             # Platform metadata & region index
│   └── regions/
│       ├── north-america.json          # 18 North America modules
│       ├── south-america.json          # 16 South America modules
│       ├── europe.json                 # 20 Europe modules
│       ├── africa.json                 # 15 Africa modules
│       ├── middle-east.json            # 14 Middle East modules
│       ├── asia-pacific.json           # 22 Asia Pacific modules
│       └── global.json                 # 15 Global/Universal modules
└── templates/
    ├── module-template.json            # Standard module design template
    ├── course-template.json            # Learning pathway template
    └── needs-analysis-template.json    # Learning needs analysis (LNA) template
```

---

## Running the Platform

The platform is a static web application. Serve it with any HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:8000` in your browser.

> **Note:** The app uses `fetch()` to load regional JSON data, so it must be served over HTTP (not opened as a local file directly).

---

## Module Data Schema

Each module in the regional JSON files follows this schema:

```json
{
  "id": "eu-001",
  "title": "GDPR Compliance & Data Protection",
  "category": "compliance",
  "level": "Foundational | Intermediate | Advanced",
  "duration": "3 hours",
  "format": ["eLearning"],
  "languages": ["English", "German", "French"],
  "description": "...",
  "learningObjectives": ["Objective 1", "Objective 2"],
  "audience": "All EU/EEA employees",
  "prerequisites": [],
  "assessmentType": "Regulatory test (80% pass mark)",
  "certification": true,
  "countries": ["All EU/EEA countries"]
}
```

---

## Adding New Modules

1. Copy `templates/module-template.json`
2. Fill in all required fields following the schema
3. Add the module object to the appropriate `data/regions/<region>.json` file
4. Update `moduleCount` in `data/global-modules.json`

---

## Adding New Regions

1. Create `data/regions/<new-region>.json` following the existing structure
2. Add the region entry to `data/global-modules.json`
3. Add region configuration to the `REGIONS` array in `js/app.js`

---

## Instructional Design Templates

| Template | Purpose |
|---|---|
| `module-template.json` | Design blueprint for a single learning module |
| `course-template.json` | Design blueprint for a multi-module learning pathway |
| `needs-analysis-template.json` | Learning Needs Analysis (LNA) to be completed before any new development |

---

## License

© TigyWigy. All rights reserved.