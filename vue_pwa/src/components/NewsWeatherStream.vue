<script setup>
import { ref } from 'vue'
import { useWebSocket, useGeolocation } from '@vueuse/core'

const { status, send, data, open, close } = useWebSocket('ws://127.0.0.1:8080/location')
const { coords, locatedAt, error, resume, pause } = useGeolocation()
const username = ref('')

const toggleLocationShare = () => {
  if (username.value.length === 0) {
    alert('Please enter a username')
    return
  }
  if (status.value === 'OPEN') {
    close()
  } else {
    resume()
    open()
    const { latitude, longitude, accuracy } = coords.value
    console.log('sending coords', { latitude, longitude, accuracy })
    send(JSON.stringify({ latitude, longitude, accuracy }))
    // setInterval(() => {
    //   const { latitude, longitude, accuracy } = coords.value
    //   console.log('sending coords', { latitude, longitude, accuracy })
    //   send(JSON.stringify({ latitude, longitude, accuracy }))
    // }, 30000);
  }
}
</script>
<template>
  <div class="flex flex-col">
    <input v-model="username" placeholder="Username" class="border border-black rounded-xl px-5 py-2.5 me-2 mb-2 focus:outline-none"/>
    <button v-if="status !== 'OPEN'" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="toggleLocationShare()">
        Share Location
      </button>
      <button v-else class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="toggleLocationShare()">
        Stop Location Share
      </button>
      <div class="grid grid-cols-6">
        <div class="col-span-4">
          {{ data }}
        </div>
      </div>
  </div>
</template>