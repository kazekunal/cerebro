import Image from 'next/image';
// import hero_img from '../../public/hero_img.jpg'
import { Dancing_Script } from '@next/font/google';


const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function HeroPage() {

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
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4 h-16 text-lg"
          rows="4"
          placeholder="Enter the link here to start learning..."
          style={{
            paddingTop: '1.0rem',
            paddingBottom: '1.0rem'
          }}
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Explore
        </button>
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