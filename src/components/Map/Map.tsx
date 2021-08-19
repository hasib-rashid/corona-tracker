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
                    height: "500px",
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
                        fill: "#2938bc", //color for the clicked country
                    },
                    selectedHover: {},
                }}
                regionsSelectable={true}
                onRegionTipShow={(e: any, el: any, code: any) => {
                    const dataCases = props.mapCases[code];
                    const dataDeaths = props.mapDeaths[code];
                    const dataRecoveries = props.mapRecoveries[code];
                    return el.html(
                        "<b>" +
                        el.html() +
                        "</b></br>" +
                        "<b>Confirmed: </b>" +
                        (dataCases ? dataCases : 0) + "</br><b>Deceased: </b> " +
                        (dataDeaths ? dataDeaths : 0) + "</br><b> Recovered: </b>" +
                        (dataRecoveries ? dataRecoveries : 0) + "</br>"
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
            {/* <div className="title">Number Of Confirmed Cases All Over The World</div> */}
        </div>
    );
}
