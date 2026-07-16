/**
 * @file Pig Latin CLI Übersetzer
 */

const args = process.argv.slice(2);  // entfernt die ersten beiden argumente

// buchstabenlisten
const vowels = ["a", "e", "i", "o", "u"];
const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];


/**
 * Validiert die Benutzereingabe
 * @param {string[]} args - CL-Argumente
 * @throws {Error} Beendet das Programm mit einer Fehlermeldung (bei ungültiger Eingabe)
 */
function validateInput(args) {
    if (args.length < 1) {
        console.error("Bitte mintestens ein Wort als Argument übergeben.");
        process.exit(1);
    }
    for (const word of args) {
        if (word.length < 2) {
            console.error(`Bitte mindestens 2 Buchstaben pro Word.`);
            process.exit(1);
        }
    }
}


/**
 * Übersetzt alle Wörter in Pig Latin
 * @param {string[]} words - Wörter
 * @returns {string[]} Übersetzte Wörter
 */
function translateAll(words) {
    const translations = [];
    for (const word of words) {
        translations.push(translateWord(word));
    }
    return translations
}


/**
 * Übersetzt ein Wort in Pig Latin
 * @param {string} word - Wort
 * @returns {string} Übersetztes Wort
 */
function translateWord(word) {

    const patCase = getStartingPattern(word);

    switch (patCase) {
        case 0:  // vokal
            return word + "way";
        case 1:  /// konsonant + vokal
            return word.slice(1) + word[0] + "ay";
        case 2:  // 2 konsonanten
            return word.slice(2) + word.slice(0, 2) + "ay";
        default:
            return word  // fallback
    }
}


/**
 * Bestimmt das Muster des Wortes
 * @param {string} word - Wort
 * @returns {number} gibt 0 (vokal), 1 (konsonant + vokal) oder 2 (2 konsonanten) zurück
 */
function getStartingPattern(word) {
    const firstLetter = word[0].toLowerCase();
    const secondLetter = word[1].toLowerCase();

    if (vowels.includes(firstLetter)) {
        return 0;  // vokal
    } else if (consonants.includes(firstLetter) && vowels.includes(secondLetter)) {
        return 1;  // konsonant + vokal
    } else if (consonants.includes(firstLetter) && consonants.includes(secondLetter)) {
        return 2;  // 2 konsonanten
    }
}


/**
 * Steuert den Programmablauf
 * @param {string[]} args - CL-Argumente
 */
function main(args) {
    validateInput(args);
    
    const translated = translateAll(args);

    console.log("Pig Latin Übersetzung:")
    console.log(translated.join(" "));
}


main(args);
