import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const initialState = {
  last7DaysVaccination: [],
  vaccinationByAge: [],
  vaccinationByGender: [],
}
class CowinDashboard extends Component {
  state = {
    dataofvacci: initialState,
    isLoading: true,
    success: false,
  }

  componentDidMount() {
    this.getDataFromUrl()
  }

  getDataFromUrl = async () => {
    try {
      const url = 'https://apis.ccbp.in/covid-vaccination-data'

      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()

        const newdata = {
          last7DaysVaccination: data.last_7_days_vaccination.map(eachDay => ({
            vaccineDate: eachDay.vaccine_date,
            dose1: eachDay.dose_1,
            dose2: eachDay.dose_2,
          })),

          vaccinationByAge: data.vaccination_by_age.map(eachAge => ({
            age: eachAge.age,
            count: eachAge.count,
          })),

          vaccinationByGender: data.vaccination_by_gender.map(eachGender => ({
            gender: eachGender.gender,
            count: eachGender.count,
          })),
        }

        this.setState({
          dataofvacci: newdata,
          isLoading: false,
          success: true,
        })
      } else {
        this.setState({
          isLoading: false,
          success: false,
        })
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        success: false,
      })
    }
  }

  dataframesShowing = () => {
    const {dataofvacci} = this.state

    return (
      <div className="charts">
        <VaccinationCoverage
          vaccinationCoverage={dataofvacci.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGender={dataofvacci.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={dataofvacci.vaccinationByAge} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="dataframesShowingFailure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />

      <h1>Something went wrong</h1>
    </div>
  )

  renderWev = () => {
    const {isLoading, success} = this.state

    if (isLoading) {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
        </div>
      )
    }

    if (success) {
      return this.dataframesShowing()
    }

    return this.renderFailureView()
  }

  heddingbaar = () => (
    <>
      <div className="logo-bar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="logo"
        />

        <p className="logo-name">Co-WIN</p>
      </div>

      <h2 className="hedding">CoWIN Vaccination in India</h2>
    </>
  )

  render() {
    return (
      <div className="main-bg">
        {this.heddingbaar()}
        {this.renderWev()}
      </div>
    )
  }
}

export default CowinDashboard
