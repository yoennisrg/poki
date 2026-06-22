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
}

export type Category = "all" | "acción" | "aventura" | "puzzle" | "carreras" | "deportes" | "casual";
