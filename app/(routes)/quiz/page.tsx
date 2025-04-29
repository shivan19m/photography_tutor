'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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

  const checkAnswer = () => {
    const tolerance = 0.2; // 20% tolerance
    const targetSettings = quizQuestions[currentQuestion].targetSettings;
    
    const isWithinTolerance = (actual: number, expected: number) => 
      Math.abs((actual - expected) / expected) <= tolerance;

    const results = {
      iso: isWithinTolerance(settings.iso, targetSettings.iso),
      aperture: isWithinTolerance(settings.aperture, targetSettings.aperture),
      shutterSpeed: isWithinTolerance(settings.shutterSpeed, targetSettings.shutterSpeed),
    };

    const allCorrect = Object.values(results).every(Boolean);
    setAttempts(prev => prev + 1);

    if (allCorrect) {
      setFeedback('Perfect match! ' + quizQuestions[currentQuestion].explanation);
      setIsCorrect(true);
      setScore(prev => prev + 1);
      setTimeout(() => {
        if (currentQuestion === quizQuestions.length - 1) {
          setIsComplete(true);
        } else {
          nextQuestion();
        }
      }, 3000);
    } else if (attempts >= 1) {
      setFeedback('Not quite right. ' + quizQuestions[currentQuestion].explanation);
      setTimeout(() => {
        if (currentQuestion === quizQuestions.length - 1) {
          setIsComplete(true);
        } else {
          nextQuestion();
        }
      }, 3000);
    } else {
      const incorrect = Object.entries(results)
        .filter(([_, isCorrect]) => !isCorrect)
        .map(([setting]) => setting)
        .join(', ');
      setFeedback(`Try adjusting your ${incorrect}. One more attempt!`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAttempts(0);
      setFeedback('');
      setIsCorrect(false);
      setSettings({
        iso: 100,
        aperture: 1.4,
        shutterSpeed: 60,
      });
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900">Quiz Complete!</h2>
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              You scored {score} out of {quizQuestions.length}
            </p>
            <p className="text-gray-500">
              {score === quizQuestions.length 
                ? 'Perfect score! You\'re a photography master!' 
                : 'Keep practicing to improve your camera settings knowledge!'}
            </p>
            <div className="pt-4">
              <Link
                href="/learn"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Lessons
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Match the Image Settings</h1>
        <p className="text-white/80">
          Adjust the sliders to match the settings of the target image. You have 2 attempts.
        </p>
        <div className="text-sm text-white/70">
          Question {currentQuestion + 1} of {quizQuestions.length} | Attempts: {attempts}/2 | Score: {score}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left side: Your image and controls */}
        <div className="space-y-4">
          {/* Your adjustable image */}
          <div className="space-y-2">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={quizQuestions[currentQuestion].baseImage}
                alt="Your image"
                fill
                className="object-cover"
                style={getImageEffects(settings)}
              />
            </div>
            <p className="text-center font-medium text-white">Your Image</p>
          </div>

          {/* Settings Controls */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 shadow-lg space-y-3">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white">ISO</label>
                <input
                  type="range"
                  min={100}
                  max={3200}
                  value={settings.iso}
                  onChange={(e) => setSettings({ ...settings, iso: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  step={100}
                />
                <div className="flex justify-between text-sm text-white/80">
                  <span>100</span>
                  <span>{formatISO(settings.iso)}</span>
                  <span>3200</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-white">Aperture</label>
                <input
                  type="range"
                  min={1.4}
                  max={16}
                  value={settings.aperture}
                  onChange={(e) => setSettings({ ...settings, aperture: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  step={0.1}
                />
                <div className="flex justify-between text-sm text-white/80">
                  <span>f/1.4</span>
                  <span>{formatAperture(settings.aperture)}</span>
                  <span>f/16</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-white">Shutter Speed</label>
                <input
                  type="range"
                  min={15}
                  max={4000}
                  value={settings.shutterSpeed}
                  onChange={(e) => setSettings({ ...settings, shutterSpeed: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  step={15}
                />
                <div className="flex justify-between text-sm text-white/80">
                  <span>1/15</span>
                  <span>{formatShutterSpeed(settings.shutterSpeed)}</span>
                  <span>1/4000</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 pt-1">
              {feedback && (
                <p className={`text-sm font-medium ${isCorrect ? 'text-green-400' : 'text-blue-400'}`}>
                  {feedback}
                </p>
              )}
              <button
                onClick={checkAnswer}
                disabled={isCorrect}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Check Settings
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Target image */}
        <div className="space-y-2">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={quizQuestions[currentQuestion].baseImage}
              alt="Target image"
              fill
              className="object-cover"
              style={getImageEffects(quizQuestions[currentQuestion].targetSettings)}
            />
          </div>
          <p className="text-center font-medium text-white">Target Image</p>
        </div>
      </div>
    </div>
  );
}