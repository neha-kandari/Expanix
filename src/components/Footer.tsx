"use client";
import { Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black/90 text-white pt-16 pb-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Brand & Social */}
        <div className="flex-1 min-w-[220px]">
          <div className="text-2xl font-bold mb-2">Web Agency</div>
          <p className="text-gray-300 mb-6 max-w-xs">
            A trusted partnership since 2020, delivering innovative web development, UI/UX design, SEO, and digital marketing solutions that drive exceptional results.
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[160px]">
          <div className="text-xl font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-gray-100">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/schedule">Schedule</Link></li>
          </ul>
        </div>
        {/* Our Services */}
        <div className="flex-1 min-w-[180px]">
          <div className="text-xl font-semibold mb-3">Our Services</div>
          <ul className="space-y-2 text-gray-100">
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>SEO & Marketing</li>
            <li>E-commerce</li>
          </ul>
        </div>
        {/* Partner With Us */}
        <div className="flex-1 min-w-[220px]">
          <div className="text-xl font-semibold mb-3">Partner With Us</div>
          <p className="text-gray-300 mb-4">
            Ready to transform your digital presence through our collaborative partnership?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition mb-3">
            Start Partnership
          </button>
          <div className="text-gray-400 text-sm">
            Partnership Excellence Since 2020<br />
            Building digital futures together
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} Web Agency Partnership. All rights reserved. Built with Next.js & <span className="text-pink-400">♥</span>
        </div>
        <div className="flex gap-6 text-xs text-gray-400">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}