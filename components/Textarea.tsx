import React, { ChangeEvent } from 'react';

interface TextareaProps {
  required?: boolean;
  name: string;
  id: string;
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ required, name, id, className, value, onChange }) => {
  return (
    <textarea
      name={name}
      required={required}
      id={id}
      className={`border rounded border-slate-300 outline-0 py-1 px-3 hover:border-slate-900 focus:border-slate-900 ${className || ''}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
