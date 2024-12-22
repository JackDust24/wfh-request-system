import React from 'react';

type InputFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
};

export function InputField({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full border-2 rounded-md p-1 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}