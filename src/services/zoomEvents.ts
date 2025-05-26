import { verifyZoomEvent, generateVerificationResponse } from '../config/zoom'

interface ZoomEvent {
  event: string
  payload: {
    account_id: string
    object: any
  }
}

export class ZoomEventService {
  private static instance: ZoomEventService
  private eventHandlers: Map<string, ((event: ZoomEvent) => void)[]> = new Map()

  private constructor() {}

  static getInstance(): ZoomEventService {
    if (!ZoomEventService.instance) {
      ZoomEventService.instance = new ZoomEventService()
    }
    return ZoomEventService.instance
  }

  // Handle incoming event notifications
  async handleEventNotification(
    signature: string,
    timestamp: string,
    payload: string
  ): Promise<{ status: number; body: any }> {
    try {
      // Verify the event is from Zoom
      if (!verifyZoomEvent(signature, timestamp, payload)) {
        return { status: 401, body: { error: 'Invalid signature' } }
      }

      const event: ZoomEvent = JSON.parse(payload)

      // Handle verification challenge
      if (event.event === 'endpoint.url_validation') {
        const challenge = event.payload.object.plainToken
        return {
          status: 200,
          body: {
            plainToken: challenge,
            encryptedToken: generateVerificationResponse(challenge)
          }
        }
      }

      // Notify all handlers for this event type
      const handlers = this.eventHandlers.get(event.event) || []
      handlers.forEach(handler => handler(event))

      return { status: 200, body: { message: 'Event processed' } }
    } catch (error) {
      console.error('Error processing Zoom event:', error)
      return { status: 500, body: { error: 'Internal server error' } }
    }
  }

  // Register event handlers
  on(event: string, handler: (event: ZoomEvent) => void): void {
    const handlers = this.eventHandlers.get(event) || []
    handlers.push(handler)
    this.eventHandlers.set(event, handlers)
  }

  // Remove event handlers
  off(event: string, handler: (event: ZoomEvent) => void): void {
    const handlers = this.eventHandlers.get(event) || []
    const index = handlers.indexOf(handler)
    if (index > -1) {
      handlers.splice(index, 1)
      this.eventHandlers.set(event, handlers)
    }
  }
} 