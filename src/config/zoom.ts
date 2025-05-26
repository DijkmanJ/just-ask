export const ZOOM_CONFIG = {
  // OAuth Configuration
  clientId: import.meta.env.VITE_ZOOM_CLIENT_ID,
  clientSecret: import.meta.env.VITE_ZOOM_CLIENT_SECRET,
  redirectUrl: import.meta.env.VITE_ZOOM_REDIRECT_URL,

  // Event Notification Configuration
  secretToken: '0gzJ-cVgQ7m-V1SH2o9AYw',
  verificationToken: 'SS8DPUBuRW-oP_6Q1ZAruQ',

  // Web SDK Configuration
  sdkKey: import.meta.env.VITE_ZOOM_SDK_KEY,
  sdkSecret: import.meta.env.VITE_ZOOM_SDK_SECRET,
}

// Helper function to verify event notifications
export function verifyZoomEvent(_signature: string, _timestamp: string, _payload: string): boolean {
  // TODO: Implement proper signature verification
  // This should be done on the backend for security
  return true
}

// Helper function to generate verification response
export function generateVerificationResponse(challenge: string): string {
  return challenge
} 