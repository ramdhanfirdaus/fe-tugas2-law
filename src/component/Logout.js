import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import UserService from "../service/UserService";

export function Logout() {
    useEffect(() => {
        UserService.logout()
        document.location.reload()
    }, [])

    return (
        <Navigate to='/admin' />
    )
}
