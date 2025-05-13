
import { Link } from "react-router-dom";

export const LoginLink = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-white">
        Vous avez déjà un compte?{" "}
        <Link to="/login" className="text-blue-300 hover:text-blue-200 underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
};
