import { CATEGORIES } from "../data/apps";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <nav className="border-b border-white/[0.05] bg-surface py-3.5" aria-label="Categorías">
      <div className="mx-auto max-w-[1200px] px-5">
        <ul className="flex gap-2.5 overflow-x-auto pb-1">
          {CATEGORIES.map((category) => {
            const label = category === "all" ? "Todos" : category;
            const isActive = activeCategory === category;
            return (
              <li key={category}>
                <button
                  type="button"
                  data-category={category}
                  onClick={() => onCategoryChange(category)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition outline-none ${
                    isActive
                      ? "border-accent bg-accent text-white"
                      : "border-white/[0.08] bg-transparent text-text-muted hover:bg-surface-hover hover:text-text"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
