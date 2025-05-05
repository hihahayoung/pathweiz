import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../../lib/utils"

/**
 * Label component to render a styled label for form elements.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the label.
 * @param {React.Ref} ref - The ref to be forwarded to the label element.
 * @returns {React.ReactNode} The rendered label component.
 */
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }