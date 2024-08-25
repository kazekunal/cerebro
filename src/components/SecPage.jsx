'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from 'react';
import React from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import ChatbotUI from './Chatbot';
import Texttospeech from './texttospeech';

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
    <>
    <div className="container mx-auto pt-28 px-4 py-12 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <div className="aspect-w-16 aspect-h-9 mb-4">
                <ReactPlayer
                    url={videoLink}
                    className="react-player h-12 w-20"
                    controls
                />
        </div>
      </div>

      <div className="lg:w-1/2 lg:pl-12">
  <h2 className="text-2xl font-bold mb-4">Video Description</h2>
  <table className="w-full text-gray-700">
    <tbody>
      <tr>
        <td className="align-top pr-2 font-bold">&bull;</td>
        <td>
          <span className="font-semibold">Introduction:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">&bull;</td>
        <td>
          <span className="font-semibold">Background:</span> Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">&bull;</td>
        <td>
          <span className="font-semibold">Main Concept:</span> Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">&bull;</td>
        <td>
          <span className="font-semibold">Supporting Details:</span> Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">&bull;</td>
        <td>
          <span className="font-semibold">Application:</span> Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
        </td>
      </tr>
      <tr>
        <td className="align-top pr-2 font-bold">&bull;</td>
        <td>
          <span className="font-semibold">Conclusion:</span> Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.
        </td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
    <div>
        <Texttospeech/>
    <Image className='aspect-w-16 aspect-h-9 ml-12 mb-4' src="https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCkFbIkJ1aWxkaW5nIGEKQmFja2dyb3VuZCBSZW1vdmVyCkFwcCBmcm9tClNjcmF0Y2giXQpCWyJCdWlsZGluZyBhCldlYiBBcHAKdG8gUmVtb3ZlCkltYWdlIEJhY2tncm91bmRzCndpdGggRmxhc2sKYW5kIERvY2tlciJdCkNbIkRlcGxveWluZyBhClB5dGhvbiBBcHAKd2l0aCBEb2NrZXIiXQpEWyJEZXBsb3lpbmcgYQpQeXRob24gQXBwCnRvIEdvb2dsZQpDbG91ZCB1c2luZwpEb2NrZXIgYW5kCkNsb3VkIFJ1biJdCkVbIkRlcGxveWluZyBQeXRob24KQXBwcyB3aXRoCkRvY2tlciBhbmQKQ2xvdWQgUnVuIl0KQSAtLSBUaGUgc3BlYWtlciBidWlsdCBhClB5dGhvbiB3ZWIgYXBwIHRvCnJlbW92ZSBiYWNrZ3JvdW5kcyBmcm9tIGltYWdlcwphbmQgZGVwbG95ZWQgaXQgdG8KdGhlIGNsb3VkIHVzaW5nIERvY2tlciwKbWFraW5nIGl0IGVhc3kgdG8KdXNlIGFuZCBkZXBsb3kgd2l0aG91dAp3b3JyeWluZyBhYm91dCBkZXBlbmRlbmNpZXMgYW5kCmNvbXBsZXhpdHkuIC0tPiBCCkIgLS0gQ3JlYXRpbmcgYSB3ZWIgYXBwCnVzaW5nIEZsYXNrIHRvIHJlbW92ZQppbWFnZSBiYWNrZ3JvdW5kcyB3aXRoIGEKUHl0aG9uIGxpYnJhcnksIGFuZCBkZXBsb3lpbmcKaXQgd2l0aCBEb2NrZXIgZm9yCm11bHRpLXBsYXRmb3JtIHVzZS4gLS0+IEMKQyAtLSBUaGlzIGxlY3R1cmUgZXhwbGFpbnMgaG93CnRvIGRlcGxveSBhIFB5dGhvbgphcHAgdXNpbmcgRG9ja2VyLCBpbmNsdWRpbmcKYnVpbGRpbmcgYW4gaW1hZ2UsIHJ1bm5pbmcKYSBjb250YWluZXIsIGFuZCBkZXBsb3lpbmcKdG8gdGhlIHdlYiB1c2luZwpjbG91ZCBzZXJ2aWNlcyBsaWtlIEdvb2dsZQpDbG91ZCBSdW4uIC0tPiBECkQgLS0gVGhpcyBsZWN0dXJlIGNvdmVycyBob3cKdG8gdGFnIGFuZCBwdXNoCmEgRG9ja2VyIGltYWdlIHRvCkdvb2dsZSBDbG91ZCwgYW5kIHRoZW4KZGVwbG95IGl0IHRvIHRoZQppbnRlcm5ldCB1c2luZyBDbG91ZCBSdW4sCmNvbmZpZ3VyaW5nIG9wdGlvbnMgc3VjaCBhcwpDUFUgYWxsb2NhdGlvbiwgbWVtb3J5LCBhbmQKYXV0by1zY2FsaW5nLiAtLT4gRQ=="
        alt="Picture of the author"
        width={1400}
        height={3000}>
    </Image>
</div>
<ChatbotUI/>
</>
  );
}
