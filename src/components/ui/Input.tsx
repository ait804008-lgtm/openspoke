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
  multiline?: boolean;
  rows?: number;
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
  multiline = false,
  rows = 3,
  className,
  ...props
}: InputProps) {
  const inputElement = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={inputElement}
        type={multiline ? 'textarea' : 'text'}
        className={cn(
          "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          multiline ? "min-h-[80px] resize-y" : "",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        disabled={props.disabled}
        rows={multiline ? rows : undefined}
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
