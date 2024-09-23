import React from 'react';

const Checkbox: React.FC<{
  checked: boolean;
  onChange: (status: boolean) => void;
  label: string;
  className?: string;
}> = ({ checked, onChange, label, className }) => {
  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="checkbox ml-2 checkbox-primary"
        />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
