import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Store, Package, BarChart3, LineChart, ChevronLeft } from "lucide-react";
import { Tooltip } from "react-tooltip";

const navigation = [
  { name: "Stores", href: "/stores", icon: Store },
  { name: "SKUs", href: "/skus", icon: Package },
  { name: "Planning", href: "/planning", icon: BarChart3 },
  { name: "Charts", href: "/charts", icon: LineChart },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-screen border-r bg-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {!isCollapsed && <h1 className="text-lg font-bold">Dashboard</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-2 flex-1">
        {navigation.map(({ name, href, icon: Icon }) => (
          <NavLink
            key={name}
            to={href}
            className={({ isActive }) =>
              `relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isCollapsed ? "justify-center" : "justify-start"}`
            }
            title={isCollapsed ? name : ""}
          >
            <Icon className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">{name}</span>}

          </NavLink>
        ))}
      </nav>

    
    </div>
  );
}
