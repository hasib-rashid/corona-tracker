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

	let mapData = {};
	let diseaseData = {};

	const handlePageChange = (number: number) => {
		setCurrentPage(number); // set currentPage number, to reset it from the previous selected.
	};

	useEffect(() => {
		const resultFetch = fetchData(url).then((res) => {
			// @ts-ignore
			console.log(res)
			// @ts-ignore
			setLocation(res)
		});
	}, [count]);

	// @ts-ignore
	mapData = location && location.mapData ? location.mapData : undefined;

	if (location) {
		if (isMobile) {
			return (
				<div>
					<div className="topRateAndMap">
						<Map
							handleClick={handleClick}
							mapData={mapData}
							diseaseData={diseaseData}
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
						mapData={mapData}
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

export default App;
