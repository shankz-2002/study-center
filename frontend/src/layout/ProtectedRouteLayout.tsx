import { useAuth } from '../context/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRouteLayout() {
    const {user}=useAuth();
    console.log(user)
    if(!user){
        return <Navigate to="/login" replace/>;
    }
  return <Outlet/>;
}

export default ProtectedRouteLayout