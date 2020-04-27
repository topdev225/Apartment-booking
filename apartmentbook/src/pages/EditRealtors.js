import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { equals } from 'ramda';
import { connect } from 'react-redux';
import UserActions from '../actions/user';

class EditRealtors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.match.params.id,
            editable: this.props.match.params.id === "new" ? true : false,
            username: '',
            email: ''
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleEdit = (user) => {
        if(user.userID !== "new") {
            const { id, userName, email } = user;
            this.setState({
                userID: id,
                editable: true,
                userName: userName,
                email: email,
            })
        }
    }

    handleSave = (id) => {
        this.setState({
            editable: false
        });
        if(id) {
            const payload = {
                id: id,
                userName: this.state.userName,
                email: this.state.email,
                role: 1
            }
            this.props.updateUser(payload);
            this.props.getUsers();
        } else {
            const payload = {
                userName: this.state.userName,
                email: this.state.email,
                password: "password",
                role: 1
            }
            this.props.createUser(payload);
        }
    }

    handleChange = (e, name) => {
        this.setState({
            [name] : e.target.value
        })
    }
    render() {
        const { userList, isDone } = this.props;
        const user = userList && userList.find(user=>user.id == this.state.userID) || this.state;

        if (!user && this.state.userID !== "new") {
            return <div className="error">
                <h3>user not found.</h3>
                <Link to='/users' className='btn-primary'>
                    back to users
                </Link>
            </div>
        }
        const { id, userName, email } = user;
        
        return (
            <>
                {isDone ? 
                    <div className="edit-user-container">
                        <div className="edit-user-header">
                            <Link to='/users' className='btn-primary'>
                                back to Realtors
                            </Link>
                            <button type="button" className="btn-primary" onClick={()=> this.state.editable ? this.handleSave(id) : this.handleEdit(user)}>
                                {this.state.editable ? "Save" : "Edit"}
                            </button>
                        </div>
                        <div className="edit-user-form">
                            <h3>Realtor Name: </h3>
                            {!this.state.editable ? 
                                <input
                                    disabled
                                    value={userName}
                                /> :
                                <input
                                    placeholder="Realtor Name" 
                                    value={this.state.userName}
                                    onChange={(e)=>this.handleChange(e, "userName")}
                                />
                            }
                            <h3>Email: </h3>
                            {!this.state.editable ? 
                                <input
                                    disabled
                                    value={email}
                                /> :
                                <input
                                    disabled={!this.state.editable}
                                    placeholder="Email" 
                                    value={this.state.email}
                                    onChange={(e)=>this.handleChange(e, "email")}
                                />
                            }
                        </div>
                    </div> : <Loading title="Users data loading..." />
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    userList: state.user.data.data,
    isDone: equals(state.user.status, 'done')
})

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(UserActions.getUsersRequest()),
    updateUser: (payload) => dispatch(UserActions.updateUserRequest(payload)),
    createUser: (payload) => dispatch(UserActions.createUserRequest(payload)),
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditRealtors));