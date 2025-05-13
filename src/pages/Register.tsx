
import RegisterForm from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="glass-card p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-white text-center hover:text-stream-purple transition-colors">Créer un compte Saba</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
