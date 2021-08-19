import React, { useEffect, useState } from 'react';
import fetchData from './api/fetchData';
import { disease } from './api/utilities';
import Map from './components/Map/Map';
import UncontrolledLottie from './components/UncontrolledLottie';
import { useWindowSize } from './hooks/useWindowSize';
import { isMobile } from 'react-device-detect'

function App() {
	const [location, setLocation] = useState();
	const [count] = useState(0);
	const size = useWindowSize();

	let mapCases = {}
	let mapDeaths = {}
	let mapRecoveries = {}
	let mapFlags = {}


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
	mapRecoveries = location && location.mapRecoveries ? location.mapRecoveries : undefined;
	// @ts-ignore
	mapFlags = location && location.mapFlags ? location.mapFlags : undefined;

	if (location) {
		if (isMobile) {
			return (
				<div>
					<div className="topRateAndMap">
						<Map
							mapCases={mapCases}
							mapDeaths={mapDeaths}
							mapRecoveries={mapRecoveries}
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
					<Map
						mapCases={mapCases}
						mapDeaths={mapDeaths}
						mapRecoveries={mapRecoveries}
						mapFlags={mapFlags}
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
