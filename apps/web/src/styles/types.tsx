export type NavItem = {
	title: string;
	path: string;
	icon?: JSX.Element;
	submenu?: boolean;
	subMenuItems?: NavItem[];
};

export type selectOption = {
	label: string;
	value: string | number;
	icon?: JSX.Element;
};
