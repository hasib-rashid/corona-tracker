import React, { useEffect, useState } from 'react';
import Map from './components/Map/Map';
import UncontrolledLottie from './components/UncontrolledLottie';
import { useWindowSize } from './hooks/useWindowSize';

const handleClick = (e: any, countryCode: any) => { };

function App() {
	const [location, setLocation] = useState();
	const [count, setCount] = useState(0);
	const size = useWindowSize();
	const [currentPage, setCurrentPage] = useState(0);

	let mapData = {};
	let chartData = {};
	let tableData = [];
	let topRate = [];

	const handlePageChange = (number) => {
		setCurrentPage(number); // set currentPage number, to reset it from the previous selected.
	};

	useEffect(() => {
		const resultFetch = fetchData(url).then((res) => setLocation(res));
	}, [count]);

	// @ts-ignore
	mapData = location && location.mapData ? location.mapData : undefined;
	// @ts-ignore
	chartData = location && location.chartData ? location.chartData : undefined;
	// @ts-ignore
	tableData = location && location.tableData ? location.tableData : undefined;
	// @ts-ignore
	topRate = location && location.topRate ? location.topRate : undefined;

	if (location) {
		if (isMobile) {
			return (
				<div>
					<div className="topRateAndMap">
						<TopRate topRate={topRate} size={size} />
						<Map
							handleClick={handleClick}
							mapData={mapData}
							size={size}
						/>
					</div>
					<div className="relatedApp">
						<Related />
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
		return <UncontrolledLottie size={size} />;
	}
}

export default App;
