"use client";
import React, { useRef, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function QuizPage() {
    const data = [
        {
          question: "What color is the sky on a sunny day?",
          option1: "Blue",
          option2: "Red",
          option3: "Green",
          option4: "Yellow",
          category: "easy",
          topic: "gk",
          ans: 1,
        },
        {
          question: "What is the typical sound made by a dog?",
          option1: "Meow",
          option2: "Woof",
          option3: "Oink",
          option4: "Tweet",
          category: "easy",
          topic: "gk",
          ans: 2,
        },
        {
          question: "Which fruit is often eaten for breakfast?",
          option1: "Apple",
          option2: "Banana",
          option3: "Carrot",
          option4: "Pizza",
          category: "easy",
          topic: "gk",
          ans: 2,
        },
        {
          question: "How many sides does a square have?",
          option1: "3",
          option2: "4",
          option3: "5",
          option4: "6",
          category: "easy",
          topic: "gk",
          ans: 2,
        },
      ];

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  let [result, setResult] = useState(0);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let [score, setScore] = useState(0); 

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("bg-green-500", "text-white");
        setLock(false);
        setScore(prev => prev+1);
      } else {
        e.target.classList.add("bg-red-500", "text-white");
        setLock(false);
        option_array[question.ans - 1].current.classList.add("bg-green-500", "text-white");
      }
      setLock(true);
    }
  };

  const handleNext = () => {
    if (lock === true) {
        if(index === data.length - 1){
            setResult(true);
            return 0;
        }
      setIndex(prevIndex => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("bg-green-500", "bg-red-500", "text-white");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
            {result ? (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-center">You have scored {score} out of {data.length}</h2>
                    <div className="flex justify-center">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: score, label: 'easy' },
                                        { id: 1, value: 2, label: 'medium' },
                                        { id: 2, value: 1, label: 'hard' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={400}
                        />
                    </div>
                    <button
                        className="mt-8 w-full bg-blue-500 text-white p-4 rounded text-xl font-semibold hover:bg-blue-600 transition-colors"
                        onClick={reset}
                    >
                        Reset Quiz
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold mb-6">{index + 1}. {question.question}</h2>
                    <p className="text-xl text-gray-600 mb-6">
                        <span className="font-semibold">Topic: </span>{question.topic} 
                        <span className="ml-8 font-semibold">Category: </span> {question.category}
                    </p>
                    <div className="space-y-4">
                        {[option1, option2, option3, option4].map((option, idx) => (
                            <button
                                key={idx}
                                ref={option}
                                className={`w-full p-4 text-left rounded text-xl font-semibold transition-colors ${
                                    lock && question.ans === idx + 1 ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                                onClick={(e) => checkAns(e, idx + 1)}
                            >
                                {question[`option${idx + 1}`]}
                            </button>
                        ))}
                    </div>
                    {lock && (
                        <button
                            className="mt-8 w-full bg-green-500 text-white p-4 rounded text-xl font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300"
                            onClick={handleNext}
                        >
                            Next Question
                        </button>
                    )}
                </>
            )}
        </div>
    </div>
);
}