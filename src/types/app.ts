export interface AppControls {
  scheme: "keyboard" | "touch" | "mouse" | "hybrid";
  keys?: string;
}

export interface AppItem {
  id: number;
  title: string;
  category: string;
  trending: boolean;
  rating: number;
  icon: string;
  url: string;
  description: string;
  isLocal?: boolean;
  controls?: AppControls;
}

export type Category = "all" | "acción" | "aventura" | "puzzle" | "carreras" | "deportes" | "casual";
