import type PlayableCharacter from "../../Engine/Character/PlayableCharacter";
import Controller from "../../Engine/Controller";

export default function setCharacterControls(character: PlayableCharacter) {
  const animationIntervals = {
    idle: 200,
    walk: 100,
    run: 50,
  };

  enum KEYS {
    RIGHT = "d",
    LEFT = "a",
    UP = "w",
    DOWN = "s",
    RUN = "shift",
  }

  const setWalkOrRunInterval = () => {
    if (Controller.activeKeys.has(KEYS.RUN)) {
      character.animation.currentInterval = animationIntervals.run;
    } else {
      character.animation.currentInterval = animationIntervals.walk;
    }
  };

  const setIdleAnimation = (
    ...params: Parameters<typeof character.animation.setAnimation>
  ) => {
    character.animation.currentInterval = animationIntervals.idle;
    character.animation.setAnimation(...params);
  };

  // derecha
  Controller.setKeyDownEventListener(KEYS.RIGHT, () => {
    setWalkOrRunInterval();
    character.move.right();
    character.animation.setAnimation("move_side");
  });
  Controller.setKeyUpEventListener(KEYS.RIGHT, () => {
    setIdleAnimation("idle_side");
  });

  // izquierda
  Controller.setKeyDownEventListener(KEYS.LEFT, () => {
    setWalkOrRunInterval();
    character.move.left();
    character.animation.setAnimation("move_side", true);
  });
  Controller.setKeyUpEventListener(KEYS.LEFT, () => {
    setIdleAnimation("idle_side", true);
  });

  // arriba
  Controller.setKeyDownEventListener(KEYS.UP, () => {
    setWalkOrRunInterval();
    character.move.top();
    if (Controller.activeKeys.has(KEYS.RIGHT)) {
      character.animation.setAnimation("move_side");
    } else if (Controller.activeKeys.has(KEYS.LEFT)) {
      character.animation.setAnimation("move_side", true);
    } else {
      character.animation.setAnimation("move_top");
    }
  });
  Controller.setKeyUpEventListener(KEYS.UP, () => {
    setIdleAnimation("idle_top");
  });

  // abajo
  Controller.setKeyDownEventListener(KEYS.DOWN, () => {
    setWalkOrRunInterval();
    character.move.bottom();
    if (Controller.activeKeys.has(KEYS.RIGHT)) {
      character.animation.setAnimation("move_side");
    } else if (Controller.activeKeys.has(KEYS.LEFT)) {
      character.animation.setAnimation("move_side", true);
    } else {
      character.animation.setAnimation("move_bottom");
    }
  });
  Controller.setKeyUpEventListener(KEYS.DOWN, () => {
    setIdleAnimation("idle_bottom");
  });

  // correr
  Controller.setKeyDownEventListener(KEYS.RUN, () => {
    character.startRunning();
    character.animation.currentInterval = animationIntervals.run;
  });

  // dejar de correr
  Controller.setKeyUpEventListener(KEYS.RUN, () => {
    character.stopRunning();
    character.animation.currentInterval = animationIntervals.walk;
  });
}
