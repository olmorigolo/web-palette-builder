
export interface ColorInfo {
  hex: string;
  name: string;
  role: 'primary' | 'secondary' | 'accent-1' | 'accent-2' | 'background' | 'text';
  description: string;
}

export interface Palette {
  id: string;
  colors: ColorInfo[];
  concept: string;
  timestamp: number;
  heroImage?: string;
}
