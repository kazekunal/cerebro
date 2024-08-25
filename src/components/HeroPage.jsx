'use client'
import Image from 'next/image';
import { Dancing_Script } from '@next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input"

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function HeroPage() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [error, setError] = useState(null);
  const [isValidLink, setIsValidLink] = useState(false);

  useEffect(() => {
    validateLink(textAreaValue);
  }, [textAreaValue]);

  const validateLink = (link) => {
    const trimmedLink = link.trim();
    if (!trimmedLink) {
      setError('Nothing to see here, please enter a link');
      setIsValidLink(false);
    } else if (!isValidYouTubeLink(trimmedLink)) {
      setError('Invalid YouTube link, please enter a valid link');
      setIsValidLink(false);
    } else {
      setError(null);
      setIsValidLink(true);
    }
  };

  const isValidYouTubeLink = (link) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(link);
  };

  const handleButtonClick = (e) => {
    if (!isValidLink) {
      e.preventDefault(); // Prevent navigation only if the link is not valid
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">
      {/* Left side content */}
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 selection:bg-fuchsia-300 selection:text-fuchsia-900">
          Unlock your <span className={dancingScript.className} style={{
            color: "#ef4444"
          }}>potential</span><br />
          Focus, Learn<br />
          Achieve
        </h1>
        <Input
          className="w-full p-2 border border-gray-300 rounded-md mb-4 h-16 text-lg"
          rows="4"
          placeholder="Enter the link here to start learning..."
          style={{
            paddingTop: '1.0rem',
            paddingBottom: '1.0rem'
          }}
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />
        {error && <div className="text-[#ef4444] mb-2">{error}</div>}
        <Link href={isValidLink ? `/Dashboard?link=${encodeURIComponent(textAreaValue)}` : '#'}>
          <button
            className={`font-bold py-2 px-4 rounded ${
              isValidLink
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleButtonClick}
            disabled={!isValidLink}
          >
            Explore
          </button>
        </Link>
      </div>

      {/* Right side image */}
      <div className="lg:w-1/2 lg:pl-12 pt-12">
        <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
          <Image
            src="/hero_img.jpg"
            alt="Hero image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}