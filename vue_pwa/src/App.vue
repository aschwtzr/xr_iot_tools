<script setup>
import { ref } from 'vue'
import { useAppStore } from './stores'
import Timers from './components/Timers.vue'
import Sensors from './components/Sensors.vue'
import AppButton from './components/AppButton.vue';

const currentModuleIdx = ref(0)
const newPlayerName = ref('')
const modules = ['home', 'multi-timer', 'sensors']
const appStore = useAppStore()

</script>

<template>
  <div class="w-dhv h-dvh">
    <div class="w-full flex flex-col justify-center items-center pt-4 px-4">
      <h1 class="text-3xl font-bold text-center mb-4">
        Welcome! Select a module to start.
      </h1>
      <div class="grid grid-cols-3 gap-x-2 mb-4">
        <div v-for="mod in useAppStore.modules" >
          <input type="radio" v-model="currentModuleIdx" :value="mod" id="multi-timer" name="module" class="mx-1"/>
          <label :for="mod">{{ mod }}</label>
        </div>
        <div class="">
          <input type="radio" v-model="currentModuleIdx" :value="0" id="multi-timer" name="module" class="mx-1"/>
          <label for="multi-timer">Home</label>
        </div>
        <div class="">
          <input type="radio" v-model="currentModuleIdx" :value="1" id="multi-timer" name="module" class="mx-1"/>
          <label for="multi-timer">Game Timer</label>
        </div>
        <div class="">
          <input type="radio" v-model="currentModuleIdx" :value="2" id="sensors" name="module" class="mx-1"/>
          <label for="sensors">Sensors</label>
        </div>
      </div>
    </div>
    <div v-if="currentModuleIdx === 0">
      <div class="flex flex-col items-center">
        <h3 class="text-xl font-bold text-center">
          Players Names
        </h3>
        <div class="w-1/3 md:w-3/12">
          <div>
            New Player
          </div>
          <input v-model="newPlayerName" class="border border-black rounded-xl px-5 py-2.5 me-2 mb-2 focus:outline-none w-full"/>
        </div>
        <AppButton buttonText="Add Player"  @click="appStore.addPlayer(newPlayerName)" class="w-1/3 md:w-3/12"/>
        <div class="grid grid-cols-2 md:grid-cols-4">
          <div v-for="player, idx in appStore.currentPlayers" :key="`player-${idx}-name-edit`" class="w-full">
            <div class="w-full">
              <div>
                Player {{ player.id + 1 }}
              </div>
              <div>
                {{player.name}}
              </div>
              <!-- <input  class="border border-black rounded-xl px-5 py-2.5 me-2 mb-2 focus:outline-none"/> -->
              <AppButton buttonText="Remove"  @click="appStore.removePlayer(idx)" class="w-2/2"/>
              <div class="flex flex-row w-full">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Timers v-else-if="currentModuleIdx === 1"/>
    <Sensors v-else-if="currentModuleIdx === 2"/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
