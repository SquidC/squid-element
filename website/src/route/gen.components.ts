export default [
  {
    path: "/components/directive",
    name: "directive",
    component: () => import("@/layout/basic/doc.vue"),
    children: [
      {
        path: "/components/directive/draggable",
        name: "draggable",
        component: () => import("@/docs/components/directive/draggable.md")
      }
    ]
  },
  {
    path: "/components/hooks",
    name: "hooks",
    component: () => import("@/layout/basic/doc.vue"),
    children: [
      {
        path: "/components/hooks/debounce&throttle",
        name: "debounce&throttle",
        component: () => import("@/docs/components/hooks/debounce&throttle.md")
      },
      {
        path: "/components/hooks/lazyImage",
        name: "lazyImage",
        component: () => import("@/docs/components/hooks/lazyImage.md")
      },
      {
        path: "/components/hooks/reqMax&errorTry",
        name: "reqMax&errorTry",
        component: () => import("@/docs/components/hooks/reqMax&errorTry.md")
      },
      {
        path: "/components/hooks/scrollLoading",
        name: "scrollLoading",
        component: () => import("@/docs/components/hooks/scrollLoading.md")
      }
    ]
  },
  {
    path: "/components/link",
    name: "link",
    component: () => import("@/docs/components/link.md")
  }
]