import { ZoomMtg } from '@zoomus/websdk'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { meetingNumber, role } = req.body

    if (!meetingNumber) {
      return res.status(400).json({ error: 'Meeting number is required' })
    }

    const signature = ZoomMtg.generateSignature({
      meetingNumber,
      apiKey: process.env.ZOOM_SDK_KEY,
      apiSecret: process.env.ZOOM_SDK_SECRET,
      role: role || 0
    })

    return res.status(200).json({ signature })
  } catch (error) {
    console.error('Error generating signature:', error)
    return res.status(500).json({ error: 'Failed to generate signature' })
  }
} 