const SportsItem = (props) => {
    const { fullWidth, onSportsDelete, index, onSportsEdit } = props
    const { name, member, isOlympic, athletes, nationality } = props.data

  
    if (!name || !nationality) {
      return
    }
  
    let olympicClass = ''
    let titleElement = name
    let olympicDescription = ''
  
    if (isOlympic) {
      olympicClass = 'olympic'
      titleElement = `${name} (Olympic)`
      olympicDescription = ` ${name} is the olympic of ${nationality }.`
    }
  
    const descriptionElement = `${name} city is located in ${nationality }, ${nationality} and has population of ${member} people.${olympicDescription}`
  
    let athletesElement = ''
  
    if (athletes.length > 0) {
      const athletesTitle = athletes.length === 1 ? `Main Tourist attraction of ${name} is:` : `Main Tourist attractions of ${name} are:`
  
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
  
    let lastItemClass = fullWidth ? 'last-city-item' : ''
  
    return (
      <div className={`city-item ${olympicClass} ${lastItemClass}`}>
        <h2>{titleElement}</h2>
        <p>{descriptionElement}</p>
        {athletesElement}
  
        <button onClick={() => onSportsDelete(index)}>Remove</button>
        <button onClick={() => onSportsEdit(index)}>Edit</button>
      </div>
    )
  }
  
  export default SportsItem