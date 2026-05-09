export interface Milestone {
  label: string
  sublabel: string
}

export const MILESTONES: Record<number, Milestone> = {
  1: {
    label: 'THREAD OPENS',
    sublabel: 'PedalsandChill acquires a TE-SP-1 prototype - April 2024',
  },
  257: {
    label: 'FIRMWARE DUMPED',
    sublabel: 'murray bypasses APPROTECT on attempt #8,504 - Feb 21 2025',
  },
  499: {
    label: 'STEMS LOADED',
    sublabel: 'TimK plays custom audio on real hardware - Jan 2026',
  },
  556: {
    label: 'BOOTLOADER FOUND',
    sublabel: 'B_E_N discovers Track 1+4 USB-C CDC serial mode - Jan 2026',
  },
  709: {
    label: 'BOOTLOADER CRACKED',
    sublabel: 'solderless.engineering launches - update firmware without opening the device - Mar 2026',
  },
  743: {
    label: 'THE FULL HISTORY',
    sublabel: 'maybe writes the definitive TE-SP-1 timeline - Mar 2026',
  },
  893: {
    label: 'THREAD CLOSED',
    sublabel: 'Lines moderators close the thread - community moves to Discord - May 2026',
  },
}

export function isMilestone(num: number): boolean {
  return num in MILESTONES
}

export function getMilestone(num: number): Milestone | null {
  return MILESTONES[num] ?? null
}
