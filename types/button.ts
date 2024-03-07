export const BUTTON_TYPE = {
  button: `button`,
  submit: `submit`,
  reset: `reset`,
} as const;

export type ButtonType = keyof typeof BUTTON_TYPE

export const BUTTON_COLOR = {
  neutral: `neutral`,
  primary: `primary`,
  secondary: `secondary`,
  accent: `accent`,
  info: `info`,
  success: `success`,
  warning: `warning`,
  error: `error`,
} as const;

export type ButtonColor = keyof typeof BUTTON_COLOR

export const BUTTON_STATE = {
  normal: `normal`,
  ghost: `ghost`,
  link: `link`,
  outline: `outline`,
  active: `active`,
  disabled: `disabled`,
  glass: `glass`,
  animation: `no-animation`
} as const;

export type ButtonState = keyof typeof BUTTON_STATE

export const BUTTON_SIZE = {
  lg: `lg`,
  md: `md`,
  sm: `sm`,
  xs: `xs`,
  wide: `wide`,
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE

export const BUTTON_SHAPE = {
  normal: `normal`,
  block: `block`,
  circle: `circle`,
  square: `square`,
} as const;

export type ButtonShape = keyof typeof BUTTON_SHAPE
