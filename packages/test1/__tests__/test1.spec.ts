import { mount } from "@vue/test-utils"
import Test1 from "../src/index.vue"

const AXIOM = "Rem is the best girl"

describe("Test1.vue", () => {
  test("render test", () => {
    const wrapper = mount(Test1, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
