"use strict";

// Draw graph
const cyan = "#76B5BC";

async function getData(url) {
    const requestURL = url;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonArr = await response.json();

    populateBars(jsonArr);
}

function populateBars(jsonArr) {
    const maxAmount = jsonArr.reduce(
        (max, obj) =>
            Number(max) < Number(obj.amount) ? Number(obj.amount) : Number(max),
        0
    );

    if (window.innerWidth >= 700) {
        for (const obj of jsonArr) {
            const bar = document.querySelector(`#${obj.day}`);
            bar.style.height = `${(obj.amount / maxAmount) * 150}px`;
            bar.style.transitionDuration = `${(obj.amount / maxAmount) * 2}s`;
            if (obj.amount === maxAmount) {
                bar.style.backgroundColor = cyan;
            }
        }
    } else {
        for (const obj of jsonArr) {
            const bar = document.querySelector(`#${obj.day}`);

            bar.style.height = `${
                (150 / 375) * (obj.amount / maxAmount) * 100
            }vw`;
            bar.style.transitionDuration = `${(obj.amount / maxAmount) * 2}s`;
            if (obj.amount === maxAmount) {
                bar.style.backgroundColor = cyan;
            }
        }
    }
}

getData("data.json");

// Scale the design for bigger screens
const scalar = () => {
    const container = document.querySelector(".container");
    if (window.innerWidth >= 700) {
        container.style.transform = `scale(${window.innerWidth / 1440})`;
    } else {
        container.style.transform = `scale(1)`;
    }
};

window.onresize = scalar;

scalar();
