import { SelectOptionType } from 'app/types/common.type';
import React from 'react';
import Select, { SingleValue, components } from 'react-select';

type SelectType = {
  options: SelectOptionType[];
  className?: string;
  placeholder?: string;
  value?: SelectOptionType;
  onChange: (value: SingleValue<SelectOptionType>) => void;
  onDelete?: (option: SelectOptionType) => void;
  onEdit?: (option: SelectOptionType) => void;
};

const CustomOption = (props: any) => {
  const { data, innerRef, innerProps, selectProps } = props;

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent closing the dropdown
    if (selectProps.onDelete) {
      selectProps.onDelete(data); // Call the onDelete prop passed to Select component
    }
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent closing the dropdown
    if (selectProps.onEdit) {
      selectProps.onEdit(data); // Call the onDelete prop passed to Select component
    }
  };

  return (
    <components.Option {...props}>
      <div ref={innerRef} {...innerProps} className="flex justify-between text-14 items-center">
        {data.label}
        <div className="-ml-1">
          {data.hasDelete && (
            <i className="icon-trash text-18 p-1  text-red70" onClick={handleDeleteClick} />
          )}
          {data.hasEdit && (
            <i className="icon-edit text-18 p-1 text-berry60" onClick={handleEditClick} />
          )}
        </div>
      </div>
    </components.Option>
  );
};

const ReactSelect: React.FC<SelectType> = ({ ...rest }) => {
  return (
    <Select
      {...rest}
      components={{ IndicatorSeparator: null, Option: CustomOption }}
      isRtl
      styles={{
        control: (baseStyles) => ({ ...baseStyles, borderRadius: '8px', fontSize: 14 }),
        // Style for the options
        option: (baseStyles, state) => ({
          ...baseStyles,
          margin: '4px 0px', // Add padding to each option
          padding: '8px',
          borderRadius: '8px', // Add border radius to options
          backgroundColor: state.isSelected
            ? '#e0e7ff' // Background color for the selected option
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
          padding: '0px 6px', // Add padding to the container
          borderRadius: '8px', // Add border radius to the container
        }),
      }}
    />
  );
};

export default ReactSelect;
