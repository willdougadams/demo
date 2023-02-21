import React, { useState, useRef } from 'react'
import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'

const HEIGHT = 720
const WIDTH = 1080

class MainScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }

  init () {
    this.cameras.main.setBackgroundColor('#24252A')
  }

  create () {
    this.square = this.add.rectangle(400, 96, 100, 100, 0xFFFFFF) as any
    this.square.body.collideWorldBounds = true
    // this.square.body.bounce.y = 0.7
    // this.square.body.bounce.x = 0.7
    this.physics.add.existing(this.square);
  }

  update () {
    console.log('UPDATE')
  }
}

const gameConfig: GameInstance = {
  width: WIDTH,
  height: HEIGHT,
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true
    }
  },
  scene: MainScene
};

export const Game: React.FC = () => {
  const gameRef = useRef<HTMLIonPhaserElement>(null)
  const [game, setGame] = useState<GameInstance>(Object.assign({}, gameConfig))

  return (
    <div>
      <IonPhaser ref={gameRef} game={game} initialize={true} />
    </div>
  );
}