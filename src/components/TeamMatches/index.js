// Write your code here
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    matchesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const updateData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latest_match_details.id,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        date: fetchedData.latest_match_details.date,
        firstInnings: fetchedData.latest_match_details.first_innings,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        matchStatus: fetchedData.latest_match_details.match_status,
        result: fetchedData.latest_match_details.result,
        secondInnings: fetchedData.latest_match_details.second_innings,
        umpires: fetchedData.latest_match_details.umpires,
        venue: fetchedData.latest_match_details.venue,
      },
      recentMatches: fetchedData.recent_matches.map(eachItem => ({
        umpires: eachItem.umpires,
        result: eachItem.result,
        manOfTheMatch: eachItem.man_of_the_match,
        id: eachItem.id,
        date: eachItem.date,
        venue: eachItem.venue,
        competingTeam: eachItem.competing_team,
        competingTeamLogo: eachItem.competing_team_logo,
        firstInnings: eachItem.first_innings,
        secondInnings: eachItem.second_innings,
        matchStatus: eachItem.match_status,
      })),
    }
    this.setState({matchesData: updateData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesData
    return (
      <div className="team-matches-con">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch LatestMatch={latestMatchDetails} />
        {this.renderTeamMatchesList()}
      </div>
    )
  }

  renderTeamMatchesList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachItem => (
          <MatchCard matchData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-con" testid="loader">
      <Loader type="Oval" color="#00Bfff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`app-team-matches-con ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
