import type PlayableCharacter from '../../Engine/Character/PlayableCharacter';
import Controller from '../../Engine/Controller';


export default function setCharacterControls(character: PlayableCharacter) {
    // derecha
    Controller.setKeyDownEventListener('d', () => character.moveRight());

    // izquierda
    Controller.setKeyDownEventListener('a', () => character.moveLeft());

    // arriba
    Controller.setKeyDownEventListener('w', () => character.moveTop());

    // abajo
    Controller.setKeyDownEventListener('s', () => character.moveBottom());

    // correr
    Controller.setKeyDownEventListener('Shift', () => character.startRunning());

    // dejar de correr
    Controller.setKeyUpEventListener('Shift', () => character.stopRunning());
}