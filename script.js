// Konfigurasi Typewriter
const bioText = "A lifelong learner, Civil Servant (ASN), and Digital Alchemist. I believe even the smallest dust, through persistence, can transform into stone. From IT infrastructure to AI-generated symphonies, I evolve through every challenge.";
let index = 0;

function typeWriter() {
    const element = document.getElementById("typewriter-action");
    if (element && index < bioText.length) {
        element.innerHTML += bioText.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}

// Integrasi Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbxlOufLu5a-_umYnVvXh5eDLwAGofpaxs5TIHWKShSOcOxOFFZDtdT-zkbiqvogCo1NcQ/exec';

function handleContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            btn.disabled = true;
            btn.innerHTML = "TRANSMITTING...";

            // Mengambil data dari form
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            fetch(scriptURL, { 
                method: 'POST', 
                body: JSON.stringify(data)
            })
            .then(response => {
                alert("QUEST COMPLETE: Quest Log Updated!");
                form.reset();
                btn.disabled = false;
                btn.innerHTML = "EXECUTE TRANSMISSION";
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("TRANSMISSION ERROR: Check your connection.");
                btn.disabled = false;
                btn.innerHTML = "RETRY TRANSMISSION";
            });
        });
    }
}

window.onload = () => {
    typeWriter();
    handleContactForm();
};
