
import { Link } from 'react-router-dom';
import React from 'react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

export const NavItem = ({ to, icon, label }: NavItemProps) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-stream-purple/20 hover:text-stream-purple transition-all duration-300 transform hover:scale-105 active:scale-95"
  >
    {icon}
    {label}
  </Link>
);
