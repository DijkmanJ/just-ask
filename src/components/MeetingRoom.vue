<template>
  <div class="grid grid-cols-12 gap-4 h-screen">
    <!-- Video Conference Area -->
    <div class="col-span-8 bg-gray-900" ref="zoomContainer">
      <!-- Zoom SDK will mount here -->
    </div>

    <!-- Questions Panel -->
    <div class="col-span-4 bg-white p-4 overflow-y-auto">
      <div class="mb-4">
        <h2 class="text-xl font-bold mb-2">Questions</h2>
        <div class="relative">
          <input
            v-model="newQuestion"
            type="text"
            class="w-full p-2 border rounded-lg pr-12"
            placeholder="Type your question..."
            @keyup.enter="submitQuestion"
          />
          <button
            @click="submitQuestion"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Ask
          </button>
        </div>
      </div>

      <!-- Questions List -->
      <div class="space-y-4">
        <div v-for="group in questionGroups" :key="group.id" class="border rounded-lg p-4">
          <h3 class="font-bold text-lg">{{ group.title }}</h3>
          <p class="text-gray-600">{{ group.count }} similar questions</p>
          <div class="mt-2 space-y-2">
            <div v-for="question in group.questions" :key="question.id" class="text-sm">
              {{ question.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ZoomMtg } from '@zoomus/websdk'

// State
const zoomContainer = ref<HTMLElement | null>(null)
const newQuestion = ref('')
const questionGroups = ref<Array<{
  id: string
  title: string
  count: number
  questions: Array<{ id: string; text: string }>
}>>([])

// Initialize Zoom Meeting
onMounted(async () => {
  ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av')
  ZoomMtg.preLoadWasm()
  ZoomMtg.prepareWebSDK()

  // Initialize Zoom configuration here
  // Note: You'll need to add your Zoom API credentials
})

// Question handling
const submitQuestion = async () => {
  if (!newQuestion.value.trim()) return

  // TODO: Implement AI clustering logic here
  // For now, we'll just add it to a default group
  questionGroups.value.push({
    id: Date.now().toString(),
    title: 'New Questions',
    count: 1,
    questions: [{
      id: Date.now().toString(),
      text: newQuestion.value
    }]
  })

  newQuestion.value = ''
}
</script>

<style scoped>
.zoom-video-container {
  min-height: 400px;
}
</style> 