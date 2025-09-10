export type DropdownOption<TValue = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

export type DropdownProps<TValue = string> = {
  onInputChange?: (value: string) => void;
  /** Current selected option (controlled) */
  value?: DropdownOption<TValue> | null;
  /** Available options */
  options: DropdownOption<TValue>[];
  /** Called when an option is chosen */
  onChange: (option: DropdownOption<TValue>) => void;
  /** Optional placeholder when value is null */
  placeholder?: string;
  /** Disable the whole dropdown */
  disabled?: boolean;
  /** Optional class names */
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  optionClassName?: string;
  /**
   * If true, the panel will match the button width (default true)
   */
  matchButtonWidth?: boolean;
  /** Render custom option content */
  renderOption?: (opt: DropdownOption<TValue>, isSelected: boolean) => React.ReactNode;
};
