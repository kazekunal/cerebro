import React from 'react'

export default function texttospeech() {

    var content = "hello";

    const handleClick = () =>{
        const text = {content};

        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value)
    }

  return (
    <div>
        <h1>hello</h1>
        <button onClick={handleClick}>speak</button>
    </div>
  )
}
