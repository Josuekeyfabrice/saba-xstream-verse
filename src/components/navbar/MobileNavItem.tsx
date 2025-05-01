
import { Link } from 'react-router-dom';
import React from 'react';

type MobileNavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export const MobileNavItem = ({ to, icon, label, onClick }: MobileNavItemProps) => (
  <Link
    to={to}
    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-white hover:bg-stream-purple/20 hover:text-stream-purple transition-all duration-300 transform hover:scale-105 active:scale-95"
    onClick={onClick}
  >
    {icon}
    {label}
  </Link>
);
