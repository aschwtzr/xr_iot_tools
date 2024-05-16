<script setup>
import Bluetooth from './Bluetooth.vue'
import Websockets from './Websockets.vue'
import Geolocation from './Geolocation.vue'
import NewsWeatherStream from './NewsWeatherStream.vue'
</script>
<template>
  <div class="pt-4 flex flex-row justify-center">
    <Geolocation />
  </div>
  <div class="pt-4 flex flex-row justify-center">
    <Bluetooth />
  </div>
  <div class="pt-4 flex flex-row justify-center mx-4">
    <Websockets />
  </div>
  <div class="pt-4 flex flex-row justify-center">
    <NewsWeatherStream />
  </div>
</template>