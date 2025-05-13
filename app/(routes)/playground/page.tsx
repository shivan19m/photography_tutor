'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ShutterSimulator from '@/components/ShutterSimulator';

export default function PlaygroundPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    iso: 100,
    aperture: 1.4,
    shutterSpeed: 60,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatAperture = (value: number) => `f/${value.toFixed(1)}`;
  const formatShutterSpeed = (value: number) => `1/${value}`;
  const formatISO = (value: number) => `${value}`;

  // Calculate visual effects based on camera settings
  const getImageEffects = (imageSettings: typeof settings) => {
    const isoBrightness = Math.log2(imageSettings.iso / 100) * 0.5 + 1; // Logarithmic brightness
    const apertureBlur = Math.max(0, (1 / imageSettings.aperture) * 3); // More blur for wider apertures
    const motionBlur = Math.max(0, (1 / imageSettings.shutterSpeed) * 15); // Motion blur for slow shutter

    return {
      filter: `brightness(${isoBrightness}) blur(${apertureBlur}px)`,
      transform: `scale(1.02)`,
      transition: 'filter 0.3s ease-out',
    };
  };

  const handleSettingsChange = (setting: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSettings(prev => ({
        ...prev,
        [setting]: numValue
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Photo Playground</h1>
        <p className="text-gray-700 dark:text-white/80">
          Upload your photos and experiment with different camera settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left side: Image upload and preview */}
        <div className="space-y-4">
          {selectedImage ? (
            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-black flex items-center justify-center min-h-[300px]">
                <div style={getImageEffects(settings)} className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={selectedImage}
                    alt="Uploaded image"
                    className="max-w-full max-h-[500px] object-contain"
                    style={{ margin: 'auto' }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="w-full py-2 text-gray-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div
              className="min-h-[300px] rounded-xl border-2 border-dashed border-gray-300 dark:border-white/30 flex items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-white/50 transition-colors bg-white dark:bg-black"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-2 p-8">
                <div className="w-12 h-12 mx-auto text-gray-400 dark:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-white/80">Drag & drop an image here or click to browse</p>
                  <p className="text-sm text-gray-500 dark:text-white/60 mt-1">Supports JPG, PNG files</p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </div>
          )}
        </div>

        {/* Right side: Settings controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-6 space-y-6">
            {/* ISO */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
                ISO
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-300">100</span>
                <input
                  type="range"
                  min={100}
                  max={3200}
                  value={settings.iso}
                  onChange={(e) => handleSettingsChange('iso', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  step={100}
                />
                <span className="text-xs text-gray-400 dark:text-gray-300">3200</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 text-blue-700 rounded-full text-xs font-semibold min-w-[40px] text-center">{formatISO(settings.iso)}</span>
              </div>
            </div>

            {/* Aperture */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /></svg>
                Aperture
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-300">f/1.4</span>
                <input
                  type="range"
                  min={1.4}
                  max={16}
                  value={settings.aperture}
                  onChange={(e) => handleSettingsChange('aperture', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  step={0.1}
                />
                <span className="text-xs text-gray-400 dark:text-gray-300">f/16</span>
                <span className="ml-2 px-2 py-1 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 text-purple-700 rounded-full text-xs font-semibold min-w-[40px] text-center">{formatAperture(settings.aperture)}</span>
              </div>
            </div>

            {/* Shutter Speed */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Shutter Speed
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-300">1/15</span>
                <input
                  type="range"
                  min={15}
                  max={4000}
                  value={settings.shutterSpeed}
                  onChange={(e) => handleSettingsChange('shutterSpeed', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  step={15}
                />
                <span className="text-xs text-gray-400 dark:text-gray-300">1/4000</span>
                <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 dark:text-green-200 text-green-700 rounded-full text-xs font-semibold min-w-[40px] text-center">{formatShutterSpeed(settings.shutterSpeed)}</span>
              </div>
            </div>
          </div>

          {!selectedImage && (
            <div className="bg-gray-100 dark:bg-white/10 rounded-xl p-6 text-gray-700 dark:text-white/80 text-center">
              Upload an image to see how different camera settings affect it
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 