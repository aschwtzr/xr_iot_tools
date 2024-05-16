<script setup>
import { ref } from 'vue'
import { pausableWatch, useBluetooth } from '@vueuse/core'

const { isSupported, isConnected, device, requestDevice, server, errors } =
  useBluetooth({
    acceptAllDevices: true,
    optionalServices: ['battery_service'],
  })
  console.log('errors:', errors)
const batteryPercent = ref()

const isGettingBatteryLevels = ref(false)

async function getBatteryLevels() {
  isGettingBatteryLevels.value = true
  // Get the battery service:
  const batteryService = await server.value.getPrimaryService('battery_service')
  // Get the current battery level
  const batteryLevelCharacteristic =
    await batteryService.getCharacteristic('battery_level')
  // Listen to when characteristic value changes on `characteristicvaluechanged` event:
  batteryLevelCharacteristic.addEventListener(
    'characteristicvaluechanged',
    (event) => {
      batteryPercent.value = event.target.value.getUint8(0)
    },
  )
  // Convert received buffer to number:
  const batteryLevel = await batteryLevelCharacteristic.readValue()
  batteryPercent.value = await batteryLevel.getUint8(0)
}

const { stop } = pausableWatch(isConnected, (newIsConnected) => {
  if (!newIsConnected || !server.value || isGettingBatteryLevels.value) return
  // Attempt to get the battery levels of the device:
  getBatteryLevels()
  // We only want to run this on the initial connection, as we will use an event listener to handle updates:
  stop()
})
</script>

<template>
 <div class="flex flex-col">
  <div>
    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" @click="requestDevice()">
      Request Bluetooth Device
    </button>
  </div>
    <p v-if="isSupported">Bluetooth is supported</p>
    <p v-else>Bluetooth is not supported</p>
    <p v-if="isConnected">Connected to device: {{ device.name }}</p>
    <p v-if="isConnected">Connected to device: {{ batteryPercent }}</p>
 </div>
</template>