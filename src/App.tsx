import React, { useEffect, useState } from 'react';
import fetchData from './api/fetchData';
import { disease } from './api/utilities';
import Map from './components/Map/Map';
import UncontrolledLottie from './components/UncontrolledLottie';
import { useWindowSize } from './hooks/useWindowSize';
import { isMobile } from 'react-device-detect'
import Header from './components/Header/Header';
import Information from './components/Information/Information';

function App() {
	const [location, setLocation] = useState();
	const [count] = useState(0);
	const size = useWindowSize();

	let mapCases = {}
	let mapDeaths = {}
	let mapCritical = {}
	let mapRecoveries = {}
	let mapFlags = {}
	let mapActive = {}

	useEffect(() => {
		// eslint-disable-next-line
		fetchData(disease).then((res) => {
			// @ts-ignore
			setLocation(res)
		});
	}, [count]);

	// @ts-ignore
	mapCases = location && location.mapCases ? location.mapCases : undefined;
	// @ts-ignore
	mapDeaths = location && location.mapDeaths ? location.mapDeaths : undefined;
	// @ts-ignore
	mapCritical = location && location.mapCritical ? location.mapCritical : undefined;
	// @ts-ignore
	mapRecoveries = location && location.mapRecoveries ? location.mapRecoveries : undefined;
	// @ts-ignore
	mapActive = location && location.mapActive ? location.mapActive : undefined;
	// @ts-ignore
	mapFlags = location && location.mapFlags ? location.mapFlags : undefined;

	if (location) {
		if (isMobile) {
			return (
				<div>
					<div className="topRateAndMap">
						<Header />
						<Map
							mapCases={mapCases}
							mapDeaths={mapDeaths}
							mapCritical={mapCritical}
							mapRecoveries={mapRecoveries}
							mapActive={mapActive}
							mapFlags={mapFlags}
							size={size}
						/>
					</div>
				</div>
			);
		}
		return (
			<div className="app-container">
				<div className="topRateAndMap">
					<Header />
					<Map
						mapCases={mapCases}
						mapDeaths={mapDeaths}
						mapCritical={mapCritical}
						mapRecoveries={mapRecoveries}
						mapActive={mapActive}
						mapFlags={mapFlags}
						size={size}
					/>
					<Information />
				</div>
			</div>
		);
	} else {
		// @ts-ignore
		return <UncontrolledLottie size={size} />;
	}
}

export default App;
