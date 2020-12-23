import { Ref, unref } from "vue";

export function useRefTemplate<T>(refTemplate: Ref<RefTemplate<T>>) {
  const el = unref(refTemplate);
  if (!el) {
    throw new Error("找不到元素");
  }
  return el as T;
}
