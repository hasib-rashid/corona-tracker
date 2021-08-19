import React, { useEffect } from 'react'
import './Information.css'

const Information = () => {
    useEffect(() => {
        const fetching = async () => {
            const res = await fetch("https://disease.sh/v3/covid-19/all/")
            const resJson = await res.json()

            console.log(resJson)
        }

        fetching()
    }, [])

    return (
        <article>
            <h2>WorldWide</h2>
            <div className="info_row">
                <h3>Confirmed: <span className="confirmed">32498327874327</span></h3>
                <h3>Deaths: <span className="deaths">94832842</span></h3>
                <h3>Recovered: <span className="recovered">4328748242080</span></h3>
            </div>
        </article>
    )
}

export default Information
