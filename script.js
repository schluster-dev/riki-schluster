// Konfigurasi Engine Animasi
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let entities = [];
const ENTITY_COUNT = 8; // Jumlah objek (Planet/Alien) yang melayang

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Objek Entitas (Planet atau Alien)
class SpaceObject {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 20;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe'; // Sesuai tema Cyan/Purple
        this.type = Math.floor(Math.random() * 3); // 0: Bintang, 1: Planet, 2: Alien/UFO
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Jika keluar layar, muncul lagi di sisi berlawanan
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.type === 0) {
            // Gambar Bintang Kecil
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 1) {
            // Gambar Planet Ber-ring (Pixel Style sederhana)
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.size, this.size/4, Math.PI/4, 0, Math.PI * 2);
            ctx.stroke();
        } else {
            // Gambar Alien/UFO (Bentuk Diamond)
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size/2);
            ctx.lineTo(this.x + this.size/2, this.y);
            ctx.lineTo(this.x, this.y + this.size/2);
            ctx.lineTo(this.x - this.size/2, this.y);
            ctx.closePath();
            ctx.fill();
        }
    }
}

// Inisialisasi
function setup() {
    initCanvas();
    entities = [];
    for (let i = 0; i < ENTITY_COUNT; i++) {
        entities.push(new SpaceObject());
    }
}

// Loop Animasi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gambar Bintang Latar (Static Pixels)
    ctx.fillStyle = "#ffffff";
    for(let i=0; i<100; i++) {
        let x = (Math.sin(i) * 0.5 + 0.5) * canvas.width;
        let y = (Math.cos(i) * 0.5 + 0.5) * canvas.height;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(x, y, 1, 1);
    }

    entities.forEach(ent => {
        ent.update();
        ent.draw();
    });
    
    requestAnimationFrame(animate);
}

// Typewriter Effect (Untuk teks perkenalan kamu)
const textElement = document.getElementById('typewriter-action');
const message = "Seorang Digital Architect yang fokus pada otomasi sistem dan efisiensi operasional. Mengintegrasikan teknologi modern ke dalam alur kerja pemerintahan untuk menciptakan ekosistem digital yang persisten.";
let index = 0;

function typeWriter() {
    if (index < message.length) {
        textElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}

// Jalankan saat window load
window.addEventListener('load', () => {
    setup();
    animate();
    typeWriter();
});

window.addEventListener('resize', initCanvas);
