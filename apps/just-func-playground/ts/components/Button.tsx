import { Component, ComponentProps } from 'solid-js'

export type ButtonAppearances =
  | 'primary'
  | 'primary-destructive'
  | 'secondary'
  | 'secondary-destructive'
  | 'tertiary'
  | 'tertiary-clear'
  | 'clear'

export type ButtonProps = ComponentProps<any> & {
  appearance?: ButtonAppearances
}

const Button: Component<ButtonProps> = (_props: ButtonProps) => {
  return (
    <div>
      <h2>Button</h2>
    </div>
  )
}

export default Button
