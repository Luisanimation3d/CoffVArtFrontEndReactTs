type SideBarMenuItemProps = {
    icon: JSX.Element;
    title: string;
    link: string;
}

export type SideBarMenuProps = {
    items: SideBarMenuItemProps[];
}