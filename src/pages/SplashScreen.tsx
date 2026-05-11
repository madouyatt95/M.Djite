import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 100);
    const t2 = setTimeout(() => setShowText(true), 600);
    const t3 = setTimeout(() => setShowTagline(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="h-[100dvh] w-full relative flex flex-col items-center justify-center overflow-hidden" style={{ background: '#05070B' }}>
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
      <div className="relative z-10 flex flex-col items-center gap-8 mt-12">
        {/* MD Logo */}
        <div className={`transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-40 h-40 rounded-[32px] overflow-hidden" style={{
            background: '#05070B',
            border: '1.5px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 0 60px rgba(212, 175, 55, 0.15)',
          }}>
            <img 
              src="/images/md_logo.png" 
              alt="M.Djité Logo" 
              className="w-full h-full object-cover scale-[0.85]"
            />
          </div>
        </div>

        {/* App name */}
        <div className={`transition-all duration-800 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-[40px] font-bold tracking-[0.15em] text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #D4AF37, #F3E5AB, #D4AF37)' }}>
            M.DJITÉ
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-800 delay-500 ${showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs tracking-[0.4em] text-gray-text/80 font-light uppercase text-center ml-1">
            Investir. Développer. Impacter.
          </p>
        </div>
      </div>
      
      {/* Loading bar */}
      <div className="absolute bottom-16 w-48 h-1 bg-white/10 rounded-full overflow-hidden z-10">
        <div 
          className="h-full rounded-full transition-all duration-[2000ms] ease-out"
          style={{ width: showTagline ? '100%' : '0%', background: 'linear-gradient(to right, #D4AF37, #F3E5AB)' }}
        />
      </div>
    </div>
  );
}
