import * as React from "react"

import { Input } from "./input"
import { Label } from "./label"

// The composed field from Figma's "Input" component — Label above, the
// field itself, and an optional error/helper message below. Figma modeled
// this as 5 discrete state variants (Default/Focus/Filled/Disabled/Error);
// in code, Focus and Filled are just the input's own native :focus and
// has-value states, so only `error` and `disabled` need to be explicit
// props.
export interface InputFieldProps extends React.ComponentProps<"input"> {
  label: string
  /** Shown below the field, in destructive color, when `error` is true. */
  errorMessage?: string
  error?: boolean
}

function InputField({
  className,
  label,
  errorMessage,
  error = false,
  id,
  ...props
}: InputFieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        aria-invalid={error || undefined}
        className={className}
        {...props}
      />
      {error && errorMessage && (
        <p className="text-caption text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

export { InputField }
