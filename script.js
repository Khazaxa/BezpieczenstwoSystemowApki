// Pobierz elementy formularza i przypisz je do zmiennych
const cipherMethodSelect = document.getElementById("cipherMethod");
const shiftAmount = document.getElementById("shiftAmount");
const shiftLabel = document.getElementById("shiftLabel");
const inputText = document.getElementById("inputText");
const encryptedText = document.getElementById("encryptedText");
const inputPassword = document.getElementById("inputPassword");
const decryptedText = document.getElementById("decryptedText");

// Funkcja szyfrowania Cezara
function caesarCipher(text, shift) {
    const alphabet = "aąbcćdeęfghijklłmnńoóprsśtuvwxyzźż";
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();

        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            const newIndex = (index + shift + alphabet.length) % alphabet.length;
            const encryptedChar = alphabet[newIndex];
            result += encryptedChar;
        } else {
            result += text[i];
        }
    }

    return result;
}

// Funkcja zmienia widoczność pola wyboru przesunięcia w zależności od wybranej metody szyfrowania
function toggleShiftAmount() {
    const method = cipherMethodSelect.value;
    if (method === "ceasar") {
        shiftAmount.style.display = "inline-block";
        shiftLabel.style.display = "inline-block";
    } else {
        shiftAmount.style.display = "none";
        shiftLabel.style.display = "none";
    }
}

// Wywołaj funkcję toggleShiftAmount() na początku, aby ukryć pole wyboru przesunięcia
toggleShiftAmount();

// Obsługa przycisku Szyfruj
function encrypt() {
    const method = cipherMethodSelect.value;
    if (method === "ceasar") {
        const shift = parseInt(shiftAmount.value);
        if (!isNaN(shift) && shift >= 1 && shift <= 34) {
            const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoóprsśtuvwxyzźż]/g, '');
            const encrypted = caesarCipher(textToEncrypt, shift);
            encryptedText.value = encrypted;
        } else {
            alert("Proszę podać prawidłowe przesunięcie (1-34).");
        }
    } else {
        alert("Wybrano inną metodę szyfrowania. Szyfrowanie jest dostępne tylko dla metody Cezara z przesunięciem.");
    }
}

// Obsługa przycisku Deszyfruj
function decrypt() {
    const method = cipherMethodSelect.value;
    if (method === "ceasar") {
        const shift = parseInt(shiftAmount.value);
        if (!isNaN(shift) && shift >= 1 && shift <= 34) {
            const textToDecrypt = inputPassword.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoóprsśtuvwxyzźż]/g, '');
            const decrypted = caesarCipher(textToDecrypt, -shift);
            decryptedText.value = decrypted;
        } else {
            alert("Proszę podać prawidłowe przesunięcie (1-34).");
        }
    } else {
        alert("Wybrano inną metodę szyfrowania. Deszyfrowanie jest dostępne tylko dla metody Cezara z przesunięciem.");
    }
}

// ...
