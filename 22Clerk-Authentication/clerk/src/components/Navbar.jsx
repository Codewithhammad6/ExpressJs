import React from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 px-5 bg-gray-900 text-white flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
         <SignedIn>
        <Link to="/contact">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
        </SignedIn>
      </div>

      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
