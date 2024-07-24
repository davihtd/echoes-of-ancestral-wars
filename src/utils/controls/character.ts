import KeyboardEventManager from "../GameObjects/KeyboardEventManager";
import Character from "../GameObjects/Characters";


export default function setCharacterControls(character: Character) {
    
    const characterControls = new KeyboardEventManager()


    // derecha
    characterControls.setKeyDownEvent('d', () => {
        character.x++;
    });

    // izquierda
    characterControls.setKeyDownEvent('a', () => {
        character.x--;
    });

    // arriba
    characterControls.setKeyDownEvent('w', () => {
        character.y--;
    });

    // abajo
    characterControls.setKeyDownEvent('s', () => {
        character.y++;
    });
}