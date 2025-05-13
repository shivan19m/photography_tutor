'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ApertureSimulator from '@/components/ApertureSimulator';
import IsoSimulator from '@/components/IsoSimulator';
import ShutterSimulator from '@/components/ShutterSimulator';
import CompositionSimulator from '@/components/CompositionSimulator';

const topics = [
  {
    id: 'composition',
    title: 'Composition',
    description: `Composition in photography refers to how visual elements are arranged within a frame. Good composition helps guide the viewer's eye and creates a more engaging and aesthetically pleasing image.`,
    tips: [
      { text: "Rule of Thirds: Divide the frame into 9 equal parts: place key subjects along lines or intersections for balance", icon: "🌐" },
      { text: "Leading Lines: Use natural lines in the scene to guide the viewer's eyes toward the subject.", icon: "🏞️" },
      { text: "Framing: Use elements in the scene (arches, windows, trees) to 'frame' your subject.", icon: "🖼️" },
    ],
    imagePath: '/images/composition1.png',
    examples: [],
    mcQuestion: { question: '', options: [] },
    imageDetails: { title: '', description: '', settings: {} }
  },
  {
    id: 'iso',
    title: 'ISO',
    description: 'ISO determines how sensitive your camera is to light. Higher ISO values make your camera more sensitive, brightening dark scenes but potentially adding noise to your image.',
    tips: [
      { text: 'Low ISO (100-400): Best for bright conditions', icon: '☀️' },
      { text: 'Medium ISO (400-1600): Good for indoor/evening shots', icon: '🏠' },
      { text: 'High ISO (1600+): Use in low-light situations', icon: '🌙' },
    ],
    imagePath: '/images/iso-example.jpg',
    examples: [
      {
        title: 'High ISO Example',
        description: 'We need a high ISO to capture enough light from stars in a dark envrionment',
        settings: 'ISO 3200'
      }
    ],
    mcQuestion: {
      question: "What does increasing the ISO setting on your camera do?",
      options: [
        { text: "Reduces motion blur", isCorrect: false },
        { text: "Narrows the depth of field", isCorrect: false },
        { text: "Makes the sensor more sensitive to light", isCorrect: true },
        { text: "Increases image sharpness", isCorrect: false }
      ]
    },
    imageDetails: {
      title: "Starry Night Sky with Milky Way",
      description: "Bright stars with minimal trails, lots of stars visible, night setting.",
      settings: {
        iso: "3200–6400 – High ISO to capture enough light from stars in a dark environment."
      }
    }
  },
  {
    id: 'aperture',
    title: 'Aperture',
    description: 'Aperture controls how much light enters your camera and affects depth of field. A wider aperture (smaller f-number) creates a shallower depth of field, blurring the background.',
    tips: [
      { text: 'Wide (f/1.4-f/2.8): Great for portraits', icon: '👤' },
      { text: 'Medium (f/4-f/8): Ideal for general photography', icon: '📸' },
      { text: 'Narrow (f/11-f/22): Best for landscapes', icon: '🏔️' },
    ],
    imagePath: '/images/aperture-example.jpg',
    examples: [
      {
        title: 'Narrow Aperture Example',
        description: 'Everything from foreground to background is in focus, perfect for landscape photography.',
        settings: 'f/16'
      }
    ],
    mcQuestion: {
      question: "Which aperture setting gives you the shallowest depth of field (most background blur)?",
      options: [
        { text: "f/16", isCorrect: false },
        { text: "f/8", isCorrect: false },
        { text: "f/5.6", isCorrect: false },
        { text: "f/1.8", isCorrect: true }
      ]
    },
    imageDetails: {
      title: "Spring Park with Flowers and Trees",
      description: "Everything from the foreground flowers to the background is in sharp focus. It's well-lit, likely shot in daylight.",
      settings: {
        aperture: "f/11 or higher – A small aperture was used to achieve a deep depth of field so the entire scene is sharp."
      }
    }
  },
  {
    id: 'shutter',
    title: 'Shutter Speed',
    description: 'Shutter speed determines how long your camera\'s sensor is exposed to light. Faster speeds freeze motion, while slower speeds can create artistic blur effects.',
    tips: [
      { text: 'Slow (1/60 or slower): Low light/motion blur', icon: '💫' },
      { text: 'Medium (1/125-1/250): General use', icon: '🌳' },
      { text: 'Fast (1/1000+): Sports and action', icon: '🏃‍♂️' }
    ],
    imagePath: '/images/shutter-example.jpg',
    examples: [
      {
        title: 'Slow Shutter Example',
        description: 'The water appears silky smooth, creating an artistic long-exposure effect.',
        settings: '1/4s'
      }
    ],
    mcQuestion: {
      question: "What happens when you use a slow shutter speed (e.g., 1 second)?",
      options: [
        { text: "You freeze fast motion", isCorrect: false },
        { text: "You may capture motion blur", isCorrect: true },
        { text: "The image becomes darker in low light", isCorrect: false },
        { text: "The ISO automatically lowers", isCorrect: false }
      ]
    },
    imageDetails: {
      title: "Smooth Waterfall Flow",
      description: "The water is silky smooth, a signature of long exposure.",
      settings: {
        shutterSpeed: "1 to 4 seconds (or longer) – A long shutter speed to blur the motion of water."
      }
    }
  },
];

// Step types for each topic
const STEP_TYPES_MAP: Record<string, StepType[]> = {
  composition: ['lesson'],
  default: ['lesson', 'practical', 'quickcheck'],
};

type StepType = 'lesson' | 'practical' | 'quickcheck';

// Helper to get all steps in order
const getAllSteps = () => {
  const steps: { topicIndex: number; step: StepType }[] = [];
  topics.forEach((topic, i) => {
    const stepTypes = STEP_TYPES_MAP[topic.id] || STEP_TYPES_MAP.default;
    stepTypes.forEach((step: StepType) => steps.push({ topicIndex: i, step }));
  });
  return steps;
};
const allSteps = getAllSteps();

export default function LearnPage() {
  // Track current step index (across all topics/steps)
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shutterSpeed, setShutterSpeed] = useState(250);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Derived state
  const { topicIndex, step } = allSteps[stepIndex];
  const activeTopic = topics[topicIndex];
  const isLastStep = stepIndex === allSteps.length - 1;

  // Check if quiz is completed (from localStorage)
  const [quizCompleted, setQuizCompleted] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setQuizCompleted(localStorage.getItem('quizCompleted') === 'true');
    }
  }, []);

  // Update canAccessTopic and allStepsCompleted logic
  const canAccessTopic = (topicId: string) => {
    if (quizCompleted) return true;
    const topicIndex = topics.findIndex(t => t.id === topicId);
    if (topicIndex === 0) return true;
    const previousTopic = topics[topicIndex - 1];
    return completedSteps.has((topicIndex - 1) * 3 + 2); // last step of previous topic
  };
  const allStepsCompleted = quizCompleted || completedSteps.size === allSteps.length;

  // Progress bar: percent complete
  const progress = (stepIndex / (allSteps.length - 1)) * 100;

  // Navigation
  const handleNext = () => {
    // Mark this step as completed
    setCompletedSteps(prev => new Set(prev).add(stepIndex));
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (!isLastStep) {
      setStepIndex(stepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleNavTopic = (targetIndex: number) => {
    if (canAccessTopic(topics[targetIndex].id)) {
      // Go to first step of that topic
      setStepIndex(targetIndex * STEP_TYPES_MAP.default.length);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  // Quick check logic
  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
    }
  };
  const quickCheckSubmitted = step === 'quickcheck' && showFeedback;

  // Render content for current step
  let stepContent = null;
  if (step === 'lesson') {
    stepContent = (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeTopic.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{activeTopic.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 flex flex-col justify-center w-full">
            {activeTopic.tips.map((tip, index) => {
              const match = tip.text.match(/^(.*?) \((.*?)\): (.*)$/);
              const phrase = match ? match[1] : tip.text;
              const range = match ? match[2] : '';
              const description = match ? match[3] : '';
              return (
                <div key={index} className="flex items-start w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 min-h-[72px]">
                  <span className="text-2xl mt-1 mr-4">{tip.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-semibold text-lg text-gray-900">{phrase}</span>
                      {range && (
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">{range}</span>
                      )}
                    </div>
                    <div className="text-gray-600 text-base leading-snug">{description}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            {activeTopic.id === 'composition' ? (
              <CompositionSimulator 
                imageSrc={activeTopic.imagePath}
                stencilSrc={"/images/composition1-lines.jpeg"}
                alt="Composition Simulator"
              />
            ) : activeTopic.id === 'aperture' ? (
              <ApertureSimulator />
            ) : activeTopic.id === 'iso' ? (
              <IsoSimulator />
            ) : activeTopic.id === 'shutter' ? (
              <ShutterSimulator 
                imageSrc={activeTopic.imagePath}
                shutterSpeed={shutterSpeed}
                onShutterSpeedChange={setShutterSpeed}
                hideHeaderAndSlider={false}
                hideAnnotations={false}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else if (step === 'practical') {
    stepContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
          <Image
            src={activeTopic.imagePath}
            alt={`${activeTopic.title} example`}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="text-xl font-semibold mb-3">{activeTopic.imageDetails.title}</h4>
            <p className="text-base mb-4 opacity-90">{activeTopic.imageDetails.description}</p>
            <div className="space-y-2 text-sm">
              {Object.entries(activeTopic.imageDetails.settings).map(([key, value]) => (
                <p key={key} className="font-mono bg-black/30 p-2 rounded">
                  <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                </p>
              ))}
            </div>
          </div>
          {/* Caption below image, disappears on hover */}
          <div className="absolute bottom-0 left-0 right-0 text-center pb-4 pointer-events-none select-none group-hover:opacity-0 transition-opacity duration-200">
            <span className="inline-block bg-white/80 dark:bg-black/60 text-gray-800 dark:text-gray-100 text-sm rounded-full px-4 py-1 shadow-md">
              Hover over the image to see details about this practical example
            </span>
          </div>
        </div>
        <div className="space-y-6 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-900">Practical Example</h3>
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            <h4 className="font-medium text-gray-900 text-lg">{activeTopic.examples[0].title}</h4>
            <p className="text-gray-600">{activeTopic.examples[0].description}</p>
            <p className="text-sm text-gray-500 font-mono bg-gray-100 p-2 rounded">{activeTopic.examples[0].settings}</p>
          </div>
        </div>
      </div>
    );
  } else if (step === 'quickcheck') {
    stepContent = (
      <div className="max-w-2xl mx-auto space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 text-center">Quick Check</h3>
        <p className="text-gray-700 text-lg text-center">{activeTopic.mcQuestion.question}</p>
        <div className="space-y-4">
          {activeTopic.mcQuestion.options.map((option, index) => (
            <div
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              className={`p-4 rounded-lg transition-colors cursor-pointer ${
                showFeedback
                  ? option.isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-50'
                  : selectedAnswer === index
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-gray-500">{String.fromCharCode(65 + index)}.</span>
                <p className="text-gray-900">{option.text}</p>
              </div>
            </div>
          ))}
        </div>
        {!showFeedback && (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedAnswer === null}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        )}
        {showFeedback && (
          <div className={`p-4 rounded-lg ${
            selectedAnswer !== null && activeTopic.mcQuestion.options[selectedAnswer].isCorrect
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}>
            <p className="text-sm font-medium">
              {selectedAnswer !== null && activeTopic.mcQuestion.options[selectedAnswer].isCorrect
                ? 'Correct!'
                : 'Incorrect. The correct answer is: ' + 
                  activeTopic.mcQuestion.options.find(opt => opt.isCorrect)?.text}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Header with nav and progress bar */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform -rotate-1" />
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {step === 'quickcheck' ? 'Quick Check' : 'Understanding Camera Settings'}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {step === 'quickcheck' 
              ? `Test your knowledge about ${activeTopic.title}`
              : 'Learn how Composition, ISO, Aperture, and Shutter Speed work together to create the perfect shot'
            }
          </p>
          {/* Topic nav and progress bar with overlaid bubbles */}
          <div className="flex flex-col items-center space-y-2 mt-6 relative">
            {/* Topic nav bar */}
            <div className="flex justify-center space-x-4 w-full max-w-3xl relative z-0 mb-2">
              {topics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => handleNavTopic(index)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 text-center whitespace-nowrap
                    ${topicIndex === index && step !== 'quickcheck'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : quizCompleted || canAccessTopic(topic.id)
                      ? 'bg-white text-gray-600 hover:bg-gray-50 shadow'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'} text-base`}
                  disabled={!(quizCompleted || canAccessTopic(topic.id))}
                  style={{ minWidth: 120, justifyContent: 'center', alignItems: 'center', display: 'flex', lineHeight: 1.1 }}
                >
                  <span className="block w-full leading-tight truncate">{topic.title}</span>
                </button>
              ))}
            </div>
            {/* Progress bar with overlayed bubbles */}
            <div className="relative w-full max-w-3xl h-12 mb-2 flex flex-col items-center">
              {/* Progress bar */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 -translate-y-1/2 z-0"
                style={{ width: `${progress}%` }}
              />
              {/* Overlayed bubbles grouped by topic */}
              <div className="relative w-full flex justify-between z-10" style={{ pointerEvents: 'none' }}>
                {topics.map((topic, topicIdx) => {
                  const stepTypes = STEP_TYPES_MAP[topic.id] || STEP_TYPES_MAP.default;
                  // Find the first bubble's global index for this topic
                  const firstStepIdx = allSteps.findIndex(s => s.topicIndex === topicIdx);
                  // Center the group under the topic button
                  return (
                    <div key={topic.id} className="flex flex-col items-center flex-1" style={{ minWidth: 0 }}>
                      <div style={{ height: 0, marginBottom: 8 }} /> {/* Spacer to align with bar */}
                      <div className="flex space-x-2 justify-center" style={{ pointerEvents: 'auto' }}>
                        {stepTypes.map((step, i) => {
                          const globalIdx = firstStepIdx + i;
                          const isActive = stepIndex === globalIdx;
                          const isCompleted = completedSteps.has(globalIdx) || quizCompleted;
                          return (
                            <button
                              key={i}
                              onClick={() => (quizCompleted || allStepsCompleted) ? setStepIndex(globalIdx) : null}
                              disabled={!(quizCompleted || allStepsCompleted)}
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                                ${isActive ? 'bg-blue-500 text-white border-blue-700 scale-110 shadow-lg' : isCompleted ? 'bg-blue-200 text-blue-700 border-blue-400' : 'bg-gray-200 text-gray-400 border-gray-300'}
                                ${(quizCompleted || allStepsCompleted) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                              title={`${topic.title} - ${step.charAt(0).toUpperCase() + step.slice(1)}`}
                              style={{ marginLeft: i > 0 ? 8 : 0, marginRight: i < stepTypes.length - 1 ? 8 : 0 }}
                            >
                              {i + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-1 opacity-10" />
        <div className="relative bg-white rounded-3xl p-8 shadow-xl">
          {stepContent}
        </div>
      </div>

      {/* Navigation Buttons (now below content) */}
      <div className="flex justify-between max-w-2xl mx-auto mt-8">
        <button
          onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
          disabled={stepIndex === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 ${
            stepIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        {isLastStep ? (
          <a
            href="/quiz"
            className="px-8 py-3 rounded-lg font-bold transition-all transform bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 text-center"
          >
            Test Your Knowledge
          </a>
        ) : (
          <button
            onClick={handleNext}
            disabled={step === 'quickcheck' ? !quickCheckSubmitted : false}
            className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 bg-blue-500 text-white shadow-lg hover:bg-blue-600 ${step === 'quickcheck' && !quickCheckSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
} 