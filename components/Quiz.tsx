import React, { useState } from 'react';
import Image from 'next/image';
import SettingSlider from './SettingSlider';

interface QuizProps {
  targetImage: string;
  startingImage: string;
  correctSettings: {
    iso: number;
    aperture: number;
    shutterSpeed: number;
  };
}

const Quiz: React.FC<QuizProps> = ({ targetImage, startingImage, correctSettings }) => {
  const [settings, setSettings] = useState({
    iso: 100,
    aperture: 1.4,
    shutterSpeed: 2,
  });

  const formatAperture = (value: number) => `f/${value.toFixed(1)}`;
  const formatShutterSpeed = (value: number) => `1/${value}`;
  const formatISO = (value: number) => `${value}`;

  const checkAnswer = () => {
    const tolerance = 0.1; // 10% tolerance for answers
    const isCorrect = (actual: number, expected: number) => 
      Math.abs((actual - expected) / expected) <= tolerance;

    return {
      iso: isCorrect(settings.iso, correctSettings.iso),
      aperture: isCorrect(settings.aperture, correctSettings.aperture),
      shutterSpeed: isCorrect(settings.shutterSpeed, correctSettings.shutterSpeed),
    };
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="relative aspect-[3/4]">
          <Image
            src={startingImage}
            alt="Starting image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="relative aspect-[3/4]">
          <Image
            src={targetImage}
            alt="Target image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <SettingSlider
          label="ISO"
          min={100}
          max={2100}
          value={settings.iso}
          onChange={(value) => setSettings({ ...settings, iso: value })}
          formatValue={formatISO}
        />
        <SettingSlider
          label="Aperture"
          min={1.4}
          max={22}
          value={settings.aperture}
          onChange={(value) => setSettings({ ...settings, aperture: value })}
          formatValue={formatAperture}
        />
        <SettingSlider
          label="Shutter Speed"
          min={2}
          max={500}
          value={settings.shutterSpeed}
          onChange={(value) => setSettings({ ...settings, shutterSpeed: value })}
          formatValue={formatShutterSpeed}
        />
      </div>
    </div>
  );
};

export default Quiz; 