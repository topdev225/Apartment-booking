import React, {useEffect} from 'react';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import { equals } from 'ramda';
import { connect } from 'react-redux';
import UserActions from '../../actions/user';

function MRealtors({
    getUsers,
    userList,
    removeUser,
    isDone
}) {
    const header = [
        {
            id: 'no',
            title: 'No'
        },
        {
            id: 'userName',
            title: 'User Name'
        },
        {
            id: 'email',
            title: "Email"
        }
    ];
    useEffect(()=> {
        getUsers();
    }, [])
    return (
        <div>
            {isDone ? 
                <Table 
                    header={header} 
                    data={userList.filter(user=>user.role===1)} 
                    removeUser={removeUser} 
                    getUsers={getUsers} 
                    actionType={'realtors'} 
                /> : <Loading title="Realtors data loading..." />}
        </div>
    )
}
const mapStateToProps = state => ({
    userList: state.user.data.data,
    isDone: equals(state.user.status, 'done')
})

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(UserActions.getUsersRequest()),
    removeUser: (id) => dispatch(UserActions.removeUserRequest(id))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MRealtors);