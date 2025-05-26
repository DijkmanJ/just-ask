import OpenAI from 'openai'

interface Question {
  id: string
  text: string
  timestamp: number
}

interface QuestionGroup {
  id: string
  title: string
  count: number
  questions: Question[]
  summary: string
}

export class QuestionAnalyzer {
  private openai: OpenAI
  private questions: Question[] = []
  private groups: QuestionGroup[] = []

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
    })
  }

  async addQuestion(text: string): Promise<QuestionGroup[]> {
    const question: Question = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now()
    }
    this.questions.push(question)

    // Only cluster when we have enough questions
    if (this.questions.length >= 3) {
      await this.clusterQuestions()
    } else {
      // Add to a temporary "New Questions" group
      this.addToNewQuestionsGroup(question)
    }

    return this.groups
  }

  private async clusterQuestions(): Promise<void> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a question clustering assistant. Analyze the following questions and group similar ones together. For each group, provide a title and summary."
          },
          {
            role: "user",
            content: JSON.stringify(this.questions)
          }
        ],
        temperature: 0.3,
      })

      // Parse the response and update groups
      const result = JSON.parse(response.choices[0].message.content || '[]')
      this.groups = result.map((group: any) => ({
        id: Date.now().toString(),
        ...group
      }))
    } catch (error) {
      console.error('Error clustering questions:', error)
      // Fallback: keep existing groups
    }
  }

  private addToNewQuestionsGroup(question: Question): void {
    const newQuestionsGroup = this.groups.find(g => g.title === 'New Questions')
    if (newQuestionsGroup) {
      newQuestionsGroup.questions.push(question)
      newQuestionsGroup.count++
    } else {
      this.groups.push({
        id: Date.now().toString(),
        title: 'New Questions',
        count: 1,
        questions: [question],
        summary: 'Recently asked questions pending analysis'
      })
    }
  }

  getGroups(): QuestionGroup[] {
    return this.groups
  }
} 