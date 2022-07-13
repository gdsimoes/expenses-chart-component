async function getData(url) {
    const requestURL = url;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonArr = await response.json();

    populateBars(jsonArr);
}

function populateBars(jsonArr) {
    const maxAmount = jsonArr.reduce(
        (max, obj) => (max < obj.amount ? obj.amount : max),
        0
    );

    for (const obj of jsonArr) {
        const bar = document.querySelector(`#${obj.day}`);
        bar.style.height = `${(150 / 177) * (obj.amount / maxAmount) * 100}%`;
    }
}

getData("data.json");
