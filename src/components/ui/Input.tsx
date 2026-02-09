'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
  helperText?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export function Input({
  label,
  error,
  placeholder,
  value,
  onChange,
  required = false,
  maxLength,
  helperText,
  id,
  name,
  disabled = false,
  className: classNameProp = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id || name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type="text"
        className={cn(
          "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          error && "border-red-500 focus:ring-red-500 focus:border-transparent",
          classNameProp
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 mt-1">{error}</span>
      )}
      {helperText && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}
