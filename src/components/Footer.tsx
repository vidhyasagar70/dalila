"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const quickLinks = [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Diamond Knowledge", href: "#knowledge" },
        { name: "Sell", href: "#sell" },
        { name: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];

    return (
        <footer className="bg-[#0a0e27] text-white">
            {/* Newsletter Section */}
            {/* <div className="border-b border-white/10">
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-serif mb-6">
                            Subscribe to our Newsletter
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 bg-white text-gray-900 rounded placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            />
                            <button className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Footer Content */}
            <div className="border-b border-white/10">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Logo Column */}
                        <div>
                            <div className="mb-6">
                                <Image
                                    src="/images/logo2.png"
                                    alt="Dalila Diamonds Logo"
                                    width={160}
                                    height={64}
                                    className="h-16 w-auto"
                                    priority
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded bg-white/5 hover:bg-yellow-600 flex items-center justify-center transition-colors group"
                                    >
                                        <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Address Column */}
                        <div>
                            <h4 className="text-lg font-medium mb-6">
                                Address
                            </h4>
                            <div className="text-white/70 space-y-2">
                                <p>xyz</p>
                                <p>123</p>
                            </div>
                        </div>

                        {/* Quick Links Column */}
                        <div>
                            <h4 className="text-lg font-medium mb-6">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-white/70 hover:text-yellow-600 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Us Column */}
                        <div>
                            <h4 className="text-lg font-medium mb-6">
                                Contact Us
                            </h4>
                            <div className="space-y-3 text-white/70">
                                <p>T. +123456789</p>
                                <p>M. contact@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="py-6">
                <div className="container mx-auto px-6">
                    <p className="text-center text-white/60 text-sm">
                        Copyright 2025 - Dalila | All Rights Reserved
                    </p>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="fixed bottom-5 right-5 w-12 h-12 bg-[#c89e3a] hover:bg-yellow-700 rounded flex items-center justify-center shadow-lg transition-colors group"
                        aria-label="Scroll to top"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ChevronUp className="w-6 h-6 text-white group-hover:text-white/90 transition-colors" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
}
