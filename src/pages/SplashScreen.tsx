import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
    setTimeout(() => setShowText(true), 800);
    setTimeout(() => setShowTagline(true), 1400);
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/splash_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }}
      />
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 z-1" style={{
        background: 'linear-gradient(to bottom, rgba(5,7,11,0.6) 0%, rgba(5,7,11,0.3) 40%, rgba(5,7,11,0.7) 100%)',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* MD Logo */}
        <div 
          className={`transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        >
          <div className="w-40 h-40 rounded-3xl overflow-hidden" style={{
            border: '2px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 0 60px rgba(212, 175, 55, 0.2)',
          }}>
            <img 
              src="/images/md_logo.png" 
              alt="M.Djité Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* App name */}
        <div className={`transition-all duration-800 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl font-bold tracking-widest text-gold-gradient">
            M.DJITÉ
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-800 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm tracking-[0.3em] text-gray-text font-light uppercase">
            Investir. Développer. Impacter.
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-32">
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
            style={{
              animation: 'loadBar 3s ease-in-out forwards',
            }}
          />
        </div>
        <style>{`
          @keyframes loadBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}
