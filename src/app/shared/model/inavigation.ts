export interface NavigationItem {
  name: string;
  route?: string;
  label: string;
  icon: string;
  externalLink?: string;
}

export interface NavigationMenu {
  name: string;
  menu: NavigationItem[];
}