import Select from 'react-select';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectTheme } from '../reducers/themeSlice';

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  isLoading = false,
  isDisabled = false,
  className = "",
  ...props
}) => {
  const theme = useSelector(selectTheme);
  const isDark = theme === 'dark';

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark ? '#3A3B3C' : '#FFFFFF',
      borderColor: state.isFocused 
        ? '#3B82F6' 
        : isDark ? '#3A3B3C' : '#D1D5DB',
      borderWidth: '1px',
      borderRadius: '0.75rem',
      padding: '0.25rem 0.5rem',
      boxShadow: state.isFocused 
        ? isDark 
          ? '0 0 0 3px rgba(59, 130, 246, 0.2)' 
          : '0 0 0 3px rgba(59, 130, 246, 0.1)'
        : 'none',
      '&:hover': {
        borderColor: state.isFocused 
          ? '#3B82F6' 
          : isDark ? '#4E4F50' : '#9CA3AF'
      },
      minHeight: '44px',
      transition: 'all 0.2s ease',
    }),
    
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#242526' : '#FFFFFF',
      border: isDark ? '1px solid #3A3B3C' : '1px solid #E5E7EB',
      borderRadius: '0.75rem',
      boxShadow: isDark 
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 1000,
    }),
    
    menuList: (provided) => ({
      ...provided,
      padding: '0.25rem',
      borderRadius: '0.75rem',
    }),
    
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#3B82F6'
        : state.isFocused
          ? isDark ? '#4E4F50' : '#F3F4F6'
          : 'transparent',
      color: state.isSelected
        ? '#FFFFFF'
        : isDark ? '#E4E6EB' : '#111827',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      margin: '0.125rem 0',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: state.isSelected
          ? '#3B82F6'
          : isDark ? '#4E4F50' : '#F3F4F6',
      }
    }),
    
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? '#E4E6EB' : '#111827',
    }),
    
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#4E4F50' : '#E5E7EB',
      borderRadius: '0.375rem',
    }),
    
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDark ? '#E4E6EB' : '#374151',
      fontSize: '0.875rem',
    }),
    
    multiValueRemove: (provided) => ({
      ...provided,
      color: isDark ? '#B0B3B8' : '#6B7280',
      '&:hover': {
        backgroundColor: isDark ? '#3A3B3C' : '#D1D5DB',
        color: isDark ? '#F87171' : '#DC2626',
      }
    }),
    
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? '#8E8F91' : '#6B7280',
      fontSize: '0.875rem',
    }),
    
    input: (provided) => ({
      ...provided,
      color: isDark ? '#E4E6EB' : '#111827',
    }),
    
    noOptionsMessage: (provided) => ({
      ...provided,
      color: isDark ? '#B0B3B8' : '#6B7280',
      fontSize: '0.875rem',
    }),
    
    loadingMessage: (provided) => ({
      ...provided,
      color: isDark ? '#B0B3B8' : '#6B7280',
      fontSize: '0.875rem',
    }),
    
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#4E4F50' : '#D1D5DB',
    }),
    
    dropdownIndicator: (provided) => ({
      ...provided,
      color: isDark ? '#B0B3B8' : '#6B7280',
      '&:hover': {
        color: isDark ? '#E4E6EB' : '#374151',
      }
    }),
    
    clearIndicator: (provided) => ({
      ...provided,
      color: isDark ? '#B0B3B8' : '#6B7280',
      '&:hover': {
        color: isDark ? '#F87171' : '#DC2626',
      }
    }),
    
    loadingIndicator: (provided) => ({
      ...provided,
      color: isDark ? '#3B82F6' : '#3B82F6',
    })
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isLoading={isLoading}
      isDisabled={isDisabled}
      styles={customStyles}
      className={className}
      classNamePrefix="react-select"
      theme={(selectTheme) => ({
        ...selectTheme,
        colors: {
          ...selectTheme.colors,
          primary: '#3B82F6',
          primary75: '#60A5FA',
          primary50: '#93C5FD',
          primary25: isDark ? '#1E3A8A' : '#DBEAFE',
          neutral0: isDark ? '#242526' : '#FFFFFF',
          neutral5: isDark ? '#3A3B3C' : '#F9FAFB',
          neutral10: isDark ? '#4E4F50' : '#F3F4F6',
          neutral20: isDark ? '#3A3B3C' : '#E5E7EB',
          neutral30: isDark ? '#4E4F50' : '#D1D5DB',
          neutral40: isDark ? '#8E8F91' : '#9CA3AF',
          neutral50: isDark ? '#B0B3B8' : '#6B7280',
          neutral60: isDark ? '#B0B3B8' : '#4B5563',
          neutral70: isDark ? '#E4E6EB' : '#374151',
          neutral80: isDark ? '#E4E6EB' : '#1F2937',
          neutral90: isDark ? '#E4E6EB' : '#111827',
        }
      })}
      {...props}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string
};

export default CustomSelect;