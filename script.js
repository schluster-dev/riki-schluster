const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let entities = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class SpaceObject {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 10;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        // Warna mengambil dari variabel CSS kamu
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe'; 
        this.type = Math.floor(Math.random() * 3); 
        this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.type === 0) { // Bintang Pixel
            ctx.fillRect(this.x, this.y, 2, 2);
        } else if (this.type === 1) { // Planet
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = this.color;
            ctx.beginPath(); // Ring planet
            ctx.ellipse(this.x, this.y, this.size, this.size/4, Math.PI/4, 0, Math.PI * 2);
            ctx.stroke();
        } else { // Alien / Entitas Dorman
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

function setup() {
    initCanvas();
    entities = [];
    for (let i = 0; i < 15; i++) {
        entities.push(new SpaceObject());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(ent => {
        ent.update();
        ent.draw();
    });
    requestAnimationFrame(animate);
}

// Efek Mengetik (Typewriter)
const textElement = document.getElementById('typewriter-action');
const message = "Digital Architect & ASN Operator yang berdedikasi pada optimasi sistem kearsipan dan infrastruktur IT. Fokus pada automasi dan persistensi digital.";
let charIndex = 0;

function typeWriter() {
    if (charIndex < message.length) {
        textElement.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

window.addEventListener('load', () => {
    setup();
    animate();
    typeWriter();
});

window.addEventListener('resize', initCanvas);
