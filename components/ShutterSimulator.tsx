import React, { useState } from 'react';
import Image from 'next/image';

interface ShutterSimulatorProps {
  className?: string;
  imageSrc: string;
  shutterSpeed: number;
  onShutterSpeedChange: (value: number) => void;
  hideHeaderAndSlider?: boolean;
  hideAnnotations?: boolean;
}

const ShutterSimulator: React.FC<ShutterSimulatorProps> = ({ className = '', imageSrc, shutterSpeed, onShutterSpeedChange, hideHeaderAndSlider = false, hideAnnotations = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Standard shutter speed values (in fractions of a second)
  const shutterSpeeds = [2, 4, 8, 15, 30, 60, 125, 250, 500, 1000, 2000, 4000];
  
  const getClosestShutterSpeed = (value: number) => {
    return shutterSpeeds.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  };

  // Calculate motion blur based on shutter speed (logarithmic, realistic)
  const getBlurAmount = (speed: number) => {
    // Logarithmic mapping: slower shutter = more blur
    const minSpeed = 2;
    const maxSpeed = 4000;
    const minBlur = 0.8; // Increased base blur for higher speeds
    const maxBlur = 8; // px
    // Invert and log scale: slower = more blur
    // Use a more gradual logarithmic curve
    const normalized = Math.log10(maxSpeed / speed) / Math.log10(maxSpeed / minSpeed);
    // Add a small constant to ensure some blur at all speeds
    return minBlur + (maxBlur - minBlur) * Math.pow(normalized, 0.7); // Power of 0.7 makes the curve more gradual
  };

  // Calculate opacity for blur overlay (logarithmic, gradual)
  const getBlurOpacity = (speed: number) => {
    const minSpeed = 2;
    const maxSpeed = 4000;
    const minOpacity = 0.15; // Increased base opacity for higher speeds
    const maxOpacity = 0.5;
    // Use a more gradual logarithmic curve
    const normalized = Math.log10(maxSpeed / speed) / Math.log10(maxSpeed / minSpeed);
    // Add a small constant to ensure some opacity at all speeds
    return minOpacity + (maxOpacity - minOpacity) * Math.pow(normalized, 0.7); // Power of 0.7 makes the curve more gradual
  };

  const handleShutterChange = (value: number) => {
    onShutterSpeedChange(value);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {!hideHeaderAndSlider && (
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">Shutter Speed Simulator</h3>
          <p className="text-gray-600">Adjust shutter speed to see how it affects motion blur</p>
        </div>
      )}

      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
        {/* Base image */}
        <div className="absolute inset-0 transition-all duration-300"
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Motion blur overlay */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `blur(${getBlurAmount(shutterSpeed)}px)` ,
            opacity: getBlurOpacity(shutterSpeed),
          }}
        />
        
        {!hideAnnotations && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm opacity-80">Current Shutter Speed</div>
                  <div className="text-2xl font-bold">1/{getClosestShutterSpeed(shutterSpeed)}</div>
                </div>
              </div>
              <div className="text-sm bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                {shutterSpeed < 60 ? 'Motion Blur' : shutterSpeed < 250 ? 'Some Motion' : 'Frozen Action'}
              </div>
            </div>
          </div>
        )}
      </div>

      {!hideHeaderAndSlider && (
        <div className="space-y-4 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Slow Shutter</span>
            <span className="text-sm font-medium text-gray-600">Fast Shutter</span>
          </div>
          <input
            type="range"
            min={2}
            max={4000}
            step={1}
            value={shutterSpeed}
            onChange={(e) => handleShutterChange(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Motion Blur</span>
            <span>Frozen Action</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShutterSimulator; 