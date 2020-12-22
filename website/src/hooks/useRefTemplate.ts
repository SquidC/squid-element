import { Ref, unref } from "vue";

/**
 * 模板ref
 */
declare type RefTemplate<T> = T | null;
export default function useRefTemplate<T>(refTemplate: Ref<RefTemplate<T>>): T;
export default function useRefTemplate<T>(refTemplate: Ref<RefTemplate<T>>, isNull: boolean): RefTemplate<T>;
export default function useRefTemplate<T>(refTemplate: Ref<RefTemplate<T>>, isNull?: boolean): RefTemplate<T> {
    const el = unref(refTemplate);
    if (!el) {
        if(!isNull){
            throw new Error("找不到元素");
        }else{
            return el;
        }
    }
    return el as T;
}
