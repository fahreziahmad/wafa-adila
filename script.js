// Salin dan ganti seluruh isi script.js Anda dengan kode ini
document.addEventListener('DOMContentLoaded', () => { 

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const lagu = document.getElementById('laguUlangTahun');
    const tombolMusik = document.getElementById('tombolPutarMusik');
    const ikonPlay = document.getElementById('ikonPlay');
    const ikonPause = document.getElementById('ikonPause');
    let musikSudahInteraksi = false;

    if (tombolMusik && lagu && ikonPlay && ikonPause) {
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
        lagu.onplay = () => { ikonPlay.style.display = 'none'; ikonPause.style.display = 'block'; };
        lagu.onpause = () => { ikonPlay.style.display = 'block'; ikonPause.style.display = 'none'; };
    }
    
    const triggerConfetti = () => {
        if (typeof confetti === 'function') {
            const defaults = { spread: 360, ticks: 70, gravity: 0, decay: 0.95, startVelocity: 25, shapes: ['star', 'circle', 'heart'], colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#DB7093', '#C71585', '#FFFFFF'] };
            function shoot() {
                confetti({ ...defaults, particleCount: 60, scalar: 1.2, shapes: ['star', 'heart'] });
                confetti({ ...defaults, particleCount: 30, scalar: 0.8, shapes: ['circle'] });
            }
            setTimeout(shoot, 0);
            setTimeout(shoot, 150);
            setTimeout(shoot, 300);
        }
    };

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

    // =======================================================================
    // VVVV         SAYA SUDAH MENGGANTINYA DENGAN LINK TES         VVVV
    // =======================================================================
    const youtubeVideoURLs = {
         3: "https://www.youtube.com/watch?v=cO1KJLw0014" // INI ADALAH LINK TES YANG PASTI BISA
    };
    // =======================================================================

    /**
     * Fungsi ini JANGAN DIUBAH. Fungsi ini sudah benar.
     */
    function getYouTubeEmbedUrl(url) {
        let videoId = null;
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === "youtu.be") {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.hostname.includes("youtube.com")) {
                videoId = urlObj.searchParams.get("v");
            }
        } catch (e) { return null; }
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return null;
    }

    // Bagian di bawah ini JANGAN DIUBAH. Semuanya sudah otomatis.
    window.pilihKado = function(nomorKado) {
        for (const key in giftContents) {
            if (giftContents[key]) giftContents[key].style.display = 'none';
        }
        if (giftContents[nomorKado]) {
            giftContents[nomorKado].style.display = 'block';
            if (nomorKado === 3 && youtubePlayer3 && youtubeVideoURLs[3]) {
                const embedUrl = getYouTubeEmbedUrl(youtubeVideoURLs[3]);
                const oldPInfo = giftContents[nomorKado].querySelector('.text-red-500');
                if(oldPInfo) oldPInfo.remove();
                if (embedUrl) {
                    youtubePlayer3.src = embedUrl + "?autoplay=1&rel=0&modestbranding=1";
                } else {
                    const pInfo = document.createElement('p');
                    pInfo.textContent = 'Link YouTube tidak valid. Cek kembali link di bagian atas script.js.';
                    pInfo.className = 'text-red-500 text-sm mt-2 font-semibold';
                    giftContents[nomorKado].insertBefore(pInfo, youtubePlayer3.nextSibling);
                    youtubePlayer3.src = "";
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
            if (giftContents[key]) giftContents[key].style.display = 'none';
        }
        if (youtubePlayer3) {
            youtubePlayer3.src = "";
        }
        if (revealedGiftSection) revealedGiftSection.style.display = 'none'; 
        if (giftSelectionSection) giftSelectionSection.style.display = 'block'; 
        if (giftSelectionSection) window.scrollTo({ top: giftSelectionSection.offsetTop - 20, behavior: 'smooth' }); 
    }
});