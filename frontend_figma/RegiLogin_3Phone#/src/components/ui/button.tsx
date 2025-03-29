import { Slot } from "@radix-ui/react-slot"; // allows component composition by enabling child components to inherit props from the
import { type VariantProps, cva } from "class-variance-authority"; //manage class name variants dynamically
import * as React from "react"; //all React functionalities into a single variable 

import { cn } from "../../lib/utils";

const buttonVariants = cva( //(Class Variance Authority) is a helper function for managing Tailwind CSS class variants efficiently.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
// inline-flex → Makes the button inline-flex for better alignment.
// justify-center items-center → Centers text/icon inside the button.
// rounded-md → Gives the button a rounded look.
// focus-visible:ring-1 → Adds a focus ring for accessibility.
// disabled:pointer-events-none opacity-50 → Prevents interaction when disabled.
// [&_svg]:size-4 [&_svg]:shrink-0 → Ensures SVG icons inside the button have a fixed size.

  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
// default → Primary button with background color (bg-primary).
// destructive → Red-style button for danger actions (bg-destructive).
// outline → Transparent background with border styling (border border-input).
// secondary → Uses bg-secondary, useful for alternative actions.
// ghost → Only changes color on hover.
// link → Looks like a hyperlink (no background, underlined text).
        
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
// If no variant or size is provided, it defaults to:
// variant="default" → Primary button.
// size="default" → Standard size.

  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, //This means all default HTML button props (onClick, disabled, etc.) are available.
    VariantProps<typeof buttonVariants> { //This connects the variant and size props to the predefined styles from buttonVariants
  asChild?: boolean; //Allows the button to render as a different HTML element (e.g., <a>, <div>) instead of a <button>
}

  // Creating the Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    //Rendering the Component
    const Comp = asChild ? Slot : "button"; //If asChild = true, it uses Radix UI’s <Slot> (inheriting styles for a child component).
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        //Calls buttonVariants({ variant, size, className }) to generate Tailwind class names.
        //Uses cn() to merge custom classes without conflicts.
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
