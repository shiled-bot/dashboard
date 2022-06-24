import React from 'react'
import { useSelector } from 'react-redux'
import "./ProgressBar.css"


export default function ProgressBar() {
    const { loading, progress } = useSelector(state => state.app)

    if (!loading) return <></>;

    return (
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    )
}
