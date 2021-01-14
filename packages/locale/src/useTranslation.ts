import { getI18n } from "./context";

/**
 * 默认t函数
 * @param key
 * @param defaultValue
 * @description 返回默认值或翻译key值
 */
export const defaultT = (key: string, defaultValue?: string) => {
  return defaultValue ? defaultValue : key;
};

/**
 * 使用翻译hook
 * @param ns 命名空间
 */
export function useTranslation(ns?: string | string[]) {
  const i18n = getI18n();
  if (!i18n) {
    return { t: defaultT, i18n: {} };
  }
  // 预处理命名空间
  let namespaces = ns;
  namespaces =
    typeof namespaces === "string"
      ? [namespaces]
      : namespaces || ["component"];

  // 绑定 t 函数 到命名空间
  function getT() {
    return i18n.getFixedT(
      null,
      (namespaces as string[])[0],
    );
  }
  return {
    t: getT(),
    i18n,
  };
}
