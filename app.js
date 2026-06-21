(() => {
  const APPS = [
    {
      id: 1,
      title: "Neon Racer",
      category: "carreras",
      trending: true,
      rating: 4.7,
      icon: "🏎️",
      url: "https://example.com/neon-racer",
    },
    {
      id: 2,
      title: "Pixel Quest",
      category: "aventura",
      trending: true,
      rating: 4.5,
      icon: "🗡️",
      url: "https://example.com/pixel-quest",
    },
    {
      id: 3,
      title: "Block Drop",
      category: "puzzle",
      trending: true,
      rating: 4.3,
      icon: "🧩",
      url: "https://example.com/block-drop",
    },
    {
      id: 4,
      title: "Street Hoops",
      category: "deportes",
      trending: false,
      rating: 4.2,
      icon: "🏀",
      url: "https://example.com/street-hoops",
    },
    {
      id: 5,
      title: "Zombie Survival",
      category: "acción",
      trending: true,
      rating: 4.6,
      icon: "🧟",
      url: "https://example.com/zombie-survival",
    },
    {
      id: 6,
      title: "Match Three",
      category: "casual",
      trending: false,
      rating: 4.1,
      icon: "💎",
      url: "https://example.com/match-three",
    },
    {
      id: 7,
      title: "Sky Runner",
      category: "acción",
      trending: false,
      rating: 4.0,
      icon: "🏃",
      url: "https://example.com/sky-runner",
    },
    {
      id: 8,
      title: "Farm Tycoon",
      category: "casual",
      trending: false,
      rating: 4.4,
      icon: "🌾",
      url: "https://example.com/farm-tycoon",
    },
    {
      id: 9,
      title: "Drift King",
      category: "carreras",
      trending: false,
      rating: 4.3,
      icon: "🏁",
      url: "https://example.com/drift-king",
    },
    {
      id: 10,
      title: "Mystery Manor",
      category: "aventura",
      trending: false,
      rating: 4.5,
      icon: "🔍",
      url: "https://example.com/mystery-manor",
    },
    {
      id: 11,
      title: "Sudoku Daily",
      category: "puzzle",
      trending: false,
      rating: 4.2,
      icon: "🔢",
      url: "https://example.com/sudoku-daily",
    },
    {
      id: 12,
      title: "Penalty Shootout",
      category: "deportes",
      trending: false,
      rating: 3.9,
      icon: "⚽",
      url: "https://example.com/penalty-shootout",
    },
  ];

  const state = {
    category: "all",
    query: "",
  };

  const els = {
    searchInput: document.getElementById("search-input"),
    categoriesList: document.getElementById("categories-list"),
    trendingGrid: document.getElementById("trending-grid"),
    catalogGrid: document.getElementById("catalog-grid"),
    catalogCount: document.getElementById("catalog-count"),
    emptyState: document.getElementById("empty-state"),
    modal: document.getElementById("player-modal"),
    overlay: document.getElementById("modal-overlay"),
    closePlayer: document.getElementById("close-player"),
    fullscreenBtn: document.getElementById("fullscreen-btn"),
    playerTitle: document.getElementById("player-title"),
    playerIframe: document.getElementById("player-iframe"),
    playerWrapper: document.getElementById("player-wrapper"),
  };

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function createCard(app) {
    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("tabindex", "0");
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Abrir ${app.title}`);
    article.innerHTML = `
      <div class="card__thumb" aria-hidden="true">${escapeHtml(app.icon)}</div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(app.title)}</h3>
        <div class="card__meta">
          <span class="card__category">${escapeHtml(app.category)}</span>
          <span class="card__badge">★ ${app.rating.toFixed(1)}</span>
        </div>
      </div>
    `;

    const open = () => openPlayer(app);
    article.addEventListener("click", open);
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    return article;
  }

  function getFilteredApps() {
    const q = state.query.trim().toLowerCase();
    return APPS.filter((app) => {
      const matchesCategory = state.category === "all" || app.category === state.category;
      const matchesQuery =
        !q ||
        app.title.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }

  function render() {
    const filtered = getFilteredApps();
    const trending = filtered.filter((app) => app.trending);

    els.trendingGrid.innerHTML = "";
    els.catalogGrid.innerHTML = "";

    if (filtered.length === 0) {
      els.emptyState.hidden = false;
      els.catalogCount.textContent = "0 resultados";
      return;
    }

    els.emptyState.hidden = true;
    els.catalogCount.textContent = `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`;

    if (state.query || state.category !== "all") {
      els.trendingGrid.closest(".section").hidden = true;
    } else {
      els.trendingGrid.closest(".section").hidden = false;
      trending.forEach((app) => els.trendingGrid.appendChild(createCard(app)));
    }

    filtered.forEach((app) => els.catalogGrid.appendChild(createCard(app)));
  }

  function setCategory(category) {
    state.category = category;
    els.categoriesList.querySelectorAll(".categories__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.category === category);
    });
    render();
  }

  function openPlayer(app) {
    els.playerTitle.textContent = app.title;
    els.playerIframe.src = app.url;
    els.modal.hidden = false;
    document.body.style.overflow = "hidden";
    els.closePlayer.focus();
  }

  function closePlayer() {
    els.modal.hidden = true;
    els.playerIframe.src = "";
    document.body.style.overflow = "";
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      els.playerWrapper.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  function init() {
    els.searchInput.addEventListener("input", (e) => {
      state.query = e.target.value;
      render();
    });

    els.categoriesList.addEventListener("click", (e) => {
      const btn = e.target.closest(".categories__btn");
      if (!btn) return;
      setCategory(btn.dataset.category);
    });

    els.overlay.addEventListener("click", closePlayer);
    els.closePlayer.addEventListener("click", closePlayer);
    els.fullscreenBtn.addEventListener("click", toggleFullscreen);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !els.modal.hidden) {
        closePlayer();
      }
    });

    render();
  }

  init();
})();
