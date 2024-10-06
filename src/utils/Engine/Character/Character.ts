import { Layers } from '../constants'
import GameObject from '../GameObject/GameObject'
import type Point from '../Utils/Point'

export type CharacterStats = {
    health: number
    strength: number
    intelligence: number
}

export default class Character extends GameObject<'div'> {
    health: number
    strength: number
    intelligence: number

    constructor(layer: HTMLElement, position: Point, stats: CharacterStats) {
        super('div', layer)

        this._element.style.zIndex = Layers.CHARACTER.toString();

        /**@todo obtener las dimensiones del mapa actual */
        this.dimensions.width = 16;
        this.dimensions.height = 16;

        this.position.x = position.x
        this.position.y = position.y

        this.health = stats.health
        this.strength = stats.strength
        this.intelligence = stats.intelligence
    }
}