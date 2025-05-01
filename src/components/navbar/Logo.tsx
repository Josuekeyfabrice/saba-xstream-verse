
import { Link } from 'react-router-dom';
import React from 'react';

export const Logo = () => (
  <Link to="/" className="flex items-center space-x-2 transform transition-all duration-300 hover:scale-105">
    <span 
      className="text-5xl font-bold transition-colors hover:text-stream-purple" 
      style={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        background: 'linear-gradient(to right, #FF8C00, #FFD700)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      Saba-streamX
    </span>
  </Link>
);
