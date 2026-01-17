import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground transition-all duration-200", {
  variants: {
    variant: {
      default: "shadow-card",
      elevated: "shadow-card hover:shadow-card-hover",
      outline: "shadow-none",
      stat: "shadow-card p-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  description?: string;
}

const StatCard = ({ title, value, icon, change, description }: StatCardProps) => (
  <Card variant="stat" className="animate-fade-in">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {change && (
          <p
            className={cn(
              "text-xs font-medium flex items-center gap-1",
              change.type === "increase" ? "text-status-success" : "text-status-error"
            )}
          >
            <span>{change.type === "increase" ? "↑" : "↓"}</span>
            {Math.abs(change.value)}%
            <span className="text-muted-foreground ml-1">from last month</span>
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {icon && <div className="p-3 bg-primary/10 rounded-lg text-primary">{icon}</div>}
    </div>
  </Card>
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, StatCard, cardVariants };
