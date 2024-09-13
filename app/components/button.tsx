import React from 'react';

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    className: string;
    children: React.ReactNode;
  }
> = ({ isLoading, className, children, ...rest }) => (
  <button className={className} {...rest}>
    {children}
    {isLoading && <span className="loading loading-dots" />}
  </button>
);

export default Button;
