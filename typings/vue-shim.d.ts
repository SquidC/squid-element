declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
  [key: string]: T
}

declare type Hash<T> = Indexable<T>

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare type ComponentSize = "large" | "medium" | "small" | "mini"

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type EmitType = (event: string, ...args: any[]) => void;

/**
* vue模板组件实例Ref
*/
declare type RefInstance = {
  /**
   * vue组件内部实例
   */
  $: import("vue").ComponentInternalInstance
} | null;

/**
* 模板ref
*/
declare type RefTemplate<T> = T | null;
