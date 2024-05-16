import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  class Player {
    constructor(name) {
      this.name = name
      this.time = 0
    }
  }

  const players = ref({})

  function seedPlayers(namesList) {
    namesList.map((player, idx) => {
      players.value[idx] = new Player(player)
    })
  }
  return { players, seedPlayers }
}) 