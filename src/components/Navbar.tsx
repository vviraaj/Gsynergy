import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import GynergyLogo from "../Assets/icons/Gsynergy.svg";

export default function Navbar() {
  return (
    <nav className="h-16 border-b bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <Link to="/stores" className="flex items-center space-x-2">
          <img src={GynergyLogo} alt="Gsynergy" className="h-8" />
        </Link>
        <UserMenu />
      </div>
    </nav>
  );
}
