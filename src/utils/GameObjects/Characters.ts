import GameObject from './GameObject'
import map from '../Engine/map'

export default class Character extends GameObject<HTMLDivElement> {
    health: number
    strength: number
    intelligence: number

    constructor(health: number, strength: number, intelligence: number) {
        const element = document.createElement('div')
        element.style.backgroundColor = 'black'
        map.insertElement(element, 'player')
        super(element, {width: 10, height: 20})
        this.health = health
        this.strength = strength
        this.intelligence = intelligence
    }
}