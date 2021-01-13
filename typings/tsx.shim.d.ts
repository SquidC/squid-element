import Vue, { VNode } from "vue";

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        type Element = VNode
        // tslint:disable no-empty-interface
        type ElementClass = Vue
        interface IntrinsicElements {
            [elem: string]: any;
        }
        interface IntrinsicAttributes {
            ["onChange"]?: (value: any) => void;
            ["onInput"]?: (value: any) => void;
            ["onBlur"]?: (event: any) => void;
            ["onFocus"]?: (event: any) => void;
            ["onClear"]?: () => void;
        }
    }
}
