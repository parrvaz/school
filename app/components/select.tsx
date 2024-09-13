import React from 'react';
import Select, { SingleValue } from 'react-select';

type SelectOption = { value: string | number; label: string };

type SelectType = {
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  value?: SelectOption;
  onChange: (value: SingleValue<SelectOption>) => void;
};

const ReactSelect: React.FC<SelectType> = ({ placeholder, options, onChange, value }) => {
  return (
    <Select
      {...{ placeholder, options, value, onChange }}
      components={{ IndicatorSeparator: null }}
      styles={{
        control: (baseStyles) => ({ ...baseStyles, borderRadius: '8px', fontSize: 14 }),
        // Style for the options
        option: (baseStyles, state) => ({
          ...baseStyles,
          margin: '4px 0px', // Add padding to each option

          borderRadius: '8px', // Add border radius to options
          backgroundColor: state.isSelected
            ? '#c7d2fe' // Background color for the selected option
            : state.isFocused
              ? '#eef2ff' // Background color for the focused (hovered) option
              : 'white', // Default background
          color: state.isSelected ? '#333' : '#000', // Change text color if selected
          cursor: 'pointer',
          transition: 'background-color 0.2s ease, transform 0.2s ease', // Transition for hover and other changes
        }),

        // Style for the container that wraps the options
        menu: (baseStyles) => ({
          ...baseStyles,
          padding: '10px', // Add padding to the container
          borderRadius: '8px', // Add border radius to the container
        }),
      }}
    />
  );
};

export default ReactSelect;
