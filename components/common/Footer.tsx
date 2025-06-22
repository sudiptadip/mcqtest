"use client";
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-14 px-6 sm:px-10 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">🧠 EduCrack</h3>
          <p className="text-sm text-gray-300 mb-4">
            Your companion in competitive exam prep. Practice. Learn. Succeed.
          </p>
          <div className="flex space-x-4 mt-4">
            <Twitter className="h-5 w-5 hover:text-blue-400 transition" />
            <Facebook className="h-5 w-5 hover:text-blue-600 transition" />
            <Instagram className="h-5 w-5 hover:text-pink-400 transition" />
            <Linkedin className="h-5 w-5 hover:text-blue-500 transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/practice-sets">Practice Sets</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
            <li><Link href="/help">Help Center</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Get In Touch</h4>
          <ul className="text-sm space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-1 text-gray-400" />
              support@educrack.in
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-1 text-gray-400" />
              +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-400">
        ©2025 EduCrack. All rights reserved.
      </div>
    </footer>
  )
}