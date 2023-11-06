import { Link, Route, Routes } from 'react-router-dom'
import SportsPage from './pages/SportsPage/SportsPage.js'
import PageHeader from './Components/PageHeader/PageHeader.js'
import './App.css'


function App() {
  return (
    <div>
      <PageHeader />

      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/Sports' element={<SportsPage/>} />
        {/* <Route path='/counter' element={<CounterPage />} />
        <Route path='/cars' element={<CarsPage />} />
        <Route path='/todo' element={<TodoPage />} />
        <Route path='/code-academy/news' element={<NewsPage />} />
        <Route path='/code-academy/contacts' element={<ContactUsPage />} />
        <Route path='/api/chuck-norris' element={<APIChickNorrisPage />} />
        <Route path='/api/dogs' element={<DogsPage />} />
        <Route path='/api/ai' element={<AIPage />} /> */}

        <Route path='*' element={<h1>404: Page not found</h1>} />
      </Routes>
    </div>
  )
}

export default App