/* eslint-disable no-restricted-globals */
import React, { useEffect , useState} from 'react'
import {Link} from 'react-router-dom'
import './userlist.css'
import {DeleteOutline} from '@mui/icons-material'
// eslint-disable-next-line no-unused-vars
import Avatar from "@mui/material/Avatar";
import axios from 'axios';

const UesrList = () => {

  const [data, setData] =useState([])
  useEffect(()=>{
      axios.get('http://localhost:5000/user',{
        headers: {
        authorization : localStorage.getItem('token'),
      },
    }).then(res => setData(res.data))
      .catch(err => console.log(err))
  },
 []
  )

const handleDelete =(id) =>{
  const conf = confirm('Are you sure you want to delete this User?')
    if (conf === true) {
  axios.delete('http://localhost:5000/user/userdelete/'+id,{
    headers: {
    authorization : localStorage.getItem('token'),
  }})

  .then(res => {
    window.location.reload();
  })
  .catch(err => console.log(err))
}
}


  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   {
  //     field: "username",
  //     headerName: "User",
  //     width: 100,
  //   },
  //   {
  //     field: 'avatar',
  //     headerName: 'avatar',
  //     width: 60,
  //     editable: true,
  //     renderCell: (params) => <Avatar src={params.value}/> // renderCell will render the component
  //   },
  //   { 
  //     field: "email",
  //     headerName: "E-mail",
  //     width: 150
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 90
  //   },
  //   {
  //     field: "phone",
  //     headerName: "phone",
  //     width: 150
  //   },
  //   {
  //     field: "actions",
  //     headerName: "actions",
  //     width: 150,
  //     renderCell:(params)=>{
  //       return(
  //       <>
  //         <Link to={"/user/"+params.row.id}>
  //           <button className='edit'>Edit</button>
  //         </Link>
          
  //         <DeleteOutline className='delete' onClick={handleDelete}/>
  //       </>
  //       )
  //     }
  //   }

  // ];
  
  return (
    <div className="userlist">
      <h2 className='table-title'>Uesr List</h2>
      
      <div className="tablecontainer">
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>image</th>
          <th>Status</th>
          <th>email</th>
          <th>phone</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) =>{
          return(
            <tr key={index}>
              <td>{user.user_id}</td>
              <td>{user.user_name}</td>
              <td ><img className='product-img' src="https://previews.123rf.com/images/yupiramos/yupiramos1610/yupiramos161007352/64369849-young-man-avatar-isolated-icon-vector-illustration-design.jpg" alt=""  /></td>
              <td>{(user.status)? 'active': 'non-active' } </td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td className='actions'>
                <Link  to={`/dashboard/manageUsers/readu/${user.user_id}`} className='editbtn'>show</Link>
                <DeleteOutline onClick={() => handleDelete (user.user_id)} className='delete'/>
              </td>
            </tr>
          )
        }
        )}
      </tbody>
    </table>
      </div>
      


    {/* <DataGrid rows={data[]} columns={columns} pageSize={20} disableRowSelectionOnClick rowsPerPageOptions={[5]} checkboxSelection /> */}
    </div>
  )
}

export default UesrList