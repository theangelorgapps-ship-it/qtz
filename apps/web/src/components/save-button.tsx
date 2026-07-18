"use client";

import { HeartIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function SaveButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      className={saved ? "iconButton saved" : "iconButton"}
      type="button"
      onClick={() => setSaved((value) => !value)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved work" : "Save this work"}
    >
      <HeartIcon size={19} weight={saved ? "fill" : "bold"} />
    </button>
  );
}
