import * as React from "react";

import { cn } from "../../lib/utils";

// Defines a Card component and several subcomponents (CardHeader, CardTitle, etc.).
// Uses React.forwardRef to allow ref forwarding for better accessibility and DOM manipulation.
// Merges Tailwind CSS classes dynamically with cn(), ensuring class merging and customization.
// Uses TypeScript (HTMLDivElement & React.HTMLAttributes) to ensure type safety.


//1.The Card Component (Main Container)  
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";


//2.CardHeader (Holds the Card Title & Description)
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
//flex flex-col → Ensures items are stacked vertically.
//space-y-1.5 → Adds spacing between child elements.
//p-6 → Adds padding
    {...props}
  />
));
CardHeader.displayName = "CardHeader";


//3.CardTitle (Title Inside the Header)
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
//font-semibold → Makes the title slightly bold.
//leading-none → Tightens line spacing.
//tracking-tight → Reduces letter spacing.
    {...props}
  />
));
CardTitle.displayName = "CardTitle";


//4.CardDescription (Optional Subtitle)
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    //text-sm → Makes the text small.
    //text-muted-foreground → Uses a softer text color for descriptions.
    {...props}
  />
));
CardDescription.displayName = "CardDescription";


//5.CardContent (Holds the Main Card Body)
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

//6. CardFooter (Holds Buttons/Actions at the Bottom)
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
