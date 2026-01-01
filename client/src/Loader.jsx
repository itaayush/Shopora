import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Loader = ({path="login"}) => {
    const navigate = useNavigate()
    const location=useLocation()

    useEffect(()=>{
        navigate(`/${path}`, {
            state: location.pathname,
        })
    },[navigate, location, path])
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center"
      style={{height:"100vh"}}>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

    </>
  )
}

export default Loader
