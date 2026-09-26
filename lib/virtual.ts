// Fix Pack 21: lists longer than this render through the windowed
// VirtualList (components/virtual-list.tsx) instead of a plain column, so
// history and the scene library stay fast at hundreds of records.
export const VIRTUAL_THRESHOLD = 40;
