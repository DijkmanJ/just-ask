<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Zoom Integration Test</h2>
    
    <div class="space-y-4">
      <div class="p-4 border rounded-lg">
        <h3 class="font-bold mb-2">SDK Status</h3>
        <p class="text-gray-600">{{ sdkStatus }}</p>
      </div>

      <div class="p-4 border rounded-lg">
        <h3 class="font-bold mb-2">Meeting Info</h3>
        <div class="space-y-2">
          <input
            v-model="meetingNumber"
            type="text"
            placeholder="Meeting Number"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="userName"
            type="text"
            placeholder="Your Name"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div class="space-x-4">
        <button 
          @click="initZoom"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          :disabled="isInitializing"
        >
          {{ isInitializing ? 'Initializing...' : 'Initialize Zoom SDK' }}
        </button>

        <button 
          @click="joinMeeting"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          :disabled="!isInitialized || isJoining"
        >
          {{ isJoining ? 'Joining...' : 'Join Meeting' }}
        </button>
      </div>

      <div v-if="error" class="p-4 bg-red-100 text-red-700 rounded-lg">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sdkStatus = ref('Not initialized')
const isInitializing = ref(false)
const isJoining = ref(false)
const isInitialized = ref(false)
const error = ref('')
const meetingNumber = ref('')
const userName = ref('')

onMounted(() => {
  console.log('ZoomTest component mounted')
})

function initZoom() {
  try {
    isInitializing.value = true
    error.value = ''
    console.log('Initializing Zoom SDK...')

    // Load Zoom SDK script
    const script = document.createElement('script')
    script.src = 'https://source.zoom.us/2.18.0/lib/vendor.min.js'
    script.onload = () => {
      console.log('Zoom SDK script loaded')
      // @ts-ignore
      window.ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av')
      // @ts-ignore
      window.ZoomMtg.preLoadWasm()
      // @ts-ignore
      window.ZoomMtg.prepareWebSDK()
      // @ts-ignore
      window.ZoomMtg.init({
        leaveUrl: window.location.origin,
        success: () => {
          console.log('SDK initialized successfully')
          sdkStatus.value = 'SDK initialized successfully'
          isInitialized.value = true
        },
        error: (e: unknown) => {
          console.error('SDK initialization failed:', e)
          error.value = 'Failed to initialize SDK'
          sdkStatus.value = 'Initialization failed'
        }
      })
    }
    script.onerror = () => {
      error.value = 'Failed to load Zoom SDK'
      sdkStatus.value = 'Failed to load SDK'
    }
    document.head.appendChild(script)
  } catch (e) {
    console.error('Zoom SDK initialization failed:', e)
    error.value = e instanceof Error ? e.message : 'Failed to initialize Zoom SDK'
    sdkStatus.value = 'Initialization failed'
  } finally {
    isInitializing.value = false
  }
}

function joinMeeting() {
  if (!meetingNumber.value || !userName.value) {
    error.value = 'Please enter both meeting number and your name'
    return
  }

  try {
    isJoining.value = true
    error.value = ''

    fetch('/api/zoom/signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meetingNumber: meetingNumber.value,
        role: 0
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to generate signature')
      }
      return response.json()
    })
    .then(data => {
      // @ts-ignore
      window.ZoomMtg.join({
        signature: data.signature,
        meetingNumber: meetingNumber.value,
        userName: userName.value,
        passWord: '',
        success: () => {
          console.log('Successfully joined meeting')
        },
        error: (e: unknown) => {
          console.error('Failed to join meeting:', e)
          error.value = 'Failed to join meeting'
        }
      })
    })
    .catch(e => {
      console.error('Error joining meeting:', e)
      error.value = e instanceof Error ? e.message : 'Failed to join meeting'
    })
    .finally(() => {
      isJoining.value = false
    })
  } catch (e) {
    console.error('Error joining meeting:', e)
    error.value = e instanceof Error ? e.message : 'Failed to join meeting'
    isJoining.value = false
  }
}
</script> 