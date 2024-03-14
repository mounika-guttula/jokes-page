import React, {useState, useEffect} from 'react'
import './Home.css' // Import the CSS file

const Home = () => {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await fetch(
          'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10',
        )
        if (!response.ok) {
          throw new Error('Failed to fetch jokes')
        }
        const jsonData = await response.json()
        setJokes(jsonData.jokes)
      } catch (error) {
        console.error('Error fetching jokes:', error)
      }
    }

    fetchJokes()
  }, []) // Empty dependency array ensures effect runs only once

  return (
    <div className="table-container">
      <h2 className="heading-top">Jokes</h2>
      <table className="jokes-table">
        <thead>
          <tr>
            <th>CATEGORY</th>
            <th>JOKE</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map(joke => (
            <tr key={joke.id}>
              <td>{joke.category}</td>
              <td>{joke.joke}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
