<script setup>
import { ref } from 'vue'
import { useWebSocket } from '@vueuse/core'
// import { UseWebSocket } from '@vueuse/components'

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

// const websocketURL = ref('wss://echo.websocket.org')
const websocketURL = ref('ws://127.0.0.1:8080')
const message = ref('')
const { status, send, data, open, close } = useWebSocket(websocketURL)

</script>
<template>
  <div class="flex flex-col w-full w-3/4 md:w-10/12">
    <div id="controls" class="flex flex-col " >
      <input v-model="websocketURL" placeholder="WebSocket URL"  class="border border-black rounded-xl px-5 py-2.5 me-2 mb-2 focus:outline-none"/>
      <button v-if="status !== 'OPEN'" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="open()">
        Open WebSocket
      </button>
      <button v-else class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="close()">
        Close WebSocket
      </button>
      <p>Status: {{ status }}</p>
      <input v-model="message" placeholder="Message"  class="border border-black rounded-xl px-5 py-2.5 me-2 mb-2 focus:outline-none"/>
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="send(message)">
        Send Message
      </button>
    </div>
    <div class="w-full">
      <vue-json-pretty :data="JSON.parse(data)" />
    </div>
  </div>
</template>