// 1. INISIALISASI AOS
AOS.init({ once: false, mirror: true });

// 2. KURSOR, MAGNETIK, FAIRY DUST & CLICK SPARKS
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");
const magneticBtns = document.querySelectorAll('.magnetic-btn');

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX; const posY = e.clientY;
    cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
    cursorOutline.style.animate = cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });

    if(Math.random() < 0.4) {
        let dust = document.createElement('div');
        dust.className = 'fairy-dust';
        dust.style.left = `${posX}px`; dust.style.top = `${posY}px`;
        dust.style.setProperty('--dirX', Math.random() > 0.5 ? 1 : -1);
        document.body.appendChild(dust);
        setTimeout(() => dust.remove(), 1200);
    }

    magneticBtns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        if(Math.abs(x) < 120 && Math.abs(y) < 60) {
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        } else {
            btn.style.transform = `translate(0px, 0px)`;
        }
    });
});

window.addEventListener('click', (e) => {
    const colors = ['#38bdf8', '#a52a2a', '#ffffff', '#ffdf00'];
    for(let i=0; i<15; i++) {
        let spark = document.createElement('div');
        spark.className = 'click-spark';
        spark.style.left = e.clientX + 'px'; spark.style.top = e.clientY + 'px';
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.boxShadow = `0 0 15px ${spark.style.backgroundColor}`;
        let angle = (Math.PI * 2 / 15) * i; let distance = Math.random() * 60 + 30;
        spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
    }
});

document.querySelectorAll('button, textarea, .hover-target').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '70px'; cursorOutline.style.height = '70px';
        cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.15)'; cursorOutline.style.borderColor = '#38bdf8';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px'; cursorOutline.style.height = '30px';
        cursorOutline.style.backgroundColor = 'transparent'; cursorOutline.style.borderColor = 'rgba(128, 0, 0, 0.5)';
    });
});

// 3. EFEK PARTIKEL EXTRA (Hati, Kelopak, Kunang-kunang)
function createParticles(containerId, className, count, durationBase) {
    const container = document.getElementById(containerId);
    for(let i=0; i<count; i++) {
        let el = document.createElement('div'); el.classList.add(className);
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 5 + durationBase) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(el);
    }
}
createParticles('hearts-bg', 'heart', 20, 10);
createParticles('petals-bg', 'petal', 30, 12);

function createFireflies() {
    const container = document.getElementById('fireflies-container');
    for(let i=0; i<25; i++) {
        let fly = document.createElement('div'); fly.className = 'firefly';
        fly.style.left = Math.random() * 100 + 'vw'; fly.style.top = Math.random() * 100 + 'vh';
        fly.style.setProperty('--mx', Math.random() > 0.5 ? 1 : -1);
        fly.style.setProperty('--my', Math.random() > 0.5 ? 1 : -1);
        fly.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(fly);
    }
}
createFireflies();

function createShootingStars() {
    setInterval(() => {
        let star = document.createElement('div'); star.className = 'shooting-star';
        star.style.top = Math.random() * 60 + 'vh';
        document.getElementById('shooting-stars-container').appendChild(star);
        setTimeout(() => star.remove(), 4000);
    }, 2000); 
}
createShootingStars();

const kataPujian = ["Keyren", "Sempurna", "Cantik", "Semestaku", "Manis", "Kesayangan", "Mine"];
function createFloatingWords() {
    setInterval(() => {
        let word = document.createElement('div'); word.className = 'floating-word font-serif';
        word.innerText = kataPujian[Math.floor(Math.random() * kataPujian.length)];
        word.style.left = Math.random() * 80 + 10 + 'vw'; word.style.animationDuration = (Math.random() * 10 + 15) + 's';
        document.getElementById('words-container').appendChild(word);
        setTimeout(() => word.remove(), 25000);
    }, 3000);
}
createFloatingWords();

// 4. TELEGRAM API
const TELEGRAM_BOT_TOKEN = '8303109998:AAGOsoAvit6hCAjpSmjBeeCIj2MManPdgWM';
const TELEGRAM_CHAT_ID = '5552266500';

function sendToTelegram(textMessage, successMessage) {
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: textMessage, parse_mode: 'HTML' }) })
    .then(res => res.json()).then(res => { if(res.ok) { Swal.fire({ title: 'Berhasil!', text: successMessage, icon: 'success', confirmButtonColor: '#800000', background: '#0b1121', color: '#fff' }); } })
    .catch(err => Swal.fire({ title: 'Oops!', text: 'Gagal mengirim pesan.', icon: 'error', background: '#0b1121', color: '#fff' }));
}

// Mengekspos fungsi agar bisa dipanggil oleh tombol di HTML
window.tekanTombolKangen = function() {
    confetti({ particleCount: 500, spread: 360, origin: { y: 0.5 }, colors: ['#800000', '#38bdf8', '#ffffff', '#ff0000', '#ffdf00'] });
    sendToTelegram(`🚨 <b>NOTIFIKASI BUCIN TINGKAT DEWA!</b>\n\nKeyren memencet tombol <b>"Aku Kangen!"</b> ❤️\n\nCepat hubungi bidadarimu sekarang!`, 'Notifikasi kangen langsung terbang ke HP-ku! Tunggu balasanku ya cantikk ❤️');
}

window.kirimPesanKeTelegram = function() {
    const isi = document.getElementById('pesan-keyren').value;
    if(!isi.trim()) return Swal.fire({ icon: 'warning', title: 'Tunggu Cantik', text: 'Pesan jangan dikosongin ya.', background: '#0b1121', color: '#fff' });
    sendToTelegram(`💌 <b>SURAT DARI KEYREN</b>\n\n"${isi}"`, 'Pesan spesialmu udah masuk ke HP-ku ✨');
    document.getElementById('pesan-keyren').value = ''; 
}

window.bukaFoto = function(url, pesan) {
    Swal.fire({
        imageUrl: url, imageAlt: 'Foto Cantik Keyren',
        title: '<span class="text-maroon-light font-serif text-4xl drop-shadow-md">Cantik Banget</span>',
        html: `<p class="text-gray-200 italic text-xl mt-4 leading-relaxed">${pesan}</p>`,
        background: '#0b1121', color: '#fff', confirmButtonColor: '#38bdf8', confirmButtonText: '<span class="text-blue-dark font-extrabold px-6 text-lg tracking-widest">Tutup</span>',
        customClass: { image: 'rounded-2xl shadow-[0_0_50px_#38bdf8] border-4 border-blue-accent', popup: 'border-2 border-maroon shadow-[0_0_50px_#800000]' },
        showClass: { popup: 'animate__animated animate__zoomIn animate__faster' }
    });
}

// 5. HYPERDRIVE & TYPING LOGIC
const textToType = "Di antara miliaran probabilitas di dunia, aku bersyukur semesta mengarahkan garis waktuku padamu.\n\nWebsite ini kubangun khusus untuk mengabadikan betapa cantiknya kamu. Sebuah tempat agar kamu bisa selalu melihat dirimu dari sudut pandangku yang mengagumimu.";
let i = 0; let warpSpeedActive = false;

function typeWriter() {
    if (i < textToType.length) {
        document.getElementById("typewriter").innerHTML += textToType.charAt(i);
        i++; setTimeout(typeWriter, 60);
    } else { document.getElementById("typewriter").style.borderRight = "none"; }
}

window.startExperience = function() {
    document.getElementById('bg-music').play();
    document.getElementById('music-player').style.display = 'flex';

    // Aktifkan Warp Speed
    warpSpeedActive = true;
    setTimeout(() => { warpSpeedActive = false; }, 2000); // Berhenti warp setelah 2 detik

    const introScreen = document.getElementById('intro-screen');
    introScreen.classList.add('curtain-reveal');
    
    setTimeout(() => {
        const main = document.getElementById('main-content');
        main.style.display = 'block';
        setTimeout(() => {
            main.style.opacity = '1';
            document.getElementById('btn-kangen').classList.remove('hidden');
            setTimeout(typeWriter, 800); 
        }, 100);
    }, 1200); 
}

// 6. 3D BACKGROUND (Three.js)
const init3D = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const particles = 1200; 
    const pos = new Float32Array(particles*3); const col = new Float32Array(particles*3);
    const cMaroon = new THREE.Color('#a52a2a'); const cBlue = new THREE.Color('#38bdf8');

    for(let i=0; i<particles*3; i+=3) {
        pos[i] = (Math.random()-0.5)*40; pos[i+1] = (Math.random()-0.5)*40; pos[i+2] = (Math.random()-0.5)*30;
        const c = Math.random()>0.5 ? cMaroon : cBlue;
        col[i]=c.r; col[i+1]=c.g; col[i+2]=c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Points(geo, mat); scene.add(mesh);
    camera.position.z = 8;

    let mx=0, my=0;
    document.addEventListener('mousemove', e => { mx=(e.clientX-window.innerWidth/2)*0.002; my=(e.clientY-window.innerHeight/2)*0.002; });

    const animate = () => {
        requestAnimationFrame(animate);
        
        let speedMultiplier = warpSpeedActive ? 40 : 1; 
        mesh.rotation.y += 0.0015 * speedMultiplier; 
        mesh.rotation.x += 0.0008 * speedMultiplier;
        
        mesh.rotation.y += 0.05 * (mx - mesh.rotation.y); 
        mesh.rotation.x += 0.05 * (my - mesh.rotation.x);
        renderer.render(scene, camera);
    }; animate();
    window.addEventListener('resize', () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
};
window.onload = init3D;
