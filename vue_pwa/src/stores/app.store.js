import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const modules = ref({
    home: 'Home',
    timer: 'Timer',
    sensors: 'Sensors',
  })

  const currentModule = ref('')
  const players = ref({})
  class Player {
    constructor(name, id, number) {
      this.name = name
      this.id = id,
      this.number = number
    }
  }
  const currentPlayers = computed(() => {
    return Object.values(players.value)
  })
  function addPlayer(name) {
    const nameString = `${name}`
    const id = Date.now()
    const player = new Player(nameString, id, currentPlayers.value.length + 1)
    players.value[player.id] = player
  }
  function removePlayer(id) {
    delete players.value[id]
  }
  function editPlayer(id, newName) {
    console.log('editPlayer', id, newName)
    players.value[id].name = newName
  }
  return { currentModule, currentModule, currentPlayers, players, modules, addPlayer, removePlayer, editPlayer }
}, {
  persist: {
    storage: localStorage,
  }
}) 