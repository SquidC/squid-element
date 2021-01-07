import { IMenuProps } from "element-plus/lib/el-menu/src/menu";

/**
 * 菜单配置
 */
export interface MenuProps {
    /**
     * 继承菜单配置
     */
    elconfig: Omit<IMenuProps, "collapse">;
    /**
     * 菜单数据
     */
    menuList: MenuItem[];
}

/**
 * 子菜单
 */
export interface SubMenuProps {
    /**
     * 菜单数据
     */
    menu: MenuItem;
}

/**
 * 菜单内容
 */
export interface MenuContentProps {
    /**
     * 菜单数据
     */
    menu: MenuItem;
}

///////////////////////////⭐ 菜单配置项//////////////////////////////////
/**
 * 菜单项
 */
export interface MenuItem {
    /**
     * 路由路径
     */
    path: string;
    /**
     * 路由名称
     */
    name: string;
    /**
     * 子菜单项集合
     */
    children?: MenuItem[];
}
