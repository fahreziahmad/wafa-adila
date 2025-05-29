document.addEventListener('DOMContentLoaded', () => { // Pastikan DOM siap sebelum menjalankan skrip

    document.getElementById('year').textContent = new Date().getFullYear();

    const lagu = document.getElementById('laguUlangTahun');
    const tombolMusik = document.getElementById('tombolPutarMusik');
    const ikonPlay = document.getElementById('ikonPlay');
    const ikonPause = document.getElementById('ikonPause');
    let musikSudahInteraksi = false;

    if (tombolMusik) { // Pastikan elemen ada
        tombolMusik.addEventListener('click', () => {
            if (!lagu) return; // Pastikan elemen lagu ada
            if (!musikSudahInteraksi) {
                lagu.play().catch(error => console.error("Audio play failed:", error));
                musikSudahInteraksi = true;
            } else if (lagu.paused) {
                lagu.play().catch(error => console.error("Audio play failed:", error));
            } else {
                lagu.pause();
            }
        });
    }

    if (lagu) { // Pastikan elemen ada
        lagu.onplay = () => {
            if (ikonPlay) ikonPlay.style.display = 'none';
            if (ikonPause) ikonPause.style.display = 'block';
        };

        lagu.onpause = () => {
            if (ikonPlay) ikonPlay.style.display = 'block';
            if (ikonPause) ikonPause.style.display = 'none';
        };
    }
    
    const triggerConfetti = () => {
        if (typeof confetti !== 'undefined') { // Pastikan fungsi confetti ada
            const defaults = {
                spread: 360,
                ticks: 70,
                gravity: 0,
                decay: 0.95,
                startVelocity: 25,
                shapes: ['star', 'circle', 'heart'],
                colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#DB7093', '#C71585', '#FFFFFF']
            };

            function shoot() {
                confetti({ ...defaults, particleCount: 60, scalar: 1.2, shapes: ['star', 'heart'] });
                confetti({ ...defaults, particleCount: 30, scalar: 0.8, shapes: ['circle'] });
            }
            setTimeout(shoot, 0);
            setTimeout(shoot, 150);
            setTimeout(shoot, 300);
        } else {
            console.warn("Confetti function is not defined. Make sure the confetti script is loaded.");
        }
    };

    // Panggil confetti setelah DOM dimuat, bukan window.load jika confetti script di defer/async
    // Namun, karena confetti script Anda mungkin tidak di defer, window.load lebih aman
    // Jika confetti script juga di defer, DOMContentLoaded sudah cukup.
    // Untuk amannya, karena confetti bisa jadi belum siap saat DOMContentLoaded,
    // kita biarkan triggerConfetti dipanggil dari window.load atau DOMContentLoaded jika confetti sudah ada.
    triggerConfetti();


    const giftSelectionSection = document.getElementById('gift-selection-section');
    const revealedGiftSection = document.getElementById('revealed-gift-section');
    const giftContents = {
        1: document.getElementById('gift-content-1'),
        2: document.getElementById('gift-content-2'),
        3: document.getElementById('gift-content-3'),
        4: document.getElementById('gift-content-4')
    };
    const youtubePlayer3 = document.getElementById('youtube-player-3');

    // GANTI 'VIDEO_ID_ANDA' dengan ID Video YouTube yang ingin Anda gunakan.
    // Contoh ID Video untuk "Happy Birthday Song": YOcgY2eT7zE (bisa diganti)
    const youtubeVideoURLs = {
         3: "https://www.youtube.com/playlist?list=PL70caGBXiq75-2hkNGUG5ZsK8GDJdhPRI" // << GANTI VIDEO_ID_ANDA DI SINI
    };


    window.pilihKado = function(nomorKado) { // Membuat fungsi global agar bisa dipanggil dari HTML onclick
        // Sembunyikan semua konten kado terlebih dahulu
        for (const key in giftContents) {
            if (giftContents[key]) { // Pastikan elemen ada
                giftContents[key].style.display = 'none';
            }
        }

        // Tampilkan konten kado yang dipilih
        if (giftContents[nomorKado]) {
            giftContents[nomorKado].style.display = 'block';
            
            // Jika kado adalah video YouTube, set src player
            if (nomorKado === 3 && youtubePlayer3 && youtubeVideoURLs[3]) {
                if (youtubeVideoURLs[3].includes("VIDEO_ID_ANDA")) {
                    const pInfo = document.createElement('p');
                    pInfo.textContent = 'Mohon ganti VIDEO_ID_ANDA di file script.js dengan ID video YouTube yang valid.';
                    pInfo.className = 'text-red-500 text-sm mt-2';
                    const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                    if(oldPInfo) oldPInfo.remove();
                    giftContents[nomorKado].insertBefore(pInfo, youtubePlayer3.nextSibling);
                     youtubePlayer3.src = ""; 
                } else {
                    const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                    if(oldPInfo) oldPInfo.remove();
                    youtubePlayer3.src = youtubeVideoURLs[3] + "?autoplay=1&rel=0"; // Tambahkan autoplay dan rel=0 (opsional)
                }
            }

            if (giftSelectionSection) giftSelectionSection.style.display = 'none';
            if (revealedGiftSection) revealedGiftSection.style.display = 'block';
            triggerConfetti(); 
            if (revealedGiftSection) window.scrollTo({ top: revealedGiftSection.offsetTop - 20, behavior: 'smooth' });
        }
    }

    window.kembaliPilihKado = function() { // Membuat fungsi global
        for (const key in giftContents) {
            if (giftContents[key]) { // Pastikan elemen ada
                giftContents[key].style.display = 'none';
            }
        }
        if (youtubePlayer3) {
            youtubePlayer3.src = ""; 
        }

        if (revealedGiftSection) revealedGiftSection.style.display = 'none'; 
        if (giftSelectionSection) giftSelectionSection.style.display = 'block'; 
        if (giftSelectionSection) window.scrollTo({ top: giftSelectionSection.offsetTop - 20, behavior: 'smooth' }); 
    }

}); // Akhir dari event listener DOMContentLoaded

// Event listener untuk window.load bisa tetap ada jika ada fungsi yang bergantung pada semua aset (gambar dll) termuat
window.addEventListener('load', () => {
    if (typeof triggerConfetti === 'function') { // Pastikan triggerConfetti ada sebelum dipanggil
        triggerConfetti(); // Panggil lagi untuk memastikan confetti muncul jika ada race condition dengan DOMContentLoaded
    }
});