/* --- CUSTOM FONTS --- */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Press+Start+2P&family=Rajdhani:wght@300;400;600;700&display=swap');

/* --- CORE VARIABLES --- */
:root {
    --neon-cyan: #00f2ff;
    --neon-purple: #bc13fe;
    --neon-green: #22c55e;
    --bg-dark: #050505;
    /* Glass tetap solid (0.03) tapi tembus bintang */
    --glass-bg: rgba(255, 255, 255, 0.03); 
    --glass-border: rgba(255, 255, 255, 0.1);
}

/* --- BASE STYLING (BINTANG FIX) --- */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    background-color: var(--bg-dark);
}

body {
    /* PENTING: Body harus transparan agar bintang di canvas terlihat */
    background: transparent !important; 
    color: #e0e0e0;
    font-family: 'Rajdhani', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
    scroll-behavior: smooth;
    min-height: 100vh;
    position: relative;
    z-index: 1;
}

/* --- FORCE TRANSPARENCY --- */
main, section, #experience, #skills, nav, footer, 
.container, .max-w-6xl, .relative, .grid {
    background-color: transparent !important;
}

/* --- FIX CANVAS (THE REAL BACKGROUND) --- */
#space-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    z-index: -1 !important; /* Di belakang konten */
    display: block;
    pointer-events: none;
    background-color: var(--bg-dark) !important; /* Warna hitam pindah ke sini */
}

/* --- TYPOGRAPHY --- */
.rpg-font {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.7rem;
}

.neon-text {
    color: var(--neon-cyan);
    text-shadow: 0 0 10px rgba(0, 242, 255, 0.5), 0 0 20px rgba(0, 242, 255, 0.2);
}

/* --- GLASSMORPHISM --- */
.glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    border: 1px solid var(--glass-border);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.glass:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(0, 242, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* --- UI ELEMENTS --- */
.rpg-border {
    border: 2px solid var(--neon-cyan);
    box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
    position: relative;
}

.h-1 div {
    position: relative;
    border-radius: 2px;
    transition: width 1.5s cubic-bezier(0.1, 0, 0.2, 1);
}

/* --- ANIMATIONS --- */
@keyframes bars {
    0%, 100% { height: 10px; opacity: 0.5; }
    50% { height: 30px; opacity: 1; }
}

.animate-bars {
    animation: bars 1.2s infinite ease-in-out;
}

/* Efek Scanline */
.scanline {
    width: 100%;
    height: 100px;
    z-index: 99;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.1;
    position: absolute;
    bottom: 100%;
    animation: scanline 8s linear infinite;
}

@keyframes scanline {
    0% { bottom: 100%; }
    100% { bottom: -100%; }
}

/* --- FORMS & INPUTS --- */
input, textarea {
    font-family: 'Rajdhani', sans-serif;
    color: white !important;
    background: rgba(255, 255, 255, 0.02) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 0.75rem;
    border-radius: 0.5rem;
}

input::placeholder, textarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.8rem;
    text-transform: uppercase;
}

/* --- TYPEWRITER ALIGNMENT --- */
#typewriter-action {
    display: block !important; 
    text-align: left !important;
    position: relative;
    min-height: 100px; 
    height: auto;
    width: 100%;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #b0b0b0;
}

#typewriter-action br {
    display: block;
    content: "";
    margin-top: 10px;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg-dark); }
::-webkit-scrollbar-thumb { 
    background: var(--neon-cyan); 
    border-radius: 10px;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
    h1 { font-size: 3rem !important; }
    .rpg-font { font-size: 0.55rem; }
}

/* --- ADDED: DOWNLOAD BUTTON (SYSTEM MANIFEST) --- */
.btn-manifest {
    position: relative;
    overflow: hidden;
    background: rgba(0, 242, 255, 0.05);
    border: 1px solid rgba(0, 242, 255, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
}

.btn-manifest:hover {
    background: rgba(0, 242, 255, 0.15);
    border-color: var(--neon-cyan);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
}

.btn-manifest:active {
    transform: translateY(-1px);
}

/* Efek Kilatan (Shimmer) untuk Tombol */
.shimmer-bar {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        90deg, 
        transparent, 
        rgba(255, 255, 255, 0.1), 
        transparent
    );
    transform: skewX(-25deg);
    transition: none;
}

.btn-manifest:hover .shimmer-bar {
    animation: shimmer-run 1.5s infinite;
}

@keyframes shimmer-run {
    0% { left: -100%; }
    100% { left: 150%; }
}

/* --- ADDED: SKILL TREE BAR ENHANCEMENT --- */
.skill-track {
    height: 6px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.skill-fill {
    height: 100%;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 0 10px currentColor; /* Mengikuti warna teks parent */
}

/* --- ADDED: SPECIAL UTILITIES --- */
.tracking-tighter-2 {
    letter-spacing: -0.05em;
}

.text-8px {
    font-size: 8px;
}

/* Tambahkan Glow pada angka statistik */
.stat-value {
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}
