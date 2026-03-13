"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ContactModal from "./ContactModal";
import JoinWHAASCOModal from "./JoinWHAASCOModal";
import type { CustomPage } from "@/lib/content-types";

interface HeaderProps {
  headerPages?: Pick<CustomPage, "slug" | "title">[];
}

export default function Header({ headerPages = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Open Join modal when ?join=1 is in URL (e.g. from committees page link)
  useEffect(() => {
    if (searchParams.get("join") === "1") {
      setIsJoinModalOpen(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-african-gold-500">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center md:ml-8">
            <Image
              src="/logo.png"
              alt="WHAASCO Logo"
              width={240}
              height={240}
              className="h-28 md:h-36 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-african-black-800 hover:text-primary-600 transition-colors font-medium"
            >
              Home
            </Link>
            
            {/* About WHAASCO Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="text-african-black-800 hover:text-primary-600 transition-colors font-medium flex items-center"
              >
                About WHAASCO
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {isAboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-african-black-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/history"
                    className="block px-4 py-2 text-african-black-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    History
                  </Link>
                  <Link
                    href="/earl-exum-tribute"
                    className="block px-4 py-2 text-african-black-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Tribute to President Earl Exum
                  </Link>
                  <Link
                    href="/board"
                    className="block px-4 py-2 text-african-black-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Board Members
                  </Link>
                  <Link
                    href="/committees"
                    className="block px-4 py-2 text-african-black-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    WHAASCO Committees
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="text-african-black-800 hover:text-primary-600 transition-colors font-medium"
            >
              Interested in WHAASCO
            </button>
            <Link
              href="/gallery"
              className="text-african-black-800 hover:text-primary-600 transition-colors font-medium"
            >
              Gallery & Events
            </Link>
            {headerPages.map((p) => (
              <Link
                key={p.slug}
                href={`/pages/${p.slug}`}
                className="text-african-black-800 hover:text-primary-600 transition-colors font-medium"
              >
                {p.title || p.slug}
              </Link>
            ))}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="text-african-black-800 hover:text-primary-600 transition-colors font-medium"
            >
              Contact
            </button>
            <Link
              href="/donate"
              className="bg-african-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all shadow-md font-semibold"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button - explicit color for visibility in production */}
          <button
            className="md:hidden p-2 text-african-black-900 hover:text-primary-600 transition-colors rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-african-black-800 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {/* Mobile About WHAASCO expandable */}
            <div>
              <button
                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                className="flex items-center justify-between w-full py-2 text-african-black-800 hover:text-primary-600 transition-colors text-left"
              >
                About WHAASCO
                <svg
                  className={`w-4 h-4 transition-transform ${isMobileAboutOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileAboutOpen && (
                <div className="pl-4 space-y-1 border-l-2 border-primary-200 ml-2">
                  <Link href="/about" className="block py-2 text-african-black-800 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                  <Link href="/history" className="block py-2 text-african-black-800 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>History</Link>
                  <Link href="/earl-exum-tribute" className="block py-2 text-african-black-800 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>Tribute to President Earl Exum</Link>
                  <Link href="/board" className="block py-2 text-african-black-800 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>Board Members</Link>
                  <Link href="/committees" className="block py-2 text-african-black-800 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>WHAASCO Committees</Link>
                </div>
              )}
            </div>
            <button
              onClick={() => { setIsJoinModalOpen(true); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-african-black-800 hover:text-primary-600 transition-colors"
            >
              Interested in WHAASCO
            </button>
            <Link
              href="/gallery"
              className="block py-2 text-african-black-800 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery & Events
            </Link>
            {headerPages.map((p) => (
              <Link
                key={p.slug}
                href={`/pages/${p.slug}`}
                className="block py-2 text-african-black-800 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {p.title || p.slug}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsContactModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-african-black-800 hover:text-primary-600 transition-colors"
            >
              Contact
            </button>
            <Link
              href="/donate"
              className="block py-2 bg-african-gradient text-white rounded-lg text-center hover:opacity-90 transition-all font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
          </div>
        )}
      </nav>
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      {/* Join WHAASCO Modal */}
      <JoinWHAASCOModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </header>
  );
}
