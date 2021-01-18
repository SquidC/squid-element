import i18next from "i18next";
import backend from "i18next-http-backend";
import { initVueI18next } from "@squidc/vue-i18next";
const multiLangPath = "/lang";

const initI18n = (lng: string) =>
  i18next
    .use(backend)
    .use(initVueI18next)
    .init(
      {
        // 当前语言包
        lng: lng,
        // 默认语言包
        fallbackLng: "zh",
        // 预加载语言包
        preload: ["zh"],
        ns: ["component"],
        defaultNS: "component",
        backend: {
          // 语言包加载路径
          loadPath: `${multiLangPath}/{{lng}}/{{ns}}.json`,
          // 是否允许跨域
          crossDomain: true,
        },
        // 内嵌的变量格式化操作
        interpolation: {},
      },
      err => {
        console.log(err);
      },
    );

export default initI18n;
