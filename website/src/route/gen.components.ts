export default [
  {
    path: "/components/directive",
    name: "directive",
    component: () => import("@/layout/basic/doc.vue"),
    children: [
      {
        path: "/components/directive/draggable",
        name: "draggable",
        component: () => import("@/docs/components/directive/draggable.md"),
      },
    ],
  },
  {
    path: "/components/link",
    name: "link",
    component: () => import("@/docs/components/link.md"),
  },
]
;