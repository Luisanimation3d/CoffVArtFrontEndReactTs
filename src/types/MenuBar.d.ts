import React from "react";

type SideBarMenuItemProps = {
    icon: JSX.Element;
    title: string;
    link: string;
}

export type SideBarMenuProps = {
    items: SideBarMenuItemProps[];
}

interface SubMenuTypeProps {
    type: 'subMenu',
    title: string,
    icon: React.ReactNode,
    subItems: {
        title: string,
        link: string
    }[]
}

interface MenuTypeProps {
    type: 'menu',
    title: string,
    icon: React.ReactNode,
    link: string
}

export type MenuItemsProps = (SubMenuTypeProps | MenuTypeProps)[]