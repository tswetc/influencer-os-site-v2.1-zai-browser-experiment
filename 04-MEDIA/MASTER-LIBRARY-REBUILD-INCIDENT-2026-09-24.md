# Master Library Rebuild Incident — 2026-09-24

## Finding

Two successful materialization runs were executed into the same output directory:

1. older rights state: 149 allowed / 11 held;
2. updated founder decision state: 156 allowed / 4 held.

The original builder overwrote files it regenerated but did not remove files that no longer belonged to the active selection.

Because row numbering changed between the two runs, the directory can contain stale/duplicate derivatives even though the current manifest correctly reports 156 items.

One especially important stale derivative is the previously materialized G0028/s01 photographer BTS frame, which is now rejected under the founder's other-identity rule.

## Required correction

Do not publish or commit the current `04-MEDIA/library/master-v1/` directory.

Pull the fixed builder and run it again. The builder now:
- builds into a fresh sibling staging directory;
- preserves the old output until the new build succeeds;
- replaces the old output only after a zero-error build;
- records final paths rather than staging paths.

After the clean rebuild, verify:
- manifest items = 156;
- filesystem media files = 156;
- skipped holds = 4;
- errors = 0;
- no G0028/s01 derivative exists in the generated library.

This is a pipeline-state bug, not an error in M001's selection or the second run's manifest.
