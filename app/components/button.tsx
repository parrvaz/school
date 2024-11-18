import React from 'react';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  className: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonType> = ({ isLoading, className, children, onClick, ...rest }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!isLoading && onClick) {
      onClick(event);
    }
  };

  return (
    <button className={className} onClick={handleClick} {...rest}>
      {children}
      {isLoading && <span className="loading loading-dots" />}
    </button>
  );
};

export default Button;
