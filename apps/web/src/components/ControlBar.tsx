import { useIsTouchDevice } from "../hooks/useIsTouchDevice";
import type { AppControls } from "../types/app";

interface ControlBarProps {
  controls?: AppControls;
}

function getControlMessage(controls: AppControls, isTouch: boolean): { icon: string; text: string } | null {
  const { scheme, keys } = controls;

  if (scheme === "keyboard" && !isTouch) {
    return null;
  }

  switch (scheme) {
    case "keyboard":
      return {
        icon: "⌨️",
        text: keys ? `Conecta un teclado: ${keys}` : "Conecta un teclado para jugar",
      };
    case "mouse":
      return {
        icon: isTouch ? "👆" : "🖱️",
        text: keys ? `${keys}` : isTouch ? "Toca para interactuar" : "Usa el ratón",
      };
    case "touch":
      return {
        icon: "👆",
        text: isTouch ? "Toca la pantalla para jugar" : `Diseñado para táctil${keys ? ` · ${keys}` : ""}`,
      };
    case "hybrid":
      return {
        icon: isTouch ? "👆" : "⌨️",
        text: isTouch
          ? `Toca para jugar${keys ? ` · ${keys}` : ""}`
          : `Usa el teclado${keys ? `: ${keys}` : ""}`,
      };
    default:
      return null;
  }
}

export function ControlBar({ controls }: ControlBarProps) {
  const isTouch = useIsTouchDevice();
  const message = controls ? getControlMessage(controls, isTouch) : null;

  if (!message) return null;

  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-3 pt-8"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-3.5 py-1.5 text-xs font-medium text-text-muted shadow-lg backdrop-blur-sm">
        <span aria-hidden="true">{message.icon}</span>
        <span>{message.text}</span>
      </div>
    </div>
  );
}
