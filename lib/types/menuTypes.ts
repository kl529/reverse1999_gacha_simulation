// Menu item types for HomePage and HamburgerMenu

// Base card item with required fields
export interface BaseCardItem {
  icon: string;
  label: string;
  href: string;
}

// Card item with modal information
export interface ModalCardItem extends BaseCardItem {
  title: string;
  image: string;
  description?: string;
  source?: string;
}

// Union type for all card items
export type CardItem = BaseCardItem | ModalCardItem;

// Type guard to check if item is a ModalCardItem
export function isModalCardItem(item: CardItem): item is ModalCardItem {
  return "title" in item && "image" in item;
}

// HamburgerMenu specific types
export type HamburgerMenuItem = {
  icon?: string;
  iconImg?: string;
  label?: string;
  href?: string;
  divider?: boolean;
  modalType?: "material";
};

export type HamburgerMenuCategory = {
  title: string;
  items: HamburgerMenuItem[];
};
