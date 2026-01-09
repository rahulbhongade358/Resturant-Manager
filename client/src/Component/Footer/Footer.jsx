import React from "react";

const Footer = () => {
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Brand + Links */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-white mb-3">
            Rajendra Chinese
          </h2>

          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto lg:mx-0">
            Authentic Chinese flavors with a smart QR-based ordering experience.
          </p>

          <ul className="grid grid-cols-2 gap-y-2 text-sm max-w-xs mx-auto lg:mx-0">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-amber-400 transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            258NA, W High Ct Rd,
            <br />
            Bajaj Nagar, Nagpur,
            <br />
            Maharashtra – 440010
          </p>

          <p className="mt-3 text-sm">
            Phone:
            <a
              href="tel:08830127204"
              className="ml-1 hover:text-amber-400 transition"
            >
              088301 27204
            </a>
          </p>
        </div>

        {/* Opening Hours */}
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-semibold text-white mb-3">
            Opening Hours
          </h3>

          <ul className="text-sm text-gray-400 space-y-2">
            <li>Mon – Thu: 4:00 PM – 11:30 PM</li>
            <li>Friday: 4:00 PM – 11:30 PM</li>
            <li>Saturday: 4:00 PM – 11:30 PM</li>
            <li>Sunday: 12:00 PM – 12:00 AM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Rajendra Chinese. All rights reserved.
      </div>

      {/* Developer Credit */}
      <div className="pb-4 text-center text-xs text-gray-500 group">
        <span className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300">
          Built by{" "}
          <a
            href="https://rahulbhongadeportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400"
          >
            Rahul
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
