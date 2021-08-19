import React, { useEffect, useState } from 'react'
import './Information.css'

const Information = () => {
    const [response, setResponse]: any = useState({})

    useEffect(() => {
        const fetching = async () => {
            const res = await fetch("https://disease.sh/v3/covid-19/all/")
            const resJson = await res.json()

            setResponse(resJson)
        }

        fetching()
    }, [])

    return (
        <article>
            <h2>WorldWide</h2>
            <div className="info_row">
                <h3>Confirmed: <span className="confirmed">{formatNumber(response.cases)}</span></h3>
                <h3>Deaths: <span className="deaths">{formatNumber(response.deaths)}</span></h3>
                <h3>Recovered: <span className="recovered">{formatNumber(response.recovered)}</span></h3>
            </div>
        </article>
    )
}

export default Information

function formatNumber(number: string, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2,
    });
}
