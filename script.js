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

    // PENTING: GANTI 'VIDEO_ID_ANDA' dengan ID Video YouTube yang valid.
    // Contoh: Jika URL video adalah https://www.youtube.com/watch?v=XYZ123, maka ID videonya adalah 'XYZ123'.
    const youtubeVideoURLs = {
         3: "https://www.youtube.com/watch?v=N1Ptcce0SlY&list=RDN1Ptcce0SlY&start_radio=1" // << GANTI VIDEO_ID_ANDA DI SINI
    };


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
                if (youtubeVideoURLs[3].includes("VIDEO_ID_ANDA")) {
                    // Notify user if the video ID is still a placeholder
                    const pInfo = document.createElement('p');
                    pInfo.textContent = 'PENTING: Mohon ganti VIDEO_ID_ANDA di file script.js dengan ID video YouTube yang valid agar video bisa diputar.';
                    pInfo.className = 'text-red-500 text-sm mt-2 font-semibold';
                    
                    const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                    if(oldPInfo) oldPInfo.remove(); // Remove old message if exists
                    
                    giftContents[nomorKado].insertBefore(pInfo, youtubePlayer3.nextSibling);
                    youtubePlayer3.src = ""; // Do not play if it's a placeholder ID
                } else {
                    // Remove placeholder warning if it was there
                    const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                    if(oldPInfo) oldPInfo.remove();
                    youtubePlayer3.src = youtubeVideoURLs[3] + "?autoplay=1&rel=0"; // Add autoplay and rel=0 (optional, to not show related videos)
                }
            }

            if (giftSelectionSection) giftSelectionSection.style.display = 'none'; // Hide gift selection
            if (revealedGiftSection) revealedGiftSection.style.display = 'block'; // Show revealed gift area
            triggerConfetti(); // Trigger confetti when a gift is opened
            if (revealedGiftSection) window.scrollTo({ top: revealedGiftSection.offsetTop - 20, behavior: 'smooth' }); // Scroll to the revealed gift
        }
    }

    window.kembaliPilihKado = function() {
        for (const key in giftContents) {
            if (giftContents[key]) {
                giftContents[key].style.display = 'none';
            }
        }
        if (youtubePlayer3) {
            youtubePlayer3.src = ""; // Stop YouTube video by clearing src
        }

        if (revealedGiftSection) revealedGiftSection.style.display = 'none'; 
        if (giftSelectionSection) giftSelectionSection.style.display = 'block'; 
        if (giftSelectionSection) window.scrollTo({ top: giftSelectionSection.offsetTop - 20, behavior: 'smooth' }); 
    }

}); // End of DOMContentLoaded listener

// Optional: Call confetti again on window.load if you want to ensure it fires after all assets
// window.addEventListener('load', () => {
// if (typeof triggerConfetti === 'function') {
// triggerConfetti();
// }
// });
