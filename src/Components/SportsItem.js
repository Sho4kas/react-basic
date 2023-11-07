const SportsItem = (props) => {
    const { onSportsDelete, index, onSportsEdit} = props
    const { name, member, isOlympic, athletes, nationality, id } = props.data

  
    if (!name || !nationality) {
      return
    }
  
    let olympicClass = ''
    let titleElement = name
    let olympicDescription = ''
  
    if (isOlympic) {
      olympicClass = 'olympic'
      titleElement = `${name} (Olympic)`
      olympicDescription = ` ${name} is the olympic sport.`
    }
  
    const descriptionElement = `${nationality} ${name} national team represents ${member} people.${olympicDescription}`
  
    let athletesElement = ''
  
    if (athletes.length > 0) {
      const athletesTitle = athletes.length === 1 ? `Team member of ${name} is:` : `Team member of ${name} are:`
  
      athletesElement = (
        <div className='athletes-wrapper'>
          <h3>{athletesTitle}</h3>
          <ul>
            {athletes.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
      )
    }
    
    return (
      <div className={`sport-item ${olympicClass}`}>
        <h2>{titleElement}</h2>
        <p>{descriptionElement}</p>
        {athletesElement}
  
        <button onClick={() => onSportsDelete(id)}>Remove</button>
        <button onClick={() => onSportsEdit(index)}>Edit</button>
      </div>
    )
  }
  
  export default SportsItem