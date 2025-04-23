import React, { useState } from 'react';
import Image from 'next/image';

interface ApertureSimulatorProps {
  className?: string;
}

const ApertureSimulator: React.FC<ApertureSimulatorProps> = ({ className = '' }) => {
  const [aperture, setAperture] = useState(10);

  // Map f-stops to standard values
  const fStops = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
  
  const getClosestAperture = (value: number) => {
    return fStops.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  };

  // Calculate blur amount based on aperture value
  const getBlurAmount = (apertureValue: number) => {
    // Convert aperture to blur pixels (f/1.4 = max blur, f/22 = no blur)
    const maxBlur = 8; // maximum blur in pixels
    const minAperture = 1.4;
    const maxAperture = 22;
    
    // Inverse relationship: smaller aperture = less blur
    const blurAmount = maxBlur * (1 - ((apertureValue - minAperture) / (maxAperture - minAperture)));
    return Math.max(0, blurAmount);
  };

  const handleApertureChange = (value: number) => {
    setAperture(value);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">Aperture Simulator</h3>
        <p className="text-gray-600">Play around with the aperture to see how it affects depth of field</p>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
        {/* Background (blurred) layer */}
        <div className="absolute inset-0 transition-all duration-300"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `blur(${getBlurAmount(aperture)}px)`,
            transform: 'scale(1.1)' // Prevent blur edges from showing
          }}
        />
        
        {/* Foreground (sharp) layer with mask */}
        <div className="absolute inset-0">
          <div className="absolute inset-[20%] z-10">
            <Image
              src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80"
              alt="Red tulips in a field - demonstrating depth of field"
              fill
              className="object-cover rounded-lg"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm opacity-80">Current Aperture</div>
                <div className="text-2xl font-bold">f/{getClosestAperture(aperture).toFixed(1)}</div>
              </div>
            </div>
            <div className="text-sm bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
              {aperture < 8 ? 'Shallow Depth of Field' : 'Deep Depth of Field'}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Wide Aperture</span>
          <span className="text-sm font-medium text-gray-600">Narrow Aperture</span>
        </div>
        <input
          type="range"
          min={1.4}
          max={22}
          step={0.1}
          value={aperture}
          onChange={(e) => handleApertureChange(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Blurred Background</span>
          <span>Everything in Focus</span>
        </div>
      </div>
    </div>
  );
};

export default ApertureSimulator; 