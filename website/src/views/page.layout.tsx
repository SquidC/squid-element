import { CrudConfig } from "@squid-element/layout-crud";
import { Model } from "@squid-element/layout-crud";

interface Student {
    name: string;
    age: number;
    sex: 1 | 0;
}

const model: Model<Student> = {
    name: {
        label: "姓名",
        type: "Select",
        options: [
          {label: "aaa", value: "bbb"}
        ],
        mode: [],
    },
    sex: {
        label: "性别",
        type: "Radio",
        options: [
          { label: "男", value: 1},
          { label: "女", value: 0},
        ],
        render(col, row) {
          return <div>{col === 1 ? "男" : "女"}</div>;
        }
    },
    age: {
        label: "年龄",
        type: "Input",
    }
};

const pageConfig: CrudConfig = {
    layout: "ScCrudLayout",
    title: "test",
    // crud api
    api: {
        add: "https://localhost/add",
        del: "https://localhost/del",
        alt: "https://localhost/alt",
        sel: "https://localhost/sel",
    },
    // 处理按钮事件
    handleAction: (mode, raw, ids) => {
        console.log("handleAction", mode, raw, ids);
    },
    controler: "drawer",
    // 页面配置
    columns: model,
};

export default pageConfig;
