import React, { useState } from 'react';
import Image from 'next/image';

interface IsoSimulatorProps {
  className?: string;
}

const IsoSimulator: React.FC<IsoSimulatorProps> = ({ className = '' }) => {
  const [iso, setIso] = useState(100);
  const [showNoise, setShowNoise] = useState(false);

  // Standard ISO values
  const isoValues = [100, 200, 400, 800, 1600, 3200, 6400];
  
  const getClosestIso = (value: number) => {
    return isoValues.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  };

  // Calculate brightness and noise based on ISO value
  const getBrightness = (isoValue: number) => {
    // Convert ISO to brightness (100 = 1, 6400 = 2.5)
    const minIso = 100;
    const maxIso = 6400;
    const minBrightness = 1;
    const maxBrightness = 2.5;
    
    return minBrightness + ((isoValue - minIso) / (maxIso - minIso)) * (maxBrightness - minBrightness);
  };

  const getNoiseAmount = (isoValue: number) => {
    // Convert ISO to noise (100 = 0, 6400 = 1)
    const minIso = 100;
    const maxIso = 6400;
    return Math.min(1, Math.max(0, (isoValue - minIso) / (maxIso - minIso)));
  };

  const handleIsoChange = (value: number) => {
    setIso(value);
    setShowNoise(value > 800);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">ISO Simulator</h3>
        <p className="text-gray-600">Adjust ISO to see how it affects image brightness and noise</p>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
        {/* Base image with brightness adjustment */}
        <div className="absolute inset-0 transition-all duration-300"
          style={{ 
            backgroundImage: 'url(/images/iso-example.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `brightness(${getBrightness(iso)})`,
          }}
        />
        
        {/* Noise overlay */}
        {showNoise && (
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.1)',
              backdropFilter: `contrast(${1 + getNoiseAmount(iso)}) brightness(${1 + getNoiseAmount(iso) * 0.2})`,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: getNoiseAmount(iso),
              mixBlendMode: 'overlay',
            }}
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm opacity-80">Current ISO</div>
                <div className="text-2xl font-bold">{getClosestIso(iso)}</div>
              </div>
            </div>
            <div className="text-sm bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
              {iso < 400 ? 'Low Noise' : iso < 1600 ? 'Moderate Noise' : 'High Noise'}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Low ISO</span>
          <span className="text-sm font-medium text-gray-600">High ISO</span>
        </div>
        <input
          type="range"
          min={100}
          max={6400}
          step={100}
          value={iso}
          onChange={(e) => handleIsoChange(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Less Bright, Less Noise</span>
          <span>More Bright, More Noise</span>
        </div>
      </div>
    </div>
  );
};

export default IsoSimulator; 