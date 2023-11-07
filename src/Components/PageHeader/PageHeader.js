import React from 'react'
import Container from '../Container/Container'
import { NavLink } from 'react-router-dom'
import './PageHeader.css'

const PageHeader = () => {
  return (
    <div className='page-header'>
      <Container>
        <nav className='main-navigation'>
          <ul className='nav-list'>
            
            <li className='nav-item'>
              <NavLink to='/Sports'>Sports</NavLink>
            </li> 

            <li className='nav-item'>
              <NavLink to='/Title'>Title</NavLink>
            </li>

            <li className='nav-item'>
              <NavLink to='/Athletes'>Athletes</NavLink>
            </li>

            <li className='nav-item'>
              <NavLink to='/Branch'>Branch</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  )
}

export default PageHeader