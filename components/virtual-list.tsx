"use client";

// Fix Pack 21: dependency-free windowed list. Below VIRTUAL_THRESHOLD it
// renders a plain column (natural row heights); above it, only the visible
// window is mounted inside a fixed-height scroller, so history and the
// scene library stay fast at hundreds of records.

import { type ReactNode, useState } from "react";
import { VIRTUAL_THRESHOLD } from "@/lib/virtual";

const OVERSCAN = 4;

export function VirtualList<T>({
  items,
  rowHeight,
  maxHeight = 420,
  keyOf,
  render,
  label,
}: {
  items: T[];
  /** Fixed row height (content + gap) used by the windowed branch. */
  rowHeight: number;
  maxHeight?: number;
  keyOf: (item: T) => string;
  render: (item: T) => ReactNode;
  label: string;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  if (items.length <= VIRTUAL_THRESHOLD) {
    return (
      <ul aria-label={label} className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={keyOf(it)}>{render(it)}</li>
        ))}
      </ul>
    );
  }

  const height = Math.min(maxHeight, items.length * rowHeight);
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
  const end = Math.min(
    items.length,
    Math.ceil((scrollTop + height) / rowHeight) + OVERSCAN,
  );

  return (
    <div
      aria-label={label}
      className="overflow-y-auto overscroll-contain"
      style={{ height }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <ul className="relative" style={{ height: items.length * rowHeight }}>
        {items.slice(start, end).map((it, k) => (
          <li
            key={keyOf(it)}
            className="absolute inset-x-0 overflow-hidden pb-2"
            style={{ top: (start + k) * rowHeight, height: rowHeight }}
          >
            {render(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
