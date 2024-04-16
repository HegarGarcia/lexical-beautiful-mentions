import { ComponentPropsWithRef, ElementType } from "react";

export type BeautifulMentionsItemData = string | boolean | number | null;

export type BeautifulMentionsMetadata = {
  [key: string]: BeautifulMentionsItemData;
};

/**
 * Represents a menu item for a mention.
 */
export interface BeautifulMentionsMenuItem<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> {
  /**
   * The trigger of the mention. For example: "@".
   */
  trigger: string;
  /**
   * The value of the mention without the trigger. For example: "John".
   */
  value: string;
  /**
   * Value to be displayed in the menu. Normally the same as `value` but can be
   * used to display a different value. For example: "Add 'John'".
   */
  displayValue: string;
  /**
   * Additional data belonging to the mention.
   */
  data?: Data;
}

/**
 * Represents a combobox item for a mention.
 */
export interface BeautifulMentionsComboboxItem<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> {
  /**
   * The type of the item.
   */
  itemType: "trigger" | "value" | "additional";
  /**
   * Depending on the item type, either the trigger or the value of the
   * mention.
   */
  value: string;
  /**
   * The value to be displayed. Normally the same as `value` but can be
   * used to display a different value.
   */
  displayValue: string;
  /**
   * Additional data belonging to the mention.
   */
  data?: Data;
}

/**
 * The mention without the trigger. For example: "John". Either a string or
 * an object with at least a `value` property. If an object is provided,
 * additional data can be specified. For example: `{ value: "John", id: 1 }`.
 */
export type BeautifulMentionsItem =
  | string
  | ({ value: string } & BeautifulMentionsMetadata);

/**
 * Props for BeautifulMentionsMenu component. This component is used to render
 * the menu that shows the suggestions for a mention.
 */
export interface BeautifulMentionsMenuProps extends ComponentPropsWithRef<any> {
  /**
   * If `true`, the `onSearch` function is currently running.
   */
  loading?: boolean;
}

/**
 * Props for BeautifulMentionsMenuItem component. This component is used to
 * render a menu item.
 */
export type BeautifulMentionsMenuItemProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = Omit<ComponentPropsWithRef<any>, "selected" | "label"> & {
  /**
   * If `true`, the menu item is selected.
   */
  selected: boolean;
  /**
   * The label of the menu item.
   * @deprecated Use `item` instead.
   */
  label: string;
  /**
   * The value of the menu item.
   * @deprecated Use `item` instead.
   */
  itemValue: string;
  /**
   * Contains information about the menu item.
   */
  item: BeautifulMentionsMenuItem<Data>;
};

/**
 * Props for BeautifulMentionsCombobox component. This component is used to
 * render the combobox that shows the available triggers and mentions.
 */
export interface BeautifulMentionsComboboxProps
  extends ComponentPropsWithRef<any> {
  /**
   * If `true`, the `onSearch` function is currently running.
   */
  loading?: boolean;
  /**
   * The items shown in the combobox can be either triggers or mentions.
   */
  itemType: "trigger" | "value";
}

/**
 * Props for BeautifulMentionsComboboxItem component. This component is used to
 * render a combobox item.
 */
export type BeautifulMentionsComboboxItemProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = Omit<ComponentPropsWithRef<any>, "selected" | "option"> & {
  /**
   * If `true`, the combobox item is selected.
   */
  selected: boolean;
  /**
   * Contains information about the combobox item.
   */
  item: BeautifulMentionsComboboxItem<Data>;
};

interface BeautifulMentionsProps {
  /**
   * If `truthy`, the user can also create new mentions instead of just
   * selecting one from the mention list.
   * If a string is provided, it will be used as the label for the
   * option that creates a new mention. The expression `{{name}}` will be
   * replaced with the value of the user input. If a map is provided,
   * individual labels can be specified for each trigger.
   * @default false
   */
  creatable?: boolean | string | Record<string, boolean | string>;
  /**
   * At most, the specified number of menu items will be rendered.
   * If a map is provided, individual limits can be specified for each
   * trigger.
   * @default 5
   */
  menuItemLimit?: number | false | Record<string, number | false>;
  /**
   * If `true`, mentions can contain spaces.
   * @default true
   */
  allowSpaces?: boolean;
  /**
   * Only used if `allowSpaces` is `true`. The given characters are
   * used to enclose mentions if they contain spaces.
   */
  mentionEnclosure?: string;
  /**
   * If `true`, the mention menu will be shown when the user deletes a mention.
   */
  showMentionsOnDelete?: boolean;
  /**
   * Punctuation characters used when looking for mentions.
   * @default {@link DEFAULT_PUNCTUATION}
   */
  punctuation?: string;
  /**
   * If `true`, the mention menu contains the mentions that are currently
   * in the editor.
   * @default true
   */
  showCurrentMentionsAsSuggestions?: boolean;
}

type BeautifulMentionsMenuComponentsProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = BeautifulMentionsProps & {
  /**
   * The class name to apply to the menu component root element.
   */
  menuAnchorClassName?: string;
  /**
   * The component to use for the menu.
   * @default ul
   */
  menuComponent?: ElementType<BeautifulMentionsMenuProps>;
  /**
   * The component to use for a menu item.
   * @default li
   */
  menuItemComponent?: ElementType<BeautifulMentionsMenuItemProps<Data>>;
  /**
   * The component to use when there are no results.
   */
  emptyComponent?: ElementType;
  /**
   * If `true`, the mention will be inserted when the user blurs the editor.
   * @default true
   */
  insertOnBlur?: boolean;
  /**
   * Callback fired when the menu requests to be open.
   */
  onMenuOpen?: () => void;
  /**
   * Callback fired when the menu requests to be closed.
   */
  onMenuClose?: () => void;
  /**
   * Callback fired when the user selects a menu item.
   */
  onMenuItemSelect?: (item: BeautifulMentionsMenuItem<Data>) => void;
  combobox?: never;
  comboboxOpen?: never;
  comboboxAnchor?: never;
  comboboxAnchorClassName?: never;
  comboboxComponent?: never;
  comboboxItemComponent?: never;
  comboboxAdditionalItems?: never;
  onComboboxItemSelect?: never;
  onComboboxOpen?: never;
  onComboboxClose?: never;
  onComboboxFocusChange?: never;
};

type BeautifulMentionsMenuCommandComponentProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = BeautifulMentionsProps & {
  /**
   * If `true`, replaces the typeahead menu with a combobox that opens below
   * the editor. The combobox shows the currently available triggers and
   * mentions.
   */
  combobox: true;
  /**
   * If `true`, the combobox is open.
   */
  comboboxOpen?: boolean;
  /**
   * The element that the combobox will be attached to.
   * @default editor root element
   */
  comboboxAnchor?: HTMLElement | null;
  /**
   * The class name to apply to the combobox anchor element.
   */
  comboboxAnchorClassName?: string;
  /**
   * The component to use for the combobox.
   * @default ul
   */
  comboboxComponent?: ElementType<BeautifulMentionsComboboxProps>;
  /**
   * The component to use for a combobox item.
   */
  comboboxItemComponent?: ElementType<BeautifulMentionsComboboxItemProps<Data>>;
  /**
   * Additional items to show in the combobox.
   */
  comboboxAdditionalItems?: Omit<
    BeautifulMentionsComboboxItem<Data>,
    "itemType"
  >[];
  /**
   * Callback fired when the user selects a combobox item.
   */
  onComboboxItemSelect?: (item: BeautifulMentionsComboboxItem<Data>) => void;
  /**
   * Callback fired when the combobox requests to be open.
   */
  onComboboxOpen?: () => void;
  /**
   * Callback fired when the combobox requests to be closed.
   */
  onComboboxClose?: () => void;
  /**
   * Callback fired when the focus of the currently selected combobox
   * item changes.
   */
  onComboboxFocusChange?: (
    item: BeautifulMentionsComboboxItem<Data> | null,
  ) => void;
  menuAnchorClassName?: never;
  menuComponent?: never;
  menuItemComponent?: never;
  emptyComponent?: never;
  insertOnBlur?: never;
  onMenuOpen?: never;
  onMenuClose?: never;
  onMenuItemSelect?: never;
};

type BeautifulMentionsPluginWithCompProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> =
  | BeautifulMentionsMenuComponentsProps<Data>
  | BeautifulMentionsMenuCommandComponentProps<Data>;

export type BeautifulMentionsSearchProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = BeautifulMentionsPluginWithCompProps<Data> & {
  items?: never;
  /**
   * The characters that trigger the mention menu. Needed to tell the plugin
   * when to call the query function.
   */
  triggers: string[];
  /**
   * A function that returns a list of suggestions for a given trigger and
   * query string.
   */
  onSearch: (
    trigger: string,
    queryString?: string | null,
  ) => Promise<BeautifulMentionsItem[]>;
  /**
   * The delay in milliseconds before the `onSearch` function is called.
   * @default 250
   */
  searchDelay?: number;
};

export type BeautifulMentionsItemsProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = BeautifulMentionsPluginWithCompProps<Data> & {
  /**
   * A map of trigger characters to a list of suggestions.
   * The keys of the map are the trigger characters that will be used to
   * open the mention menu. The values are the list of suggestions that
   * will be shown in the menu.
   */
  items: Record<string, BeautifulMentionsItem[]>;
  /**
   * Optional list of trigger characters. If provided, the mention menu will
   * only be opened for the specified triggers. Useful if the trigger is a
   * regular expression that should not be shown to the user.
   */
  triggers?: string[];
  onSearch?: never;
  searchDelay?: never;
};

export type BeautifulMentionsPluginProps<
  Data extends BeautifulMentionsMetadata = BeautifulMentionsMetadata,
> = BeautifulMentionsSearchProps<Data> | BeautifulMentionsItemsProps<Data>;

/**
 * Props for BeautifulMention component. This component is used to render
 * a mention in the editor.
 */
export interface BeautifulMentionComponentProps<
  T extends { [p: string]: BeautifulMentionsItemData } = {},
> extends Omit<ComponentPropsWithRef<any>, "value" | "data"> {
  /**
   * The trigger of the mention.
   */
  trigger: string;
  /**
   * The value of the mention without the trigger.
   */
  value: string;
  /**
   * Additional data belonging to the mention.
   */
  data?: T;
  /**
   * Contains a concatenated string of `trigger` and `value`.
   */
  "data-beautiful-mention": string;
}
