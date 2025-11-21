import Image from 'next/image';
import React from 'react';
import { Marcellus, Jost } from "next/font/google";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});
const instaImages = [
	'/insta/insta1.jpg',
	'/insta/insta2.jpg',
	'/insta/insta3.jpg',
];

const instaLink = 'https://www.instagram.com/p/DO56RDlDKde/';


const InstaSection = () => {
  return (
    <section className={`text-center py-8 ${marcellus.variable}`}>
      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-marcellus)' }}>
	Our Instagram
      </h2>
      <div className="text-lg font-medium mb-6 text-[#8a3ab9]" style={{ fontFamily: 'var(--font-marcellus)' }}>
	@daliladiamonds
      </div>
      <div className="flex justify-center gap-6">
	{instaImages.map((src, idx) => (
	  <a
	    key={src}
	    href={instaLink}
	    target="_blank"
	    rel="noopener noreferrer"
	    className="inline-block overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 border border-gray-200"
	  >
	    <Image
	      src={src}
	      alt={`Instagram post ${idx + 1}`}
	      width={180}
	      height={180}
	      className="object-cover w-[180px] h-[180px]"
	    />
	  </a>
	))}
      </div>
    </section>
  );
};

export default InstaSection;
