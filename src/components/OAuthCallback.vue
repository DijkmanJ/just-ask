<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Processing Authorization...</h1>
      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>
      <div v-else class="text-gray-600">
        Please wait while we complete the authorization process...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (!code) {
      throw new Error('No authorization code received')
    }

    // TODO: Exchange the code for an access token
    // This will be implemented in the backend
    // For now, we'll just redirect to the meeting room
    router.push('/meeting')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred during authorization'
  }
})
</script> 