document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is ready before running script

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const lagu = document.getElementById('laguUlangTahun');
    const tombolMusik = document.getElementById('tombolPutarMusik');
    const ikonPlay = document.getElementById('ikonPlay');
    const ikonPause = document.getElementById('ikonPause');
    let musikSudahInteraksi = false;

    if (tombolMusik && lagu && ikonPlay && ikonPause) { // Check if all music elements exist
        tombolMusik.addEventListener('click', () => {
            if (!musikSudahInteraksi) {
                lagu.play().catch(error => console.error("Audio play failed:", error));
                musikSudahInteraksi = true;
            } else if (lagu.paused) {
                lagu.play().catch(error => console.error("Audio play failed:", error));
            } else {
                lagu.pause();
            }
        });

        lagu.onplay = () => {
            ikonPlay.style.display = 'none';
            ikonPause.style.display = 'block';
        };

        lagu.onpause = () => {
            ikonPlay.style.display = 'block';
            ikonPause.style.display = 'none';
        };
    } else {
        console.warn("Music player elements not found.");
    }
    
    const triggerConfetti = () => {
        if (typeof confetti === 'function') { // Check if confetti function is available
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
            console.warn("Confetti function is not defined. Make sure the confetti script is loaded before this script or is globally available.");
        }
    };

    // Call confetti on initial load (after DOM is ready)
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

    // --- PERUBAHAN DI SINI ---
    // Ganti 'VIDEO_ID_ANDA' dengan ID Video YouTube yang valid.
    // Contoh: "https://www.youtube.com/embed/M3B00H9K64s"
    const youtubeVideoURLs = {
         3: "https://youtu.be/mAJa4SF_VVI?si=d_/embed/WgbEJ90Rr0B9vQ" // << GANTI VIDEO_ID_ANDA DI SINI
    };
    // Pastikan Anda mengganti VIDEO_ID_ANDA di atas dengan ID video YouTube yang sebenarnya.
    // Misalnya: const youtubeVideoURLs = { 3: "https://www.youtube.com/embed/M3B00H9K64s" };


    // Make functions global so they can be called from HTML onclick attributes
    window.pilihKado = function(nomorKado) {
        // Hide all gift contents first
        for (const key in giftContents) {
            if (giftContents[key]) {
                giftContents[key].style.display = 'none';
            }
        }

        // Show the selected gift content
        if (giftContents[nomorKado]) {
            giftContents[nomorKado].style.display = 'block';
            
            // If the gift is a YouTube video, set the player source
            if (nomorKado === 3 && youtubePlayer3 && youtubeVideoURLs[3]) {
                // Cek apakah URL masih placeholder
                if (youtubeVideoURLs[3].includes("VIDEO_ID_ANDA") || !youtubeVideoURLs[3].includes("youtube.com/embed/")) {
                    const pInfo = document.createElement('p');
                    pInfo.textContent = 'PENTING: Mohon ganti VIDEO_ID_ANDA di file script.js dengan ID video YouTube yang valid (gunakan format https://www.youtube.com/embed/ID_VIDEO) agar video bisa diputar.';
                    pInfo.className = 'text-red-500 text-sm mt-2 font-semibold';
                    
                    const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                    if(oldPInfo) oldPInfo.remove(); 
                    
                    giftContents[nomorKado].insertBefore(pInfo, youtubePlayer3.nextSibling);
                    youtubePlayer3.src = ""; // Jangan putar jika ID placeholder
                } else {
                    // Hapus pesan peringatan jika ada
                    const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                    if(oldPInfo) oldPInfo.remove();
                    // Set src dengan autoplay dan parameter lainnya
                    youtubePlayer3.src = youtubeVideoURLs[3] + "?autoplay=1&rel=0&modestbranding=1"; 
                }
            }

            if (giftSelectionSection) giftSelectionSection.style.display = 'none'; 
            if (revealedGiftSection) revealedGiftSection.style.display = 'block'; 
            triggerConfetti(); 
            if (revealedGiftSection) window.scrollTo({ top: revealedGiftSection.offsetTop - 20, behavior: 'smooth' }); 
        }
    }

    window.kembaliPilihKado = function() {
        for (const key in giftContents) {
            if (giftContents[key]) {
                giftContents[key].style.display = 'none';
            }
        }
        if (youtubePlayer3) {
            youtubePlayer3.src = ""; // Hentikan video YouTube dengan mengosongkan src
        }

        if (revealedGiftSection) revealedGiftSection.style.display = 'none'; 
        if (giftSelectionSection) giftSelectionSection.style.display = 'block'; 
        if (giftSelectionSection) window.scrollTo({ top: giftSelectionSection.offsetTop - 20, behavior: 'smooth' }); 
    }

}); // End of DOMContentLoaded listener