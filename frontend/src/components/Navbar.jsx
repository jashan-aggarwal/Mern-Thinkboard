import React from "react"
import { Link } from "react-router-dom" 
import { PlusIcon } from "lucide-react"

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50"> 
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="px-4 sm:px-10">
            <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-bold">
              Thinkboard
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <div className="px-4 sm:px-10">
            <Link to="/create" className="btn btn-sm btn-primary gap-2">
              <PlusIcon className="w-4 h-4" />
              New
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;