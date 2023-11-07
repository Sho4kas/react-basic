import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios'
import styled from 'styled-components'
import styles from './SportsForm.module.css';

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px 0;

  &.form-control-inline {
    flex-direction: row;
  }

  label {
    font-weight: 600;
    color: green;
    font-size: 20px;
  }

  input {
    border: 2px solid orange;
    border-radius: 50px;
    padding: 5px 15px;

    &:focus {
      background-color: rgb(253, 237, 240);
    }
  }

  &.invalid {
    input {
      border-color: red;
      background-color: pink;
    }

    label {
      color: red;
    }
  }

  .input-error-message {
    color: red;
  }
`

const FormControlWithProps = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px 0;

  &.form-control-inline {
    flex-direction: row;
  }

  label {
    font-weight: 600;
    color: ${props => props.invalid ? 'red' : 'green'};
    font-size: 20px;
  }

  input {
    border: 2px solid ${props => props.invalid ? 'red' : 'orange'};
    border-radius: 50px;
    padding: 5px 15px;
    background-color: ${props => props.invalid ? 'pink' : 'transparent'};

    &:focus {
      background-color: rgb(253, 237, 240);
    }
  }

  .input-error-message {
    color: red;
  }
`

const SportsForm = (props) => {
  const { onNewSports, editSportsData } = props

  const [name, setName] = useState('')
  const [member, setMember] = useState(0)
  const [branch, setBranch] = useState('')
  const [nationality, setNationality ] = useState('')
  const [isOlympic, setIsOlympic] = useState(false)
  const [athletes, setAthletes] = useState([])
  const [branchOptions, setBranchOptions] = useState([])

  const [nameError, setNameError] = useState('')
  const [memberError, setMemberError] = useState(false)
  const [nationalityError, setNationalityError] = useState('')
  const [invalidForm, setInvalidForm] = useState(false)

  useEffect(() => {
    const getBranch = async () => {
      const { data } = await axios(`${API_URL}/branch`)
      setBranchOptions(data)
      setBranch(data[0].id)
    }

    getBranch()
  }, [])

  useEffect(() => {
    if (editSportsData) {
      setName(editSportsData.name)
      setMember(editSportsData.member)
      setBranch(editSportsData.branch)
      setNationality (editSportsData.nationality)
      setIsOlympic(editSportsData.isOlympic)
      setAthletes(editSportsData.athletes)
    }
  }, [editSportsData])

  const newSportsHandler = (event) => {
    event.preventDefault()

    setNameError('')
    setMemberError(false)
    setNationalityError('')
    setInvalidForm(false)

    let formIsValid = true

    if (!name) {
      setNameError('Name is required')
      formIsValid = false
    } else if (name.length < 3) {
      setNameError('Name must be at least 3 letters long')
      formIsValid = false
    }

    if (member < 1) {
      setMemberError(true)
      formIsValid = false
    }

    if (!nationality) {
      setNationalityError('Nationality required')
      formIsValid = false
    } else if (nationality.length < 3) {
      setNationalityError('Nationality  must be at least 3 letters long')
      formIsValid = false
    }

    if (!formIsValid) {
      setInvalidForm(true)
      return
    }

    const newSports = {
      name,
      member,
      nationality,
      athletes,
      isOlympic,
    }

    setName('')
    setMember(1)
    setBranch('')
    setNationality ('')
    setIsOlympic(false)
    setAthletes([])

    onNewSports(newSports)
  }

  const nameInputHandler = event => setName(event.target.value)
  const memberInputHandler = event => setMember(event.target.valueAsNumber)
  const branchInputHandler = event => setBranch(event.target.value)
  const nationalityInputHandler = event => setNationality (event.target.value)
  const olympicInputHandler = () => setIsOlympic(prevState => !prevState)

  const athletesInputHandler = (event) => {
    const enteredValue = event.target.value

    if (!enteredValue) {
      setAthletes([])
      return
    }

    const athletesArr = enteredValue.split(',')
    const updatedAthletesArr = athletesArr.map(location => {
      const trimmedLocation = location.trim()
      const updatedLocation = trimmedLocation.length > 0 ? trimmedLocation.at(0).toUpperCase() + trimmedLocation.slice(1) : ''
      return updatedLocation
    })

    setAthletes(updatedAthletesArr)
  }

  return (
    <form id="sport-form" onSubmit={newSportsHandler}>
      
         <div className="form-control">
        <label htmlFor="branch" > Sport branch:</label>
        <select  id="branch" 
        value={branch} 
        onChange={branchInputHandler}>
          {branchOptions.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
        </select>
      </div>

      <div className={`${styles.formControl} ${nameError && styles.invalid}`}>
        <label htmlFor="name">Sports category:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={nameInputHandler}
        />
        {nameError && <span className="input-error-message">{nameError}</span>}
      </div>


      <div className={`form-control ${memberError ? 'invalid' : ''}`}>
        <label htmlFor="member">Team member/members:</label>
        <input
          type="number"
          min={1}
          step={1}
          id="member"
          name="member"
          value={member}
          onChange={memberInputHandler}
        />
        {memberError && <span className="input-error-message">a team must have at least one participant</span>}
      </div>

      <FormControlWithProps invalid={nationalityError && 'invalid'} color="green">
        <label htmlFor="nationality">Nationality :</label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={nationality}
          onChange={nationalityInputHandler}
        />
        {nationalityError && <span className="input-error-message">{nationalityError}</span>}
      </FormControlWithProps>

      <div className="form-control form-control-inline">
        <input
          type="checkbox"
          id="olympic"
          name="olympic"
          checked={isOlympic}
          onChange={olympicInputHandler}
        />

        <label htmlFor="olympic">Olympic</label>
      </div>

      <div className="form-control">
        <label htmlFor="athletes">Participating athletes:</label>
        <textarea
          rows={5}
          value={athletes.join(', ')}
          id="athletes"
          name="athletes"
          onChange={athletesInputHandler}
        >
        </textarea>
      </div>

      <input type="submit" value={editSportsData ? 'Edit Sports' : 'Add New Sports'} />

      {invalidForm && (
        <div className="error-wrapper">
          <span className="input-error-message">Data is missing...</span>
        </div>
      )}
    </form>
  )
}
export default SportsForm
