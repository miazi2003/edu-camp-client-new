import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {

const {user , loading} = useContext(AuthContext)

const location = useLocation()
    console.log(location)
if(loading){
        return <div className='h-screen w-full flex items-center justify-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
if(!user){
    return <Navigate to="/signIn"  state={{ pathname: location.pathname }}/>
}

    return children
};

export default PrivateRoutes;