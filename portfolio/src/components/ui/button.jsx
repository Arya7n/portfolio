import React from "react";

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default: "bg-ink text-paper hover:bg-ink-soft",
      outline:
        "border border-ink/20 text-ink hover:border-ink/50 hover:bg-paper-soft",
      ghost: "text-ink-muted hover:text-ink hover:bg-paper-soft",
      accent: "bg-accent text-paper hover:bg-accent-soft",
    };

    const sizes = {
      sm: "px-3.5 py-2 text-sm rounded-md",
      md: "px-5 py-2.5 text-sm rounded-md",
      lg: "px-6 py-3.5 text-base rounded-md",
    };

    const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(props.children)) {
      return React.cloneElement(props.children, {
        className: `${finalClassName} ${props.children.props.className || ""}`,
        ref,
      });
    }

    return <button ref={ref} className={finalClassName} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
