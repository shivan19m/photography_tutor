import React, { useState } from 'react';
import Image from 'next/image';

interface CompositionSimulatorProps {
  imageSrc: string;
  stencilSrc: string;
  alt?: string;
}

const CompositionSimulator: React.FC<CompositionSimulatorProps> = ({ imageSrc, stencilSrc, alt }) => {
  const [showStencil, setShowStencil] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-black">
      <Image
        src={imageSrc}
        alt={alt || 'Composition example'}
        fill
        className="object-cover"
        priority
      />
      {showStencil && (
        <Image
          src={stencilSrc}
          alt="Composition lines overlay"
          fill
          className="object-cover pointer-events-none opacity-90 transition-opacity duration-300"
          style={{ zIndex: 10 }}
        />
      )}
      <button
        onClick={() => setShowStencil((v) => !v)}
        className="absolute bottom-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        {showStencil ? 'Hide Lines' : 'Show Lines'}
      </button>
    </div>
  );
};

export default CompositionSimulator; 