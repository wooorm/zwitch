/**
 * Base type that handlers extend from
 */
export type Handler = (...props: unknown[]) => unknown
/**
 * Handle values based on a property.
 *
 * @param key key
 * @param options options
 * @returns handler
 */
export declare function zwitch<
  KnownHandler extends Handler = (...params: unknown[]) => void,
  UnknownHandler extends Handler = (...params: unknown[]) => void,
  InvalidHandler extends Handler = (...params: unknown[]) => void
>(
  key: string,
  options?: {
    unknown?: UnknownHandler
    invalid?: InvalidHandler
    handlers?: Record<string, KnownHandler>
  }
): {
  unknown: UnknownHandler
  invalid: InvalidHandler
  handlers: Record<string, KnownHandler>
  (...params: Parameters<UnknownHandler>): ReturnType<UnknownHandler>
  (...params: Parameters<InvalidHandler>): ReturnType<InvalidHandler>
  (...params: Parameters<KnownHandler>): ReturnType<KnownHandler>
}
