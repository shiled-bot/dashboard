import React from 'react'
import { useSelector } from 'react-redux'
import Error from 'components/Error'
import { Link } from 'react-router-dom'


export default function GuardAuth({ children }) {
    const { userLoading, isLoggedIn } = useSelector(state => state.auth)
    if (userLoading === true) return <></>

    if (isLoggedIn === false) return <UnAuthorizedError />

    return children
}

const UnAuthorizedError = () => (
    <Error title='401' message='UnAuthorized to access this site please login first.'>
        <div className="flex gap-3 mt-4 flex-wrap">
            <button onClick={() => window.location.assign("/login")} className="px-5 py-2 capitalize text-white-100 bg-blue rounded-md duration-300 hover:opacity-75 active:shadow-lg">
                login
            </button>
            <Link to="/" className="px-5 py-2 capitalize border border-white-400 text-white-200 rounded-md duration-300 hover:border-white-200 hover:text-white-100 active:shadow-lg">
                back home
            </Link>
        </div>
    </Error>
)