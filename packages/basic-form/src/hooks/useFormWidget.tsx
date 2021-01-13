import { ElInput, ElSelect, ElOption, ElCheckbox, ElRadio, ElRadioGroup, ElCheckboxGroup, ElSwitch } from "element-plus";
import { SetupContext } from "vue";
import { FormItem, Option } from "../types";

/**
 * FormWidget hook
 * @param emit
 * @author Ming07
 */
export default function useFormWidget(emit: SetupContext["emit"]) {
    /**
     * input回调事件
     * @param value
     */
    function handleInput(value: string | number | undefined) {
        emit("update:modelValue", value);
    }
    /**
     * change回调事件
     * @param value
     */
    function handleChange(value: any) {
        emit("update:modelValue", value);
    }
    /**
     * 渲染select的option
     * @param options
     */
    function renderOption(options?: Option[]) {
        return options?.map((option) => {
            return <ElOption key={option.value} label={option.label} value={option.value}></ElOption>;
        });
    }
    /**
     * 渲染radio
     * @param options
     */
    function renderRadio(options?: Option[]) {
        return options?.map((option) => {
            return (
                <ElRadio key={option.value} label={option.value}>
                    {{
                        default: () => option.label,
                    }}
                </ElRadio>
            );
        });
    }
    /**
     * 渲染checkbox
     * @param options
     */
    function renderCheckBox(options?: Option[]) {
        return options?.map((option) => {
            return (
                <ElCheckbox key={option.value} label={option.value}>
                    {{
                        default: () => option.label,
                    }}
                </ElCheckbox>
            );
        });
    }
    /**
     * 渲染控件
     * @param formItem
     * @param value
     */
    function renderWidget(formItem: FormItem, value: unknown) {
        switch (formItem.type) {
            case "Input":
                if (typeof value === "number" || typeof value === "string" || typeof value === "undefined") {
                    return <ElInput modelValue={value} onInput={handleInput} {...formItem}></ElInput>;
                }
                return <div>input控件只支持string/number类型</div>;
            case "Select":
                if (typeof value === "number" || typeof value === "string" || typeof value === "undefined") {
                    return (
                        <ElSelect modelValue={value} onChange={handleChange} {...formItem}>
                            {{
                                default: () => renderOption(formItem.options),
                            }}
                        </ElSelect>
                    );
                }
                return <div>select控件只支持string/number类型</div>;
            case "Radio":
                if (typeof value === "number" || typeof value === "string" || typeof value === "boolean" || typeof value === "undefined") {
                    return (
                        <ElRadioGroup modelValue={value} onChange={handleChange} {...formItem}>
                            {{
                                default: () => renderRadio(formItem.options),
                            }}
                        </ElRadioGroup>
                    );
                }
                return <div>radio控件只支持string/number/boolean类型</div>;
            case "Checkbox":
                if (value && Array.isArray(value)) {
                    return (
                        <ElCheckboxGroup modelValue={value} onChange={handleChange} {...formItem}>
                            {{
                                default: () => renderCheckBox(formItem.options),
                            }}
                        </ElCheckboxGroup>
                    );
                }
                return <div>checkbox控件只支持any[]类型</div>;
            case "Switch":
                if (typeof value === "number" || typeof value === "string" || typeof value === "boolean" || typeof value === "undefined") {
                    return <ElSwitch modelValue={value} onChange={handleChange} {...formItem}></ElSwitch>;
                }
                return <div>switch控件只支持string/number/boolean类型</div>;
            case "Element":
                if (formItem.render) {
                    return formItem.render(formItem, value);
                }
                return <div>element控件,render方法不能为空</div>;
            default:
                return <div>没有找到匹配的控件类型</div>;
        }
    }
    return {
        renderWidget,
    };
}
