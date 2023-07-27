import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    homelistsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.listOfmatches()
  }

  listOfmatches = async () => {
    const homelistUrl = 'https://apis.ccbp.in/ipl'

    const response = await fetch(homelistUrl)
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState({
      homelistsData: data.teams.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        teamImageUrl: eachItem.team_image_url,
      })),
      isLoading: false,
    })
  }

  //   renderTeamsList = () => {
  //     const {homelistData} = this.state
  //     return (
  //       <ul>
  //         {homelistData.map(team => (
  //           <TeamCard kry={team.id} teamData={team} />
  //         ))}
  //       </ul>
  //     )
  //   }

  loader = () => (
    <div testid="loader" className="loader-con">
      <Loader type="Rings" color="#00Bfff" height={80} width={80} />
    </div>
  )

  render() {
    const {homelistsData, isLoading} = this.state

    return (
      <div className="app-con">
        {isLoading ? (
          this.loader()
        ) : (
          <div className="ipl-con">
            <div className="header-con">
              <img
                className="ipl-logo"
                alt="ipl logo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              />
              <h1 className="ipl-title">IPL Dashboard</h1>
            </div>
            <ul className="team-list-items">
              {homelistsData.map(eachItem => (
                <TeamCard key={eachItem.id} homelistData={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
