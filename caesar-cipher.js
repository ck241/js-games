/**
 * @file Caesar Cipher Verschlüsselung
 */

const args = process.argv.slice(2);  // entfernt die ersten beiden argumente

// alphabet
const alphabet = "abcdefghijklmnopqrstuvwxyz";

/**
 * Validiert die Benutzereingabe
 * @param {string[]} args - CL-Argumente
 * @returns {{phrase: string, shift: number}} Die validierten Eingabewerte
 * @throws {Error} Beendet das Programm mit einer Fehlermeldung (bei ungültiger Eingabe)
 */
function validateInput(args) {
    // überprüft ob genau zwei argumente übergeben wurden und ob das zweite argument eine zahl ist
    if (args.length !== 2 || isNaN(parseInt(args[1], 10))) {
        console.error('Bitte einen Text und eine Verschiebung übergeben ("<Ein Text>" <Verschiebung>).');
        process.exit(1);
    }

    return {
        phrase: args[0],
        shift: parseInt(args[1], 10)
    };
}

/**
 * Verschlüsselt ein Zeichen
 * @param {string} char - Das zu verschlüsselnde Zeichen
 * @param {number} shift - Die Verschiebung
 * @returns {string} Das verschlüsselte Zeichen
 */
function encryptChar(char, shift) {
    const lowerChar = char.toLowerCase();
    const index = alphabet.indexOf(lowerChar);

    // wenn das zeichen kein buchstabe ist, gib es unverändert zurück
    if (index === -1) {
        return char;
    }

    let shiftedIndex = index + shift;

    // überprüft ob der index im alphabet liegt
    // wenn nicht, wird er auf das alphabet zurückgesetzt
    while (shiftedIndex > 25) {
        shiftedIndex -= 26;
    }
    while (shiftedIndex < 0) {
        shiftedIndex += 26;
    }

    // speichert das verschlüsselte zeichen
    const encryptedChar = alphabet[shiftedIndex];

    // wenn das zeichen groß war, gib es auch groß zurück
    if (char === char.toUpperCase()) {
        return encryptedChar.toUpperCase();
    } else {
        return encryptedChar;
    }
}


/**
 * Verschlüsselt einen Text
 * @param {string} phrase - Der zu verschlüsselnde Text
 * @param {number} shift - Die Verschiebung
 * @returns {string} Der verschlüsselte Text
 */
function encryptPhrase(phrase, shift) {
    let result = "";

    // verschlüsselt jedes zeichen einzeln
    for (let i = 0; i < phrase.length; i++) {
        result += encryptChar(phrase[i], shift);
    }

    return result;
}


/**
 * Steuert den Programmablauf
 * @param {string[]} args - CL-Argumente
 */
function main(args) {
    const { phrase, shift } = validateInput(args);

    const encryptedPhrase = encryptPhrase(phrase, shift);

    console.log("Caesar Cipher Verschlüsselung:")
    console.log(encryptedPhrase);
}


main(args);
