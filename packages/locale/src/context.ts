
import { i18n,TFunction } from "i18next";
import { Ref } from "vue";
let i18nInstance: i18n;
let t: Ref<TFunction>;

/**
 * 设置i18next实例
 * @param instance
 */
export function setI18n(instance: i18n) {
  i18nInstance = instance;
}

/**
 * 获取i18next实例
 */
export function getI18n() {
  return i18nInstance;
}

export const use = (i18n: i18n) => {
  setI18n(i18n);
};

