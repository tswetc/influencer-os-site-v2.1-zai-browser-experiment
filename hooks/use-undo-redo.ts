"use client";

// FP23: generic undo/redo over a watched "results" transition, extracted
// from the page monolith. The caller supplies the full live snapshot every
// render plus apply() to restore one; the hook owns both stacks.

import { useEffect, useRef, useState } from "react";

/** Stack depth: enough for a session, small enough for memory. */
export const UNDO_CAP = 30;

export function useUndoRedo<Snap>({
  live,
  results,
  getResults,
  apply,
  cap = UNDO_CAP,
}: {
  /** Snapshot of everything a restore should bring back (rebuilt each render). */
  live: Snap;
  /** The watched array: replacing a non-empty one pushes the previous snapshot. */
  results: unknown[];
  getResults: (snap: Snap) => unknown[];
  apply: (snap: Snap) => void;
  cap?: number;
}) {
  const [undoStack, setUndoStack] = useState<Snap[]>([]);
  const [redoStack, setRedoStack] = useState<Snap[]>([]);
  const liveRef = useRef<Snap>(live);
  liveRef.current = live;
  const prevRef = useRef<Snap | null>(null);
  const restoringRef = useRef(false);

  useEffect(() => {
    const prev = prevRef.current;
    if (restoringRef.current) {
      restoringRef.current = false;
    } else if (
      prev &&
      getResults(prev).length > 0 &&
      getResults(prev) !== results
    ) {
      setUndoStack((s) => [...s.slice(-(cap - 1)), prev]);
      setRedoStack([]);
    }
    prevRef.current = liveRef.current;
    // The push must fire only when the watched array itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  function restore(snap: Snap) {
    restoringRef.current = true;
    apply(snap);
  }
  function undo() {
    const snap = undoStack[undoStack.length - 1];
    if (!snap) return;
    setUndoStack((s) => s.slice(0, -1));
    setRedoStack((s) => [...s, liveRef.current]);
    restore(snap);
  }
  function redo() {
    const snap = redoStack[redoStack.length - 1];
    if (!snap) return;
    setRedoStack((s) => s.slice(0, -1));
    setUndoStack((s) => [...s, liveRef.current]);
    restore(snap);
  }

  return {
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  };
}
