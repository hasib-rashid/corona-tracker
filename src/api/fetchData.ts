async function fetchData(url: string) {
    const res = await fetch(url); //here we just connect to server
    const resJson = await res.json(); // read body response in asynch way
    const mapCases = {};

    resJson.forEach((item: any) => {
        fillmapCases(mapCases, item);
    });
    return { mapCases };
}

function fillmapCases(mapCases: any, item: any) {
    if (mapCases[item.countryInfo.iso2]) {
        mapCases[item.countryInfo.iso2] += item.cases;
    } else {
        mapCases[item.countryInfo.iso2] = item.cases;
    }
}

export default fetchData;
