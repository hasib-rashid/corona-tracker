import React, { useEffect, useState } from 'react';
import fetchData from './api/fetchData';
import axios from 'axios';
import { disease, url } from './api/utilities';
import Map from './components/Map/Map';
import UncontrolledLottie from './components/UncontrolledLottie';
import { useWindowSize } from './hooks/useWindowSize';
import { isMobile } from 'react-device-detect'

const handleClick = (e: any, countryCode: any) => { };

function App() {
	const [location, setLocation] = useState();
	const [count, setCount] = useState(0);
	const size = useWindowSize();
	const [currentPage, setCurrentPage] = useState(0);

	let mapCases = {}
	let mapDeaths = {}
	let mapRecoveries = {}

	const handlePageChange = (number: number) => {
		setCurrentPage(number); // set currentPage number, to reset it from the previous selected.
	};

	useEffect(() => {
		const resultFetch = fetchData(disease).then((res) => {
			// @ts-ignore
			setLocation(res)
		});
	}, [count]);


	// @ts-ignore
	mapCases = location && location.mapCases ? location.mapCases : undefined;
	// @ts-ignore
	mapDeaths = location && location.mapDeaths ? location.mapDeaths : undefined;
	// @ts-ignore
	mapRecoveries = location && location.mapRecoveries ? location.mapRecoveries : undefined;

	if (location) {
		if (isMobile) {
			return (
				<div>
					<div className="topRateAndMap">
						<Map
							handleClick={handleClick}
							mapCases={mapCases}
							mapDeaths={mapDeaths}
							mapRecoveries={mapRecoveries}
							size={size}
						/>
					</div>
				</div>
			);
		}
		return (
			<div className="app-container">
				<div className="topRateAndMap">
					<Map
						handleClick={handleClick}
						mapCases={mapCases}
						size={size}
					/>
				</div>
			</div>
		);
	} else {
		// @ts-ignore
		return <UncontrolledLottie size={size} />;
	}
}

async function getData() {
	const fetch = await axios.get(`https://disease.sh/v3/covid-19/countries/`)

	return await fetch.data
}

export default App;
