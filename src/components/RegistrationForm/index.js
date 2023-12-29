import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state
    // if first name is not empty then the form will be submitted
    return firstNameInput !== ''
  }

  validateLastName = () => {
    const {lastNameInput} = this.state
    // if last name is not empty then the form will be submitted
    return lastNameInput !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isFirstNameValid = this.validateFirstName()
    const isLastNameValid = this.validateLastName()

    if (isFirstNameValid && isLastNameValid) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isFirstNameValid,
        showLastNameError: !isLastNameValid,
        isFormSubmitted: false,
      })
    }
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({showLastNameError: !isValidLastName})
  }

  registrationForm = () => {
    const {
      firstNameInput,
      lastNameInput,
      showFirstNameError,
      showLastNameError,
    } = this.state

    // const errorColors = {showFirstNameError, showLastNameError}

    const firstNameClassName = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    const lastNameClassName = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <label className="input-label" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          // className={className}
          className={firstNameClassName}
          value={firstNameInput}
          placeholder="First Name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
        {showFirstNameError && <p className="error-message">Required</p>}
        <label className="input-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          // className="name-input-field"
          className={lastNameClassName}
          type="text"
          id="lastName"
          value={lastNameInput}
          placeholder="Last Name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
        {showLastNameError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  formSubmitSuccessful = () => (
    <div className="success-box-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        className="correct-submit-successful"
        alt="success"
      />
      <p className="success-message">Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="bg-container">
        <h1 className="form-title">Registration</h1>
        <div className="app-container">
          {isFormSubmitted
            ? this.formSubmitSuccessful()
            : this.registrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
