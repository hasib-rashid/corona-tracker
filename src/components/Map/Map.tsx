import React from "react";
// @ts-ignore
import { VectorMap } from "react-jvectormap";
import "./map.css";

export default function Map(props: any) {
    return (
        <div className="map-container">
            <VectorMap
                map={"world_mill"}
                backgroundColor="transparent" //change it to ocean blue: #0077be
                zoomOnScroll={true}
                containerStyle={{
                    width: "100%",
                    height: "65vh",
                }}
                onRegionClick={props.handleClick} //gets the country code
                containerClassName="map"
                regionStyle={{
                    initial: {
                        fill: "#e4e4e4",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0,
                    },
                    hover: {
                        "fill-opacity": 0.8,
                        cursor: "pointer",
                    },
                    selected: {
                        fill: "#7418ca", //color for the clicked country
                    },
                    selectedHover: {},
                }}
                regionsSelectable={true}
                onRegionTipShow={(e: any, el: any, code: any) => {
                    const dataCases = props.mapCases[code];
                    const dataDeaths = props.mapDeaths[code];
                    const dataCritical = props.mapCritical[code];
                    const dataRecoveries = props.mapRecoveries[code];
                    const dataActive = props.mapActive[code]
                    const dataFlags = props.mapFlags[code];
                    return el.html(
                        "<br />" +
                        "<b>" +
                        `<img class='flag' src='${dataFlags}' alt='Flags' /><br />` +
                        el.html() +
                        "</b></br>" +
                        `<b>Confirmed: <span class='confirmed'>${formatNumber(dataCases ? dataCases : "Unknown")}<span></b>` +
                        `<b>Deceased: <span class='deaths'>${formatNumber(dataDeaths ? dataDeaths : "Unknown")}<span></b>` +
                        `<b>Critical: <span class='critical'>${formatNumber(dataCritical ? dataCritical : "Unknown")}<span></b>` +
                        `<b>Recovered: <span class='recoveries'>${formatNumber(dataRecoveries ? dataRecoveries : "Unknown")}<span></b>` +
                        `<b>Active: <span class='active'>${formatNumber(dataActive ? dataActive : "Unknown")}<span></b><br>`
                    );
                }}
                series={{
                    regions: [
                        {
                            values: props.mapCases, //this is your data
                            scale: ["#E5D1F9", "#5606A5"], //your color game's here
                            normalizeFunction: "polynomial",
                        },
                    ],
                }}
            />
        </div>
    );
}

function formatNumber(number: string, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2,
    });
}