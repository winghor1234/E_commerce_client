import  { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useEcomStore from '../store/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtectRouteUser = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            // send to back
            currentUser(token)
                .then(() => setOk(true))
                .catch(() => setOk(false))
        }
    }, [])

    return ok ? element : <LoadingToRedirect />
}
ProtectRouteUser.propTypes = {
    element: PropTypes.node.isRequired,
}

export default ProtectRouteUser
