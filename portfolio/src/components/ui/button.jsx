import React from 'react';

const Button = React.forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? React.Fragment : 'button';
  
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border-2 border-purple-500 text-purple-300 hover:bg-purple-950/30',
    ghost: 'text-purple-300 hover:bg-purple-950/30'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (asChild && React.isValidElement(props.children)) {
    return React.cloneElement(props.children, {
      className: `${finalClassName} ${props.children.props.className || ''}`
    });
  }
  
  return <button ref={ref} className={finalClassName} {...props} />;
});

Button.displayName = 'Button';

export { Button };
