async function fetchData(url: string) {
    const res = await fetch(url); //here we just connect to server
    const resJson = await res.json(); // read body response in asynch way
    const mapCases = {};
    const mapDeaths = {}
    const mapRecoveries = {}

    resJson.forEach((item: any) => {
        fillmapCases(mapCases, item);
    });
    return { mapCases, mapDeaths, mapRecoveries };
}

function fillmapCases(mapCases: any, item: any) {
    if (mapCases[item.countryInfo.iso2]) {
        mapCases[item.countryInfo.iso2] += item.cases;
    } else {
        mapCases[item.countryInfo.iso2] = item.cases;
    }
}

function fillmapDeaths(mapDeaths: any, item: any) {
    if (mapDeaths[item.countryInfo.iso2]) {
        mapDeaths[item.countryInfo.iso2] += item.deaths;
    } else {
        mapDeaths[item.countryInfo.iso2] = item.deaths;
    }
}

function fillmapRecoveries(mapRecoveries: any, item: any) {
    if (mapRecoveries[item.countryInfo.iso2]) {
        mapRecoveries[item.countryInfo.iso2] += item.recoveries;
    } else {
        mapRecoveries[item.countryInfo.iso2] = item.recoveries;
    }
}

export default fetchData;
