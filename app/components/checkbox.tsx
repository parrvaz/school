import React, { useEffect, useRef } from 'react';

const Checkbox: React.FC<{
  checked: boolean;
  onChange: (status: boolean) => void;
  label: string;
  indeterminate?: boolean;
  className?: string;
}> = ({ checked, onChange, label, className, indeterminate = false }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate; // Apply indeterminate state
    }
  }, [indeterminate]);
  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer">
        <input
          ref={checkboxRef}
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
