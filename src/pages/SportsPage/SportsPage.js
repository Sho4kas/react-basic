import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container"
import SportsItem from "../../Components/SportsItem";
import './SportsPage.css'
import SportsForm from "../../Components/SportsForm";
import axios from 'axios';
import { API_URL } from '../../config';

const SportsPage = () => {

  const [sports, setSports] = useState([])
  const [editSports, setEditSports] = useState(null)

  useEffect(() => {
    const getSports = async () => {
        const { data } = await axios(`${API_URL}/sports`)
        setSports(data)
    }

    getSports()
  }, [])

  const addSportsHandler = async newSports => {
    if (editSports) {
        axios.put(`${API_URL}/sports/${editSports.id}`, newSports)

        setSports(prevState => {
            const editId = editSports.id
            const editSportsIndex = prevState.findIndex(sports => sports.id === editId)
            const newState = [...prevState]
            newState[editSportsIndex] = newSports

            setEditSports(null)
            return newState
        })
    } else {
        const { data } = await axios.post(`${API_URL}/sports`, newSports)
        setSports(prevState => [data, ...prevState])
    }
  }

  const removeSportsHandler = id => {
    axios.delete(`${API_URL}/sports/${id}`)

    setSports(prevState => prevState.filter(sports => sports.id !== id))
  }

  const editSportsHandler = index => {
    const selectedSports = sports[index]
    setEditSports(selectedSports)
  }

  const sportsListElement = sports.map((sports, index) => {
    const lastOddElement = index + 1 === sports.length && index % 2 === 0

    return <SportsItem onSportsEdit={editSportsHandler} onSportsDelete={removeSportsHandler} index={index} key={index} data={sports} fullWidth={lastOddElement} />
  })

  return (
    <Container>
      <SportsForm editSportsData={editSports} onNewSports={addSportsHandler} />

      <div className="sports-list">
        {sportsListElement}
      </div>
    </Container>
  )
}

export default SportsPage