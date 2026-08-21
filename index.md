---
layout: default
---

<!-- 1. Math Typesetting Engine -->
<script>
  MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
  };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<!-- 2. Institute Logo (Pinned to top right) -->
<img src="./assets/images/institute-logo.jpeg" alt="UM-DAE CEBS" style="position: absolute; top: 20px; right: 30px; width: 90px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); z-index: 100;"/>

<!-- 3. Club Logo (Centered in content area) -->
<div style="text-align: center; margin-top: 10px; margin-bottom: 40px;">
  <img src="./assets/images/club-logo.jpeg" alt="Lindelöf Math Society Logo" style="max-width: 250px; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.1);"/>
</div>

<!-- 4. Club Content -->
We explore the abstraction of analysis, linear algebra, group theory, and all of mathematics.

**The First Isomorphism Theorem:** Let $\phi: G \rightarrow H$ be a group homomorphism. Then the quotient group is isomorphic to the image of $\phi$:

$$G/\ker(\phi) \cong \text{im}(\phi)$$
