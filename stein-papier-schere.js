/**
 * @file Einfaches Stein, Papier, Schere CLI Spiel
 */

const args = process.argv.slice(2);  // entfernt die ersten beiden argumente


/**
 * Validiert die Benutzereingabe
 * @param {string[]} args - CL-Argumente
 * @returns {number} gibt 0 (Stein), 1 (Papier) oder 2 (Schere) zurück
 * @throws {Error} Beendet das Programm mit einer Fehlermeldung (bei ungültiger Eingabe)
 */
function validateInput(args) {
    if (args.length !== 1) {
        console.error("Bitte genau ein Argument übergeben.");
        process.exit(1);
    }

    const arg = args[0].toLowerCase();  // normalisiert eingabe auf kleinbuchstaben

    if (arg === "stein") {
        return 0;
    } else if (arg === "papier") {
        return 1;
    } else if (arg === "schere") {
        return 2;
    } else {
        console.error(`Ungültiges Argument: ${arg}`);
        console.error("Erlaubte Argumente: Stein, Papier oder Schere");
        process.exit(1);
    }
}


/**
 * Generiert einen zufälligen Zug für den Computer
 * @param {number} max - Maximale Anzahl an Nummern
 * @returns {number} Gibt eine zufällige Ganzzahhl zwischen 0 und {max} zurück
 */
function generateComputerMove(max) {
    return Math.floor(Math.random() * max);
}


/**
 * Vergleicht die Züge miteinander und ermittelt den Sieger
 * @param {number} userMove - Zug des Users (0=Stein; 1=Papier; 2=Schere)
 * @param {number} computerMove - Zug des Computers (0=Stein; 1=Papier; 2=Schere)
 */
function compareMoves(userMove, computerMove) {
    const moves = ["Stein", "Papier", "Schere"];

    console.log(`Du hast gewählt: ${moves[userMove]}`);
    console.log(`Computer hat gewählt: ${moves[computerMove]}`);

    if (userMove === computerMove) {
        console.log("Unentschieden!");
    } else if (
        (userMove === 0 && computerMove === 2) ||  // stien schlägt schere
        (userMove === 1 && computerMove === 0) ||  // papier schlägt stein
        (userMove === 2 && computerMove === 1)     // schere schlägt papier
    ) {
        console.log("Du hast gewonnen!");
    } else {
        console.log("Der Computer hat gewonnen!")
    }
}


/**
 * Steuert den Programmablauf
 * @param {string[]} args - CL-Argumente
 */
function main (args) {
    const userMove = validateInput(args)
    const computerMove = generateComputerMove(3)

    compareMoves(userMove, computerMove) 
}


main(args)
