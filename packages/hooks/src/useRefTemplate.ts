import { Ref, unref } from "vue";


export function useRefTemplate<T>(refTemplate: Ref<RefTemplate<T>>): T;
export function useRefTemplate<T>(
  refTemplate: Ref<RefTemplate<T>>,
  isNull: boolean
): RefTemplate<T>;
export function useRefTemplate<T>(
  refTemplate: Ref<RefTemplate<T>>,
  isNull?: boolean,
): RefTemplate<T> {
  const el = unref(refTemplate);
  if (!el) {
    if (!isNull) {
      throw new Error("找不到元素");
    } else {
      return el;
    }
  }
  return el as T;
}
