import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import axios from 'axios'
import styled from 'styled-components'
import styles from './SportsForm.module.css';



const BranchForm = (props) => {
    const { onNewBranch, editBranchData } = props
    const [name, setName] = useState('')
    const [branch, setBranch] = useState('')
    const [branchOptions, setBranchOptions] = useState([])
    const [nameError, setNameError] = useState('')
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
      if (editBranchData) {
        setName(editBranchData.name)
      }
    }, [editBranchData])
  
    const newBranchHandler = (event) => {
      event.preventDefault()
  
      setNameError('')
      setInvalidForm(false)
  
      let formIsValid = true
  
      if (!name) {
        setNameError('Name is required')
        formIsValid = false
      } else if (name.length < 5) {
        setNameError('Sports branch must be at least 5 letters long')
        formIsValid = false
      }
   
      if (!formIsValid) {
        setInvalidForm(true)
        return
      }
  
      const newBranch = {
        name,
      }
  
      setName('')
  
      onNewBranch(newBranch)
    }
  
    const nameInputHandler = event => setName(event.target.value)
    const branchInputHandler = event => setBranch(event.target.value)
    
  
    return (
      <form id="branch-form" onSubmit={newBranchHandler}>
        
        <div className="form-control">
        <label htmlFor="branch" >Choose a sport branch:</label>
        <select  id="branch" 
        value={branch} 
        onChange={branchInputHandler}>
          {branchOptions.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
        </select>
      </div>

        <div className={`${styles.formControl} ${nameError && styles.invalid}`}>
          <label htmlFor="name"> Add new sport branch:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={nameInputHandler}
          />
          {nameError && <span className="input-error-message">{nameError}</span>}
        </div>
  
  

  
        <input type="submit" value={editBranchData ? 'Edit Branch' : 'Add New sports branch'} />
  
        {invalidForm && (
          <div className="error-wrapper">
            <span className="input-error-message">Data is missing...</span>
          </div>
        )}
      </form>
    )
  }

  export default BranchForm