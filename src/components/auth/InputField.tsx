
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: ReactNode;
  helpText?: string;
}

export const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  helpText,
}: InputFieldProps) => {
  return (
    <div className="transform transition-all duration-300 hover:-translate-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <div className="relative">
        {icon}
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
        />
      </div>
      {helpText && <p className="text-xs text-blue-300 mt-1">{helpText}</p>}
    </div>
  );
};
