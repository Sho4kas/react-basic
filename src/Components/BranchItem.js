const BranchItem = (props) => {
    const { fullWidth, onBranchDelete, index, onBranchEdit } = props
    // const { name, member, isOlympic, athletes, nationality, branch } = props.data

  
    // if (!name || !nationality) {
    //   return
    // }
  
    // let olympicClass = ''
    // let titleElement = name
    // let olympicDescription = ''
  
    // if (isOlympic) {
    //   olympicClass = 'olympic'
    //   titleElement = `${name} (Olympic)`
    //   olympicDescription = ` ${name} is the olympic sport.`
    // }
  
    // const descriptionElement = `${name} city is located in ${branch }, ${nationality} and has population of ${member} people.${olympicDescription}`
  
    // let athletesElement = ''
  
    // if (athletes.length > 0) {
    //   const athletesTitle = athletes.length === 1 ? `Main athlete of ${name} is:` : `Main athletes of ${name} are:`
  
    //   athletesElement = (
    //     <div className='athletes-wrapper'>
    //       <h3>{athletesTitle}</h3>
    //       <ul>
    //         {athletes.map((location, index) => (
    //           <li key={index}>{location}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )
    // }
  
    let lastItemClass = fullWidth ? 'last-city-item' : ''
  
    return (
      <div>
        {/* <h2>{titleElement}</h2>
        <p>{descriptionElement}</p>
        {athletesElement}
   */}
        <button onClick={() => onBranchDelete(index)}>Remove</button>
        <button onClick={() => onBranchEdit(index)}>Edit</button>
      </div>
    )
  }
  
  export default BranchItem