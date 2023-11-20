// @ts-nocheck
export const customStyles = () => ({
    control: (styles, {isFocused}) => ({
        ...styles,
        borderColor: isFocused ? '#9EA2A4' : '#E6ECEF',
        outline: 'none',
        boxShadow: 'none',
        ':hover': {
            borderColor: isFocused ? '#9EA2A4' : '#E6ECEF',
        },
        transition: 'all 0.3s',
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (styles, {isFocused}) => ({
        ...styles,
        transition: 'all 0.3s',
        transform: isFocused ? 'rotate(180deg)' : null
    }),
    placeholder: (styles, {isFocused}) => ({
        ...styles,
        display: isFocused ? 'none' : 'block',
    }),
    valueContainer: (styles) => ({
        ...styles,
        padding: '13px 12px',
    }),
    menuList: (styles) => ({
        ...styles,
        padding: '4px 14px',
    }),
    option: (styles, {isSelected}) => ({
        ...styles,
        color: isSelected ? '#000' : '#868A8D',
        fontWeight: isSelected ? '700' : '400',
        padding: '14px 0',
        backgroundColor: 'unset',
        ':not(:last-child)': {
            borderBottom: '1px solid #E6ECEF',
        },
        ':hover': {
            fontWeight: 700,
            color: '#000',
        }
    })
});