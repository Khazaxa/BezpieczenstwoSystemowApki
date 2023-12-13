const cipherMethodSelect = document.getElementById("cipherMethod");
const shiftAmount = document.getElementById("shiftAmount");
const shiftLabel = document.getElementById("shiftLabel");
const inputText = document.getElementById("inputText");
const encryptedText = document.getElementById("encryptedText");
const inputPassword = document.getElementById("inputPassword");
const decryptedText = document.getElementById("decryptedText");

function caesarCipher(text, shift) {
    const alphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
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

function toggleShiftAmount() {
    const method = cipherMethodSelect.value;
    shiftAmount.style.display = method === "ceasar" ? "inline-block" : "none";
    shiftLabel.style.display = method === "ceasar" ? "inline-block" : "none";
}

function encrypt() {
    const method = cipherMethodSelect.value;
    switch (method) {
        case "ceasar":
            const shift = parseInt(shiftAmount.value);
            if (!isNaN(shift) && shift >= 1 && shift <= 34) {
                const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
                const encrypted = caesarCipher(textToEncrypt, shift);
                encryptedText.value = encrypted;
            } else {
                alert("Proszę podać prawidłowe przesunięcie (1-34).");
            }
            break;
        case "polibiusz":
            const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
            const encrypted = polibiuszCipher(textToEncrypt);
            encryptedText.value = encrypted;
            break;
        default:
            alert("Wybrano inną metodę szyfrowania.");
            break;
    }
}

function decrypt() {
    const method = cipherMethodSelect.value;
    switch (method) {
        case "ceasar":
            const shift = parseInt(shiftAmount.value);
            if (!isNaN(shift) && shift >= 1 && shift <= 34) {
                const textToDecrypt = inputPassword.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
                const decrypted = caesarCipher(textToDecrypt, -shift);
                decryptedText.value = decrypted;
            } else {
                alert("Proszę podać prawidłowe przesunięcie (1-34).");
            }
            break;
        case "polibiusz":
            const textToDecrypt = inputPassword.value.replace(/[^1-6 ]/g, '');
            const decrypted = polibiuszDecipher(textToDecrypt);
            decryptedText.value = decrypted;
            break;
        default:
            alert("Wybrano inną metodę szyfrowania.");
            break;
    }
}

const polibiuszTable = {
    'b': '11', 'e': '12', 'r': '13', 'q': '14', 'ą': '15', 'ł': '16', 'p': '17', 
    'o': '21', 'i': '22', 'ć': '23', 'l': '24', 's': '25', 'ś': '26', 'ż': '27',
    'c': '31', 'k': '32', 'a': '33', 'h': '34', 'ę': '35', 'v': '36', 'w': '37', 
    'd': '41', 'ń': '42', 'n': '43', 'u': '44', 'm': '45', 't': '46', 'ź': '47', 
    'ó': '51', 'g': '52', 'j': '53', 't': '54', 'z': '55', 'y': '56', 'x': '57'
};

function polibiuszCipher(text) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();

        if (polibiuszTable.hasOwnProperty(char)) {
            result += polibiuszTable[char] + ' ';
        } else {
            result += text[i];
        }
    }

    return result.trim();
}

function polibiuszDecipher(text) {
    let result = '';
    const pairs = text.split(' ');

    for (const pair of pairs) {
        if (pair === '') {
            result += ' ';
        } else {
            for (const letter in polibiuszTable) {
                if (polibiuszTable[letter] === pair) {
                    result += letter;
                    break;
                }
            }
        }
    }

    return result;
}
