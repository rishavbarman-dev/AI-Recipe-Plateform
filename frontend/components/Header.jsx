import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import PricingModal from "./PricingModal";
import HowToCookModal from "./HowToCookModal";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end space-x-4">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-end space-x-4">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} className="mr-auto">
          <Image
            src="/orange-logo.png"
            alt="RecipeAI Logo"
            width={60}
            height={60}
            className="w-16 h-14"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="hover:text-orange-600 tranisition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-orange-600 tranisition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* How to Cook  */}
          <HowToCookModal />
          <SignedIn>
            {/* Pricing Modal with Built-in Trigger */}
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm"
                      : "bg-stone-200/50 text-stone-600 border-stone-200 cursor-pointer hover:bg-stone-300/50 hover:border-stone-300"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "text-white fill-white/20"
                        : "text-stone-500"
                    }`}
                  />
                  <span>
                    {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="mr-2">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="default"
                className="bg-orange-400 hover:bg-orange-600"
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
