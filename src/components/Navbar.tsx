import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import UserMenu from './UserMenu';

export default function Navbar() {
  return (
    <nav className="h-16 border-b bg-white">
      <div className="mx-auto flex h-full  items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Store className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">Retail Planner</span>
        </Link>
        <UserMenu />
      </div>
    </nav>
  );
}