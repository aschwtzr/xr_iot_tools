<script setup>
import { UseGeolocation } from '@vueuse/components'

</script>
<template>
  <div class="pt-4 w-full flex flex-row justify-center w-10/12">
    <UseGeolocation v-slot="{ coords: { latitude, longitude }, locatedAt }">
      <div class="flex flex-col space-y-2">
        <div>Latitude: {{ latitude }}</div>
        <div>Longitude: {{ longitude }}</div>
      </div>
    </UseGeolocation>
  </div>
</template>