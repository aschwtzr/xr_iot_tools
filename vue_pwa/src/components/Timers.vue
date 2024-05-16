<script setup>
import { ref, computed } from 'vue'
import { useTimestamp } from '@vueuse/core'
import { useAppStore } from '../stores'

const appStore = useAppStore()

const { timestamp, pause, resume } = useTimestamp({ controls: true, offset: 0 })
const gameStartTime = ref(0)
pause()
gameStartTime.value = timestamp.value
const currentPlayer = ref(undefined)
const currentPlayerStartTime = ref(0)

const elapsedTime = computed(() => {
  return (timestamp.value - gameStartTime.value) / 1000
})

const secondStringFormatter = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toFixed(0)}s`
  } else {
    const secs = seconds % 60 > 9 ? (seconds % 60).toFixed(0) : `0${(seconds % 60).toFixed(0)}`
    return `${(seconds / 60).toFixed(0)}:${secs}`
  }
}

const players = ref({})
const currentPlayerTime = computed(() => {
  return currentPlayerStartTime.value ? elapsedTime.value - currentPlayerStartTime.value : 0
})

class Player {
  constructor(name) {
    this.name = name
    this.time = 0
  }
}

class PlayerTimer {
  constructor(player) {
    this.player = player
    this.gameStartTime = elapsedTime.value
  }
  end = () => {
    this.endTime = elapsedTime.value
    this.time = this.endTime - this.gameStartTime
  }
}

appStore.currentPlayers.map((player, idx) => {
  players.value[idx] = new Player(player.name)
})

const toggleTimer = (idx) => {
  if (currentPlayer.value === idx ) {
    players.value[currentPlayer.value].time += elapsedTime.value - currentPlayerStartTime.value
    currentPlayerStartTime.value = elapsedTime.value
    currentPlayer.value = undefined
  } else if (currentPlayer.value !== undefined) {
    // update current player time, start new player timer
    players.value[currentPlayer.value].time += elapsedTime.value - currentPlayerStartTime.value
    currentPlayerStartTime.value = elapsedTime.value
    currentPlayer.value = idx
  } else {
    currentPlayer.value = idx
    currentPlayerStartTime.value = elapsedTime.value
  }
}

</script>
<template>
  <div class="flex flex-col items-center mb-4">
    <div>
      Elapsed Time: 
    </div>
    <div>
      {{ secondStringFormatter(elapsedTime) }}
    </div>
    <button @click="pause()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-3/4 md:w-4/12">
      Pause
    </button>
    <button @click="resume()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-3/4 md:w-4/12">
      {{ elapsedTime <= 0 ? 'Start' : 'Resume'}}
    </button>
  </div>
  <div id="player-selector" class="w-full grid grid-cols-2 md:grid-cols-4">
    <div v-for="player, idx in players" :key="`${idx}-player-selector`" >
      <div class="flex flex-col gap-x-4 items-center">
        <div>{{ player.name }}</div>
        <div v-if="currentPlayer == idx">Time: {{ secondStringFormatter(player.time + currentPlayerTime) }} </div>
        <div v-else>Time: {{ secondStringFormatter(player.time) }}</div>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="toggleTimer(idx)">
          {{ currentPlayer == idx ? 'Stop' : 'Start' }} Timer
        </button>
      </div>
    </div>
  </div>
</template>