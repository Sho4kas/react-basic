import { Route, Routes } from 'react-router-dom'
import SportsPage from './pages/SportsPage/SportsPage'
import TitlePage from './pages/TitlePage'
import AthletesPage from './pages/AthletesPage'
import NationalityPage from './pages/NationalityPage'
import PageHeader from './Components/PageHeader/PageHeader'
import './App.css'


function App() {
  return (
    <div>
      <PageHeader />

      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/Sports' element={<SportsPage/>} />
        <Route path='/Title' element={<TitlePage/>} />
        <Route path='/Athletes' element={<AthletesPage/>} />
        <Route path='/Nationality' element={<NationalityPage/>} />
        <Route path='*' element={<h1>404: Page not found</h1>} />
      </Routes>
    </div>
  )
}

export default App