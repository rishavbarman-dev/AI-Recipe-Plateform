import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { Cookie, Link, Refrigerator } from "lucide-react";
import Image from "next/image";
import UserDropdown from "./UserDropdown";

const Header = async () => {
    const user = null; // Replace with actual user fetching logic

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end space-x-4">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-end space-x-4">
        <Link href={user ? "/dashboard" : "/"} className="mr-auto">
          <Image src="/orange-logo.png" alt="RecipeAI Logo" width={60} height={60} className="w-16 h-16" />
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
            <Link 
              href="/recipes"
                className="hover:text-orange-600 tranisition-colors flex gap-1.5 items-center"  
            >
                <Cookie className="w-4 h-4"/>
                My Recipes
            </Link>
            <Link 
              href="/pantry"
                className="hover:text-orange-600 tranisition-colors flex gap-1.5 items-center"  
            >
                <Refrigerator className="w-4 h-4"/>
                My Pantry
            </Link>
        </div>
        <div>
          <SignedIn>
            {/* How to Cook  */}
            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
                <Button variant="ghost" className="mr-2">
                  Sign In
                </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="default" className="bg-orange-400 hover:bg-orange-600">Get Started</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
