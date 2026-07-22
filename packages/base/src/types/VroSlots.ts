export type VroSlot = (props?: any) => any

export interface VroSlots {
  [name: string]: VroSlot | undefined
}
