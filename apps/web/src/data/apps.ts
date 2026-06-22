import type { AppItem } from "../types/app";
import { CATEGORIES } from "./categories";

export { CATEGORIES };

/**
 * Dataset estático de apps.
 * @deprecated El catálogo se carga dinámicamente desde `/api/apps`. Se conserva
 * como referencia y para tests de integridad de datos.
 */
export const APPS: AppItem[] = [
  {
    id: 1,
    title: "HexGL",
    category: "carreras",
    trending: true,
    rating: 4.7,
    icon: "🏎️",
    url: "https://hexgl.bkcore.com/",
    description:
      "Compite en una carrera futurista anti-gravedad a toda velocidad por circuitos de neón.",
    controls: { scheme: "keyboard", keys: "← →" },
  },
  {
    id: 2,
    title: "Super Mario Bros",
    category: "aventura",
    trending: true,
    rating: 4.5,
    icon: "🍄",
    url: "https://martindrapeau.github.io/backbone-game-engine/super-mario-bros/index.html",
    description:
      "Salta, esquiva enemigos y recorre el primer nivel clásico de este plataformas retro.",
    controls: { scheme: "keyboard", keys: "← → · Espacio" },
  },
  {
    id: 3,
    title: "Hextris",
    category: "puzzle",
    trending: true,
    rating: 4.3,
    icon: "🧩",
    url: "https://hextris.io/",
    description:
      "Gira el hexágono y encaja colores en este adictivo puzzle inspirado en Tetris.",
    controls: { scheme: "hybrid", keys: "← →" },
  },
  {
    id: 4,
    title: "SkiFree",
    category: "deportes",
    trending: false,
    rating: 4.2,
    icon: "⛷️",
    url: "https://basicallydan.github.io/skifree.js/",
    description:
      "Esquía cuesta abajo, esquiva obstáculos y trata de no ser atrapado por el yeti.",
    controls: { scheme: "keyboard", keys: "← → ↑ ↓" },
  },
  {
    id: 5,
    title: "Alien Invasion",
    category: "acción",
    trending: true,
    rating: 4.6,
    icon: "👾",
    url: "https://cykod.github.io/AlienInvasion/",
    description:
      "Defiende la Tierra de oleadas de alienígenas en este shooter arcade de desplazamiento lateral.",
    controls: { scheme: "keyboard", keys: "← → · Espacio" },
  },
  {
    id: 6,
    title: "2048",
    category: "casual",
    trending: false,
    rating: 4.1,
    icon: "🔢",
    url: "https://gabrielecirulli.github.io/2048/",
    description:
      "Desliza los números y combina fichas hasta alcanzar el mítico 2048.",
    controls: { scheme: "hybrid", keys: "← → ↑ ↓" },
  },
  {
    id: 7,
    title: "Clumsy Bird",
    category: "acción",
    trending: false,
    rating: 4.0,
    icon: "🐦",
    url: "https://ellisonleao.github.io/clumsy-bird/",
    description:
      "Vuela entre tuberías en este divertido clon de Flappy Bird y bate tu propio récord.",
    controls: { scheme: "hybrid", keys: "Espacio / toque" },
  },
  {
    id: 8,
    title: "A Dark Room",
    category: "casual",
    trending: false,
    rating: 4.4,
    icon: "🕯️",
    url: "https://adarkroom.doublespeakgames.com/",
    description:
      "Descubre una historia oscura en este juego de texto, exploración e incremental.",
    controls: { scheme: "mouse", keys: "Clic" },
  },
  {
    id: 9,
    title: "Trigger Rally",
    category: "carreras",
    trending: false,
    rating: 4.3,
    icon: "🏁",
    url: "https://codeartemis.github.io/TriggerRally/server/public/",
    description:
      "Conduce a toda velocidad por pistas de rally arcade en este juego de conducción web.",
    controls: { scheme: "keyboard", keys: "← → ↑ ↓" },
  },
  {
    id: 10,
    title: "The House",
    category: "aventura",
    trending: false,
    rating: 4.5,
    icon: "🏚️",
    url: "https://the-house.arturkot.pl/",
    description:
      "Explora una casa misteriosa, resuelve acertijos y encuentra la salida en este point-and-click.",
    controls: { scheme: "mouse", keys: "Clic" },
  },
  {
    id: 11,
    title: "Sudoku Daily",
    category: "puzzle",
    trending: false,
    rating: 4.2,
    icon: "🧮",
    url: "https://baruchel.insomnia247.nl/sudoku-js/sudoku.html",
    description:
      "Disfruta de sudokus con diferentes niveles de dificultad en una interfaz limpia.",
    controls: { scheme: "mouse", keys: "Clic / toque" },
  },
  {
    id: 12,
    title: "Fluid Table Tennis",
    category: "deportes",
    trending: false,
    rating: 3.9,
    icon: "🏓",
    url: "https://anirudhjoshi.github.io/fluid_table_tennis/",
    description:
      "Juega ping-pong sobre una simulación de fluidos a todo color y reacción rápida.",
    controls: { scheme: "mouse", keys: "Mueve el ratón" },
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
    controls: { scheme: "hybrid", keys: "Flechas o desliza" },
  },
];
