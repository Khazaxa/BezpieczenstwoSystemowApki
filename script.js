const cipherMethodSelect = document.getElementById("cipherMethod");
const shiftAmount = document.getElementById("shiftAmount");
const shiftLabel = document.getElementById("shiftLabel");
const inputText = document.getElementById("inputText");
const encryptedText = document.getElementById("encryptedText");
const inputPassword = document.getElementById("inputPassword");
const decryptedText = document.getElementById("decryptedText");
const alphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";

function caesarCipher(text, shift) {    
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
    const isVigenere = method === "vigener";

    shiftAmount.style.display = method === "ceasar" ? "inline-block" : "none";
    shiftLabel.style.display = method === "ceasar" ? "inline-block" : "none";
    vigenereKey.style.display = isVigenere ? "inline-block" : "none";
}

function encrypt() {
    const method = cipherMethodSelect.value;
    switch (method) {
        case "ceasar": {
            const shift = parseInt(shiftAmount.value);
            if (!isNaN(shift) && shift >= 1 && shift <= 34) {
                const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
                const encrypted = caesarCipher(textToEncrypt, shift);
                encryptedText.value = encrypted;
            } else {
                alert("Proszę podać prawidłowe przesunięcie (1-34).");
            }
            break;
        }
        case "polibiusz": {
            const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
            const encrypted = polibiuszCipher(textToEncrypt);
            encryptedText.value = encrypted;
            break;
        }
        case "vigener": {
            const key = document.getElementById('vigenereKey').value;
            const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
            const encrypted = vigenereCipher(textToEncrypt, key);
            encryptedText.value = encrypted;
            break;
        }
        case "vigener":
            const textToEncrypt = inputText.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
            const encrypted = vigenereCipher(textToEncrypt);
            encryptedText.value = encrypted;
            break;
        case "playfair":
            // playfair cipher
            break;
        default:
            alert("Wybrano inną metodę szyfrowania.");
            break;
    }
}

function decrypt() {
    const method = cipherMethodSelect.value;
    switch (method) {
        case "ceasar": {
            const shift = parseInt(shiftAmount.value);
            if (!isNaN(shift) && shift >= 1 && shift <= 34) {
                const textToDecrypt = inputPassword.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
                const decrypted = caesarCipher(textToDecrypt, -shift);
                decryptedText.value = decrypted;
            } else {
                alert("Proszę podać prawidłowe przesunięcie (1-34).");
            }
            break;
        }
        case "polibiusz": {
            const textToDecrypt = inputPassword.value.replace(/[^1-6 ]/g, '');
            const decrypted = polibiuszDecipher(textToDecrypt);
            decryptedText.value = decrypted;
            break;
        }
        case "trithemius": {
            const textToDecrypt = inputPassword.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
            const decrypted = trithemiusDecipher(textToDecrypt);
            decryptedText.value = decrypted;
            break;
        }
        case "vigener": {
            const key = document.getElementById('vigenereKey').value;
            const textToDecrypt = inputPassword.value.toLowerCase().replace(/[^aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż]/g, '');
            const decrypted = vigenereDecipher(textToDecrypt, key);
            decryptedText.value = decrypted;
            break;
        }
        case "playfair":
            // playfair decipher
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
    'd': '41', 'ń': '42', 'n': '43', 'u': '44', 'm': '45', 'f': '46', 'ź': '47', 
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
        let found = false;
        for (const letter in polibiuszTable) {
            if (polibiuszTable[letter] === pair) {
                result += letter;
                found = true;
                break;
            }
        }
        if (!found) result += '?'; 
    }

    return result;
}

function trithemiusCipher(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let index = alphabet.indexOf(text[i].toLowerCase());
        if (index !== -1) {
            let newIndex = (index + i + 1) % alphabet.length;
            let newChar = alphabet[newIndex];
            result += text[i] === text[i].toUpperCase() ? newChar.toUpperCase() : newChar;
        } else {
            result += text[i];
        }
    }
    return result;
}

function trithemiusDecipher(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let index = alphabet.indexOf(text[i].toLowerCase());
        if (index !== -1) {
            let newIndex = (index - i - 1 + alphabet.length) % alphabet.length;
            let newChar = alphabet[newIndex];
            result += text[i] === text[i].toUpperCase() ? newChar.toUpperCase() : newChar;
        } else {
            result += text[i];
        }
    }
    return result;
}

function vigenereCipher(text, key) {
    let encryptedText = '';
    for (let i = 0, j = 0; i < text.length; i++) {
        const char = text[i];
        const keyChar = key[j % key.length];
        if (alphabet.includes(char)) {
            const shift = alphabet.indexOf(keyChar);
            const encryptedChar = alphabet[(alphabet.indexOf(char) + shift) % alphabet.length];
            encryptedText += encryptedChar;
            j++;
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

function vigenereDecipher(text, key) {
    let decryptedText = '';
    for (let i = 0, j = 0; i < text.length; i++) {
        const char = text[i];
        const keyChar = key[j % key.length];
        if (alphabet.includes(char)) {
            const shift = alphabet.indexOf(keyChar);
            const decryptedChar = alphabet[(alphabet.indexOf(char) - shift + alphabet.length) % alphabet.length];
            decryptedText += decryptedChar;
            j++;
        } else {
            decryptedText += char;
        }
    }
    return decryptedText;
}

function playfairCipher(text) {
    // playfair
}

function playfairDecipher(text) {
    // playfair
}