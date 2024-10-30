import React from 'react';

const Toggle: React.FC<{
  label: string;
  className?: string;
  setIsChecked: (status: boolean) => void;
  isChecked: boolean;
}> = ({ label, className, isChecked, setIsChecked }) => {
  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          type="checkbox"
          className="toggle toggle-primary"
          defaultChecked
        />
      </label>
    </div>
  );
};

export default Toggle;
