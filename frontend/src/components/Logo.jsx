import React from "react";

const Logo = () => {
  const bracketColors = [
    "#00B7A3", // teal
    "#FF4C3B", // red
    "#AA50F0", // purple
    "#FFFF00", // yellow
    "#FF005D", // magenta
    "#00B7A3", // teal
    "#FF4C3B"  // red
  ];

  const phrases = [
    "Odamész, [SEGGBERAKOD] és mész tovább!",
    "Ez így [TÖRTÉNT]! A lóba bele volt rakva az ember.",
    "Gyémi- [Billie Jean]",
    "[DE NAGY MŰSOR!]",
    "[ÓÓÓ ISTENEM!]",
    "[HMM...] egy kebab!",
    "[KIK VAGYTOOOK?!]"
  ];

 const getWormStyle = () => {
  const rotate = -3 + Math.random() * 15;
  const skewX = -5 + Math.random() * 10;
  const scale = 0.94 + Math.random() * 0.85;
  const spacing = (Math.random() * 0.5 + 0.5) + 'px';

  return {
    transform: `rotate(${rotate}deg) skewX(${skewX}deg) scale(${scale})`,
    margin: '4rem 0',  // 
    textAlign: 'center',
    letterSpacing: spacing,
    filter: `contrast(${95 + Math.random() * 15}%)`,
    fontSize: '1.8rem',
    lineHeight: '2.2',  
    fontWeight: 600,
  };
};

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '5rem 2rem',
      fontFamily: `'Gloria Hallelujah', 'Caveat', 'Architects Daughter', 'Permanent Marker', cursive`,
      color: '#222',
      textShadow: `
        1px 1px 0 rgba(0,0,0,0.15),
        -1px -1px 0 rgba(255,255,255,0.1)`
    }}>
      {phrases.map((phrase, index) => (
        <div key={index} style={getWormStyle()}>
          {phrase.split(/(\[.*?\])/).map((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
              return (
                <span
                  key={i}
                  style={{
                    color: bracketColors[index % bracketColors.length],
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    WebkitTextStroke: '0.6px #111',
                    padding: '0 3px',
                    textShadow: `
                      1px 1px 1px rgba(0,0,0,0.2),
                      -1px -1px 0 rgba(255,255,255,0.1)`,
                    filter: `drop-shadow(0 0 0.5px ${bracketColors[index % bracketColors.length]})`
                  }}
                >
                  {part.replace(/\[|\]/g, '')}
                </span>
              );
            }
            return (
              <span key={i} style={{
                position: 'relative',
                top: Math.random() > 0.6 ? `${Math.random() * 2}px` : '0'
              }}>
                {part}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Logo;