import {FC} from "react";
import Select from 'react-select';
import {Controller} from 'react-hook-form';

interface ICustomSelectProps {
    control: any;
    name: string;
    defaultValue: string | undefined;
    rules: any;
    placeholder: string;
    options: string[];
}

const CustomSelect:FC<ICustomSelectProps> = ({
     control,
     name,
     defaultValue,
     rules,
     placeholder,
     options,
}) => {
    const selectOptions = options.map((item: string) => ({label: item, value: item}));

    return <Controller
        control={control}
        name={name}
        defaultValue={defaultValue && {label: defaultValue, value: defaultValue}}
        rules={rules}
        render={({
            field: {onChange, ref, value},
            fieldState: {error}
        }) => (
            <div>
                <Select
                    ref={ref}
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={onChange}
                    value={value}
                    options={selectOptions}
                    placeholder={placeholder}
                    name={name}
                    isSearchable={false}
                />
                {(error) && <div>{error.message}</div>}
            </div>
        )}
    />
}

export default CustomSelect;