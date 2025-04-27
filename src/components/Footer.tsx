
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-stream-darker py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-gradient mb-4">saba-streamX</h2>
            <p className="text-gray-400 max-w-xs">
              La plateforme de streaming ultime pour tous vos contenus préférés.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/music" className="text-gray-400 hover:text-white transition-colors">Musique</Link></li>
                <li><Link to="/films" className="text-gray-400 hover:text-white transition-colors">Films</Link></li>
                <li><Link to="/series" className="text-gray-400 hover:text-white transition-colors">Séries</Link></li>
                <li><Link to="/tv" className="text-gray-400 hover:text-white transition-colors">TV</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-3">Légal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-3">Aide</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-3">Social</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 saba-streamX. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Français
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
