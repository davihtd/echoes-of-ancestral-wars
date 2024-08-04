import type PlayableCharacter from '../../Engine/Character/PlayableCharacter';
import Controller from '../../Engine/Controller';


export default function setCharacterControls(character: PlayableCharacter) {
    // derecha
    Controller.setKeyDownEventListener('d', () => character.move.right());

    // izquierda
    Controller.setKeyDownEventListener('a', () => character.move.left());

    // arriba
    Controller.setKeyDownEventListener('w', () => character.move.top());

    // abajo
    Controller.setKeyDownEventListener('s', () => character.move.bottom());

    // correr
    Controller.setKeyDownEventListener('Shift', () => character.startRunning());

    // dejar de correr
    Controller.setKeyUpEventListener('Shift', () => character.stopRunning());
}