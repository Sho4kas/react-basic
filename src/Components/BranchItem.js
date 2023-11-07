const BranchItem = (props) => {
    const { onBranchDelete, index, onBranchEdit } = props
    const { name, id } = props.data

  
    if (!name) {
      return
    }
    let titleElement = name

    const descriptionElement = `${name} contribute to physical fitness, mental well-being and social interaction.`
    
    return (
      <div className={`sport-item`}>
        <h2>{titleElement}</h2>
        <p>{descriptionElement}</p>
      
        <button onClick={() => onBranchDelete(id)}>Remove</button>
        <button onClick={() => onBranchEdit(index)}>Edit</button>
      </div>
    )
  }
  
  export default BranchItem