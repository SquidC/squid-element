
import { i18n } from "i18next";
let i18nInstance: i18n;

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

