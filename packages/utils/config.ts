import { i18n,TFunction } from "i18next";
import { Ref } from "vue";
export interface InstallOptions {
  locale?: i18n
  t?: Ref<TFunction>
}
