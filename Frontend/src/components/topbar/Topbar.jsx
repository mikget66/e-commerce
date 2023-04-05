import React, { useEffect, useState } from 'react'
import './topbar.css'
import { NotificationsNone, Settings } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Topbar = (props) => {
  const userdate = props.userdate
  const id = userdate.user_id
  const [user, setUser] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/users/userdetails/' + id)
      .then(res => {
        console.log(res)
        setUser(res.data[0]);
      })
      .catch(err => console.log(err))

  }, [id])
  const navigate = useNavigate()
  const userdetails = () => {
    navigate(`/dashboard/manageUsers/readu/${user.user_id}`)
  }


  return (
    <div className='topbar'>
      <div className="topright">
        <div className="topbarIconContainer">
          <NotificationsNone />
          <span className='topIconBadge'>2</span>
        </div>
        <div className="topbarIconContainer">
          <Settings onClick={userdetails}/>
          {/* <Link to={`/dashboard/manageUsers/readu/${user.user_id}`} className='editbtn'>{user.user_id}</Link> */}
          {/* <Link to={`/dashboard/manageUsers/readu/${user.user_id}`} > <Settings/></Link> */}
        </div>
        <img className='avatar' src={(`http://localhost:5000/images/userImg/${user.user_image}`)} alt="" />
      </div>
    </div>
  )
}

export default Topbar