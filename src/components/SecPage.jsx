'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';

export default function SecPage() {
  const searchParams = useSearchParams();
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const link = searchParams.get('link');
    if (link) {
      setVideoLink(link);
      sendVideoLinkToBackend(link);
    }
  }, [searchParams]);

  const sendVideoLinkToBackend = async (link) => {
    try {
      const response = await fetch('http://localhost:3001/api/videolink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoLink: link }),
      });

      if (!response.ok) {
        throw new Error('Failed to send video link to backend');
      }

      const data = await response.json();
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Error sending video link to backend:', error);
    }
  };


  return (
    <div className="container mx-auto pt-28 px-4 py-12 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <ReactPlayer
            url={videoLink}
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
  <table className="w-full text-gray-700">
    <tbody>
      <tr>
        <td className="align-top pr-2 font-bold">1.</td>
        <td>
          <span className="font-semibold">Introduction:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">2.</td>
        <td>
          <span className="font-semibold">Background:</span> Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">3.</td>
        <td>
          <span className="font-semibold">Main Concept:</span> Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">4.</td>
        <td>
          <span className="font-semibold">Supporting Details:</span> Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">5.</td>
        <td>
          <span className="font-semibold">Application:</span> Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">6.</td>
        <td>
          <span className="font-semibold">Conclusion:</span> Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.
        </td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
  );
}