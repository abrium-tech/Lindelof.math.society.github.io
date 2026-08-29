// Hardcoded array list for instant local testing (Bypasses Google Sheets)
const masterAlumniList = [
  {
    name: "Alex Rivera",
    role: "Software Engineer",
    company: "Google",
    gradYear: "2024",
    majorSubject: "Computer Science",
    minorSubject: "Mathematics",
    quantaBatch: "1",
    bio: "Backend cloud infrastructure developer. Loves helping students prep for technical interviews.",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    company: "Stripe",
    gradYear: "2023",
    majorSubject: "Human-Computer Interaction",
    minorSubject: "Cognitive Science",
    quantaBatch: "1",
    bio: "Mobile interaction layouts specialist. Passionate about building accessible experiences.",
    linkedin: "https://linkedin.com"
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "Netflix",
    gradYear: "2025",
    majorSubject: "Data Science",
    minorSubject: "Statistics",
    quantaBatch: "2",
    bio: "Recommendation systems specialist. Ask me anything about machine learning models.",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Elena Rostova",
    role: "Cloud Architect",
    company: "AWS",
    gradYear: "2025",
    majorSubject: "Information Technology",
    minorSubject: "Cybersecurity",
    quantaBatch: "2",
    bio: "Enterprise multi-region setups analyst. Expert in serverless infrastructure configurations.",
    linkedin: "" // Left blank to test empty link handling
  },
  {
    name: "Marcus Vance",
    role: "Product Manager",
    company: "Microsoft",
    gradYear: "2026",
    majorSubject: "Computer Engineering",
    minorSubject: "Business Administration",
    quantaBatch: "3",
    bio: "Bridging engineering and business strategy. Always open to reviewing resumes.",
    linkedin: "https://linkedin.com"
  }
];

function loadLocalAlumniData() {
  const gridContainer = document.getElementById("alumni-grid");
  if (!gridContainer) return;
  
  // Clear the loading message
  gridContainer.innerHTML = "";

  const batchSet = new Set();
  masterAlumniList.forEach(item => {
    if (item.quantaBatch) batchSet.add(item.quantaBatch);
  });

  // Initialize UI Filters and Count Badges
  updateCountDisplay(masterAlumniList.length);
  populateBatchFilterDropdown(Array.from(batchSet).sort((a, b) => a - b));
  
  // Render the data blocks
  renderAlumniGrid(masterAlumniList);
}

function renderAlumniGrid(dataList) {
  const gridContainer = document.getElementById("alumni-grid");
  gridContainer.innerHTML = "";

  if (dataList.length === 0) {
    gridContainer.innerHTML = "<p style='grid-column:1/-1; text-align:center; color:#64748b;'>No network profiles matching this query criteria found.</p>";
    return;
  }

  dataList.forEach(item => {
    const alumniCard = document.createElement("div");
    alumniCard.className = "alumni-card";
    
    alumniCard.innerHTML = `
      <div class="alumni-info">
        <h3 style="margin: 0 0 5px 0; font-size: 1.25rem; color: #0f172a;">${item.name}</h3>
        <p class="alumni-title" style="margin: 0; color: #334155; font-size: 0.95rem;"><strong>${item.role}</strong> at ${item.company}</p>
        <p class="alumni-grad" style="margin: 2px 0 12px 0; color: #64748b; font-size: 0.85rem;">Class of ${item.gradYear}</p>
        
        <!-- Academic Subjects & Batch Details List Elements -->
        <ul class="academic-list" style="list-style: none; padding: 0; margin: 10px 0; font-size: 0.85rem; color: #475569;">
          ${item.majorSubject ? `<li style="margin-bottom: 3px;">🎓 <strong>Major:</strong> ${item.majorSubject}</li>` : ""}
          ${item.minorSubject ? `<li style="margin-bottom: 5px;">🔬 <strong>Minor:</strong> ${item.minorSubject}</li>` : ""}
          <li style="margin-top: 8px;"><span class="quanta-badge" style="background: #eff6ff; color: #2563eb; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 0.75rem; border: 1px solid #dbeafe;">⚛️ Quanta Batch: ${item.quantaBatch || "N/A"}</span></li>
        </ul>

        <p class="alumni-bio" style="font-size: 0.9rem; line-height: 1.5; color: #334155; margin-top: 12px; margin-bottom: 15px; flex-grow: 1;">${item.bio}</p>
        
        ${item.linkedin ? `<a href="${item.linkedin}" target="_blank" class="linkedin-btn">Connect on LinkedIn</a>` : ""}
      </div>
    `;
    gridContainer.appendChild(alumniCard);
  });
}

function updateCountDisplay(num) {
  const countBadge = document.getElementById("catalyst-count");
  if (countBadge) countBadge.innerText = `Total Network Records: ${num}`;
}

function populateBatchFilterDropdown(batches) {
  const dropdown = document.getElementById("batch-filter");
  if (!dropdown || dropdown.options.length > 1) return;

  batches.forEach(batch => {
    const opt = document.createElement("option");
    opt.value = batch;
    opt.innerText = `Batch ${batch}`;
    dropdown.appendChild(opt);
  });

  dropdown.addEventListener("change", (e) => {
    const selected = e.target.value;
    if (selected === "all") {
      renderAlumniGrid(masterAlumniList);
      updateCountDisplay(masterAlumniList.length);
    } else {
      const filtered = masterAlumniList.filter(item => item.quantaBatch === selected);
      renderAlumniGrid(filtered);
      updateCountDisplay(filtered.length);
    }
  });
}

// Global initialization entry point logic hook
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("alumni-grid")) {
    loadLocalAlumniData();
  }
});
