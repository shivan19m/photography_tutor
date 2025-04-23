'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const quizQuestions = [
  {
    id: 1,
    startingImage: '/images/iso-dark.jpg',
    targetImage: '/images/iso-bright.jpg',
    correctSettings: {
      iso: 1600,
      aperture: 2.8,
      shutterSpeed: 60,
    },
    explanation: 'In low light conditions, increasing ISO helps brighten the image at the cost of some noise.',
    focusOn: 'iso',
  },
  {
    id: 2,
    startingImage: '/images/aperture-sharp.jpg',
    targetImage: '/images/aperture-blur.jpg',
    correctSettings: {
      iso: 400,
      aperture: 1.8,
      shutterSpeed: 125,
    },
    explanation: 'A wider aperture (smaller f-number) creates a shallower depth of field, blurring the background.',
    focusOn: 'aperture',
  },
  {
    id: 3,
    startingImage: '/images/shutter-blur.jpg',
    targetImage: '/images/shutter-sharp.jpg',
    correctSettings: {
      iso: 400,
      aperture: 5.6,
      shutterSpeed: 500,
    },
    explanation: 'Faster shutter speeds freeze motion, while slower speeds create motion blur.',
    focusOn: 'shutterSpeed',
  },
];

function SettingSlider({
  label,
  value,
  onChange,
  min,
  max,
  formatValue = (v: number) => v.toString(),
  isFocused = false,
  icon,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  formatValue?: (value: number) => string;
  isFocused?: boolean;
  icon?: string;
}) {
  return (
    <div className={`w-full transition-all ${isFocused ? 'scale-105' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-xl">{icon}</span>}
          <label className={`text-sm font-medium ${isFocused ? 'text-blue-600' : 'text-gray-700'}`}>
            {label}
            {isFocused && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Focus on this
              </span>
            )}
          </label>
        </div>
        <span className={`text-sm font-mono ${isFocused ? 'text-blue-600' : 'text-gray-500'}`}>
          {formatValue(value)}
        </span>
      </div>
      <div className="relative">
        <div 
          className="absolute -inset-4 bg-blue-50 rounded-xl opacity-0 transition-opacity duration-300 -z-10"
          style={{ opacity: isFocused ? 0.5 : 0 }} 
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer
            ${isFocused 
              ? 'bg-gradient-to-r from-blue-300 to-blue-500'
              : 'bg-gray-200'}`}
          step={(max - min) / 100}
        />
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [settings, setSettings] = useState({
    iso: 100,
    aperture: 1.4,
    shutterSpeed: 2,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState(false);

  const formatAperture = (value: number) => `f/${value.toFixed(1)}`;
  const formatShutterSpeed = (value: number) => `1/${value}`;
  const formatISO = (value: number) => `${value}`;

  const checkAnswer = () => {
    const tolerance = 0.1;
    const isCorrect = (actual: number, expected: number) => 
      Math.abs((actual - expected) / expected) <= tolerance;

    const results = {
      iso: isCorrect(settings.iso, quizQuestions[currentQuestion].correctSettings.iso),
      aperture: isCorrect(settings.aperture, quizQuestions[currentQuestion].correctSettings.aperture),
      shutterSpeed: isCorrect(settings.shutterSpeed, quizQuestions[currentQuestion].correctSettings.shutterSpeed),
    };

    const allCorrect = Object.values(results).every(Boolean);
    if (allCorrect) {
      setProgress(prev => ({ ...prev, [currentQuestion]: true }));
    }
    setShowFeedback(true);

    return results;
  };

  const progressPercentage = (Object.values(progress).filter(Boolean).length / quizQuestions.length) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Photography Settings Quiz</h1>
        <p className="text-gray-600">
          Adjust the settings to match the target image on the right
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Starting Image */}
        <div className="relative aspect-[3/4] group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform -rotate-1" />
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={quizQuestions[currentQuestion].startingImage}
              alt="Starting image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-medium text-lg">Starting Image</h3>
              <p className="text-sm text-white/80">Current settings applied</p>
            </div>
          </div>
        </div>

        {/* Target Image */}
        <div className="relative aspect-[3/4] group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl transform rotate-1" />
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={quizQuestions[currentQuestion].targetImage}
              alt="Target image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-medium text-lg">Target Image</h3>
              <p className="text-sm text-white/80">Try to match these settings</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings Controls */}
      <div className="space-y-6 bg-white rounded-2xl p-8 shadow-lg">
        <div className="space-y-4">
          <SettingSlider
            label="ISO"
            min={100}
            max={2100}
            value={settings.iso}
            onChange={(value) => setSettings({ ...settings, iso: value })}
            formatValue={formatISO}
            isFocused={quizQuestions[currentQuestion].focusOn === 'iso'}
            icon="📷"
          />
          <SettingSlider
            label="Aperture"
            min={1.4}
            max={22}
            value={settings.aperture}
            onChange={(value) => setSettings({ ...settings, aperture: value })}
            formatValue={formatAperture}
            isFocused={quizQuestions[currentQuestion].focusOn === 'aperture'}
            icon="🎯"
          />
          <SettingSlider
            label="Shutter Speed"
            min={2}
            max={500}
            value={settings.shutterSpeed}
            onChange={(value) => setSettings({ ...settings, shutterSpeed: value })}
            formatValue={formatShutterSpeed}
            isFocused={quizQuestions[currentQuestion].focusOn === 'shutterSpeed'}
            icon="⚡"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowHint(true)}
              className="px-6 py-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              Show Hint
            </button>
            <button
              onClick={checkAnswer}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Answer
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentQuestion(prev => Math.min(quizQuestions.length - 1, prev + 1));
              setShowFeedback(false);
              setShowHint(false);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            disabled={currentQuestion === quizQuestions.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {Object.values(checkAnswer()).every(Boolean) ? 'Great job! 🎉' : 'Keep trying! 💪'}
            </h3>
            <p className="text-gray-600">{quizQuestions[currentQuestion].explanation}</p>
            <button
              onClick={() => setShowFeedback(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Hint Modal */}
      {showHint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Hint 💡</h3>
            <p className="text-gray-600">
              Focus on adjusting the {quizQuestions[currentQuestion].focusOn} setting first.
              Look at the differences between the starting and target images for clues.
            </p>
            <button
              onClick={() => setShowHint(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 