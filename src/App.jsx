import { useState, useEffect } from 'react'
import './App.css'

const lastTrophyDate = new Date('2020-07-05')

const tournaments = [
  { tier: 'Official (Trophy)', name: 'PUBG Mobile India Series 2020', date: '05/07/2020' },
  { tier: 'A Tier', name: 'LOCO War of Glory: Grand Finals', date: '31/10/2021' },
  { tier: 'B Tier', name: 'OneShot Showdown Season 2: Grand Finals', date: '01/12/2021' },
  { tier: 'S Tier', name: 'PUBG Mobile Global Championship 2021 (Since Last Participated)', date: '23/01/2022' },
]

function App() {
  const [stats, setStats] = useState({
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
  })

  const [tournamentDays, setTournamentDays] = useState([])

  useEffect(() => {
    const today = new Date()
    const diffTime = today - lastTrophyDate
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = Math.floor(totalDays / 30.44)
    const totalYears = (totalDays / 365.25).toFixed(2)

    setStats({
      days: totalDays,
      weeks: totalWeeks,
      months: totalMonths,
      years: totalYears,
    })

    const days = tournaments.map((t) => {
      if (t.date === '-') return '-'
      const parts = t.date.split('/')
      const date = new Date(parts[2], parts[1] - 1, parts[0])
      const diff = today - date
      return Math.floor(diff / (1000 * 60 * 60 * 24))
    })
    setTournamentDays(days)
  }, [])

  return (
    <>
      <header>
        <h1>Trophy Drought</h1>
        <h2>Longest Suffering</h2>
      </header>

      <div className="ticker">
        <div className="ticker-content">
          <span className="ticker-item">
            {stats.days.toLocaleString()} <span>DAYS</span>
          </span>
          <span className="ticker-separator">|</span>
          <span className="ticker-item">
            {stats.weeks.toLocaleString()} <span>WEEKS</span>
          </span>
          <span className="ticker-separator">|</span>
          <span className="ticker-item">
            {stats.months.toLocaleString()} <span>MONTHS</span>
          </span>
          <span className="ticker-separator">|</span>
          <span className="ticker-item">
            {stats.years} <span>YEARS</span>
          </span>
        </div>
      </div>

      <div className="days-counter">
        <div className="label">Days Since Last Official BGMI/PUBGM Trophy</div>
        <div className="number">{stats.days.toLocaleString()}</div>
        <div className="subtitle">and counting</div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>5</h3>
          <p>IGLs Changed</p>
        </div>
        <div className="stat-card">
          <h3>3</h3>
          <p>ORGs Changed</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Trophies Won</p>
        </div>
      </div>

      <section className="table-section">
        <h2>Hall of Pain</h2>
        <div className="table-container">
          <table className="trophy-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Tournament</th>
                <th>Date</th>
                <th>Days Since Won</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((t, index) => (
                <tr key={index}>
                  <td>{t.tier}</td>
                  <td>{t.name}</td>
                  <td>{t.date}</td>
                  <td>
                    {typeof tournamentDays[index] === 'number'
                      ? tournamentDays[index].toLocaleString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <p>Trophy Drought Tracker</p>
      </footer>
    </>
  )
}

export default App
