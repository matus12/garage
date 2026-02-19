import { useEffect, useState } from 'react'
import './App.css'

interface GarageData {
  temp: number
  proximity: number
}

const API_URL = 'http://84.47.36.56:7226/'
const POLL_INTERVAL = 5000

const App = () => {
  const [data, setData] = useState<GarageData | null>(null)
  const [error, setError] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then(res => res.json())
        .then((json: GarageData) => {
          setData(json)
          setError(false)
          setLastUpdated(new Date())
        })
        .catch(() => setError(true))
    }

    fetchData()
    const interval = setInterval(fetchData, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const isClosed = data?.proximity === 1
  const temp = data?.temp

  return (
    <div className="container">
      <h1 className="title">Garage</h1>

      {error && <p className="error">Unable to connect</p>}

      {data && (
        <>
          <div className={`status-card ${isClosed ? 'closed' : 'open'}`}>
            <div className="status-icon">{isClosed ? '🔒' : '🔓'}</div>
            <div className="status-label">{isClosed ? 'Closed' : 'Open'}</div>
          </div>

          <div className="temp-card">
            <div className="temp-value">{temp?.toFixed(1)}°C</div>
            <div className="temp-label">Temperature</div>
          </div>

          {lastUpdated && (
            <p className="updated">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </>
      )}

      {!data && !error && <p className="loading">Loading...</p>}
    </div>
  )
}

export default App
