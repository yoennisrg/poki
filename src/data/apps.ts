import type { AppItem } from "../types/app";

export const APPS: AppItem[] = [
  {
    id: 1,
    title: "Neon Racer",
    category: "carreras",
    trending: true,
    rating: 4.7,
    icon: "🏎️",
    url: "https://example.com/neon-racer",
    description:
      "Corre a toda velocidad por calles futuristas llenas de neón y supera a tus rivales.",
  },
  {
    id: 2,
    title: "Pixel Quest",
    category: "aventura",
    trending: true,
    rating: 4.5,
    icon: "🗡️",
    url: "https://example.com/pixel-quest",
    description:
      "Embárcate en una aventura retro para derrotar monstruos y descubrir tesoros ocultos.",
  },
  {
    id: 3,
    title: "Block Drop",
    category: "puzzle",
    trending: true,
    rating: 4.3,
    icon: "🧩",
    url: "https://example.com/block-drop",
    description:
      "Encaja bloques de colores y limpia líneas en este clásico adictivo de lógica.",
  },
  {
    id: 4,
    title: "Street Hoops",
    category: "deportes",
    trending: false,
    rating: 4.2,
    icon: "🏀",
    url: "https://example.com/street-hoops",
    description:
      "Demuestra tu puntería en canchas callejeras con partidos rápidos 1 contra 1.",
  },
  {
    id: 5,
    title: "Zombie Survival",
    category: "acción",
    trending: true,
    rating: 4.6,
    icon: "🧟",
    url: "https://example.com/zombie-survival",
    description:
      "Sobrevive a hordas de zombis y defiende tu refugio con todo tipo de armas.",
  },
  {
    id: 6,
    title: "Match Three",
    category: "casual",
    trending: false,
    rating: 4.1,
    icon: "💎",
    url: "https://example.com/match-three",
    description:
      "Combina gemas brillantes y supera niveles cada vez más desafiantes.",
  },
  {
    id: 7,
    title: "Sky Runner",
    category: "acción",
    trending: false,
    rating: 4.0,
    icon: "🏃",
    url: "https://example.com/sky-runner",
    description:
      "Salta entre plataformas flotantes y evita obstáculos en las alturas.",
  },
  {
    id: 8,
    title: "Farm Tycoon",
    category: "casual",
    trending: false,
    rating: 4.4,
    icon: "🌾",
    url: "https://example.com/farm-tycoon",
    description:
      "Construye y gestiona tu granja, cosecha cultivos y expande tu negocio rural.",
  },
  {
    id: 9,
    title: "Drift King",
    category: "carreras",
    trending: false,
    rating: 4.3,
    icon: "🏁",
    url: "https://example.com/drift-king",
    description:
      "Domina el derrape en circuitos cerrados y conviértete en el rey del drift.",
  },
  {
    id: 10,
    title: "Mystery Manor",
    category: "aventura",
    trending: false,
    rating: 4.5,
    icon: "🔍",
    url: "https://example.com/mystery-manor",
    description:
      "Explora una mansión enigmática, resuelve acertijos y descubre su secreto.",
  },
  {
    id: 11,
    title: "Sudoku Daily",
    category: "puzzle",
    trending: false,
    rating: 4.2,
    icon: "🔢",
    url: "https://example.com/sudoku-daily",
    description:
      "Disfruta de nuevos sudokus cada día con diferentes niveles de dificultad.",
  },
  {
    id: 12,
    title: "Penalty Shootout",
    category: "deportes",
    trending: false,
    rating: 3.9,
    icon: "⚽",
    url: "https://example.com/penalty-shootout",
    description:
      "Toma penaltys y ataja disparos en esta tensa definición a fondo de red.",
  },
  {
    id: 13,
    title: "Retro Snake",
    category: "casual",
    trending: true,
    rating: 4.8,
    icon: "🐍",
    url: "/games/snake/index.html",
    isLocal: true,
    description:
      "El clásico juego de la serpiente. Come, crece y evita chocar contigo mismo.",
  },
];

export const CATEGORIES: string[] = [
  "all",
  "acción",
  "aventura",
  "puzzle",
  "carreras",
  "deportes",
  "casual",
];
