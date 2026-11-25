
/* =========================
   1. BUKA UNDANGAN
========================= */

function openInvitation() {
    const cover = document.getElementById("cover");
  
    if (cover) {
      cover.classList.add("hidden");
    }
  
    // Membuka scroll halaman
    document.body.style.overflow = "auto";
  }
  
  
  /* =========================
     2. COUNTDOWN PERNIKAHAN
  ========================= */
  
  // Tanggal dan waktu acara: 20 Desember 2026, pukul 08.00 WIB
  const weddingDate = new Date(
    "2026-12-20T08:00:00+07:00"
  ).getTime();
  
  function updateCountdown() {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const messageElement = document.getElementById("countdownMessage");
  
    // Pastikan elemen countdown tersedia
    if (
      !daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement
    ) {
      return;
    }
  
    const now = new Date().getTime();
    const distance = weddingDate - now;
  
    if (distance <= 0) {
      daysElement.textContent = "0";
      hoursElement.textContent = "0";
      minutesElement.textContent = "0";
      secondsElement.textContent = "0";
  
      if (messageElement) {
        messageElement.textContent =
          "Hari bahagia telah tiba!";
      }
  
      clearInterval(countdownInterval);
      return;
    }
  
    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );
  
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );
  
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );
  
    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );
  
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  
    if (messageElement) {
      messageElement.textContent =
        "Kami menantikan kehadiran Anda.";
    }
  }
  
  // Jalankan countdown setiap detik
  updateCountdown();
  
  const countdownInterval = setInterval(
    updateCountdown,
    1000
  );
  
  
  /* =========================
     3. SALIN NOMOR REKENING
  ========================= */
  
  async function copyAccount() {
    const accountElement =
      document.getElementById("accountNumber");
  
    const messageElement =
      document.getElementById("copyMessage");
  
    if (!accountElement) {
      return;
    }
  
    const accountNumber =
      accountElement.textContent.trim();
  
    try {
      // Salin nomor rekening ke clipboard
      await navigator.clipboard.writeText(accountNumber);
  
      if (messageElement) {
        messageElement.textContent =
          "Nomor rekening berhasil disalin!";
      }
    } catch (error) {
      // Jika clipboard tidak tersedia
      if (messageElement) {
        messageElement.textContent =
          "Gagal menyalin. Silakan salin nomor rekening secara manual.";
      }
    }
  }
  
  
  /* =========================
     4. FORM RSVP VIA WHATSAPP
  ========================= */
  
  function sendRSVP(event) {
    // Mencegah halaman dimuat ulang
    event.preventDefault();
  
    const nameElement =
      document.getElementById("guestName");
  
    const attendanceElement =
      document.getElementById("attendance");
  
    const messageElement =
      document.getElementById("message");
  
    if (!nameElement || !attendanceElement || !messageElement) {
      return;
    }
  
    const guestName = nameElement.value.trim();
    const attendance = attendanceElement.value;
    const message = messageElement.value.trim();
  
    // Periksa input wajib
    if (!guestName || !attendance) {
      alert("Silakan isi nama dan konfirmasi kehadiran.");
      return;
    }
  
    // Ganti nomor ini dengan nomor WhatsApp penerima RSVP.
    // Gunakan kode negara 62 tanpa tanda +.
    const phoneNumber = "62832124131234";
  
    const whatsappMessage =
      `Halo, saya ingin mengonfirmasi undangan pernikahan Andi & Siti.\n\n` +
      `Nama: ${guestName}\n` +
      `Kehadiran: ${attendance}\n` +
      `Ucapan dan doa: ${message || "-"}\n\n` +
      `Terima kasih.`;
  
    const whatsappURL =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
    // Buka WhatsApp dengan pesan yang sudah disiapkan
    window.open(whatsappURL, "_blank");
  }
  
  
  /* =========================
     5. ANIMASI SAAT SCROLL
  ========================= */
  
  const fadeElements =
    document.querySelectorAll(".fade-up");
  
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, observerInstance) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
  
            // Animasi cukup dijalankan sekali
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );
  
    fadeElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    // Fallback untuk browser lama
    fadeElements.forEach(function (element) {
      element.classList.add("show");
    });
  }
  
  
  /* =========================
     6. HUBUNGKAN TOMBOL DAN FORM
  ========================= */
  
  document.addEventListener("DOMContentLoaded", function () {
    // Tombol buka undangan
    const openButton =
      document.getElementById("openInvitation");
  
    if (openButton) {
      openButton.addEventListener(
        "click",
        openInvitation
      );
    }
  
    // Tombol salin rekening
    const copyButton =
      document.getElementById("copyAccount");
  
    if (copyButton) {
      copyButton.addEventListener(
        "click",
        copyAccount
      );
    }
  
    // Form RSVP
    const rsvpForm =
      document.getElementById("rsvpForm");
  
    if (rsvpForm) {
      rsvpForm.addEventListener(
        "submit",
        sendRSVP
      );
    }
  
    // Kunci scroll sebelum undangan dibuka
    const cover =
      document.getElementById("cover");
  
    if (cover && !cover.classList.contains("hidden")) {
      document.body.style.overflow = "hidden";
    }
  });
  