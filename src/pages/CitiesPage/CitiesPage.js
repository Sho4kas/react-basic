import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container"
import CityItem from "../../Components/CityItem";
import './CitiesPage.css'
import SportsForm from "../../Components/SportsForm";
import axios from 'axios';
import { API_URL } from '../../config';

const CitiesPage = () => {

  const [cities, setCities] = useState([])
  const [editCity, setEditCity] = useState(null)

  useEffect(() => {
    const getCities = async () => {
        const { data } = await axios(`${API_URL}/cities`)
        setCities(data)
    }

    getCities()
  }, [])

  const addCityHandler = async newCity => {
    if (editCity) {
        axios.put(`${API_URL}/cities/${editCity.id}`, newCity)

        setCities(prevState => {
            const editId = editCity.id
            const editCityIndex = prevState.findIndex(city => city.id === editId)
            const newState = [...prevState]
            newState[editCityIndex] = newCity

            setEditCity(null)
            return newState
        })
    } else {
        const { data } = await axios.post(`${API_URL}/cities`, newCity)
        setCities(prevState => [data, ...prevState])
    }
  }

  const removeCityHandler = id => {
    axios.delete(`${API_URL}/cities/${id}`)

    setCities(prevState => prevState.filter(city => city.id !== id))
  }

  const editCityHandler = index => {
    const selectedCity = cities[index]
    setEditCity(selectedCity)
  }

  const citiesListElement = cities.map((city, index) => {
    const lastOddElement = index + 1 === cities.length && index % 2 === 0

    return <CityItem onCityEdit={editCityHandler} onCityDelete={removeCityHandler} index={index} key={index} data={city} fullWidth={lastOddElement} />
  })

  return (
    <Container>
      <SportsForm editCityData={editCity} onNewCity={addCityHandler} />

      <div className="cities-list">
        {citiesListElement}
      </div>
    </Container>
  )
}

export default CitiesPage