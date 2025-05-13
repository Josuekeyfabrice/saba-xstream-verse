
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleVisibility: () => void;
}

export const PasswordField = ({
  id,
  label,
  value,
  onChange,
  showPassword,
  toggleVisibility,
}: PasswordFieldProps) => {
  return (
    <div className="transform transition-all duration-300 hover:-translate-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          required
          className="w-full pl-10 pr-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
        />
        <button 
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-stream-purple"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};
