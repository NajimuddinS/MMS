import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiService {
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('Gemini API key not found in environment variables')
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  }

  async getMovieRecommendations(title, director, genre) {
    try {
      const prompt = `Suggest 3 movies similar to "${title}" directed by ${director} in the ${genre} genre. 
      Return ONLY a valid JSON array with each movie having "title" and "director" fields. 
      Do not include any other text or formatting.
      
      Example format:
      [
        {"title": "Movie Title 1", "director": "Director Name 1"},
        {"title": "Movie Title 2", "director": "Director Name 2"},
        {"title": "Movie Title 3", "director": "Director Name 3"}
      ]`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      
      try {
        const recommendations = JSON.parse(cleanedText)
        if (Array.isArray(recommendations) && recommendations.length > 0) {
          return recommendations.slice(0, 3)
        }
        throw new Error('Invalid recommendations format')
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError)
        return this.getFallbackRecommendations(genre)
      }
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      return this.getFallbackRecommendations(genre)
    }
  }

  getFallbackRecommendations(genre) {
    const fallbackRecommendations = {
      'drama': [
        { title: 'The Shawshank Redemption', director: 'Frank Darabont' },
        { title: 'The Godfather', director: 'Francis Ford Coppola' },
        { title: 'Schindler\'s List', director: 'Steven Spielberg' }
      ],
      'comedy': [
        { title: 'The Hangover', director: 'Todd Phillips' },
        { title: 'Superbad', director: 'Greg Mottola' },
        { title: 'Bridesmaids', director: 'Paul Feig' }
      ],
      'action': [
        { title: 'The Dark Knight', director: 'Christopher Nolan' },
        { title: 'Mad Max: Fury Road', director: 'George Miller' },
        { title: 'John Wick', director: 'Chad Stahelski' }
      ],
      'sci-fi': [
        { title: 'Blade Runner 2049', director: 'Denis Villeneuve' },
        { title: 'Interstellar', director: 'Christopher Nolan' },
        { title: 'The Matrix', director: 'The Wachowskis' }
      ],
      'horror': [
        { title: 'Hereditary', director: 'Ari Aster' },
        { title: 'The Conjuring', director: 'James Wan' },
        { title: 'Get Out', director: 'Jordan Peele' }
      ]
    }
    
    const lowerGenre = genre.toLowerCase()
    
    if (lowerGenre.includes('comedy')) {
      return fallbackRecommendations['comedy']
    } else if (lowerGenre.includes('action')) {
      return fallbackRecommendations['action']
    } else if (lowerGenre.includes('sci') || lowerGenre.includes('science')) {
      return fallbackRecommendations['sci-fi']
    } else if (lowerGenre.includes('horror') || lowerGenre.includes('thriller')) {
      return fallbackRecommendations['horror']
    } else {
      return fallbackRecommendations['drama']
    }
  }
}

export const geminiService = new GeminiService()