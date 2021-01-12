import { CrudConfig } from "@squid-element/layout-crud";
import { TableColumn } from "@squid-element/basic-table";
import { Model } from "@squid-element/hooks";

interface Student {
    name: string;
    age: number;
    sex: 1 | 0;
}

const tableColumns: TableColumn<Student>[] = [
    { label: "姓名", field: "name" },
    { label: "年龄", field: "age" },
    {
        label: "性别",
        field: "sex",
        render(col, row) {
            return <div>{col === 1 ? "男" : "女"}</div>;
        },
    },
];

const model: Model<Student> = {
    name: {
        label: "姓名",
        type: "Radio",
        options: [],
        mode: [],
    },
    sex: {
        label: "性别",
        type: "Radio",
        options: [],
    },
    age: {
        label: "",
        type: "Input",
    },
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
    // 页面配置
    columns: tableColumns,
};

export default pageConfig;
