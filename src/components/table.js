import React, { useState } from 'react'
import { Button, Table } from 'reactstrap'
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { connect } from 'react-redux'
import { updateUser, getUser, isUpdatingUser } from '../actions/actions'
import { INITIAL_STATE } from '../constant/app-vars'
import { onAuthenticate } from '../helper/fetch'
import PropTypes from 'prop-types';
import Loader from './loader'
import PopUp from './modal'

const UserTable = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const editUserHandler = id => {

        let currentUser = props.user.find(user => user.id === id);

        props.updateUser({
            id: currentUser.id,
            name: currentUser.name,
            username: currentUser.username,
            email: currentUser.email,
            phone: currentUser.phone,
            website: currentUser.website,
            company: {
                name: currentUser.company.name,
                catchPhrase: currentUser.company.catchPhrase,
                bs: currentUser.company.bs
            },
            address: {
                street: currentUser.address.street,
                city: currentUser.address.city,
                zipcode: currentUser.address.zipcode,
            },
        })

        props.isUpdatingUser(true)
    }


    const deleteUserHandler = id => {

        setIsLoading(true)
        setIsPopUpOpen(false)

        onAuthenticate(`users/1`, {}, 'DELETE').then((res) => { //any payload you want to send just for example
            //onAuthenticate(`users/${editUser.id}`, userDetail, 'PUT').then((res) => {

            if (res.success) {

                props.getUser([])
                props.updateUser(INITIAL_STATE)
                setIsLoading(false)

            } else {

                console.log(res.responseCode)
                setIsLoading(false)

            }
        })
    }


    return (


        <>

            <Loader isLoading={isLoading} />

            <PopUp isVisible={isPopUpOpen} closePopUp={(e) => setIsPopUpOpen(e)} actionPopUp={deleteUserHandler} title='Warning' content='Are you sure about to delete this...?' singleButton={true}/>

            <Table striped responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.user.length > 0 ? props.user.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <div>{user.company.name}</div>
                                        <div>{user.company.catchPhrase}</div>
                                        <div>{user.company.bs}</div>
                                        <div>
                                            <a href={user.website} target="_blank">{user.website}</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={styles.buttonWrapper}>
                                            <Button style={styles.button} outline color="warning" onClick={() => editUserHandler(user.id)}><FaTrash /></Button>
                                            <Button style={styles.button} outline color="danger" onClick={() => setIsPopUpOpen(true)}><FaPencilAlt /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No Data Found</td>
                                </tr>

                            )
                    }

                </tbody>
            </Table>


        </>
    )
}

UserTable.propTypes = {
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    isUpdatingUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.curd.user,
        userDetail: state.curd.userDetail
    }
}

const mapDispatchToProps = {
    updateUser,
    getUser,
    isUpdatingUser
}


const styles = {
    buttonWrapper: {
        display: 'flex',
    },
    button: {
        padding: '.2rem .5rem',
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    buttonFirstChild: {
        marginRight: '10px'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)
