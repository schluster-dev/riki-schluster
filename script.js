// Konfigurasi Typewriter
const bioText = "Menyeimbangkan harmoni antara baris kode IT, irama musik Trance, dan estetika visual Anime dalam satu ekosistem digital.";
let index = 0;

function typeWriter() {
    const element = document.getElementById("typewriter-action");
    if (element && index < bioText.length) {
        element.innerHTML += bioText.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}

// Integrasi Apps Script (Ganti URL dengan milik Anda)
const scriptURL = 'https://script.google.com/macros/s/AKfycbxlOufLu5a-_umYnVvXh5eDLwAGofpaxs5TIHWKShSOcOxOFFZDtdT-zkbiqvogCo1NcQ/exec';

function handleContactForm() {
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert("Quest Log Updated: Message Sent!");
            // Logika fetch ke Apps Script bisa ditaruh di sini
        });
    }
}

// Inisialisasi saat halaman dimuat
window.onload = () => {
    typeWriter();
    handleContactForm();
};
