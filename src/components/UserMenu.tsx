import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function UserMenu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check authentication state
  useEffect(() => {
    const authenticate = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });

    return () => authenticate();
  }, []);

  // Handle Sign Out
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/SignIn");
  };

  return (
    <div className="relative">
      {user ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
          <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
          </DropdownMenu.Trigger>
      
        </DropdownMenu.Root>
      ) : (
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => navigate("/SignIn")}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
