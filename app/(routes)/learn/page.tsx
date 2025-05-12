'use client';

import { useState } from 'react';
import Image from 'next/image';
import ApertureSimulator from '@/components/ApertureSimulator';
import IsoSimulator from '@/components/IsoSimulator';
import ShutterSimulator from '@/components/ShutterSimulator';

const topics = [
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
        title: 'Low ISO Example',
        description: 'Notice how the image maintains excellent quality with minimal noise. This is ideal for well-lit scenes.',
        settings: 'ISO 100, f/8, 1/125s'
      },
      {
        title: 'High ISO Example',
        description: 'The image is brighter but shows more noise/grain. This is a trade-off we make in low-light situations.',
        settings: 'ISO 3200, f/4, 1/60s'
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
        iso: "3200–6400 – High ISO to capture enough light from stars in a dark environment.",
        shutterSpeed: "15–25 seconds – Long exposure to gather light, but short enough to avoid significant star trailing.",
        aperture: "f/2.8 or wider (e.g., f/1.8) – A wide aperture to let in as much light as possible."
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
        title: 'Wide Aperture Example',
        description: 'Notice the beautiful background blur (bokeh) effect. The subject is sharp while the background is soft.',
        settings: 'f/1.8, ISO 100, 1/250s'
      },
      {
        title: 'Narrow Aperture Example',
        description: 'Everything from foreground to background is in focus, perfect for landscape photography.',
        settings: 'f/16, ISO 100, 1/30s'
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
        aperture: "f/11 or higher – A small aperture was used to achieve a deep depth of field so the entire scene is sharp.",
        shutterSpeed: "1/125s to 1/250s – Fast enough to avoid motion blur in daylight, especially since there's no visible motion.",
        iso: "100 – Plenty of light, so a low ISO for clean, noise-free image quality."
      }
    }
  },
  {
    id: 'shutter',
    title: 'Shutter Speed',
    description: 'Shutter speed determines how long your camera\'s sensor is exposed to light. Faster speeds freeze motion, while slower speeds can create artistic blur effects.',
    tips: [
      { text: 'Fast (1/1000+): Sports and action', icon: '🏃‍♂️' },
      { text: 'Medium (1/125-1/250): General use', icon: '🌳' },
      { text: 'Slow (1/60 or slower): Low light/motion blur', icon: '💫' },
    ],
    imagePath: '/images/shutter-example.jpg',
    examples: [
      {
        title: 'Fast Shutter Example',
        description: 'The water droplets are frozen in mid-air, capturing the exact moment of the splash.',
        settings: '1/1000s, f/5.6, ISO 400'
      },
      {
        title: 'Slow Shutter Example',
        description: 'The water appears silky smooth, creating an artistic long-exposure effect.',
        settings: '1/4s, f/16, ISO 100'
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
        shutterSpeed: "1 to 4 seconds (or longer) – A long shutter speed to blur the motion of water.",
        aperture: "f/8 to f/16 – Narrow aperture to reduce light for a longer exposure, and ensure more of the scene is in focus.",
        iso: "100 or 200 – Low ISO to minimize noise during the long exposure and to prevent overexposure."
      }
    }
  },
];

export default function LearnPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [showTip, setShowTip] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [visitedTopics, setVisitedTopics] = useState<Set<string>>(new Set());

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    const currentIndex = topics.findIndex(t => t.id === activeTopic.id);
    if (currentIndex < topics.length - 1) {
      const nextTopic = topics[currentIndex + 1];
      setActiveTopic(nextTopic);
      setVisitedTopics(prev => new Set([...prev, activeTopic.id]));
      setSelectedAnswer(null);
      setShowFeedback(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    const currentIndex = topics.findIndex(t => t.id === activeTopic.id);
    if (currentIndex > 0) {
      setActiveTopic(topics[currentIndex - 1]);
      setSelectedAnswer(null);
      setShowFeedback(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canAccessTopic = (topicId: string) => {
    const topicIndex = topics.findIndex(t => t.id === topicId);
    if (topicIndex === 0) return true; // ISO is always accessible
    const previousTopic = topics[topicIndex - 1];
    return visitedTopics.has(previousTopic.id);
  };

  const allTopicsVisited = visitedTopics.size === topics.length;

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform -rotate-1" />
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">Understanding Camera Settings</h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn how ISO, Aperture, and Shutter Speed work together to create the perfect shot
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex justify-center space-x-4 w-full max-w-lg">
          {topics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => {
                if (canAccessTopic(topic.id)) {
                  setActiveTopic(topic);
                  setVisitedTopics(prev => new Set([...prev, topic.id]));
                  setSelectedAnswer(null);
                  setShowFeedback(false);
                }
              }}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 ${
                activeTopic.id === topic.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : canAccessTopic(topic.id)
                  ? 'bg-white text-gray-600 hover:bg-gray-50 shadow'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!canAccessTopic(topic.id)}
              style={{ minWidth: 0 }}
            >
              {topic.title}
            </button>
          ))}
        </div>
        {/* Progress bar directly under nav bar */}
        <div className="relative w-full max-w-lg h-1 mt-1">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-full" />
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${(topics.findIndex(t => t.id === activeTopic.id) / (topics.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-1 opacity-10" />
        <div className="relative bg-white rounded-3xl p-8 shadow-xl">
          <div className="space-y-12">
            {/* Main Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeTopic.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {activeTopic.description}
                </p>
              </div>

              {/* Tips and Simulator Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tips */}
                <div className="space-y-4 flex flex-col justify-center w-full">
                  {activeTopic.tips.map((tip, index) => {
                    // Parse tip text: 'Phrase (Range): Description'
                    const match = tip.text.match(/^(.*?) \((.*?)\): (.*)$/);
                    const phrase = match ? match[1] : tip.text;
                    const range = match ? match[2] : '';
                    const description = match ? match[3] : '';
                    return (
                      <div
                        key={index}
                        className="flex items-start w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 min-h-[72px]"
                      >
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

                {/* Simulator */}
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  {activeTopic.id === 'aperture' ? (
                    <ApertureSimulator />
                  ) : activeTopic.id === 'iso' ? (
                    <IsoSimulator />
                  ) : activeTopic.id === 'shutter' ? (
                    <ShutterSimulator 
                      imageSrc={activeTopic.imagePath}
                      shutterSpeed={250}
                      onShutterSpeedChange={() => {}}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* Examples and Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
              {/* Example Image */}
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
              </div>

              {/* Examples Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">Practical Examples</h3>
                {activeTopic.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 space-y-3">
                    <h4 className="font-medium text-gray-900 text-lg">{example.title}</h4>
                    <p className="text-gray-600">{example.description}</p>
                    <p className="text-sm text-gray-500 font-mono bg-gray-100 p-2 rounded">{example.settings}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MC Question */}
            <div className="max-w-2xl mx-auto mt-16 bg-white rounded-xl p-8 shadow-lg space-y-6">
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
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <button
          onClick={handlePrevious}
          disabled={topics.findIndex(t => t.id === activeTopic.id) === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 ${
            topics.findIndex(t => t.id === activeTopic.id) === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        {topics.findIndex(t => t.id === activeTopic.id) === topics.length - 1 ? (
          <a
            href="/quiz"
            className="px-8 py-3 rounded-lg font-bold transition-all transform bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 text-center"
          >
            Test Your Knowledge
          </a>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 bg-blue-500 text-white shadow-lg hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>

      {/* CTA */}
      {topics.findIndex(t => t.id === activeTopic.id) !== topics.length - 1 && (
        <div className="text-center">
          <a
            href={allTopicsVisited ? "/quiz" : "#"}
            className={`inline-flex items-center px-8 py-4 ${
              allTopicsVisited 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all group'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } rounded-xl shadow-lg`}
          >
            Test Your Knowledge
            {allTopicsVisited && (
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </a>
          {!allTopicsVisited && (
            <p className="mt-2 text-sm text-gray-500">Complete all lessons to access the quiz</p>
          )}
        </div>
      )}
    </div>
  );
} 