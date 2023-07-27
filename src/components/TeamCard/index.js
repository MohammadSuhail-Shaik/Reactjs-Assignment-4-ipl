// Write your code here
// import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

// class TeamCard extends Component {
const TeamCard = props => {
  //   render() {
  const {homelistData} = props
  const {id, name, teamImageUrl} = homelistData

  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="each-ipl-card">
        <img className="each-ipl-img" src={teamImageUrl} alt={name} />
        <p className="each-ipl-title">{name}</p>
      </li>
    </Link>
  )
}
// }

export default TeamCard
