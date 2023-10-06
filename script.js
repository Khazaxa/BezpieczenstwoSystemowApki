// Funkcja do szyfrowania tekstu za pomocą szyfru Cezara
function szyfrujCezara(tekst, przesuniecie) {
    const alphabet = "aąbcćdeęfghijklłmnńoóprsśtuvwxyzźż";
    let zaszyfrowanyTekst = "";
  
    for (let i = 0; i < tekst.length; i++) {
      const znak = tekst[i];
      const index = alphabet.indexOf(znak.toLowerCase());
  
      if (index === -1) {
        // Jeśli znak nie jest w alfabecie, dodaj go bez zmian
        zaszyfrowanyTekst += znak;
      } else {
        // Znajdź nowy indeks dla zaszyfrowanego znaku
        const nowyIndex = (index + przesuniecie) % alphabet.length;
        if (znak === znak.toUpperCase()) {
          zaszyfrowanyTekst += alphabet[nowyIndex].toUpperCase();
        } else {
          zaszyfrowanyTekst += alphabet[nowyIndex];
        }
      }
    }
  
    return zaszyfrowanyTekst;
  }
  
  // Funkcja do deszyfrowania tekstu za pomocą szyfru Cezara
  function deszyfrujCezara(tekst, przesuniecie) {
    const alphabet = "aąbcćdeęfghijklłmnńoóprsśtuvwxyzźż";
    let odszyfrowanyTekst = "";
  
    for (let i = 0; i < tekst.length; i++) {
      const znak = tekst[i];
      const index = alphabet.indexOf(znak.toLowerCase());
  
      if (index === -1) {
        // Jeśli znak nie jest w alfabecie, dodaj go bez zmian
        odszyfrowanyTekst += znak;
      } else {
        // Znajdź nowy indeks dla odszyfrowanego znaku
        let nowyIndex = index - przesuniecie;
        if (nowyIndex < 0) {
          nowyIndex = alphabet.length + nowyIndex;
        }
        if (znak === znak.toUpperCase()) {
          odszyfrowanyTekst += alphabet[nowyIndex].toUpperCase();
        } else {
          odszyfrowanyTekst += alphabet[nowyIndex];
        }
      }
    }
  
    return odszyfrowanyTekst;
  }
  
  // Obsługa formularza HTML
  document.addEventListener("DOMContentLoaded", function () {
    const szyfrujButton = document.getElementById("szyfruj");
    const deszyfrujButton = document.getElementById("deszyfruj");
    const wynikTekst = document.getElementById("wynik-tekst");
  
    szyfrujButton.addEventListener("click", function () {
      const tekstDoZaszyfrowania = document.getElementById("tekst").value;
      const przesuniecie = parseInt(document.getElementById("przesuniecie").value, 10);
  
      const zaszyfrowanyTekst = szyfrujCezara(tekstDoZaszyfrowania.toLowerCase(), przesuniecie);
      wynikTekst.textContent = "Zaszyfrowany tekst: " + zaszyfrowanyTekst;
    });
  
    deszyfrujButton.addEventListener("click", function () {
      const tekstDoDeszyfrowania = document.getElementById("tekst").value;
      const przesuniecie = parseInt(document.getElementById("przesuniecie").value, 10);
  
      const odszyfrowanyTekst = deszyfrujCezara(tekstDoDeszyfrowania.toLowerCase(), przesuniecie);
      wynikTekst.textContent = "Odszyfrowany tekst: " + odszyfrowanyTekst;
    });
  });
  