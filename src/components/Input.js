import React from 'react';

const Input = ({ value, onChange, name, placeholder }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className="form-control"
      autoComplete="off"
      maxLength={100}
    />
  );
};

export { Input };
