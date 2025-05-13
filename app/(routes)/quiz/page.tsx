'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ShutterSimulator from '@/components/ShutterSimulator';

// Sample quiz questions (you'll need to add your own images)
const quizQuestions = [
  {
    id: 1,
    baseImage: '/images/low-light.jpg',
    targetSettings: {
      iso: 1600,
      aperture: 2.8,
      shutterSpeed: 60,
    },
    explanation: 'Low light scenario: Higher ISO needed to brighten the image while maintaining a reasonable shutter speed.',
  },
  {
    id: 2,
    baseImage: '/images/portrait.jpg',
    targetSettings: {
      iso: 100,
      aperture: 1.8,
      shutterSpeed: 250,
    },
    explanation: 'Portrait photography: Wide aperture (f/1.8) for shallow depth of field, low ISO for clean image quality.',
  },
  {
    id: 3,
    baseImage: '/images/sports.jpg',
    targetSettings: {
      iso: 400,
      aperture: 4.0,
      shutterSpeed: 1000,
    },
    explanation: 'Sports/Action: Fast shutter speed to freeze motion, moderate aperture for sufficient depth of field.',
  },
  {
    id: 4,
    baseImage: '/images/macro.jpg',
    targetSettings: {
      iso: 200,
      aperture: 8.0,
      shutterSpeed: 250,
    },
    explanation: 'Macro photography: Medium aperture for adequate depth of field on close subjects.',
  },
  {
    id: 5,
    baseImage: '/images/waterfall.jpg',
    targetSettings: {
      iso: 100,
      aperture: 16.0,
      shutterSpeed: 15,
    },
    explanation: 'Waterfall long exposure: Low ISO and small aperture to allow for slow shutter speed motion blur.',
  },
  {
    id: 6,
    baseImage: '/images/hero-image.jpg',
    targetSettings: {
      iso: 200,
      aperture: 5.6,
      shutterSpeed: 125,
    },
    explanation: 'General photography: Balanced settings for a well-exposed image with good depth of field.',
  }
];

const scenarioQuestions = [
  {
    id: 1,
    question: "You're in a dimly lit room and want to photograph a moving subject. What should you adjust?",
    options: [
      { text: "Lower ISO, narrow aperture", isCorrect: false },
      { text: "Raise ISO, open the aperture", isCorrect: true },
      { text: "Use a slow shutter speed", isCorrect: false },
      { text: "Lower ISO, slow shutter speed", isCorrect: false }
    ],
    explanation: "In low light with moving subjects, you need both higher ISO for brightness and a wider aperture to let in more light while maintaining a reasonable shutter speed."
  },
  {
    id: 2,
    question: "You're photographing a landscape and want everything in focus. Which aperture should you use?",
    options: [
      { text: "f/1.8", isCorrect: false },
      { text: "f/2.8", isCorrect: false },
      { text: "f/11", isCorrect: true },
      { text: "f/2.0", isCorrect: false }
    ],
    explanation: "A smaller aperture (higher f-number) like f/11 provides a deeper depth of field, keeping both foreground and background in focus."
  },
  {
    id: 3,
    question: "You're taking a portrait and want the background to be blurry. What setting helps?",
    options: [
      { text: "High ISO", isCorrect: false },
      { text: "Wide aperture (e.g., f/1.8)", isCorrect: true },
      { text: "Small aperture (e.g., f/16)", isCorrect: false },
      { text: "Fast shutter speed", isCorrect: false }
    ],
    explanation: "A wide aperture (small f-number) creates a shallow depth of field, making the background blurry while keeping the subject sharp."
  },
  {
    id: 4,
    question: "You're shooting outside on a bright day and your photos look too bright. What should you do?",
    options: [
      { text: "Lower the ISO", isCorrect: true },
      { text: "Increase ISO", isCorrect: false },
      { text: "Use a wider aperture", isCorrect: false },
      { text: "Slow down the shutter speed", isCorrect: false }
    ],
    explanation: "Lowering the ISO reduces the sensor's sensitivity to light, helping to prevent overexposure in bright conditions."
  },
  {
    id: 5,
    question: "You're shooting a night scene with a tripod and want the cleanest image. What settings are best?",
    options: [
      { text: "High ISO, wide aperture, fast shutter", isCorrect: false },
      { text: "Low ISO, small aperture, long shutter", isCorrect: true },
      { text: "High ISO, fast shutter, small aperture", isCorrect: false },
      { text: "Wide aperture, fast shutter, low ISO", isCorrect: false }
    ],
    explanation: "With a tripod, you can use low ISO for clean images, small aperture for depth of field, and long shutter speed for proper exposure."
  },
  {
    id: 6,
    question: "You're photographing sports action in daylight. What's the best shutter speed?",
    options: [
      { text: "1/30s", isCorrect: false },
      { text: "1/100s", isCorrect: false },
      { text: "1/1000s", isCorrect: true },
      { text: "2 seconds", isCorrect: false }
    ],
    explanation: "A fast shutter speed like 1/1000s is needed to freeze fast-moving action in sports photography."
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [settings, setSettings] = useState({
    iso: 100,
    aperture: 1.4,
    shutterSpeed: 60,
  });
  const [tempSettings, setTempSettings] = useState({
    iso: 100,
    aperture: 1.4,
    shutterSpeed: 60,
  });
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const formatAperture = (value: number) => `f/${value.toFixed(1)}`;
  const formatShutterSpeed = (value: number) => `1/${value}`;
  const formatISO = (value: number) => `${value}`;

  // Calculate visual effects based on camera settings
  const getImageEffects = (imageSettings: typeof settings) => {
    const isoBrightness = Math.log2(imageSettings.iso / 100) * 0.5 + 1; // Logarithmic brightness
    const apertureBlur = Math.max(0, (1 / imageSettings.aperture) * 3); // More blur for wider apertures
    const motionBlur = Math.max(0, (1 / imageSettings.shutterSpeed) * 15); // Motion blur for slow shutter

    return {
      filter: `
        brightness(${isoBrightness})
        blur(${apertureBlur}px)
      `,
      transform: `scale(1.02)`,
      transition: 'filter 0.3s ease-out',
    };
  };

  const handleSettingsChange = (setting: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setTempSettings(prev => ({
        ...prev,
        [setting]: numValue
      }));
      setIsCorrect(false);
    }
  };

  const applySettings = () => {
    setSettings(tempSettings);
    setIsCorrect(false);
    setFeedback('');
  };

  const checkAnswer = () => {
    if (isChecking) return; // Prevent multiple clicks
    setIsChecking(true);
    setSettings(tempSettings); // Apply the settings when checking

    const targetSettings = quizQuestions[currentQuestion].targetSettings;
    
    // Define the ranges for each setting
    const ranges = {
      iso: {
        min: 100,
        max: 3200,
        tolerance: (3200 - 100) * 0.1 // 10% of full range
      },
      aperture: {
        min: 1.4,
        max: 16,
        tolerance: (16 - 1.4) * 0.1 // 10% of full range
      },
      shutterSpeed: {
        min: 15,
        max: 4000,
        tolerance: (4000 - 15) * 0.1 // 10% of full range
      }
    };

    // Check if value is within tolerance of target
    const isWithinTolerance = (actual: number, expected: number, settingName: keyof typeof ranges) => {
      const range = ranges[settingName];
      const tolerance = range.tolerance;
      return Math.abs(actual - expected) <= tolerance;
    };

    const results = {
      iso: isWithinTolerance(tempSettings.iso, targetSettings.iso, 'iso'),
      aperture: isWithinTolerance(tempSettings.aperture, targetSettings.aperture, 'aperture'),
      shutterSpeed: isWithinTolerance(tempSettings.shutterSpeed, targetSettings.shutterSpeed, 'shutterSpeed'),
    };

    const allCorrect = Object.values(results).every(Boolean);
    setAttempts(prev => prev + 1);
    if (allCorrect) {
      setFeedback('Perfect match! ' + quizQuestions[currentQuestion].explanation);
      setIsCorrect(true);
      setScore(prev => prev + 1);
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length + scenarioQuestions.length - 1) {
          nextQuestion();
        } else {
          setIsComplete(true);
        }
      }, 3000);
    } else if (attempts >= 1) {
      const incorrectSettings = Object.entries(results)
        .filter(([_, isCorrect]) => !isCorrect)
        .map(([setting]) => {
          const actual = tempSettings[setting as keyof typeof tempSettings];
          const expected = targetSettings[setting as keyof typeof targetSettings];
          return `${setting}: ${actual} (target: ${expected})`;
        })
        .join(', ');
      let feedbackMsg = `Not quite right. Your settings: ${incorrectSettings}. ${quizQuestions[currentQuestion].explanation}`;
      
      setFeedback(feedbackMsg);
      setIsChecking(false); // Reset checking state after feedback
    } else {
      const incorrect = Object.entries(results)
        .filter(([_, isCorrect]) => !isCorrect)
        .map(([setting]) => setting)
        .join(', ');
      setFeedback(`Try adjusting your ${incorrect}. One more attempt!`);
      setIsChecking(false);
    }
  };

  const handleScenarioAnswer = (questionIndex: number, optionIndex: number) => {
    if (isChecking) return; // Prevent multiple clicks
    
    setIsChecking(true);
    setSelectedAnswer(optionIndex);
    const question = scenarioQuestions[questionIndex];
    const isCorrect = question.options[optionIndex].isCorrect;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback('Correct! ' + question.explanation);
      setIsCorrect(true);
    } else {
      const correctOption = question.options.findIndex(opt => opt.isCorrect);
      setFeedback(`Incorrect. The correct answer is: ${question.options[correctOption].text}. ${question.explanation}`);
      setIsCorrect(false);
    }
    setShowFeedback(true);
    setIsChecking(false);
  };

  const handleContinue = () => {
    if (isChecking) return; // Prevent continue if still checking
    
    if (currentQuestion < quizQuestions.length + scenarioQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedback('');
      setIsChecking(false);
      setShowFeedback(false);
      setAttempts(0); // Reset attempts for next question
      setIsCorrect(false);
      const defaultSettings = {
        iso: 100,
        aperture: 1.4,
        shutterSpeed: 60,
      };
      setSettings(defaultSettings);
      setTempSettings(defaultSettings);
    } else {
      setIsComplete(true);
    }
  };

  const nextQuestion = () => {
    if (isChecking) return; // Prevent next question if still checking
    
    setCurrentQuestion(prev => prev + 1);
    setAttempts(0);
    setFeedback('');
    setIsCorrect(false);
    const defaultSettings = {
      iso: 100,
      aperture: 1.4,
      shutterSpeed: 60,
    };
    setSettings(defaultSettings);
    setTempSettings(defaultSettings);
    setIsChecking(false);
  };

  // --- NEW: Progress calculation ---
  const totalQuestions = quizQuestions.length + scenarioQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // --- NEW: Noise overlay for ISO simulation ---
  const getNoiseOverlay = (iso: number) => {
    const minIso = 100;
    const maxIso = 3200;
    const noiseAmount = Math.min(1, Math.max(0, (iso - minIso) / (maxIso - minIso)));
    if (noiseAmount < 0.1) return null;
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: noiseAmount,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    );
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900">Quiz Complete!</h2>
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              You scored {score} out of {quizQuestions.length + scenarioQuestions.length}
            </p>
            <p className="text-gray-500">
              {score === quizQuestions.length + scenarioQuestions.length 
                ? 'Perfect score! You\'re a photography master!' 
                : 'Keep practicing to improve your camera settings knowledge!'}
            </p>
            <div className="pt-4 space-y-4">
              <Link
                href="/playground"
                className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-colors shadow-md hover:shadow-lg"
              >
                Try the Playground
              </Link>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setIsComplete(false);
                  setAttempts(0);
                  setFeedback('');
                  setIsCorrect(false);
                  setSelectedAnswer(null);
                  setIsChecking(false);
                  setShowFeedback(false);
                  setSettings({
                    iso: 100,
                    aperture: 1.4,
                    shutterSpeed: 60,
                  });
                  setTempSettings({
                    iso: 100,
                    aperture: 1.4,
                    shutterSpeed: 60,
                  });
                }}
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Retake Quiz
              </button>
              <Link
                href="/learn"
                className="block w-full px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors shadow-md hover:shadow-lg"
              >
                Back to Lessons
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isScenarioQuestion = currentQuestion >= quizQuestions.length;
  const currentScenarioIndex = currentQuestion - quizQuestions.length;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Photography Quiz</h1>
        <p className="text-white/80">
          {isScenarioQuestion ? 'Test your knowledge with real-world scenarios' : 'Match the image settings'}
        </p>
      </div>

      {isScenarioQuestion ? (
        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {scenarioQuestions[currentScenarioIndex].question}
            </h2>
            <div className="space-y-3">
              {scenarioQuestions[currentScenarioIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  disabled={showFeedback || isChecking}
                  className={`w-full p-4 text-left rounded-lg transition-all border-2 ${
                    selectedAnswer === index
                      ? showFeedback
                        ? option.isCorrect
                          ? 'bg-green-50 border-green-500 text-green-900'
                          : 'bg-red-50 border-red-500 text-red-900'
                        : 'bg-blue-50 border-blue-500 text-blue-900'
                      : 'bg-gray-50 border-transparent hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-medium text-gray-500">{String.fromCharCode(65 + index)}.</span>
                    <p className="text-base">{option.text}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              {!showFeedback && (
                <button
                  onClick={() => handleScenarioAnswer(currentScenarioIndex, selectedAnswer!)}
                  disabled={selectedAnswer === null || isChecking}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              )}
              {showFeedback && (
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
            {showFeedback && (
              <div className={`p-4 rounded-lg w-full ${
                selectedAnswer !== null && scenarioQuestions[currentScenarioIndex].options[selectedAnswer].isCorrect 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                <p className="text-sm font-medium">{feedback}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left side: Your image and controls */}
          <div className="space-y-4 flex flex-col h-full justify-center">
            {/* Your adjustable image */}
            <div className="space-y-2">
              <div
                style={{
                  filter: `brightness(${Math.log2(settings.iso / 100) * 0.5 + 1}) blur(${Math.max(0, (1 / settings.aperture) * 3)}px)`
                }}
              >
                <ShutterSimulator
                  imageSrc={quizQuestions[currentQuestion].baseImage}
                  shutterSpeed={settings.shutterSpeed}
                  onShutterSpeedChange={value => handleSettingsChange('shutterSpeed', value.toString())}
                  hideHeaderAndSlider={true}
                  hideAnnotations={true}
                />
              </div>
              <p className="text-center font-medium text-white">Your Image</p>
            </div>

            {/* Settings Controls - improved UI */}
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              {/* ISO */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
                  ISO
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">100</span>
                  <input
                    type="range"
                    min={100}
                    max={3200}
                    value={tempSettings.iso}
                    onChange={(e) => handleSettingsChange('iso', e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    step={100}
                  />
                  <span className="text-xs text-gray-400">3200</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold min-w-[40px] text-center">{formatISO(tempSettings.iso)}</span>
                </div>
              </div>
              {/* Aperture */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /></svg>
                  Aperture
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">f/1.4</span>
                  <input
                    type="range"
                    min={1.4}
                    max={16}
                    value={tempSettings.aperture}
                    onChange={(e) => handleSettingsChange('aperture', e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    step={0.1}
                  />
                  <span className="text-xs text-gray-400">f/16</span>
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold min-w-[40px] text-center">{formatAperture(tempSettings.aperture)}</span>
                </div>
              </div>
              {/* Shutter Speed */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Shutter Speed
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">1/15</span>
                  <input
                    type="range"
                    min={15}
                    max={4000}
                    value={tempSettings.shutterSpeed}
                    onChange={(e) => handleSettingsChange('shutterSpeed', e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                    step={15}
                  />
                  <span className="text-xs text-gray-400">1/4000</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold min-w-[40px] text-center">{formatShutterSpeed(tempSettings.shutterSpeed)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Target image and Check Settings button, top-aligned */}
          <div className="flex flex-col md:h-full">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black w-full">
              <Image
                src={quizQuestions[currentQuestion].baseImage}
                alt="Target image"
                fill
                className="object-cover"
                style={getImageEffects(quizQuestions[currentQuestion].targetSettings)}
              />
            </div>
            <p className="text-center font-medium text-white mb-6">Target Image</p>
            <div className="w-full flex flex-col items-center mt-0 md:mt-0" style={{ minHeight: 0 }}>
              {(!isCorrect && attempts < 2) && (
                <>
                  <button
                    onClick={applySettings}
                    className="w-full max-w-xs px-8 py-3 mb-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-gray-600 hover:to-gray-700 hover:shadow-xl transition-all"
                  >
                    Preview Changes
                  </button>
                  <button
                    onClick={checkAnswer}
                    className={`w-full max-w-xs px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${feedback && !isCorrect ? 'animate-shake' : ''}`}
                  >
                    Check Settings
                  </button>
                </>
              )}
              {((!isCorrect && attempts >= 2) || isCorrect) && (
                <button
                  onClick={nextQuestion}
                  className={`w-full max-w-xs px-8 py-3 bg-gradient-to-r ${isCorrect ? 'from-green-500 to-blue-500' : 'from-gray-400 to-gray-600'} text-white rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-blue-600 hover:shadow-xl transition-all`}
                >
                  Continue
                </button>
              )}
              {feedback && (
                <div className={`mt-4 w-full max-w-xs p-3 rounded-lg font-semibold text-center shadow ${isCorrect ? 'bg-green-100 text-green-700' : (attempts >= 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700')}`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}