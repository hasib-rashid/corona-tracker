import axios from "axios";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { VectorMap } from "react-jvectormap";
import "./map.css";

export default function Map(props: any) {
    const [countryData, setCountryData] = useState({})

    let hoveredOn: any



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
                onRegionTipShow={async (e: any, el: any, code: any) => {
                    return el.html(
                        "<b>" +
                        el.html() +
                        "</b></br>" +
                        "<b> confirmed cases: </b>" +
                        getData(code)
                    );
                }}
                series={{
                    regions: [
                        {
                            values: props.mapData, //this is your data
                            scale: ["#FEE5D9", "#A50F15"], //your color game's here
                            normalizeFunction: "polynomial",
                        },
                    ],
                }}
            />
            {/* <div className="title">Number Of Confirmed Cases All Over The World</div> */}
        </div>
    );
}

async function getData(code: string) {
    const fetch = await axios.get(`https://disease.sh/v3/covid-19/countries/${code}`)

    console.log(fetch.data)
}