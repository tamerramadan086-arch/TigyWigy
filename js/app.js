/* ============================================
   TigyWigy Global L&D Platform — App Logic
   ============================================ */

const REGIONS = [
  {
    id: "north-america",
    name: "North America",
    emoji: "🌎",
    color: "#4F46E5",
    bgColor: "#EEF2FF",
    countries: "United States · Canada · Mexico",
    languages: "English · French · Spanish",
    moduleCount: 18
  },
  {
    id: "south-america",
    name: "South America",
    emoji: "🌿",
    color: "#059669",
    bgColor: "#ECFDF5",
    countries: "Brazil · Argentina · Colombia · Chile · Peru",
    languages: "Portuguese · Spanish",
    moduleCount: 16
  },
  {
    id: "europe",
    name: "Europe",
    emoji: "🏛️",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    countries: "UK · Germany · France · Spain · Italy · Netherlands + more",
    languages: "English · German · French · Spanish · Italian · Dutch",
    moduleCount: 20
  },
  {
    id: "africa",
    name: "Africa",
    emoji: "🦁",
    color: "#D97706",
    bgColor: "#FFFBEB",
    countries: "South Africa · Nigeria · Kenya · Ghana · Egypt · Rwanda + more",
    languages: "English · French · Swahili · Arabic · Afrikaans",
    moduleCount: 15
  },
  {
    id: "middle-east",
    name: "Middle East",
    emoji: "🕌",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    countries: "UAE · Saudi Arabia · Qatar · Kuwait · Turkey · Israel + more",
    languages: "Arabic · English · Hebrew · Turkish",
    moduleCount: 14
  },
  {
    id: "asia-pacific",
    name: "Asia Pacific",
    emoji: "🌏",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    countries: "China · Japan · India · Australia · Singapore · Korea + more",
    languages: "Mandarin · Japanese · Hindi · English · Korean · Malay",
    moduleCount: 22
  },
  {
    id: "global",
    name: "Global / Universal",
    emoji: "🌍",
    color: "#374151",
    bgColor: "#F9FAFB",
    countries: "All Countries",
    languages: "English + 7 other languages",
    moduleCount: 15
  }
];

const CATEGORIES = [
  { id: "leadership", name: "Leadership Development", icon: "⭐", color: "#4F46E5" },
  { id: "technical", name: "Technical Skills", icon: "💻", color: "#0891B2" },
  { id: "compliance", name: "Compliance & Ethics", icon: "🛡️", color: "#DC2626" },
  { id: "dei", name: "Diversity, Equity & Inclusion", icon: "🤝", color: "#7C3AED" },
  { id: "digital", name: "Digital Transformation", icon: "📱", color: "#059669" },
  { id: "communication", name: "Communication & Soft Skills", icon: "💬", color: "#D97706" },
  { id: "health-safety", name: "Health, Safety & Wellbeing", icon: "❤️", color: "#E11D48" },
  { id: "cultural", name: "Cultural Intelligence", icon: "🌐", color: "#0284C7" },
  { id: "sales", name: "Sales & Customer Excellence", icon: "📈", color: "#16A34A" },
  { id: "finance", name: "Finance & Business Acumen", icon: "💰", color: "#CA8A04" }
];

/* In-memory module store populated from JSON files */
let ALL_MODULES = [];
let filteredModules = [];

/* ============================================
   Data Loading
   ============================================ */
async function loadAllModules() {
  const regionFiles = [
    "north-america", "south-america", "europe",
    "africa", "middle-east", "asia-pacific", "global"
  ];

  const promises = regionFiles.map(r =>
    fetch(`data/regions/${r}.json`)
      .then(res => res.json())
      .then(data => data.modules.map(m => ({ ...m, region: r })))
      .catch(() => [])
  );

  const results = await Promise.all(promises);
  ALL_MODULES = results.flat();
  filteredModules = [...ALL_MODULES];

  renderAllModulesGrid();
  renderFeaturedModules();
  renderWorldRegionsList();
  updateResultsCount();
}

/* ============================================
   View Navigation
   ============================================ */
function switchView(viewName) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

  const view = document.getElementById(`view-${viewName}`);
  if (view) view.classList.add("active");

  const link = document.querySelector(`[data-view="${viewName}"]`);
  if (link) link.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================
   Rendering — Region Cards (Dashboard)
   ============================================ */
function renderRegionGrid() {
  const container = document.getElementById("regionGrid");
  if (!container) return;

  container.innerHTML = REGIONS.map(region => `
    <div class="region-card" style="--region-color: ${region.color}"
         onclick="filterByRegion('${region.id}')">
      <span class="region-emoji">${region.emoji}</span>
      <div class="region-name">${region.name}</div>
      <div class="region-countries">${region.countries}</div>
      <div class="region-stats">
        <div class="region-stat">
          <span class="region-stat-number">${region.moduleCount}</span>
          <span class="region-stat-label">Modules</span>
        </div>
      </div>
    </div>
  `).join("");
}

/* ============================================
   Rendering — Category Grid
   ============================================ */
function renderCategoryGrid() {
  const container = document.getElementById("categoryGrid");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.id}')">
      <span class="category-icon">${cat.icon}</span>
      <div class="category-name">${cat.name}</div>
    </div>
  `).join("");
}

/* ============================================
   Rendering — Featured Modules (Global)
   ============================================ */
function renderFeaturedModules() {
  const container = document.getElementById("featuredModules");
  if (!container) return;

  const featured = ALL_MODULES
    .filter(m => m.region === "global")
    .slice(0, 6);

  container.innerHTML = featured.map(m => renderModuleCard(m)).join("");
}

/* ============================================
   Rendering — All Modules Grid
   ============================================ */
function renderAllModulesGrid() {
  const container = document.getElementById("allModulesGrid");
  if (!container) return;

  if (filteredModules.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1">
        <span class="empty-state-icon">🔍</span>
        <div class="empty-state-title">No modules found</div>
        <div class="empty-state-desc">Try adjusting your filters or search terms.</div>
      </div>`;
    return;
  }

  container.innerHTML = filteredModules.map(m => renderModuleCard(m)).join("");
}

/* ============================================
   Rendering — Module Card
   ============================================ */
function renderModuleCard(module) {
  const cat = CATEGORIES.find(c => c.id === module.category) || { icon: "📚", name: module.category };
  const certBadge = module.certification
    ? `<span class="module-cert-badge">🏆 Certified</span>` : "";

  return `
    <div class="module-card" onclick="openModuleModal('${module.id}', '${module.region}')">
      <div class="module-card-header">
        <span class="module-category-badge cat-${module.category}">${cat.icon} ${cat.name}</span>
        <span class="module-level-badge level-${module.level}">${module.level}</span>
      </div>
      <div class="module-title">${module.title}</div>
      <div class="module-description">${module.description}</div>
      <div class="module-card-footer">
        <span class="module-meta"><span class="module-meta-icon">⏱️</span>${module.duration}</span>
        <span class="module-meta"><span class="module-meta-icon">📋</span>${module.format[0]}</span>
        <span class="module-meta"><span class="module-meta-icon">🌐</span>${module.languages[0]}${module.languages.length > 1 ? " +" + (module.languages.length - 1) : ""}</span>
        ${certBadge}
      </div>
    </div>`;
}

/* ============================================
   Rendering — World Regions List
   ============================================ */
function renderWorldRegionsList() {
  const container = document.getElementById("worldRegionsList");
  if (!container) return;

  container.innerHTML = REGIONS.map(region => {
    const modules = ALL_MODULES.filter(m => m.region === region.id).slice(0, 4);
    const moduleCards = modules.map(m => renderModuleCard(m)).join("");

    return `
      <div class="world-region-section">
        <div class="world-region-header" style="--region-bg: ${region.bgColor}"
             onclick="filterByRegion('${region.id}')">
          <span class="world-region-emoji">${region.emoji}</span>
          <div class="world-region-info">
            <div class="world-region-name">${region.name}</div>
            <div class="world-region-countries">${region.countries}</div>
          </div>
          <div class="world-region-count">
            ${region.moduleCount}
            <span>modules</span>
          </div>
        </div>
        <div class="world-region-modules">
          ${moduleCards}
          ${modules.length > 0 ? `
            <div class="module-card" style="background: var(--gray-50); justify-content: center; align-items: center; text-align: center; min-height: 160px;"
                 onclick="filterByRegion('${region.id}')">
              <div style="font-size: 32px; margin-bottom: 8px;">→</div>
              <div style="font-weight: 700; color: var(--primary);">View all ${region.moduleCount} modules</div>
            </div>` : ""}
        </div>
      </div>`;
  }).join("");
}

/* ============================================
   Rendering — ID Framework
   ============================================ */
function renderFramework() {
  const container = document.getElementById("frameworkContent");
  if (!container) return;

  container.innerHTML = `
    <div class="framework-section">
      <div class="framework-section-title"><span>📐</span> ADDIE Instructional Design Model</div>
      <div class="framework-section-desc">
        TigyWigy applies the globally-recognized ADDIE model as the backbone for all module development,
        ensuring systematic, evidence-based design that delivers measurable learning outcomes across all regions and cultures.
      </div>
      <div class="framework-steps">
        ${[
          { n: "01", title: "Analyse", desc: "Identify learning needs, target audience, performance gaps, and cultural context for each region." },
          { n: "02", title: "Design", desc: "Define learning objectives using Bloom's Taxonomy, choose delivery methods, and create assessment strategies." },
          { n: "03", title: "Develop", desc: "Build content, multimedia, interactives, and culturally-localized versions across target languages." },
          { n: "04", title: "Implement", desc: "Deploy via LMS, facilitate live sessions, and manage rollout across global employee populations." },
          { n: "05", title: "Evaluate", desc: "Apply Kirkpatrick's four levels: Reaction, Learning, Behaviour, Results. Iterate based on data." }
        ].map(s => `
          <div class="framework-step">
            <div class="framework-step-number">${s.n}</div>
            <div class="framework-step-title">${s.title}</div>
            <div class="framework-step-desc">${s.desc}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="framework-section">
      <div class="framework-section-title"><span>🧠</span> Learning Science Principles</div>
      <div class="framework-section-desc">
        Every TigyWigy module is grounded in cognitive science and adult learning theory to maximize knowledge retention and behaviour change.
      </div>
      <div class="principles-grid">
        ${[
          { icon: "🔁", title: "Spaced Repetition", desc: "Content revisited at optimal intervals to move knowledge from working memory to long-term memory." },
          { icon: "📖", title: "Andragogy (Knowles)", desc: "Adult learners are self-directed, experience-based, and need relevance. All modules respect these principles." },
          { icon: "🎯", title: "Bloom's Taxonomy", desc: "Objectives span all six cognitive levels — from remembering to creating — appropriate to each module's goals." },
          { icon: "🔬", title: "Cognitive Load Theory", desc: "Content is chunked, scaffolded, and designed to respect working memory limits and avoid extraneous load." },
          { icon: "📊", title: "Kirkpatrick Model", desc: "All modules are evaluated at four levels: Reaction, Learning, Behaviour, and organizational Results." },
          { icon: "🌍", title: "Cultural Adaptation", desc: "Hofstede's and Trompenaars' frameworks inform how content is adapted for high-context vs. low-context cultures." },
          { icon: "🎮", title: "Scenario-Based Learning", desc: "Realistic workplace scenarios ensure learners can apply knowledge in context, not just recall it in tests." },
          { icon: "♿", title: "Universal Design", desc: "All modules meet WCAG 2.1 AA accessibility standards and support diverse learning needs globally." }
        ].map(p => `
          <div class="principle-card">
            <span class="principle-icon">${p.icon}</span>
            <div class="principle-title">${p.title}</div>
            <div class="principle-desc">${p.desc}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="framework-section">
      <div class="framework-section-title"><span>🌐</span> Global Localisation Standards</div>
      <div class="framework-section-desc">
        TigyWigy goes beyond translation. True localisation adapts examples, scenarios, regulatory references, visual design, and cultural norms for each target market.
      </div>
      <div class="framework-steps">
        ${[
          { n: "L1", title: "Translation", desc: "Professional human translation with native-speaker review. Machine translation is only used as a first draft." },
          { n: "L2", title: "Cultural Adaptation", desc: "Examples, names, images, and scenarios replaced with locally relevant equivalents." },
          { n: "L3", title: "Regulatory Alignment", desc: "Legal references, compliance requirements, and standards updated for each jurisdiction." },
          { n: "L4", title: "Visual Localisation", desc: "Colour palettes, imagery, reading direction (RTL for Arabic/Hebrew), and UI adapted per culture." },
          { n: "L5", title: "Validation", desc: "In-country subject matter experts review final content for accuracy, appropriateness, and effectiveness." }
        ].map(s => `
          <div class="framework-step">
            <div class="framework-step-number" style="color: var(--secondary)">${s.n}</div>
            <div class="framework-step-title">${s.title}</div>
            <div class="framework-step-desc">${s.desc}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="framework-section">
      <div class="framework-section-title"><span>📏</span> Quality Standards</div>
      <div class="framework-section-desc">
        All TigyWigy modules meet or exceed international quality and accessibility benchmarks.
      </div>
      <div class="principles-grid">
        ${[
          { icon: "✅", title: "WCAG 2.1 AA", desc: "Web Content Accessibility Guidelines compliance for all digital learning content." },
          { icon: "📱", title: "xAPI / SCORM 2004", desc: "All eLearning modules are SCORM 2004 and xAPI compliant for LMS integration." },
          { icon: "🏆", title: "ISO 29993", desc: "Learning services outside formal education aligned with ISO quality framework." },
          { icon: "🔒", title: "GDPR / Data Privacy", desc: "Learner data is handled in full compliance with GDPR and regional data protection laws." },
          { icon: "🌱", title: "Carbon Literacy", desc: "Digital delivery minimises carbon footprint vs. in-person alternatives." },
          { icon: "📐", title: "Instructional QA", desc: "All content passes three-stage QA: SME review, instructional design review, final editorial." }
        ].map(p => `
          <div class="principle-card">
            <span class="principle-icon">${p.icon}</span>
            <div class="principle-title">${p.title}</div>
            <div class="principle-desc">${p.desc}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="framework-section">
      <div class="framework-section-title"><span>📋</span> Module Template</div>
      <div class="framework-section-desc">
        Every module in the TigyWigy platform follows a standardized design template ensuring consistency across all 120+ modules and all regions.
      </div>
      <div class="framework-steps">
        ${[
          { n: "S1", title: "Welcome & Context", desc: "Set the scene: why this learning matters, what problem it solves, real-world relevance." },
          { n: "S2", title: "Learning Objectives", desc: "Clear, measurable outcomes stated using Bloom's action verbs at the appropriate cognitive level." },
          { n: "S3", title: "Core Content", desc: "Chunked into 5-7 minute learning objects with interactives, scenarios, and knowledge checks." },
          { n: "S4", title: "Practice & Application", desc: "Scenario-based exercises, decision trees, or simulations for learners to apply knowledge." },
          { n: "S5", title: "Assessment", desc: "Summative assessment aligned to objectives. Minimum pass marks for compliance modules: 80%." },
          { n: "S6", title: "Summary & Next Steps", desc: "Consolidation of key takeaways, resources, and performance support tools for on-the-job application." }
        ].map(s => `
          <div class="framework-step">
            <div class="framework-step-number" style="color: var(--success)">${s.n}</div>
            <div class="framework-step-title">${s.title}</div>
            <div class="framework-step-desc">${s.desc}</div>
          </div>`).join("")}
      </div>
    </div>`;
}

/* ============================================
   Module Detail Modal
   ============================================ */
async function openModuleModal(moduleId, region) {
  const module = ALL_MODULES.find(m => m.id === moduleId && m.region === region);
  if (!module) return;

  const cat = CATEGORIES.find(c => c.id === module.category) || { icon: "📚", name: module.category };

  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-category-badge cat-${module.category}">${cat.icon} ${cat.name}</span>
      <div class="modal-title">${module.title}</div>
      <div class="modal-meta-row">
        <div class="modal-meta-item">📊 <strong>${module.level}</strong></div>
        <div class="modal-meta-item">⏱️ <strong>${module.duration}</strong></div>
        <div class="modal-meta-item">👥 <strong>${module.audience}</strong></div>
        ${module.certification ? '<div class="modal-meta-item">🏆 <strong>Certification Included</strong></div>' : ""}
      </div>
    </div>

    <div class="modal-description">${module.description}</div>

    <div class="modal-section">
      <div class="modal-section-title">Learning Objectives</div>
      <ul class="objectives-list">
        ${module.learningObjectives.map(obj => `<li>${obj}</li>`).join("")}
      </ul>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Delivery Formats</div>
      <div class="tag-list">
        ${module.format.map(f => `<span class="tag">📋 ${f}</span>`).join("")}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Available Languages</div>
      <div class="tag-list">
        ${module.languages.map(l => `<span class="tag">🌐 ${l}</span>`).join("")}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Countries</div>
      <div class="tag-list">
        ${(Array.isArray(module.countries) ? module.countries : [module.countries])
          .map(c => `<span class="tag">📍 ${c}</span>`).join("")}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Assessment & Certification</div>
      <div style="font-size: 15px; color: var(--gray-700)">
        <strong>Method:</strong> ${module.assessmentType}
        ${module.certification ? '<br><strong>Certification:</strong> ✅ A verifiable digital certificate is issued on completion.' : ''}
        ${module.prerequisites && module.prerequisites.length > 0
          ? `<br><strong>Prerequisites:</strong> ${module.prerequisites.join(", ")}`
          : ""}
      </div>
    </div>`;

  document.getElementById("moduleModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("moduleModal").classList.remove("open");
  document.body.style.overflow = "";
}

/* ============================================
   Filtering & Search
   ============================================ */
function applyFilters() {
  const search = document.getElementById("globalSearch").value.toLowerCase();
  const language = document.getElementById("languageFilter").value;
  const region = document.getElementById("regionFilter")?.value || "";
  const category = document.getElementById("categoryFilter")?.value || "";
  const level = document.getElementById("levelFilter")?.value || "";
  const format = document.getElementById("formatFilter")?.value || "";

  filteredModules = ALL_MODULES.filter(m => {
    const matchSearch = !search ||
      m.title.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search) ||
      m.category.toLowerCase().includes(search);

    const matchLang = !language || m.languages.includes(language);
    const matchRegion = !region || m.region === region;
    const matchCat = !category || m.category === category;
    const matchLevel = !level || m.level === level;
    const matchFormat = !format || m.format.includes(format);

    return matchSearch && matchLang && matchRegion && matchCat && matchLevel && matchFormat;
  });

  renderAllModulesGrid();
  updateResultsCount();
}

function updateResultsCount() {
  const el = document.getElementById("resultsCount");
  if (el) {
    el.textContent = `Showing ${filteredModules.length} of ${ALL_MODULES.length} modules`;
  }
}

function clearFilters() {
  ["regionFilter", "categoryFilter", "levelFilter", "formatFilter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const search = document.getElementById("globalSearch");
  if (search) search.value = "";
  const langFilter = document.getElementById("languageFilter");
  if (langFilter) langFilter.value = "";
  filteredModules = [...ALL_MODULES];
  renderAllModulesGrid();
  updateResultsCount();
}

function filterByRegion(regionId) {
  switchView("modules");
  const regionFilter = document.getElementById("regionFilter");
  if (regionFilter) regionFilter.value = regionId;
  applyFilters();
}

function filterByCategory(categoryId) {
  switchView("modules");
  const catFilter = document.getElementById("categoryFilter");
  if (catFilter) catFilter.value = categoryId;
  applyFilters();
}

/* ============================================
   Event Listeners
   ============================================ */
function attachEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      switchView(link.dataset.view);
    });
  });

  // Search
  const searchInput = document.getElementById("globalSearch");
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // Language filter
  const langFilter = document.getElementById("languageFilter");
  if (langFilter) langFilter.addEventListener("change", applyFilters);

  // Module filters
  ["regionFilter", "categoryFilter", "levelFilter", "formatFilter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", applyFilters);
  });

  // Modal close on overlay click
  document.getElementById("moduleModal").addEventListener("click", e => {
    if (e.target === document.getElementById("moduleModal")) closeModal();
  });

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

/* ============================================
   Initialisation
   ============================================ */
document.addEventListener("DOMContentLoaded", async () => {
  renderRegionGrid();
  renderCategoryGrid();
  renderFramework();
  attachEventListeners();
  await loadAllModules();
});
