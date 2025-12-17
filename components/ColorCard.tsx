
import React, { useState } from 'react';
import { ColorInfo } from '../types';
import { hexToRgb, hexToHsl, getContrastColor } from '../utils/colorUtils';

interface ColorCardProps {
  color: ColorInfo;
}

const ColorCard: React.FC<ColorCardProps> = ({ color }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const contrast = getContrastColor(color.hex);

  return (
    <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/10">
      <div 
        className="h-32 w-full flex items-end p-4 transition-transform group-hover:scale-[1.02]" 
        style={{ backgroundColor: color.hex }}
      >
        <span 
          className="text-xs font-bold px-2 py-1 rounded bg-black/20 backdrop-blur-md"
          style={{ color: contrast }}
        >
          {color.role.toUpperCase()}
        </span>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{color.name}</h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{color.description}</p>
        </div>

        <div className="space-y-2">
          {/* Hex */}
          <button 
            onClick={() => handleCopy(color.hex, 'Hex')}
            className="flex items-center justify-between w-full p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-xs font-mono"
          >
            <span className="text-zinc-500 uppercase">Hex</span>
            <span className="text-zinc-200">{color.hex}</span>
          </button>

          {/* RGB */}
          <button 
            onClick={() => handleCopy(hexToRgb(color.hex), 'RGB')}
            className="flex items-center justify-between w-full p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-xs font-mono"
          >
            <span className="text-zinc-500 uppercase">RGB</span>
            <span className="text-zinc-200">{hexToRgb(color.hex)}</span>
          </button>

          {/* HSL */}
          <button 
            onClick={() => handleCopy(hexToHsl(color.hex), 'HSL')}
            className="flex items-center justify-between w-full p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-xs font-mono"
          >
            <span className="text-zinc-500 uppercase">HSL</span>
            <span className="text-zinc-200">{hexToHsl(color.hex)}</span>
          </button>
        </div>
      </div>

      {copyStatus && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10 transition-opacity">
          <div className="text-center">
            <div className="mb-2 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white">{copyStatus} Copied!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorCard;
