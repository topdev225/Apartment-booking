import React from 'react';
import { withRouter } from 'react-router-dom';

function Table({
    header,
    data,
    actionType,
    removeApartment,
    getApartments,
    removeUser,
    getUsers,
    history
}) {
    const remove = (id) => {
        switch(actionType) {
            case "users":
                removeUser(id);
                getUsers();
                break;
            case "realtors":
                removeUser(id);
                getUsers();
                break;
            case "apartment":
                removeApartment(id);
                getApartments();
                break;
        }
    }
    return (
        <div className="table-component">
            <div className="add-btn-container">
                <button 
                    className="btn-primary add-btn"
                    onClick={()=>{history.push(actionType === "users" ? `/editusers/new` : actionType === "realtors" ? `/editrealtors/new` : `/editapartment/new`)}}
                >Create a new {actionType === "users" ? 'user' : actionType === "realtors" ? 'realtor' : 'apartment'}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {header.map(_header=>(
                            <th key={_header.id}>{_header.title}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((_data, index)=>(
                        <tr key={index}>
                            {header.map(_header=>
                                _header.id === "no" ? (
                                    <td key={_header.id}>{index+1}</td>
                                ) :
                                (
                                    <td key={_header.id}>{_data[_header.id]}</td>
                                )
                            )}
                            <td key={index}>
                                <button 
                                    className="btn-primary table-action-btn"
                                    onClick={()=>history.push(actionType === "users" ? `/editusers/${_data.id}` : actionType === "realtors" ? `/editrealtors/${_data.id}` : `/editapartment/${_data.slug}`)}
                                >Edit</button>
                                <button 
                                    className="btn-primary table-action-btn"
                                    onClick={()=>remove(`${_data.id}`)}
                                >Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>  
        </div>

    )
}

export default withRouter(Table);