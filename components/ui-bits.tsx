"use client";

// Small shared Apple-light UI primitives used across the studio.

import { ChevronDown } from "lucide-react";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Disclosure card (details-like collapsible section). */
export function Disclosure({
  title,
  subtitle,
  defaultOpen = false,
  children,
  badge,
  open: openProp,
  onOpenChange,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  badge?: ReactNode;
  /** Fix Pack 21: optional controlled mode — the guided tour opens sections. */
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const [selfOpen, setSelfOpen] = useState(defaultOpen);
  const open = openProp ?? selfOpen;
  const id = useId();
  return (
    <Card className="p-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() =>
          onOpenChange ? onOpenChange(!open) : setSelfOpen(!open)
        }
        className="flex w-full items-center justify-between gap-3 rounded-2xl p-4 text-left focus-visible:outline-2 focus-visible:outline-ring"
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex items-center gap-2 text-[15px] font-semibold text-card-foreground">
            {title}
            {badge}
          </span>
          {subtitle ? (
            <span className="text-[13px] leading-relaxed text-muted-foreground">
              {subtitle}
            </span>
          ) : null}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div id={id} className="border-t border-border p-4">
          {children}
        </div>
      ) : null}
    </Card>
  );
}

/** iOS-style segmented control. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
  fullWidth = false,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  size?: "sm" | "md";
  fullWidth?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex rounded-xl bg-muted p-0.5",
        fullWidth && "w-full",
        size === "sm" ? "gap-0" : "gap-0.5",
      )}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
            fullWidth && "min-w-0 flex-1",
            size === "sm"
              ? "px-2.5 py-1 text-[13px]"
              : "px-4 py-1.5 text-[13px]",
            value === o.value
              ? "bg-card text-card-foreground shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Toggleable chip (checkbox semantics). */
export function Chip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        checked
          ? "border-primary bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:border-input hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

/** Static tag chip (non-interactive). */
export function Tag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "warn";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-medium",
        tone === "warn"
          ? "bg-warning/10 text-warning"
          : "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  children,
  warn,
  warnLabel,
}: {
  label: string;
  children: ReactNode;
  warn?: boolean;
  warnLabel?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
        {label}
        {warn ? <Tag tone="warn">{warnLabel}</Tag> : null}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-[15px] text-card-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring";

export const inputWarnCls =
  "w-full rounded-md border border-warning bg-warning/5 px-3 py-2 text-[15px] text-card-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring";
