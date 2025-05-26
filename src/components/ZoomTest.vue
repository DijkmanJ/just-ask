<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Zoom Integration Test</h2>
    
    <div class="space-y-4">
      <div class="p-4 border rounded-lg">
        <h3 class="font-bold mb-2">SDK Status</h3>
        <p class="text-gray-600">{{ sdkStatus }}</p>
      </div>

      <button 
        @click="initZoom"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="isInitializing"
      >
        {{ isInitializing ? 'Initializing...' : 'Initialize Zoom SDK' }}
      </button>

      <div v-if="error" class="p-4 bg-red-100 text-red-700 rounded-lg">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ZoomMtg } from '@zoomus/websdk'

const sdkStatus = ref('Not initialized')
const isInitializing = ref(false)
const error = ref('')

async function initZoom() {
  try {
    isInitializing.value = true
    error.value = ''

    // Initialize Zoom SDK
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av')
    await ZoomMtg.preLoadWasm()
    await ZoomMtg.prepareWebSDK()

    sdkStatus.value = 'SDK initialized successfully'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initialize Zoom SDK'
    sdkStatus.value = 'Initialization failed'
  } finally {
    isInitializing.value = false
  }
}
</script> 