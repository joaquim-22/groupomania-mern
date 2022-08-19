import Cookies from 'js-cookie'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = Cookies.get('jwt')
    return(
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes