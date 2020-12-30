export default [
  {
    path: "crud",
    name: "crud",
    component: () => import("/@/docs/layout/crud.md"),
  },
  {
    path: "test",
    name: "test",
    component: () => import("/@/docs/layout/test.md"),
  },
]
;
