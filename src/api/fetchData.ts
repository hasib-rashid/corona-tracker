async function fetchData(url: string) {
    const res = await fetch(url); //here we just connect to server
    const resJson = await res.json(); // read body response in asynch way
    const mapCases = {};
    const mapDeaths = {}
    const mapRecoveries = {}
    const mapFlags = {}

    resJson.forEach((item: any) => {
        fillmapCases(mapCases, item);
        fillmapDeaths(mapDeaths, item);
        fillmapRecoveries(mapRecoveries, item);
        fillmapFlags(mapFlags, item)
    });
    return { mapCases, mapDeaths, mapRecoveries, mapFlags };
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
        mapRecoveries[item.countryInfo.iso2] += item.recovered;
    } else {
        mapRecoveries[item.countryInfo.iso2] = item.recovered;
    }
}

function fillmapFlags(mapFlags: any, item: any) {
    if (mapFlags[item.countryInfo.iso2]) {
        mapFlags[item.countryInfo.iso2] += item.countryInfo.flag;
    } else {
        mapFlags[item.countryInfo.iso2] = item.countryInfo.flag;
    }
}

export default fetchData;
