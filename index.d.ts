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
  KnownHandler extends Handler = (value: unknown) => void,
  UnknownHandler extends Handler = (value: unknown) => void,
  InvalidHandler extends Handler = (value: unknown) => void
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
  (value: unknown):
    | ReturnType<UnknownHandler>
    | ReturnType<InvalidHandler>
    | ReturnType<KnownHandler>
}
