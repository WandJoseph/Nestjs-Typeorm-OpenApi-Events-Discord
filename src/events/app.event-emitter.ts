import { Emits, Payloads } from '.';

export interface CancelablePromise<T> extends Promise<T> {
  cancel(reason: string): undefined;
}

interface WaitForFilter {
  (...values: any[]): boolean;
}

export interface WaitForOptions {
  /**
   * @default 0
   */
  timeout: number;
  /**
   * @default null
   */
  filter: WaitForFilter;
  /**
   * @default false
   */
  handleError: boolean;
  /**
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  Promise: Function;
  /**
   * @default false
   */
  overload: boolean;
}

export interface AppEventEmitter {
  emit<E extends Emits>(event: E, payload: Payloads[E]): boolean;
  waitFor<E extends Emits>(
    event: E,
    timeout?: number,
  ): CancelablePromise<Payloads[E][]>;
  waitFor<E extends Emits>(
    event: E,
    filter?: WaitForFilter,
  ): CancelablePromise<Payloads[E][]>;
  waitFor<E extends Emits>(
    event: E,
    options?: WaitForOptions,
  ): CancelablePromise<Payloads[E][]>;
}
