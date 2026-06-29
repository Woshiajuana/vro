export interface SlotEntry {
  source: string
  target: string
}

export const getSlotEntries = (slots?: Record<string, string>): SlotEntry[] => {
  return Object.entries(slots ?? {}).map(([source, target]) => ({ source, target }))
}
