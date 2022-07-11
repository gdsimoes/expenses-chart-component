async function getData(url) {
    const requestURL = url;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonObj = await response.json();

    console.log(jsonObj);
}

getData("data.json");
