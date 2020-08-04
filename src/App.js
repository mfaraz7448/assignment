import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap'
import { onAuthenticate } from './helper/fetch'
import UserTable from './components/table'
import { connect } from 'react-redux'
import { getUser, updateUser, isUpdatingUser } from './actions/actions'
import PropTypes from 'prop-types';
import { INITIAL_STATE } from './constant/app-vars'
import Loader from './components/loader'
import Stepper from 'react-js-stepper'
import PopUp from './components/modal'
import Menu from './components/navbar'


const App = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  const [activeStep, setActiveStep] = useState(1);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const steps = [{ title: 'Stage - 1' }, { title: 'Stage - 2' }]

  const handleOnClickStepper = (step) => {
    setActiveStep(step);
  }

  const handleOnClickNext = () => {
    if (activeStep === 1) {
      if (
        props.userDetail.name === '' ||
        props.userDetail.email === '' ||
        props.userDetail.phone === '' ||
        props.userDetail.address.street === '' ||
        props.userDetail.address.city === '' ||
        props.userDetail.address.zipcode === '') {
        setIsPopUpOpen(true)
      } else {
        setActiveStep(activeStep + 1)
      }
    } else if (activeStep === 2) {
      if (props.userDetail.website === '' ||
        props.userDetail.company.name === '' ||
        props.userDetail.company.catchPhrase === '' ||
        props.userDetail.company.bs === '' ||
        props.userDetail.username === '') {
        setIsPopUpOpen(true)
      } else {
        setActiveStep(activeStep + 1)
      }
    }


  }

  const handleOnClickBack = () => {
    setActiveStep(activeStep - 1)
  }

  const onChangeHandler = (e, nested) => {

    const { name, value } = e.target

    switch (nested) {
      case 'address':
        props.updateUser({
          ...props.userDetail,
          address: {
            ...props.userDetail.address,
            [name]: value
          },
        })
        break;
      case 'company':
        props.updateUser({
          ...props.userDetail,
          company: {
            ...props.userDetail.company,
            [name]: value
          }
        })
        break;
      default:
        props.updateUser({
          ...props.userDetail,
          [name]: value,
        })
        break;
    }

  }

  const onSubmitHandler = e => {

    setIsLoading(true)

    onAuthenticate('users', props.userDetail, 'POST').then((res) => { //any payload you want to send just for example


      if (res.success) {

        props.getUser([res.result])

        props.updateUser(INITIAL_STATE)

        setIsLoading(false)

        setActiveStep(1)

      } else {

        console.log(res.responseCode)

        setIsLoading(false)

      }
    })
    
    e.preventDefault()
  }


  const updateUserHandler = (e) => {

    setIsLoading(true)
    //JSONPlaceHolder accept one as ID=1 for PUT/DEL
    onAuthenticate(`users/1`, props.userDetail, 'PUT').then((res) => { //any payload you want to send just for example
      //onAuthenticate(`users/${editUser.id}`, userDetail, 'PUT').then((res) => {

      if (res.success) {


        props.getUser([res.result])

        props.updateUser(INITIAL_STATE)

        props.isUpdatingUser(false)

        setIsLoading(false)

        setActiveStep(1)


      } else {

        console.log(res.responseCode)

        setIsLoading(false)

      }
    })

    e.preventDefault()
  }


  return (

    <>
      <Loader isLoading={isLoading} />

      <div className='bg-light'>
        <Container>
          <Menu />
        </Container>
      </div>

      <Container className='my-5'>

        <PopUp isVisible={isPopUpOpen} closePopUp={(e) => setIsPopUpOpen(e)} actionPopUp={(e) => setIsPopUpOpen(e)} title='Warning' content='Please fill out all field' singleButton={false} />

        <Stepper
          steps={steps}
          activeStep={activeStep}
          onSelect={handleOnClickStepper}
        />
        <Form className='mb-5 ' onSubmit={props.isUserUpdating ? updateUserHandler : onSubmitHandler}>

          <div className='stepperWrapper'>
            {
              activeStep === 1
                ? <div className="stepperTab ">
                  <FormGroup>
                    <h3 className='text-center'>Add Employee</h3>
                  </FormGroup>

                  <FormGroup>
                    <Label for="name">Name<span className='text-danger'>*</span></Label>
                    <Input type="text" name="name" id="name" value={props.userDetail.name} onChange={(e) => onChangeHandler(e)} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email<span className='text-danger'>*</span></Label>
                    <Input type="email" name="email" id="email" value={props.userDetail.email} onChange={(e) => onChangeHandler(e)} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone Number<span className='text-danger'>*</span></Label>
                    <Input type="text" name="phone" id="phone" value={props.userDetail.phone}
                      onChange={(e) => {
                        props.updateUser({
                          ...props.userDetail,
                          [e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
                        })
                      }} required />
                  </FormGroup>

                  <FormGroup>
                    <Label for="street">Street<span className='text-danger'>*</span></Label>
                    <Input type="text" name="street" id="street" value={props.userDetail.address.street} onChange={(e) => onChangeHandler(e, 'address')} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="city">City<span className='text-danger'>*</span></Label>
                    <Input type="text" name="city" id="city" value={props.userDetail.address.city} onChange={(e) => onChangeHandler(e, 'address')} required />
                  </FormGroup>
                  <FormGroup>
                    <Label for="zipcode">Zipcode<span className='text-danger'>*</span></Label>
                    <Input type="text" name="zipcode" id="zipcode" value={props.userDetail.address.zipcode} onChange={(e) => onChangeHandler(e, 'address')} required />
                  </FormGroup>
                </div>
                :
                activeStep === 2
                  ? <div className="stepperTab">
                    <FormGroup>
                      <Label for="username">Username<span className='text-danger'>*</span></Label>
                      <Input type="text" name="username" id="username" value={props.userDetail.username} onChange={(e) => onChangeHandler(e)} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="name">Company Name<span className='text-danger'>*</span></Label>
                      <Input type="text" name="name" id="name" value={props.userDetail.company.name} onChange={(e) => onChangeHandler(e, 'company')} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="website">Website<span className='text-danger'>*</span></Label>
                      <Input type="text" name="website" id="website" value={props.userDetail.website} onChange={(e) => onChangeHandler(e)} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="catchPhrase">Catch Phrase<span className='text-danger'>*</span></Label>
                      <Input type="text" name="catchPhrase" id="catchPhrase" value={props.userDetail.company.catchPhrase} onChange={(e) => onChangeHandler(e, 'company')} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bs">BSs<span className='text-danger'>*</span></Label>
                      <Input type="text" name="bs" id="bs" value={props.userDetail.company.bs} onChange={(e) => onChangeHandler(e, 'company')} required />
                    </FormGroup>

                  </div>
                  :
                  {/* <div> You are in Stage {activeStep} </div> */ }
            }
          </div>

          <div className='stepperButtonWrapper' style={{ justifyContent: 'flex-end' }}>
            <Button type='button' color="primary" style={{ marginRight: '10px' }}
              onClick={activeStep === steps.length ? props.isUserUpdating ? updateUserHandler : onSubmitHandler : handleOnClickNext}
            >{activeStep === steps.length ? props.isUserUpdating ? 'Update' : 'Finish' : 'Next'}</Button>
            {
              activeStep === 1
                ? ''
                : <Button color="secondary" type="button" onClick={handleOnClickBack} >Back</Button>
            }

          </div>

        </Form>


        <UserTable />

      </Container>

    </>
  );
}

App.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  isUpdatingUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    userDetail: state.curd.userDetail,
    isUserUpdating: state.curd.isUserUpdating
  }
}

const mapDispatchToProps = {
  getUser,
  updateUser,
  isUpdatingUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
