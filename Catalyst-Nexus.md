---
layout: default
title: Catalyst Nexus
---

# Catalyst Nexus 🚀
Discover the paths, achievements, and backgrounds of our graduated batches. 

<!-- Interactive Filter Toolbar -->
<div class="filter-toolbar" style="margin: 20px 0; display: flex; gap: 15px; flex-wrap: wrap; background: #fdfdfd; padding: 15px; border-radius: 6px; border: 1px dashed #cbd5e1;">
  <div class="filter-group">
    <label for="batch-filter" style="font-size: 0.85rem; font-weight: bold; color: #475569; display: block; margin-bottom: 5px;">Filter by Quanta (Batch):</label>
    <select id="batch-filter" style="padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem; background: white;">
      <option value="all">All Batches</option>
    </select>
  </div>
  <div class="filter-group" style="display: flex; align-items: flex-end;">
    <span id="catalyst-count" style="font-size: 0.85rem; font-weight: bold; background: #eff6ff; color: #1d4ed8; padding: 6px 12px; border-radius: 4px; border: 1px solid #bfdbfe;">
      Total Network Records: 0
    </span>
  </div>
</div>

<!-- The container where your script pushes the cards -->
<div id="alumni-grid" class="alumni-grid">
  <p id="loading-text" style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 4px 0;">Syncing with the Catalyst database...</p>
</div>

<!-- 🔗 THE SCRIPT LINK HOOK (Add this to the absolute bottom) -->
<script src="{{ '/assets/js/CatalystNexus.js' | relative_url }}"></script>
