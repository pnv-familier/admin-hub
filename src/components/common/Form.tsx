import * as React from "react";
import { cn } from "@/lib/utils";

// Form wrapper
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, children, onSubmit, ...props }, ref) => (
  <form
    ref={ref}
    className={cn("space-y-6", className)}
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}
    {...props}
  >
    {children}
  </form>
));
Form.displayName = "Form";

// Form field wrapper
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    {children}
  </div>
));
FormField.displayName = "FormField";

// Form label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium text-foreground", className)} {...props}>
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  )
);
FormLabel.displayName = "FormLabel";

// Form description/helper text
const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
  )
);
FormDescription.displayName = "FormDescription";

// Form error message
const FormError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p ref={ref} className={cn("text-xs text-destructive", className)} {...props}>
        {children}
      </p>
    );
  }
);
FormError.displayName = "FormError";

// Form actions (button container)
interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right" | "between";
}

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align = "right", ...props }, ref) => {
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    };

    return <div ref={ref} className={cn("flex items-center gap-3 pt-4", alignClasses[align], className)} {...props} />;
  }
);
FormActions.displayName = "FormActions";

export { Form, FormField, FormLabel, FormDescription, FormError, FormActions };
