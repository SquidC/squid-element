export default [
  {
    path: "/components/directive",
    name: "directive",
    children: [
      { path: "/components/directive/draggable", name: "draggable.md" }
    ]
  },
  {
    path: "/components/hooks",
    name: "hooks",
    children: [
      {
        path: "/components/hooks/debounce&throttle",
        name: "debounce&throttle.md"
      },
      { path: "/components/hooks/lazyImage", name: "lazyImage.md" },
      {
        path: "/components/hooks/reqMax&errorTry",
        name: "reqMax&errorTry.md"
      },
      {
        path: "/components/hooks/scrollLoading",
        name: "scrollLoading.md"
      }
    ]
  },
  { path: "/components/link", name: "link.md" }
]