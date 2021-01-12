export default [
  {
    path: "/layout/crud",
    name: "crud",
    component: () => import("@/docs/layout/crud.md"),
  },
  {
    path: "/layout/test",
    name: "test",
    component: () => import("@/docs/layout/test.md"),
  },
];
