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
      description: "Corre a toda velocidad por calles futuristas llenas de neón y supera a tus rivales.",
    },
    {
      id: 2,
      title: "Pixel Quest",
      category: "aventura",
      trending: true,
      rating: 4.5,
      icon: "🗡️",
      url: "https://example.com/pixel-quest",
      description: "Embárcate en una aventura retro para derrotar monstruos y descubrir tesoros ocultos.",
    },
    {
      id: 3,
      title: "Block Drop",
      category: "puzzle",
      trending: true,
      rating: 4.3,
      icon: "🧩",
      url: "https://example.com/block-drop",
      description: "Encaja bloques de colores y limpia líneas en este clásico adictivo de lógica.",
    },
    {
      id: 4,
      title: "Street Hoops",
      category: "deportes",
      trending: false,
      rating: 4.2,
      icon: "🏀",
      url: "https://example.com/street-hoops",
      description: "Demuestra tu puntería en canchas callejeras con partidos rápidos 1 contra 1.",
    },
    {
      id: 5,
      title: "Zombie Survival",
      category: "acción",
      trending: true,
      rating: 4.6,
      icon: "🧟",
      url: "https://example.com/zombie-survival",
      description: "Sobrevive a hordas de zombis y defiende tu refugio con todo tipo de armas.",
    },
    {
      id: 6,
      title: "Match Three",
      category: "casual",
      trending: false,
      rating: 4.1,
      icon: "💎",
      url: "https://example.com/match-three",
      description: "Combina gemas brillantes y supera niveles cada vez más desafiantes.",
    },
    {
      id: 7,
      title: "Sky Runner",
      category: "acción",
      trending: false,
      rating: 4.0,
      icon: "🏃",
      url: "https://example.com/sky-runner",
      description: "Salta entre plataformas flotantes y evita obstáculos en las alturas.",
    },
    {
      id: 8,
      title: "Farm Tycoon",
      category: "casual",
      trending: false,
      rating: 4.4,
      icon: "🌾",
      url: "https://example.com/farm-tycoon",
      description: "Construye y gestiona tu granja, cosecha cultivos y expande tu negocio rural.",
    },
    {
      id: 9,
      title: "Drift King",
      category: "carreras",
      trending: false,
      rating: 4.3,
      icon: "🏁",
      url: "https://example.com/drift-king",
      description: "Domina el derrape en circuitos cerrados y conviértete en el rey del drift.",
    },
    {
      id: 10,
      title: "Mystery Manor",
      category: "aventura",
      trending: false,
      rating: 4.5,
      icon: "🔍",
      url: "https://example.com/mystery-manor",
      description: "Explora una mansión enigmática, resuelve acertijos y descubre su secreto.",
    },
    {
      id: 11,
      title: "Sudoku Daily",
      category: "puzzle",
      trending: false,
      rating: 4.2,
      icon: "🔢",
      url: "https://example.com/sudoku-daily",
      description: "Disfruta de nuevos sudokus cada día con diferentes niveles de dificultad.",
    },
    {
      id: 12,
      title: "Penalty Shootout",
      category: "deportes",
      trending: false,
      rating: 3.9,
      icon: "⚽",
      url: "https://example.com/penalty-shootout",
      description: "Toma penaltys y ataja disparos en esta tensa definición a fondo de red.",
    },
  ];

  const RECENTS_KEY = "poki-recents";
  const FAVORITES_KEY = "poki-favorites";
  const MAX_RECENTS = 6;
  const PLAYER_LOAD_TIMEOUT_MS = 4000;

  const state = {
    category: "all",
    query: "",
    recents: loadRecents(),
    favorites: loadFavorites(),
    playerLoadTimer: null,
    previewAppId: null,
  };

  const els = {
    searchInput: document.getElementById("search-input"),
    categoriesList: document.getElementById("categories-list"),
    favoritesSection: document.getElementById("favorites-section"),
    favoritesGrid: document.getElementById("favorites-grid"),
    clearFavoritesBtn: document.getElementById("clear-favorites"),
    recentsSection: document.getElementById("recents-section"),
    recentsGrid: document.getElementById("recents-grid"),
    clearRecentsBtn: document.getElementById("clear-recents"),
    trendingGrid: document.getElementById("trending-grid"),
    catalogGrid: document.getElementById("catalog-grid"),
    catalogCount: document.getElementById("catalog-count"),
    emptyState: document.getElementById("empty-state"),
    emptyClearBtn: document.getElementById("empty-clear-btn"),
    previewModal: document.getElementById("preview-modal"),
    previewOverlay: document.getElementById("preview-overlay"),
    previewIcon: document.getElementById("preview-icon"),
    previewTitle: document.getElementById("preview-title"),
    previewCategory: document.getElementById("preview-category"),
    previewRating: document.getElementById("preview-rating"),
    previewDescription: document.getElementById("preview-description"),
    previewPlayBtn: document.getElementById("preview-play-btn"),
    previewFavoriteBtn: document.getElementById("preview-favorite-btn"),
    previewCloseBtn: document.getElementById("preview-close-btn"),
    playerModal: document.getElementById("player-modal"),
    playerOverlay: document.getElementById("player-overlay"),
    closePlayer: document.getElementById("close-player"),
    fullscreenBtn: document.getElementById("fullscreen-btn"),
    playerTitle: document.getElementById("player-title"),
    playerIframe: document.getElementById("player-iframe"),
    playerWrapper: document.getElementById("player-wrapper"),
    playerLoader: document.getElementById("player-loader"),
    playerError: document.getElementById("player-error"),
  };

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function loadRecents() {
    try {
      const raw = localStorage.getItem(RECENTS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENTS) : [];
    } catch {
      return [];
    }
  }

  function saveRecents(recents) {
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(recents.slice(0, MAX_RECENTS)));
    } catch {
      // Silently ignore storage errors (e.g., private mode).
    }
  }

  function addRecent(app) {
    const ids = state.recents.filter((id) => id !== app.id);
    ids.unshift(app.id);
    state.recents = ids.slice(0, MAX_RECENTS);
    saveRecents(state.recents);
    renderRecents();
  }

  function clearRecents() {
    state.recents = [];
    saveRecents(state.recents);
    renderRecents();
  }

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveFavorites(favorites) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Silently ignore storage errors (e.g., private mode).
    }
  }

  function isFavorite(id) {
    return state.favorites.includes(id);
  }

  function toggleFavorite(id) {
    if (isFavorite(id)) {
      state.favorites = state.favorites.filter((fav) => fav !== id);
    } else {
      state.favorites = [id, ...state.favorites];
    }
    saveFavorites(state.favorites);
    updateFavoriteButtons();
    renderFavorites();
  }

  function clearFavorites() {
    state.favorites = [];
    saveFavorites(state.favorites);
    updateFavoriteButtons();
    renderFavorites();
  }

  function getAppById(id) {
    return APPS.find((app) => app.id === id) || null;
  }

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const rawApp = params.get("app");
    return {
      category: params.get("category") || "all",
      query: params.get("q") || "",
      appId: rawApp ? Number(rawApp) : NaN,
    };
  }

  function buildShareableUrl(category, query, appId) {
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
    if (query) params.set("q", query);
    if (appId != null && !Number.isNaN(appId)) params.set("app", String(appId));
    const qs = params.toString();
    return qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  }

  function applyUrlParams(options = {}, { push = false } = {}) {
    const category = Object.prototype.hasOwnProperty.call(options, "category") ? options.category : state.category;
    const query = Object.prototype.hasOwnProperty.call(options, "query") ? options.query : state.query;
    const appId = Object.prototype.hasOwnProperty.call(options, "appId") ? options.appId : state.previewAppId;
    const url = buildShareableUrl(category, query, appId);
    if (push) {
      history.pushState({}, "", url);
    } else {
      history.replaceState({}, "", url);
    }
  }

  function createCard(app) {
    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-label", `Ver detalles de ${app.title}`);
    const favorited = isFavorite(app.id);
    const favoriteLabel = favorited ? "Quitar de favoritos" : "Añadir a favoritos";
    article.innerHTML = `
      <button class="card__favorite" type="button" data-favorite-id="${app.id}" aria-pressed="${favorited}" aria-label="${favoriteLabel}">${favorited ? "♥" : "♡"}</button>
      <div class="card__thumb" aria-hidden="true">${escapeHtml(app.icon)}</div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(app.title)}</h3>
        <div class="card__meta">
          <span class="card__category">${escapeHtml(app.category)}</span>
          <span class="card__badge">★ ${app.rating.toFixed(1)}</span>
        </div>
      </div>
    `;

    const open = () => openPreview(app);
    article.addEventListener("click", open);
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    const favBtn = article.querySelector("[data-favorite-id]");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(app.id);
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
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }

  function renderRecents() {
    els.recentsGrid.innerHTML = "";

    if (state.recents.length === 0) {
      els.recentsSection.hidden = true;
      return;
    }

    const isHomeView = !state.query && state.category === "all";
    els.recentsSection.hidden = !isHomeView;

    if (!isHomeView) return;

    state.recents.forEach((id) => {
      const app = getAppById(id);
      if (app) {
        els.recentsGrid.appendChild(createCard(app));
      }
    });
  }

  function updateFavoriteButtons() {
    document.querySelectorAll("[data-favorite-id]").forEach((btn) => {
      const id = Number(btn.dataset.favoriteId);
      const favorited = isFavorite(id);
      btn.setAttribute("aria-pressed", String(favorited));
      btn.setAttribute("aria-label", favorited ? "Quitar de favoritos" : "Añadir a favoritos");
      btn.textContent = favorited ? "♥" : "♡";
    });
  }

  function renderFavorites() {
    els.favoritesGrid.innerHTML = "";

    if (state.favorites.length === 0) {
      els.favoritesSection.hidden = true;
      return;
    }

    const isHomeView = !state.query && state.category === "all";
    els.favoritesSection.hidden = !isHomeView;

    if (!isHomeView) return;

    state.favorites.forEach((id) => {
      const app = getAppById(id);
      if (app) {
        els.favoritesGrid.appendChild(createCard(app));
      }
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
      els.trendingGrid.closest(".section").hidden = true;
      renderFavorites();
      renderRecents();
      return;
    }

    els.emptyState.hidden = true;
    els.catalogCount.textContent = `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`;

    const isHomeView = !state.query && state.category === "all";
    const trendingSection = els.trendingGrid.closest(".section");

    if (isHomeView) {
      trendingSection.hidden = false;
      trending.forEach((app) => els.trendingGrid.appendChild(createCard(app)));
    } else {
      trendingSection.hidden = true;
    }

    filtered.forEach((app) => els.catalogGrid.appendChild(createCard(app)));
    renderFavorites();
    renderRecents();
  }

  function setCategory(category, { syncUrl = true } = {}) {
    state.category = category;
    els.categoriesList.querySelectorAll(".categories__btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.category === category);
    });
    if (syncUrl) {
      applyUrlParams({ category: state.category }, { push: true });
    }
    render();
  }

  function clearFilters() {
    state.query = "";
    state.category = "all";
    els.searchInput.value = "";
    setCategory("all");
  }

  function openPreview(app, { syncUrl = true } = {}) {
    state.previewAppId = app.id;
    els.previewIcon.textContent = app.icon;
    els.previewTitle.textContent = app.title;
    els.previewCategory.textContent = app.category;
    els.previewRating.textContent = `★ ${app.rating.toFixed(1)}`;
    els.previewDescription.textContent = app.description;
    updatePreviewFavoriteButton(app.id);
    els.previewModal.hidden = false;
    document.body.style.overflow = "hidden";
    els.previewCloseBtn.focus();

    if (syncUrl) {
      applyUrlParams({ appId: app.id }, { push: true });
    }

    const playHandler = () => {
      closePreview();
      openPlayer(app);
    };

    els.previewPlayBtn.onclick = playHandler;
    els.previewPlayBtn.dataset.appId = app.id;
    els.previewFavoriteBtn.dataset.favoriteId = app.id;
    els.previewFavoriteBtn.onclick = () => toggleFavorite(app.id);
  }

  function updatePreviewFavoriteButton(id) {
    const favorited = isFavorite(id);
    els.previewFavoriteBtn.setAttribute("aria-pressed", String(favorited));
    els.previewFavoriteBtn.setAttribute("aria-label", favorited ? "Quitar de favoritos" : "Añadir a favoritos");
    els.previewFavoriteBtn.textContent = favorited ? "♥" : "♡";
  }

  function closePreview({ syncUrl = true } = {}) {
    state.previewAppId = null;
    els.previewModal.hidden = true;
    document.body.style.overflow = "";
    els.previewPlayBtn.onclick = null;
    els.previewPlayBtn.dataset.appId = "";
    els.previewFavoriteBtn.onclick = null;
    delete els.previewFavoriteBtn.dataset.favoriteId;
    if (syncUrl) {
      applyUrlParams({ appId: null }, { push: false });
    }
  }

  function showPlayerLoader() {
    els.playerLoader.hidden = false;
    els.playerError.hidden = true;
  }

  function hidePlayerLoader() {
    els.playerLoader.hidden = true;
  }

  function showPlayerError() {
    els.playerLoader.hidden = true;
    els.playerError.hidden = false;
  }

  function clearPlayerTimer() {
    if (state.playerLoadTimer) {
      clearTimeout(state.playerLoadTimer);
      state.playerLoadTimer = null;
    }
  }

  function openPlayer(app) {
    els.playerTitle.textContent = app.title;
    els.playerIframe.src = app.url;
    els.playerModal.hidden = false;
    document.body.style.overflow = "hidden";
    els.closePlayer.focus();
    addRecent(app);

    showPlayerLoader();
    clearPlayerTimer();

    state.playerLoadTimer = setTimeout(() => {
      if (!els.playerLoader.hidden) {
        showPlayerError();
      }
    }, PLAYER_LOAD_TIMEOUT_MS);
  }

  function closePlayer() {
    clearPlayerTimer();
    els.playerModal.hidden = true;
    els.playerIframe.src = "";
    els.playerError.hidden = true;
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
      applyUrlParams({ query: state.query }, { push: false });
      render();
    });

    els.categoriesList.addEventListener("click", (e) => {
      const btn = e.target.closest(".categories__btn");
      if (!btn) return;
      setCategory(btn.dataset.category);
    });

    els.clearRecentsBtn.addEventListener("click", clearRecents);
    els.clearFavoritesBtn.addEventListener("click", clearFavorites);
    els.emptyClearBtn.addEventListener("click", clearFilters);

    els.previewOverlay.addEventListener("click", closePreview);
    els.previewCloseBtn.addEventListener("click", closePreview);

    els.playerOverlay.addEventListener("click", closePlayer);
    els.closePlayer.addEventListener("click", closePlayer);
    els.fullscreenBtn.addEventListener("click", toggleFullscreen);

    els.playerIframe.addEventListener("load", () => {
      hidePlayerLoader();
      clearPlayerTimer();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!els.playerModal.hidden) {
        closePlayer();
      } else if (!els.previewModal.hidden) {
        closePreview();
      }
    });

    window.addEventListener("popstate", () => {
      const { category, query, appId } = getUrlParams();
      state.query = query;
      els.searchInput.value = query;
      setCategory(category, { syncUrl: false });
      if (!Number.isNaN(appId) && getAppById(appId)) {
        openPreview(getAppById(appId), { syncUrl: false });
      } else if (!els.previewModal.hidden) {
        closePreview({ syncUrl: false });
      }
    });

    const { category, query, appId } = getUrlParams();
    state.query = query;
    els.searchInput.value = query;
    setCategory(category, { syncUrl: false });
    if (!Number.isNaN(appId)) {
      const app = getAppById(appId);
      if (app) openPreview(app, { syncUrl: false });
    }
  }

  init();
})();
