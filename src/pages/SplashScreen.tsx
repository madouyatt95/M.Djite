export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-[100dvh] relative overflow-hidden" style={{ background: '#05070B' }}>
      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 60%)' }} />
      
      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center animate-pulse">
        {/* The golden M.Djite logo we generated */}
        <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
          <img src="/images/md_logo.png" alt="M.Djite" className="w-full h-full object-cover" />
        </div>
        
        {/* Loading indicator */}
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
