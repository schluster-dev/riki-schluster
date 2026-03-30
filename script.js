const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 150;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // PENTING: Re-inisialisasi bintang saat ukuran layar berubah 
    // agar bintang selalu memenuhi area canvas yang baru.
    initStars(); 
}

window.addEventListener('resize', resize);

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height + 100); // Mulai sedikit di luar bawah
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe';
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) this.reset();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

// Inisialisasi awal
resize();

const textElement = document.getElementById('typewriter-action');
// Gunakan <br><br> agar teks rapi dan tidak menumpuk satu paragraf panjang
const bioText = "I am a lifelong learner with a strong passion for technology, creativity, and artificial intelligence. I work as a school IT professional and a civil servant (ASN), while remaining an enthusiastic gamer, programmer, and AI enthusiast. <br><br> My interests include web development, coding, digital illustration, graphic design, AI-generated music, and visual creativity using tools such as Photoshop, Krita, and various AI platforms. I enjoy exploring how technology and art intersect to create meaningful and innovative digital experiences. <br><br> My life journey has not been easy — shaped by challenges and setbacks — but I have always chosen to stand, grow, and move forward. I believe that even something as small as dust can, through persistence, transform into stone. That belief drives me to never stop learning, creating, and evolving.";

let charIndex = 0;

// PASTIKAN KOSONG SEBELUM MULAI
if(textElement) textElement.innerHTML = "";

function typeWriter() {
    if (textElement && charIndex < bioText.length) {
        // Cek apakah ada tag <br>
        if (bioText.substring(charIndex, charIndex + 4) === "<br>") {
            textElement.innerHTML += "<br>";
            charIndex += 4;
        } else {
            textElement.innerHTML += bioText.charAt(charIndex);
            charIndex++;
        }
        setTimeout(typeWriter, 30); // Kecepatan ngetik disesuaikan
    } else if (textElement) {
        // Efek kursor di akhir
        textElement.innerHTML += '<span class="text-cyan-400 animate-pulse">_</span>';
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

// Jalankan semua fungsi
animate();
typeWriter();
