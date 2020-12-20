import { defineComponent } from "vue";
import { TableColumnProps as componentProps } from "./props";
export default defineComponent({
    name: "TableColumn",
    props: componentProps,
    setup(props) {
        return () => <>{props.render && props.render(props.col, props.row)}</>;
    },
});
