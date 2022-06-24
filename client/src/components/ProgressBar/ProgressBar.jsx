import React from 'react'
import { useSelector } from 'react-redux'
import ProgressBarCSS from "./ProgressBar.module.css"


export default function ProgressBar() {
    const { loading, progress } = useSelector(state => state.app)

    if (!loading) return <></>;

    return (
        <div className={ProgressBarCSS["progress-bar"]} style={{ width: `${progress}%` }}></div>
    )
}
