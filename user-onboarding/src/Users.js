import React from 'react';

const Users = (props) => {
    console.table('users.props',props)
    
    
      
    return(
        <div className="team" key={Users.id}>
     {JSON.stringify(props.users, null, 2)}
     {props.users.map((user) => (
        <div className="users" key={user.id}>
          <h3>Team Member # {user.id}</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>Role: {user.role}</p>
          <p>User Id: {user.id}</p>
          <p>User Created: {user.createdAt}</p>
     </div>
    ))}
    </div>
    )
}

export default Users

// [ { "name": "Lyle A Sorensen", "email": "1@2.com", "password": "3254234234234", "role": "Front-End Developer", "terms": true, "id": "764", "createdAt": "2020-08-14T00:23:29.238Z" } ]