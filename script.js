/**
 * script.js — Regen Commons
 *
 * Three systems:
 *  1. Learn page — 3-step navigation
 *  2. Declaration page — Mycelial seed field (network of vision nodes)
 *  3. Map page — localStorage echo, depth bar, filter/sort/view dashboard
 */

(function () {
  "use strict";

  // ─── Pre-seeded community visions ─────────────────────────────────────────
  // Authentic practitioner voices — drawn from real regenerative movement struggles.
  var SEEDED = [
    "Knowledge that outlasts the organizations that made it.",
    "Coordination without burning out the coordinator.",
    "A place to return to — not a platform that extracts and moves on.",
    "What we've been trying to build for fifteen years, finally held somewhere.",
    "Commons for my watershed. For the whole bioregion.",
    "Governance that doesn't require a lawyer to understand.",
    "A network where contributing makes you richer, not just busier.",
    "Experiments that can fail safely, with other people watching and learning.",
    "No more silos. No more re-inventing the same wheels.",
    "Connection that crosses sectors without needing a middleman.",
    "Infrastructure that belongs to everyone who maintains it.",
    "A record of what worked — and what didn't — that doesn't disappear.",
    "Tools that make the invisible visible: who's tending what.",
    "The kind of place I could actually send someone and trust they'd be held.",
    "Regenerative movement knowledge, finally findable.",
    "A home for things that don't fit inside one organization.",
    "Exit to commons — not exit to acquisition.",
    "Shared memory across the movement.",
    "What if good governance templates were public goods?",
    "The coordination layer we actually needed.",
    "Belonging without permission.",
    "A commons that's alive — not just archived.",
    "The ground beneath the work.",
    "Weaving without centralizing.",
    "Trust infrastructure at scale.",
    "Knowledge that breathes.",
    "A place where small orgs can stand on each other's shoulders.",
    "Not just another database. A living thing.",
    "Something that persists when the grant ends.",
    "Recognition for the invisible labor.",
    "Protocol that serves the practitioner, not the platform.",
    "Bioregional knowledge held in common.",
    "The connective tissue between experiments.",
    "Reciprocity made legible.",
    "An answer to the question: where does this work live?",
    "Commons for the commons-builders.",
    "Regenerative by structure, not just by intention.",
    "A field that gets richer with every person who tends it.",
    "Memory that survives organizational collapse.",
    "Governance as care, not as control.",
    // Second wave — field practitioners, direct voices
    "No more losing the thread when the project ends.",
    "What the regenerative movement needs most is to talk to itself.",
    "A library that knows it's alive.",
    "The wisdom is already here. Help it find itself.",
    "Coordination that scales without losing accountability.",
    "A commons that outlasts every org that builds it.",
    "Making the movement legible — to itself.",
    "Soil knowledge. Watershed knowledge. Commons knowledge.",
    "The right knowledge, at the right time, without the middleman.",
    "A place where 'who knows about this' is finally answered.",
    "Grant cycles end. The commons doesn't.",
    "What if the movement knew what it knew?",
    "A network that rewards contribution over extraction.",
    "Federated. Distributed. Alive.",
    "A place to bring the practices that still have no home.",
    "Governance that holds the tension between care and accountability.",
    "Not owned. Tended.",
    "The experiments worth naming, finally named.",
    "A commons where the cost of entry is an offering.",
    "Knowledge that flows without leaking.",
    "The long arc of regeneration, held somewhere.",
    "What happens after the workshop ends.",
    "The connective layer. The one we've always needed.",
    "A place where failure is held, not hidden.",
    "Interoperability without centralization.",
    "What would it look like if the movement trusted itself?",
    "Commons that make more commons.",
    "A field that remembers.",
    "What the seed holds before it opens.",
    "Roots before branches.",
    "Mutual aid with memory.",
    "The infrastructure of trust.",
    "A living archive of what actually worked.",
    "Something we can return to when everything else changes.",
    "Connection without permission. Depth without gatekeeping.",
    "A commons that breathes back.",
    "Not a monument. A metabolism.",
    "Letting the movement hold its own history.",
    "Knowledge as commons, not commodity.",
    "A place where showing up means something.",
  ];

  // ─── Organic blob SVG path (Symphony of Vines technique) ─────────────────
  // Irregular hand-drawn ellipse — used as button border
  var BLOB_PATH = "M15 10 C38 2 78 -1 122 3 C158 6 180 14 190 30 C196 42 186 56 160 62 C132 68 88 72 52 68 C22 64 6 52 3 38 C-1 22 5 14 15 10Z";

  // ─── Entry ────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    // ── Inject organic blob SVGs into all buttons ──
    injectBlobButtons();

    var page = document.body.dataset.page;
    if (page === "learn")       initLearnPage();
    if (page === "declaration") initDeclarationPage();
    if (page === "map")         initMapPage();
  });

  // ─── Blob button injection ───────────────────────────────────────────────
  function injectBlobButtons() {
    document.querySelectorAll(".btn").forEach(function (btn) {
      // Don't double-inject
      if (btn.querySelector(".btn-blob")) return;

      // Wrap existing content in a label span
      var label = document.createElement("span");
      label.className = "btn-label";
      while (btn.firstChild) label.appendChild(btn.firstChild);
      btn.appendChild(label);

      // Create organic blob SVG
      var ns = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(ns, "svg");
      svg.setAttribute("class", "btn-blob");
      svg.setAttribute("viewBox", "0 0 200 70");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("aria-hidden", "true");

      var path = document.createElementNS(ns, "path");
      path.setAttribute("d", BLOB_PATH);
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "1.3");
      path.setAttribute("fill", "none");
      svg.appendChild(path);

      btn.appendChild(svg);
    });
  }

  // ─── Navigation ───────────────────────────────────────────────────────────
  function navigateTo(href) {
    // Create exit loader
    var loader = document.createElement("div");
    loader.className = "page-loader";
    loader.style.opacity = "0";
    loader.innerHTML = '<span class="loader-label" style="opacity:1">Regen Commons</span>';
    document.body.appendChild(loader);
    requestAnimationFrame(function () {
      loader.style.transition = "opacity 0.45s cubic-bezier(.25,1,.5,1)";
      loader.style.opacity = "1";
    });
    setTimeout(function () { window.location.href = href; }, 500);
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  LEARN PAGE
  // ══════════════════════════════════════════════════════════════════════════
  function initLearnPage() {
    var steps   = Array.from(document.querySelectorAll(".step"));
    var dots    = Array.from(document.querySelectorAll(".dot"));
    var current = 0;

    function showStep(i) {
      steps.forEach(function (s, idx) { s.classList.toggle("active", idx === i); });
      dots.forEach(function (d, idx)  { d.classList.toggle("active", idx === i); });
      current = i;
    }

    document.querySelectorAll(".btn-next").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (current + 1 < steps.length) showStep(current + 1);
      });
    });

    var btnReady = document.querySelector(".btn-ready");
    if (btnReady) btnReady.addEventListener("click", function () { navigateTo("declaration.html"); });

    showStep(0);
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  DECLARATION PAGE — Mycelial seed field
  //  Visions become network nodes connected by living mycelial branches.
  //  Force-directed layout positions nodes; branches grow between them.
  //  On hover: word-by-word text reveal. Cursor attracts nearby nodes.
  //  3-phase threshold ceremony: form fade → vision moment → field appears.
  // ══════════════════════════════════════════════════════════════════════════
  function initDeclarationPage() {
    var formUI   = document.getElementById("declaration-form-ui");
    var input    = document.getElementById("vision-input");
    var offerBtn = document.getElementById("offer-btn");
    var bubbleUI = document.getElementById("bubble-ui");
    var counter  = document.getElementById("bubble-counter");
    var enterBtn = document.getElementById("enter-commons-btn");
    var canvas   = document.getElementById("bubble-canvas");
    if (!canvas) return;

    var W, H;
    var fieldActive = false;

    // ── Field setup — seed field (mycelial network) ─────────────────────
    var seedFieldHandle = null;
    var counterInterval = null;

    function createField(userText) {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;

      // Initialize the seed field via the canvas.js public API
      seedFieldHandle = window.initSeedField(canvas, SEEDED, userText);

      // Update counter periodically to reflect sequentially-appearing nodes
      if (counterInterval) clearInterval(counterInterval);
      counterInterval = setInterval(function () {
        if (counter && window._seedFieldNodeCount) {
          var count = window._seedFieldNodeCount();
          counter.textContent = count + " visions, one network";
        }
      }, 200);
    }

    window.addEventListener("resize", function () {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }, { passive: true });

    // ── Offer button — expanded threshold ceremony ──────────────────────
    var thresholdMoment = document.getElementById("threshold-moment");
    var thresholdText   = document.getElementById("threshold-vision-text");

    offerBtn.addEventListener("click", function () {
      var text = (input.value || "").trim();
      if (!text) {
        input.classList.add("shake");
        setTimeout(function () { input.classList.remove("shake"); }, 400);
        return;
      }

      // Save for map page
      try {
        localStorage.setItem("regen_vision", text);
        localStorage.setItem("regen_vision_time", Date.now().toString());
      } catch (_) {}

      // ── Phase 1: Form fades slowly (1.5s) ──
      formUI.style.transition = "opacity 1.5s ease";
      formUI.style.opacity = "0";

      setTimeout(function () {
        formUI.style.display = "none";

        // ── Phase 2: User's vision appears alone (threshold moment) ──
        if (thresholdMoment && thresholdText) {
          thresholdText.textContent = '"' + text + '"';
          thresholdMoment.style.display = "flex";
          thresholdMoment.style.opacity = "0";
          thresholdMoment.style.transition = "opacity 1.8s ease";
          requestAnimationFrame(function () {
            thresholdMoment.style.opacity = "1";
          });

          // ── Phase 3: After a pause, field materializes around them ──
          setTimeout(function () {
            thresholdMoment.style.transition = "opacity 1.2s ease";
            thresholdMoment.style.opacity = "0";
            setTimeout(function () {
              thresholdMoment.style.display = "none";
              createField(text);
              fieldActive = true;
              // Fade in the counter and CTA after the field has had time to populate
              setTimeout(function () {
                bubbleUI.classList.add("visible");
              }, 1200);
            }, 1200);
          }, 3000);
        } else {
          // Fallback if threshold elements don't exist
          createField(text);
          fieldActive = true;
          bubbleUI.classList.add("visible");
        }
      }, 1500);
    });

    if (enterBtn) {
      enterBtn.addEventListener("click", function () { navigateTo("map.html"); });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  MAP PAGE — directory + filter/view + card expand
  // ══════════════════════════════════════════════════════════════════════════
  function initMapPage() {
    // ── First-arrival echo & return visitor detection ──────────────────────
    var arrivalEcho   = document.getElementById("arrival-echo");
    var welcomeBack   = document.getElementById("welcome-back");
    var echoVision    = document.getElementById("arrival-echo-vision");
    var echoOthers    = document.getElementById("arrival-echo-others");
    var welcomePulse  = document.getElementById("welcome-back-pulse");

    var savedVision   = null;
    var lastVisit     = null;
    var hasVisitedMap = false;
    try {
      savedVision   = localStorage.getItem("regen_vision");
      lastVisit     = localStorage.getItem("regen_map_last_visit");
      hasVisitedMap = !!lastVisit;
      localStorage.setItem("regen_map_last_visit", Date.now().toString());
    } catch (_) {}

    // Sample visions for the echo (subset of SEEDED array)
    var echoSampleVisions = [
      "Knowledge that outlasts the organizations that made it.",
      "A commons that's alive — not just archived.",
      "The ground beneath the work.",
      "Belonging without permission.",
      "A field that gets richer with every person who tends it."
    ];

    if (!hasVisitedMap && savedVision && arrivalEcho && echoVision) {
      // First arrival after planting a vision
      echoVision.textContent = '"' + savedVision + '"';
      if (echoOthers) {
        // Show 3 random other visions
        var shuffled = echoSampleVisions.sort(function () { return 0.5 - Math.random(); });
        for (var i = 0; i < 3; i++) {
          var v = document.createElement("p");
          v.className = "arrival-echo-other";
          v.textContent = '"' + shuffled[i] + '"';
          echoOthers.appendChild(v);
        }
      }
      arrivalEcho.style.display = "block";
      arrivalEcho.style.opacity = "0";
      arrivalEcho.style.transition = "opacity 1.5s ease";
      requestAnimationFrame(function () { arrivalEcho.style.opacity = "1"; });
    } else if (hasVisitedMap && welcomeBack) {
      // Returning visitor
      if (welcomePulse) {
        var items = [
          "2 new resources added to the Knowledge Commons",
          "The Federated Knowledge experiment completed its first integration test",
          "Next commons gathering: April 8, 2026"
        ];
        items.forEach(function (item) {
          var p = document.createElement("p");
          p.className = "welcome-back-item";
          p.textContent = item;
          welcomePulse.appendChild(p);
        });
      }
      welcomeBack.style.display = "block";
      welcomeBack.style.opacity = "0";
      welcomeBack.style.transition = "opacity 1.2s ease";
      requestAnimationFrame(function () { welcomeBack.style.opacity = "1"; });
    }

    // ── Card expand / collapse ─────────────────────────────────────────────
    var grid = document.getElementById("commons-grid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        // Don't close when clicking a link inside the card body
        if (e.target.closest(".card-action-link")) return;

        var card = e.target.closest(".commons-card");
        if (!card) return;

        var wasOpen = card.classList.contains("open");
        // Close any open card
        grid.querySelectorAll(".commons-card.open").forEach(function (c) {
          c.classList.remove("open");
        });
        // Open the clicked card if it wasn't already open
        if (!wasOpen) card.classList.add("open");
      });
    }

    // ── Filter / view buttons ──────────────────────────────────────────────
    if (!grid) return;

    var cards        = Array.from(grid.querySelectorAll(".commons-card"));
    var activeType   = "all";
    var activeView   = "grid";
    var originalOrder = cards.slice();

    document.querySelectorAll(".filter-btn[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn[data-filter]")
          .forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeType = btn.dataset.filter;
        applyFilter();
      });
    });

    document.querySelectorAll(".view-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".view-btn")
          .forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeView = btn.dataset.view;
        grid.classList.toggle("view-list", activeView === "list");
      });
    });

    function applyFilter() {
      var visible = originalOrder.filter(function (c) {
        return activeType === "all" || c.dataset.type === activeType;
      });

      cards.forEach(function (c) {
        if (visible.indexOf(c) !== -1) {
          c.classList.remove("hidden");
        } else {
          // Close before hiding
          c.classList.remove("open");
          c.classList.add("hidden");
        }
      });
    }

    // ── Directory toggle ──────────────────────────────────────────────────
    var dirToggle = document.getElementById("directory-toggle");
    var dirList   = dirToggle && dirToggle.previousElementSibling;
    if (dirToggle && dirList) {
      dirToggle.addEventListener("click", function () {
        var expanded = dirList.classList.toggle("expanded");
        dirToggle.textContent = expanded ? "Show fewer " : "Show all members ";
        var count = document.createElement("span");
        count.className = "directory-count";
        count.textContent = "11";
        dirToggle.appendChild(count);
      });
    }

    // ── Landscape tooltip ─────────────────────────────────────────────────
    var landscape = document.getElementById("directory-landscape");
    var tooltip   = document.getElementById("landscape-tooltip");
    if (landscape && tooltip) {
      landscape.addEventListener("mouseover", function (e) {
        var dot = e.target.closest(".member-dot");
        if (!dot) { tooltip.classList.remove("visible"); return; }
        var name = dot.getAttribute("data-name");
        var role = dot.getAttribute("data-role");
        tooltip.textContent = name + " — " + role;
        tooltip.classList.add("visible");
        var rect = landscape.getBoundingClientRect();
        var dr   = dot.getBoundingClientRect();
        tooltip.style.left = (dr.left - rect.left + dr.width / 2) + "px";
        tooltip.style.top  = (dr.top - rect.top - 28) + "px";
      });
      landscape.addEventListener("mouseout", function (e) {
        if (!e.target.closest(".member-dot")) tooltip.classList.remove("visible");
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  //  JOIN PAGE — multi-step form
  // ══════════════════════════════════════════════════════════════════════════
  if (document.body.dataset.page === "join") {
    var form       = document.getElementById("join-form");
    var steps      = form ? Array.from(form.querySelectorAll(".join-step")) : [];
    var dots       = Array.from(document.querySelectorAll(".join-step-dot"));
    var confirm    = document.getElementById("join-confirmation");
    var currentStep = 1;

    // Populate vision echo from localStorage (planted during declaration)
    var visionEcho = document.getElementById("join-vision-echo");
    var visionEchoField = document.getElementById("vision-echo-field");
    if (visionEcho) {
      var savedVision = null;
      try { savedVision = localStorage.getItem("regen_vision"); } catch (_) {}
      if (savedVision) {
        visionEcho.textContent = '"' + savedVision + '"';
        visionEcho.style.fontStyle = "italic";
        visionEcho.style.color = "var(--accent, var(--forest))";
        visionEcho.style.padding = "1.2rem";
        visionEcho.style.border = "1px solid rgba(var(--forest-rgb), 0.2)";
        visionEcho.style.borderRadius = "2px";
      } else if (visionEchoField) {
        // If no vision was planted, hide this field entirely
        visionEchoField.style.display = "none";
      }
    }

    // Individual / Organization toggle
    var toggleBtns = document.querySelectorAll(".join-toggle");
    var typeInput  = document.getElementById("member-type");
    var orgFields  = document.querySelectorAll(".join-org-fields");
    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        typeInput.value = btn.dataset.value;
        orgFields.forEach(function (f) {
          f.style.display = btn.dataset.value === "organization" ? "block" : "none";
        });
      });
    });

    function goToStep(n) {
      // Validate current step before advancing
      if (n > currentStep && !validateStep(currentStep)) return;

      currentStep = n;
      steps.forEach(function (s) { s.classList.remove("active"); });
      var target = form.querySelector('.join-step[data-step="' + n + '"]');
      if (target) target.classList.add("active");

      // Update progress dots
      dots.forEach(function (d, i) {
        var stepNum = i + 1;
        d.classList.remove("active", "done");
        if (stepNum === n) d.classList.add("active");
        else if (stepNum < n) d.classList.add("done");
      });

      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function validateStep(n) {
      var step = form.querySelector('.join-step[data-step="' + n + '"]');
      if (!step) return true;
      var fields = step.querySelectorAll("[required]");
      var valid = true;
      fields.forEach(function (f) {
        var wrapper = f.closest(".join-field");
        if (!f.value.trim()) {
          valid = false;
          if (wrapper) wrapper.classList.add("has-error");
        } else {
          if (wrapper) wrapper.classList.remove("has-error");
        }
      });
      return valid;
    }

    // Next / back buttons
    document.querySelectorAll(".join-next").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goToStep(parseInt(btn.dataset.to, 10));
      });
    });
    document.querySelectorAll(".join-back").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goToStep(parseInt(btn.dataset.to, 10));
      });
    });

    // Clear error on input
    if (form) {
      form.addEventListener("input", function (e) {
        var wrapper = e.target.closest(".join-field");
        if (wrapper) wrapper.classList.remove("has-error");
      });
    }

    // Submit
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateStep(4)) return;

        // Check agreement checkboxes
        var agreements = form.querySelectorAll('.join-check--agreement input[type="checkbox"]');
        var allChecked = true;
        agreements.forEach(function (cb) {
          if (!cb.checked) allChecked = false;
        });
        if (!allChecked) {
          // Highlight unchecked agreements
          agreements.forEach(function (cb) {
            var label = cb.closest(".join-check--agreement");
            if (!cb.checked) label.style.color = "var(--amber)";
            else label.style.color = "";
          });
          return;
        }

        // Hide form, show confirmation
        form.style.display = "none";
        document.querySelector(".join-progress").style.display = "none";
        confirm.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // ─── Theme toggle ────────────────────────────────────────────────────────
  var toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "dark";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("rc-theme", next);
      // Notify canvas.js so it can update palette
      window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: next } }));
    });
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

})();
