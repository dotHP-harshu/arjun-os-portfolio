import React from 'react';
import { motion } from 'motion/react';

export type BackgroundType = 'grid' | 'doodles' | 'blobs' | 'waves' | 'dots' | 'particles';

interface BackgroundProps {
  type: BackgroundType;
}

export const Background: React.FC<BackgroundProps> = ({ type }) => {
  switch (type) {
    case 'doodles':
      return <DoodleBackground />;
    case 'blobs':
      return <BlobBackground />;
    case 'waves':
      return <WaveBackground />;
    case 'dots':
      return <DotsBackground />;
    case 'particles':
      return <ParticlesBackground />;
    case 'grid':
    default:
      return <ImprovedGridBackground />;
  }
};

const ImprovedGridBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage: `radial-gradient(var(--grid) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
      animate={{
        backgroundPosition: ['0px 0px', '20px 20px', '0px 0px'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
      animate={{
        backgroundPosition: ['0px 0px', '-40px 40px', '0px 0px'],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  </div>
);

const DoodleBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="doodles" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          {/* Hand-drawn style paths */}
          <path d="M20,40 Q60,10 100,40 T180,40" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="250" cy="60" r="15" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <path d="M300,20 L340,60 M340,20 L300,60" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />

          <rect x="40" y="150" width="60" height="40" rx="8" fill="none" stroke="var(--accent)" strokeWidth="2" transform="rotate(-10 70 170)" />
          <path d="M150,120 C180,100 220,140 250,120 S320,140 350,120" fill="none" stroke="var(--accent)" strokeWidth="2" />

          <path d="M50,300 L90,260 L130,300 L90,340 Z" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <circle cx="200" cy="280" r="25" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="5,5" />

          <path d="M300,250 Q330,220 360,250 T420,250" fill="none" stroke="var(--accent)" strokeWidth="2" transform="rotate(45 360 250)" />
          <path d="M20,350 C50,380 100,320 150,350" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />

          {/* Small decorative elements */}
          <circle cx="380" cy="380" r="4" fill="var(--accent)" />
          <circle cx="10" cy="10" r="3" fill="var(--accent)" />
          <path d="M220,200 L230,210 M230,200 L220,210" stroke="var(--accent)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#doodles)" />
    </svg>
  </div>
);
const BlobBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
    <svg
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <filter id="blur-large">
        <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
      </filter>

      <g filter="url(#blur-large)">
        {/* Blob 1 */}
        <motion.g
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="200" cy="200" r="250" fill="var(--accent)" />
        </motion.g>

        {/* Blob 2 */}
        <motion.g
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <circle cx="800" cy="300" r="300" fill="var(--grid)" />
        </motion.g>

        {/* Blob 3 */}
        <motion.g
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <circle cx="400" cy="800" r="280" fill="var(--accent)" />
        </motion.g>

        {/* Blob 4 */}
        <motion.g
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <circle cx="850" cy="850" r="200" fill="var(--grid)" />
        </motion.g>
      </g>
    </svg>
  </div>
);
const WaveBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
    <svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M0,640L48,629.3C96,619,192,597,288,565.3C384,533,480,491,576,496C672,501,768,555,864,570.7C960,587,1056,565,1152,528C1248,491,1344,437,1392,410.7L1440,384L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        fill="var(--accent)"
        fillOpacity="0.2"
        animate={{
          d: [
            "M0,640L48,629.3C96,619,192,597,288,565.3C384,533,480,491,576,496C672,501,768,555,864,570.7C960,587,1056,565,1152,528C1248,491,1344,437,1392,410.7L1440,384L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
            "M0,540L48,560C96,580,192,620,288,613.3C384,607,480,553,576,528C672,503,768,507,864,533.3C960,560,1056,608,1152,602.7C1248,597,1344,539,1392,509.3L1440,480L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
            "M0,640L48,629.3C96,619,192,597,288,565.3C384,533,480,491,576,496C672,501,768,555,864,570.7C960,587,1056,565,1152,528C1248,491,1344,437,1392,410.7L1440,384L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,320L48,341.3C96,363,192,405,288,416C384,427,480,405,576,368C672,331,768,277,864,272C960,267,1056,309,1152,320C1248,331,1344,309,1392,298.7L1440,288L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        fill="var(--grid)"
        fillOpacity="0.15"
        animate={{
          d: [
            "M0,320L48,341.3C96,363,192,405,288,416C384,427,480,405,576,368C672,331,768,277,864,272C960,267,1056,309,1152,320C1248,331,1344,309,1392,298.7L1440,288L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
            "M0,420L48,400C96,380,192,340,288,346.7C384,353,480,407,576,432C672,457,768,453,864,426.7C960,400,1056,352,1152,357.3C1248,363,1344,421,1392,450.7L1440,480L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
            "M0,320L48,341.3C96,363,192,405,288,416C384,427,480,405,576,368C672,331,768,277,864,272C960,267,1056,309,1152,320C1248,331,1344,309,1392,298.7L1440,288L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  </div>
);

const DotsBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[var(--accent)] rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.1, 0.8, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const ParticlesBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2"
        style={{
          backgroundColor: Math.random() > 0.5 ? 'var(--accent)' : 'var(--grid)',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, Math.random() * 200 - 100, 0],
          y: [0, Math.random() * 200 - 100, 0],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);
