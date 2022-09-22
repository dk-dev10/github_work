import React from 'react';

export default function Sceleton() {
  return (
    <div>
      <svg
        role='img'
        width='670'
        height='447'
        aria-labelledby='loading-aria'
        viewBox='0 0 670 447'
        preserveAspectRatio='none'
      >
        <title id='loading-aria'>Loading...</title>
        <rect
          x='0'
          y='0'
          width='100%'
          height='100%'
          clip-path='url(#clip-path)'
          style={{ fill: 'url("#fill")' }}
        ></rect>
        <defs>
          <clipPath id='clip-path'>
            <circle cx='112' cy='112' r='100' />
            <rect x='12' y='228' rx='0' ry='0' width='200' height='25' />
            <rect x='247' y='-1' rx='0' ry='0' width='200' height='59' />
            <rect x='247' y='78' rx='0' ry='0' width='338' height='119' />
            <rect x='246' y='217' rx='0' ry='0' width='338' height='119' />
            <rect x='247' y='350' rx='0' ry='0' width='338' height='119' />
          </clipPath>
          <linearGradient id='fill'>
            <stop offset='0.599964' stop-color='#f3f3f3' stop-opacity='1'>
              <animate
                attributeName='offset'
                values='-2; -2; 1'
                keyTimes='0; 0.25; 1'
                dur='2s'
                repeatCount='indefinite'
              ></animate>
            </stop>
            <stop offset='1.59996' stop-color='#c2c2c2' stop-opacity='1'>
              <animate
                attributeName='offset'
                values='-1; -1; 2'
                keyTimes='0; 0.25; 1'
                dur='2s'
                repeatCount='indefinite'
              ></animate>
            </stop>
            <stop offset='2.59996' stop-color='#f3f3f3' stop-opacity='1'>
              <animate
                attributeName='offset'
                values='0; 0; 3'
                keyTimes='0; 0.25; 1'
                dur='2s'
                repeatCount='indefinite'
              ></animate>
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
