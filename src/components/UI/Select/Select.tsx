import {FC} from "react";
import Select from 'react-select';
import {Control, Controller, RegisterOptions} from 'react-hook-form';

import {Inputs} from "../../../types";
import {customStyles} from "./customSelectStyles";

interface ICustomSelectProps {
    control: Control<Inputs, keyof Inputs>;
    name: keyof Inputs;
    rules: Omit<
        RegisterOptions<Inputs, keyof Inputs>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    placeholder: string;
    options: string[];
}

const CustomSelect:FC<ICustomSelectProps> = ({
     control,
     name,
     rules,
     placeholder,
     options,
}) => {
    const selectOptions = options.map((item: string) => ({label: item, value: item}));

    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
            field: {onChange, ref, value},
            fieldState: {error}
        }) => (
            <div>
                <Select
                    ref={ref}
                    styles={customStyles()}
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