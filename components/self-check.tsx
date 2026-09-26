"use client";

import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import type { SelfCheckResult } from "@/lib/selfcheck";
import type { Lang } from "@/lib/types";

export function SelfCheck({ lang }: { lang: Lang }) {
  const [results, setResults] = useState<SelfCheckResult[] | null>(null);
  const failed = results ? results.filter((r) => !r.pass) : [];

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[15px] font-semibold text-card-foreground">
            {t("selfcheck.title", lang)}
          </h2>
          <p className="text-[13px] text-muted-foreground">
            {t("selfcheck.hint", lang)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            // FP23: the 1200-line suite is code-split and loads on demand.
            void import("@/lib/selfcheck").then((m) =>
              setResults(m.runSelfCheck()),
            );
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
          {t("selfcheck.run", lang)}
        </button>
      </div>
      {results ? (
        <div className="flex flex-col gap-1.5">
          <p
            role="status"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          >
            {failed.length === 0 ? (
              <>
                <CheckCircle2
                  aria-hidden="true"
                  className="h-4 w-4 text-primary"
                />
                {t("selfcheck.pass", lang)} ({results.length}/{results.length})
              </>
            ) : (
              <>
                <XCircle
                  aria-hidden="true"
                  className="h-4 w-4 text-destructive"
                />
                {t("selfcheck.fail", lang)} {failed.length}/{results.length}
              </>
            )}
          </p>
          {failed.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {failed.map((r) => (
                <li
                  key={r.name}
                  className="font-mono text-[13px] text-destructive"
                >
                  {r.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
