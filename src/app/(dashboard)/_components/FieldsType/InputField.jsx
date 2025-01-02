import React, { useState } from 'react';

export const InputField = ({ type, name }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        if (inputValue.trim() === '') {
            setError(`${name} is required.`);
        } else if (type === 'email' && !validateEmail(inputValue)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const handleBlur = () => {
        if (value.trim() === '') {
            setError(`${name} is required.`);
        } else if (name === 'email' && !validateEmail(value)) {
            setError('Please enter a valid email address.');
        }
    };

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-primary-text block mb-1" htmlFor={name}>{name}</label>
            <input
                placeholder={`Please enter your ${name.toLowerCase()}`}
                name={name}
                className="px-4 border w-[100%] focus:outline-none text-sm rounded-2xl p-3.5 block"
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};
