// Paste your exact published Google Sheets CSV link here
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1sROfUjNrTwkYWTX3PYG2-tiBrETwtxnXiSLptRtXKjg/edit?gid=0#gid=0";

// Master memory storage array to hold clean dataset arrays locally for instant live sorting
let masterAlumniList = [];

async function loadAlumniData() {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const csvText = await response.text();
    
    // Split the raw dataset cleanly by entry lines
    const rows = csvText.split("\n").map(row => row.split(","));
    
    const gridContainer = document.getElementById("alumni-grid");
    if (!gridContainer) return;
    
    // Wipe local cache array clean
    masterAlumniList = [];
    const batchSet = new Set();

    // Loop through records (Skipping Row 0 headers)
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i];
      if (!columns || columns.length < 2) continue;

      // Helper function to strip string quotes safely
      const clean = (val) => (val ? val.replace(/"/g, "").trim() : "");

      // Data column positional layout mapping index list
      const alumItem = {
        name: clean(columns[1]),
        role: clean(columns[2]),
        company: clean(columns[3]),
        gradYear: clean(columns[4]),
        majorSubject: clean(columns[5]),
        minorSubject: clean(columns[6]),
        quantaBatch: clean(columns[7]),
        bio: clean(columns[8]),
        linkedin: clean(columns[9])
      };

      masterAlumniList.push(alumItem);
      if (alumItem.quantaBatch) {
        batchSet.add(alumItem.quantaBatch);
      }
    }

    // Initialize UI Filters and Count Badges
    updateCountDisplay(masterAlumniList.length);
    populateBatchFilterDropdown(Array.from(batchSet).sort((a, b) => a - b));
    
    // Render the initial complete record matrix layout
    renderAlumniGrid(masterAlumniList);

  } catch (error) {
    console.error("Catalyst Nexus sync processing block issue:", error);
    const gridContainer = document.getElementById("alumni-grid");
    if (gridContainer) {
      gridContainer.innerHTML = "<p style='grid-column:1/-1; text-align:center; color:#ef4444;'>Catalyst Sync Failure. Please reload the connection profile list.</p>";
    }
  }
}

// Sub-routine: Build the visual HTML loop blocks
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

// Sub-routine: Handle calculations for statistics card tracker
function updateCountDisplay(num) {
  const countBadge = document.getElementById("catalyst-count");
  if (countBadge) countBadge.innerText = `Total Network Records: ${num}`;
}

// Sub-routine: Build dynamic options inside selection toolbar item list
function populateBatchFilterDropdown(batches) {
  const dropdown = document.getElementById("batch-filter");
  if (!dropdown || dropdown.options.length > 1) return; // Prevent duplications

  batches.forEach(batch => {
    const opt = document.createElement("option");
    opt.value = batch;
    opt.innerText = `Batch ${batch}`;
    dropdown.appendChild(opt);
  });

  // Attach execution event tracking listener routine
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
    loadAlumniData();
  }
});
