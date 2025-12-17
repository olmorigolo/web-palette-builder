
import React from 'react';
import { ColorInfo } from '../types';

interface GeometricShowcaseProps {
  colors: ColorInfo[];
}

const GeometricShowcase: React.FC<GeometricShowcaseProps> = ({ colors }) => {
  const getCol = (role: string) => colors.find(c => c.role === role)?.hex || '#ccc';

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundColor: getCol('background') }}></div>
      
      <svg viewBox="0 0 800 450" className="w-full h-full">
        {/* Abstract Background Elements */}
        <rect x="0" y="0" width="800" height="450" fill={getCol('background')} />
        
        {/* Big Background Circle */}
        <circle cx="700" cy="50" r="200" fill={getCol('secondary')} fillOpacity="0.2" />
        
        {/* Geometric Forms */}
        <rect x="100" y="100" width="150" height="150" rx="20" fill={getCol('primary')} />
        <circle cx="400" cy="225" r="80" fill={getCol('accent-1')} />
        <polygon points="550,100 700,100 625,250" fill={getCol('accent-2')} />
        
        {/* Horizontal Bars */}
        <rect x="100" y="300" width="300" height="40" rx="10" fill={getCol('secondary')} />
        <rect x="100" y="360" width="200" height="20" rx="10" fill={getCol('text')} fillOpacity="0.3" />

        {/* Floating Accent circles */}
        <circle cx="650" cy="350" r="40" fill={getCol('accent-1')} />
        <circle cx="720" cy="350" r="20" fill={getCol('accent-2')} />
        
        {/* Decorative Grid */}
        <g stroke={getCol('text')} strokeOpacity="0.05" strokeWidth="1">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 80} y1="0" x2={i * 80} y2="450" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 75} x2="800" y2={i * 75} />
          ))}
        </g>
        
        {/* Text Overlay Simulation */}
        <text x="400" y="235" fontFamily="Space Grotesk" fontSize="32" fontWeight="bold" fill={getCol('background')} textAnchor="middle">Visual Harmony</text>
        <text x="100" y="70" fontFamily="Inter" fontSize="14" fill={getCol('text')} fillOpacity="0.6">PALETTE PREVIEW V.1.0</text>
      </svg>
    </div>
  );
};

export default GeometricShowcase;
