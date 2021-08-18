async function fetchData(url: string) {
    const res = await fetch(url); //here we just connect to server
    const resJson = await res.json(); // read body response in asynch way
    const mapData = {};

    resJson.locations.forEach((item: any) => {
        fillMapData(mapData, item);
    });
    return { mapData };
}

function fillMapData(mapData: any, item: any) {
    if (mapData[item.country_code]) {
        mapData[item.country_code] += item.latest.confirmed;
    } else {
        mapData[item.country_code] = item.latest.confirmed;
    }
}

export default fetchData;
