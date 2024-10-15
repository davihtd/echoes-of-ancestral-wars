import type PlayableCharacter from "../../Engine/Character/PlayableCharacter";
import Controller from "../../Engine/Controller";

export default function setCharacterControls(character: PlayableCharacter) {
  const idleInterval = 200;

  enum KEYS {
    RIGHT = "d",
    LEFT = "a",
    UP = "w",
    DOWN = "s",
    RUN = "Shift",
  }
  
  // derecha
  Controller.setKeyDownEventListener(KEYS.RIGHT, () => {
    character.move.right()
    character.animation.setAnimation("move_side");
  });
  Controller.setKeyUpEventListener(KEYS.RIGHT, () => {
    character.animation.setAnimation("idle_side");
    character.animation.currentInterval = idleInterval;
  });

  // izquierda
  Controller.setKeyDownEventListener(KEYS.LEFT, () => {
    character.move.left()
    character.animation.setAnimation("move_side", true);
  });
  Controller.setKeyUpEventListener(KEYS.LEFT, () => {
    character.animation.setAnimation("idle_side", true);
    character.animation.currentInterval = idleInterval;
  });

  // arriba
  Controller.setKeyDownEventListener(KEYS.UP, () => {
    character.move.top()
    if (Controller.activeKeys.has("d")) {
      character.animation.setAnimation("move_side");
    } else if (Controller.activeKeys.has("a")) {
      character.animation.setAnimation("move_side", true);
    } else {
      character.animation.setAnimation('move_top');
    }
  });
  Controller.setKeyUpEventListener(KEYS.UP, () => {
    character.animation.setAnimation("idle_top");
    character.animation.currentInterval = idleInterval;
  });

  // abajo
  Controller.setKeyDownEventListener(KEYS.DOWN, () => {
    character.move.bottom()
    if (Controller.activeKeys.has("d")) {
      character.animation.setAnimation("move_side");
    } else if (Controller.activeKeys.has("a")) {
      character.animation.setAnimation("move_side", true);
    } else {
      character.animation.setAnimation('move_bottom');
    }
  });
  Controller.setKeyUpEventListener(KEYS.DOWN, () => {
    character.animation.setAnimation("idle_bottom");
    character.animation.currentInterval = idleInterval;
  });

  // correr
  Controller.setKeyDownEventListener(KEYS.RUN, () => character.startRunning());

  // dejar de correr
  Controller.setKeyUpEventListener(KEYS.RUN, () => character.stopRunning());
}
