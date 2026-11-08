/** Options shared by functions that can use either legacy cookie APIs or Open Cloud. */
export interface DualModeOptions {
  /** Prefer Open Cloud (API key) instead of the legacy cookie-based endpoint. */
  useOpenCloud?: boolean;
}

export function wantsOpenCloud(options?: DualModeOptions): boolean {
  return !!options?.useOpenCloud;
}
