import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Card component to display content within a styled container.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the card.
 * @param {React.Ref} ref - The ref to be forwarded to the card element.
 * @returns {React.ReactNode} The rendered card component.
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader component to display the header of the card.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the card header.
 * @param {React.Ref} ref - The ref to be forwarded to the card header element.
 * @returns {React.ReactNode} The rendered card header component.
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle component to display the title of the card.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the card title.
 * @param {React.Ref} ref - The ref to be forwarded to the card title element.
 * @returns {React.ReactNode} The rendered card title component.
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription component to display the description of the card.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the card description.
 * @param {React.Ref} ref - The ref to be forwarded to the card description element.
 * @returns {React.ReactNode} The rendered card description component.
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent component to display the content of the card.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the card content.
 * @param {React.Ref} ref - The ref to be forwarded to the card content element.
 * @returns {React.ReactNode} The rendered card content component.
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter component to display the footer of the card.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names for the card footer.
 * @param {React.Ref} ref - The ref to be forwarded to the card footer element.
 * @returns {React.ReactNode} The rendered card footer component.
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }