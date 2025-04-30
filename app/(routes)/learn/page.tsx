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
  },
];

export default function LearnPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [showTip, setShowTip] = useState<number | null>(null);

  return (
    <div className="space-y-12">
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
      <div className="flex justify-center space-x-4">
        {topics.map((topic, index) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopic(topic)}
            className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 ${
              activeTopic.id === topic.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }`}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-1 opacity-10" />
        <div className="relative bg-white rounded-3xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{activeTopic.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {activeTopic.description}
              </p>
              <div className="space-y-4">
                {activeTopic.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setShowTip(index)}
                    onMouseLeave={() => setShowTip(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transform group-hover:rotate-1 transition-transform" />
                    <div className="relative bg-white p-4 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{tip.icon}</span>
                        <p className="text-gray-700">{tip.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => {
                    const currentIndex = topics.findIndex(t => t.id === activeTopic.id);
                    if (currentIndex > 0) {
                      setActiveTopic(topics[currentIndex - 1]);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 ${
                    topics.findIndex(t => t.id === activeTopic.id) === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const currentIndex = topics.findIndex(t => t.id === activeTopic.id);
                    if (currentIndex < topics.length - 1) {
                      setActiveTopic(topics[currentIndex + 1]);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 ${
                    topics.findIndex(t => t.id === activeTopic.id) === topics.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
            <div>
              {activeTopic.id === 'aperture' ? (
                <ApertureSimulator />
              ) : activeTopic.id === 'iso' ? (
                <IsoSimulator />
              ) : activeTopic.id === 'shutter' ? (
                <ShutterSimulator />
              ) : (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={activeTopic.imagePath}
                    alt={`${activeTopic.title} example`}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/quiz"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group"
        >
          Test Your Knowledge
          <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
} 