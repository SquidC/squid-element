import Vue, { VNode } from "vue"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elem: string]: any
        }
        interface IntrinsicAttributes {
            ["onChange"]?: (value: any) => void
            ["onInput"]?: (value: any) => void
            ["onBlur"]?: (event: any) => void
            ["onFocus"]?: (event: any) => void
            ["onClear"]?: () => void
        }
    }
}
