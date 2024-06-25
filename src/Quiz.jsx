
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.webp';
import fblank from './assets/fblank.webp';
import errorid from './assets/errorid.webp';
import completion from './assets/completion.webp';
import reading from './assets/reading.webp';
import acomprehension from './assets/acomprehension.webp';
import julie from './assets/julie.mp3'

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        handleRetry();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate('/timeout');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setSubmitted(false);
    };

    const handleInputChange = (category, questionId, event) => {
        const { value } = event.target;
        handleAnswer(category, questionId, value);
    };


    const [questions, setQuestions] = useState({
        multipleChoice: [
            {
                "id": 1,
                "question": "___ apple a day keeps ___ doctor away.",
                "options": ["A / a", "An / a", "The / the", "An / the"],
                "answer": ["An / the"],
                "selectedOption": null
            }
            ,
            {
                "id": 2,
                "question": "She arrived ___ the airport ___ 7 o'clock ___ the evening.",
                "options": ["in / at / in", "at / in / at", "to / on / in", "at / at / in"],
                "answer": ["at / at / in"],
                "selectedOption": null
            }
            ,
            {
                "id": 3,
                "question": "I saw ___ interesting movie last night.",
                "options": ["a", "an", "the", "some"],
                "answer": ["an"],
                "selectedOption": null
            }

            ,
            {
                "id": 4,
                "question": "He lives ___ a house ___ the end of the street.",
                "options": ["in / in", "in / at", "at / in", "on / at"],
                "answer": ["in / at"],
                "selectedOption": null
            }

            ,
            {
                "id": 5,
                "question": "There is ___ apple on ___ table.",
                "options": ["an / the", "a / the", "the / an", "an / a"],
                "answer": ["an / the"],
                "selectedOption": null
            }


        ]
        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "She bought ___ new dress for the party.",
                "options": [],
                "answer": ["a", "A"],
                "selectedOption": null
            }

            ,
            {
                "id": 7,
                "question": "He lives ___ a small village.",
                "options": [],
                "answer": ["in", "In", "IN"],
                "selectedOption": null
            }

            ,
            {
                "id": 8,
                "question": "The best part of the movie was ___ ending.",
                "options": [],
                "answer": ["The", "the", "THE"],
                "selectedOption": null
            }

            ,
            {
                "id": 9,
                "question": "She arrived ___ the office on time for her meeting.",
                "options": [],
                "answer": ["at", "At", "AT"],
                "selectedOption": null
            }
            ,
            {
                "id": 10,
                "question": "I'm going to buy ___ car next week.",
                "options": [],
                "answer": ["a", "A"],
                "selectedOption": null
            }


        ]
        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "She wants to become ___ doctor when she grows up.",
                "options": ["a", "an", "the", "some"],
                "answer": ["a"],
                "selectedOption": null
            }


            ,
            {
                "id": 12,
                "question": "I need the advice from an expert in this matter.",
                "options": ["the", "an", "some", "a"],
                "answer": ["the"],
                "selectedOption": null
            }


            ,
            {
                "id": 13,
                "question": "She lives in a small apartment at the top of the building.",
                "options": ["in", "at", "on", "above"],
                "answer": ["at"],
                "selectedOption": null
            }


            ,
            {
                "id": 14,
                "question": "Can you pass me a pen, please?",
                "options": ["a", "an", "the", "some"],
                "answer": ["a"],
                "selectedOption": null
            }

        ]
        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "She always arrives at work ___ 8 o'clock.",
                "options": [],
                "answer": ["at", "At", "AT"],
                "selectedOption": null
            }

            ,
            {
                "id": 17,
                "question": "The doctor arrived ___ hospital to perform surgery.",
                "options": [],
                "answer": ["At", "at", "AT"],
                "selectedOption": null
            }
            ,
            {
                "id": 18,
                "question": "They usually meet ___ their office on Mondays.",
                "options": [],
                "answer": ["at", "At", "AT"],
                "selectedOption": null
            }

            ,
            {
                "id": 19,
                "question": "She bought ___ new dress for the wedding.",
                "options": [],
                "answer": ["a", "A"],
                "selectedOption": null
            }

            ,
            {
                "id": 20,
                "question": "He's waiting ___ the bus stop for his friend.",
                "options": [],
                "answer": ["at", "At", "AT"],
                "selectedOption": null
            }


        ]
        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "What does Tom enjoy doing after classes?",
                "options": ["Playing soccer", "Playing basketball", "Playing chess", "Playing video games"],
                "answer": ["Playing basketball"],
                "selectedOption": null
            }

            ,
            {
                "id": 22,
                "question": "Where did Tom and his family visit last weekend?",
                "options": ["Park", "Museum", "Beach", "Zoo"],
                "answer": ["Beach"],
                "selectedOption": null
            }
            ,
            {
                "id": 23,
                "question": "What does Mary want to become in the future?",
                "options": ["Teacher", "Doctor", "Veterinarian", "Engineer"],
                "answer": ["Veterinarian"],
                "selectedOption": null
            }
            ,
            {
                "id": 24,
                "question": "What did Tom enjoy collecting along the shore?",
                "options": ["Sand", "Seashells", "Rocks", "Fish"],
                "answer": ["Seashells"],
                "selectedOption": null
            }


        ]
        ,

        // audioComprehension: [
        //     {
        //         id: 100,
        //         question: " What is Julie's favorite color?",
        //         options: ["Blue", "Green"],
        //         answer: "Blue",
        //         selectedOption: null,
        //         audio: julie
        //     },
        // ],
    });



    const handleAnswer = (category, questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = {
            ...questions,
            [category]: questions[category].map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedOption };
                }
                if (question.questions) {
                    return {
                        ...question,
                        questions: question.questions.map(subQuestion => {
                            if (subQuestion.id === questionId) {
                                return { ...subQuestion, selectedOption };
                            }
                            return subQuestion;
                        }),
                    };
                }
                return question;
            }),
        };
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        Object.values(questions).flat().forEach(question => {
            const isCorrect = Array.isArray(question.answer)
                ? question.answer.includes(answers[question.id])
                : question.answer === answers[question.id];

            if (isCorrect) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };

    const renderQuestions = (category, questions) => (
        <div className='category-container'>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2 py-5'>{question.question}</p>
                        </>
                    )}
                    {question.video && (
                        <div className="relative">
                            <YouTube
                                videoId="cVsyJvxX48A"
                                className="mx-auto w-full"
                                opts={{ width: '100%' }}
                            />
                            <p className="mb-2 py-5">{question.question}</p>
                        </div>
                    )}
                    {!question.audio && !question.video && (
                        <>
                            <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
                            <p className=' mb-2 px-3'>{question.question}</p>
                        </>
                    )}

                    {!question.questions && (
                        <div className='flex flex-wrap justify-center'>
                            {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                <input
                                    type="text"
                                    className='py-2 px-4 border-b-2 border-slangup focus:outline-none focus:border-b-2 focus:border-slangup'
                                    value={question.selectedOption || ''}
                                    onChange={(e) => handleInputChange(category, question.id, e)}
                                    disabled={submitted}
                                />
                            ) : (
                                question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-5 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                        onClick={() => handleAnswer(category, question.id, option)}
                                        disabled={submitted}
                                        style={{ width: question.options.length > 2 ? '80%' : '50%' }}
                                    >
                                        {option}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                    {question.questions && question.questions.map(subQuestion => (
                        <div className='my-10' key={subQuestion.id}>
                            <p className='px-7'>{subQuestion.question}</p>
                            <div className='flex flex-wrap justify-center'>
                                {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                    <input
                                        type="text"
                                        className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                        value={subQuestion.selectedOption || ''}
                                        onChange={(e) => handleInputChange(category, subQuestion.id, e)}
                                        disabled={submitted}
                                    />
                                ) : (
                                    subQuestion.options.map(option => (
                                        <button
                                            key={option}
                                            className={`py-1 px-5 rounded ${subQuestion.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                            onClick={() => handleAnswer(category, subQuestion.id, option)}
                                            disabled={submitted}
                                            style={{ width: subQuestion.options.length > 2 ? '80%' : '50%' }}
                                        >
                                            {option}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img className='w-[150px]' src={mchoice} alt='' />
            </div>
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill In The Blank</h2>
                <img className='w-[150px]' src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>What's The Error?</h2>
                <img className='w-[150px]' src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Complete The Sentence</h2>
                <img className='w-[150px]' src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img className='w-[150px]' src={reading} alt='' />
            </div>
            <div className='pt-7 '>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>Tom is a student at Greenfield High School. He enjoys playing basketball with his friends after classes. Last weekend, Tom and his family visited the beach. They built sandcastles and swam in the clear blue water. Tom's favorite part was collecting seashells along the shore. He hopes to visit the beach again soon.</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            {/* <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)} */}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
