import GameObject from '../GameObject/GameObject'

export type CharacterStats = {
    health: number
    strength: number
    intelligence: number
}

export default class Character extends GameObject<'div'> {
    health: number
    strength: number
    intelligence: number

    constructor(layer: HTMLElement, stats: CharacterStats) {
        super('div', layer, { width: 10, height: 20 })
        this._element.style.backgroundColor = 'black'

        this.health = stats.health
        this.strength = stats.strength
        this.intelligence = stats.intelligence
    }
}