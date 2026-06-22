"use client";

import Image from "next/image";
import { useState } from "react";

function MountainSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer mountain silhouette */}
      <path
        d="M30 210
           L58 158 L66 170 L76 148 L86 162
           L98 122 L106 136 L114 112
           L130 65
           L146 112 L154 100 L162 122
           L174 162 L184 148 L194 170 L202 158
           L230 210
           Q240 226 224 228
           L152 228 L146 220 L130 226 L114 220 L108 228
           L36 228
           Q20 226 30 210 Z"
        stroke="#34d399"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Center mountain inner detail */}
      <path
        d="M114 222 L120 175 L125 185 L130 158 L135 185 L140 175 L146 222"
        stroke="#34d399"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Left mountain inner detail */}
      <path
        d="M52 218 L60 186 L66 195 L76 168 L83 180 L90 210"
        stroke="#34d399"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Right mountain inner detail */}
      <path
        d="M170 210 L177 180 L184 168 L194 195 L200 186 L208 218"
        stroke="#34d399"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Base chevron */}
      <path
        d="M108 226 L122 215 L130 220 L138 215 L152 226"
        stroke="#34d399"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface Props {
  size?: number;
}

export default function FronteiraLogo({ size = 44 }: Props) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return <MountainSVG size={size} />;
  }

  return (
    <Image
      src="/"
      alt="Fronteira RP"
      width={size}
      height={size}
      className="object-contain"
      onError={() => setImgError(true)}
    />
  );
}
