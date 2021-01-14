import { defineComponent, toRefs } from "vue";
import { FormWidgetProps } from "./props";
import { FormItem } from "./types";
import useFormWidget from "./hooks/useFormWidget";

export default defineComponent({
  name: "FormWidget",
  props: FormWidgetProps,
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const { renderWidget } = useFormWidget(emit);
    return () => renderWidget(props as FormItem, modelValue?.value);
  },
});
