"use client";

import { useEffect } from "react";

export function BlueprintMode() {
  useEffect(() => {
    const root = document.documentElement;

    function showBlueprint(event: KeyboardEvent) {
      if (event.key !== "Alt") return;
      root.dataset.blueprint = "true";
    }

    function hideBlueprint() {
      delete root.dataset.blueprint;
    }

    function hideBlueprintOnKeyUp(event: KeyboardEvent) {
      if (event.key !== "Alt") return;
      hideBlueprint();
    }

    window.addEventListener("keydown", showBlueprint);
    window.addEventListener("keyup", hideBlueprintOnKeyUp);
    window.addEventListener("blur", hideBlueprint);

    return () => {
      window.removeEventListener("keydown", showBlueprint);
      window.removeEventListener("keyup", hideBlueprintOnKeyUp);
      window.removeEventListener("blur", hideBlueprint);
      delete root.dataset.blueprint;
    };
  }, []);

  return <span aria-hidden="true" className="blueprint-grid" />;
}
