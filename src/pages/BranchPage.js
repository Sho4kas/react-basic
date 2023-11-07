import { useEffect, useState } from "react";
import axios from 'axios';
import Container from "../Components/Container/Container"
import { API_URL } from '../config';
import BranchItem from "../Components/BranchItem";
import BranchForm from "../Components/BranchForm";

const BranchPage = () => {
    
  const [branch, setBranch] = useState([])
  const [editBranch, setEditBranch] = useState(null)

  useEffect(() => {
    const getBranch = async () => {
        const { data } = await axios(`${API_URL}/branch`)
        setBranch(data)
    }

    getBranch()
  }, [])

  const addBranchHandler = async newBranch => {
    if (editBranch) {
        axios.put(`${API_URL}/branch/${editBranch.id}`, newBranch)

        setBranch(prevState => {
            const editId = editBranch.id
            const editBranchIndex = prevState.findIndex(branch => branch.id === editId)
            const newState = [...prevState]
            newState[editBranchIndex] = newBranch

            setEditBranch(null)
            return newState
        })
    } else {
        const { data } = await axios.post(`${API_URL}/branch`, newBranch)
        setBranch(prevState => [data, ...prevState])
    }
  }

  const removeBranchHandler = id => {
    axios.delete(`${API_URL}/branch/${id}`)

    setBranch(prevState => prevState.filter(branch => branch.id !== id))
  }

  const editBranchHandler = index => {
    const selectedBranch = branch[index]
    setEditBranch(selectedBranch)
  }

  const branchListElement = branch.map((branch, index) => {
    const lastOddElement = index + 1 === branch.length && index % 2 === 0

    return <BranchItem onBranchEdit={editBranchHandler} onBranchDelete={removeBranchHandler} index={index} key={index} data={branch} fullWidth={lastOddElement} />
  })

  return (
    <Container>
      <BranchForm editBranchData={editBranch} onNewBranch={addBranchHandler} />

      <div className="branch-list">
        {branchListElement}
      </div>
    </Container>
  )
}



export default BranchPage
