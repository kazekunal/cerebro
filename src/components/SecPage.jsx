'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';


export default function SecPage({ url }){
  const searchParams = useSearchParams();
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const link = searchParams.get('link');
    if (link) {
      const videoId = extractVideoId(link);
      setVideoLink(`https://www.youtube.com/embed/${videoId}`);
    }
  }, [searchParams]);

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="container mx-auto pt-28 px-4 py-12 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <div className="aspect-w-16 aspect-h-9 mb-4">
        <ReactPlayer
            url={"https://www.youtube.com/watch?v=eqOg3h1onuM"}
            className="react-player h-12 w-20"
            controls
        />
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Button 1
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Button 2
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Button 3
          </button>
        </div>
      </div>

      {/* Right side: Description */}
      <div className="lg:w-1/2 lg:pl-12">
        <h2 className="text-2xl font-bold mb-4">Video Description</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
        </p>
      </div>
    </div>
  );
}