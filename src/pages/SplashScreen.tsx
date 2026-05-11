import { motion } from 'framer-motion';
import { ScanFace, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [step, setStep] = useState<'scanning' | 'success'>('scanning');

  useEffect(() => {
    const t = setTimeout(() => setStep('success'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] relative overflow-hidden" style={{ background: '#05070B' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 mb-10 rounded-[28px] overflow-hidden border border-gold/30 shadow-2xl shadow-gold/20">
          <img src="/images/md_logo.png" alt="M.Djite" className="w-full h-full object-cover" />
        </div>

        <div className="h-32 flex flex-col items-center justify-center">
          {step === 'scanning' ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
              <div className="relative">
                <ScanFace size={64} className="text-gold opacity-80" strokeWidth={1} />
                <motion.div 
                  animate={{ y: [0, 64, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full" 
                />
              </div>
              <p className="mt-6 text-gray-text font-medium tracking-wide">Authentification FaceID...</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
              <CheckCircle2 size={64} className="text-success" />
              <p className="mt-6 text-success font-bold tracking-wide">Accès Autorisé</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
