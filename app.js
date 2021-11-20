const body = document.querySelector("body");
const container = document.getElementById("container");
const outputFirstLine = document.querySelector("#colorOutput p:first-child");
const hex = document.getElementById("hex");
const outputLastLine = document.querySelector("#colorOutput p:last-child");
// const hex = document.querySelector(".color-hex");
// const paletteBlock = document.querySelector(".palette-block");
const colorOutput = document.getElementById("colorOutput");
// const colorBlock = document.querySelector(".color-block");
const paletteMenu = document.getElementById("paletteMenu");

function getColor(month, day, hex) {
    const displayColor = document.querySelector(".color");
    const heading = document.querySelectorAll("h2");
    const spectrum = new XMLHttpRequest();
    const colorURL =
        "https://api.harvardartmuseums.org/spectrum?apikey=899a2970-93ef-11ea-87cd-f19f92bc892b&q=month:" +
        month +
        "&size=31&sort=day&sortorder=asc";
    spectrum.open("GET", colorURL);
    spectrum.send();
    spectrum.onload = function () {
        const json = JSON.parse(spectrum.responseText);
        const color = json.records[day].color;

        body.classList.add("recolored");
        body.style.backgroundColor = color;

        // coloredText.classList.add("recolored");
        // coloredText.style.color = color;
        
        colorOutput.style.height = "322px";
        colorOutput.style.margin = "2rem 0 2rem 0";
        colorOutput.style.opacity = 1;

        outputFirstLine.classList.add("displayed");

        hex.innerText = color.toUpperCase() + "!";
        hex.style.backgroundColor = color;
        hex.classList.add("displayed");
        
        outputLastLine.classList.add("displayed");

        // container.style.height = "668.5px";
        
        heading.forEach(function (element) {
            element.style.color = color;
        });
    };
}

function getPalettes(baseColor) {
    const paletteModes = document.querySelector(".palette-modes");
    const mode = paletteModes.options[paletteModes.selectedIndex].value;
    const colorOne = document.getElementById("colorOne");
    const colorTwo = document.getElementById("colorTwo");
    const colorThree = document.getElementById("colorThree");
    const colorFour = document.getElementById("colorFour");
    const colorFive = document.getElementById("colorFive");
    const paletteURL =
        "https://www.thecolorapi.com/scheme?hex=" +
        baseColor +
        "&format=json&mode=" +
        mode;

    const palette = new XMLHttpRequest();
    palette.open("GET", paletteURL);
    palette.send();
    palette.onload = function () {
        const colors = JSON.parse(palette.responseText).colors;
        colorOne.style.backgroundColor = colors[0].hex.value;
        colorTwo.style.backgroundColor = colors[1].hex.value;
        colorThree.style.backgroundColor = colors[2].hex.value;
        colorFour.style.backgroundColor = colors[3].hex.value;
        colorFive.style.backgroundColor = colors[4].hex.value;

        colorOne.innerText = colors[0].hex.value;
        colorTwo.innerText = colors[1].hex.value;
        colorThree.innerText = colors[2].hex.value;
        colorFour.innerText = colors[3].hex.value;
        colorFive.innerText = colors[4].hex.value;

        paletteBlock.style.display = "block";
    };
}

document.querySelector(".get-color").addEventListener("click", function () {
    const month = document.querySelector(".js-months").value;
    const day = document.querySelector(".js-days").value - 1;
    getColor(month, day, hex);
});

// document.querySelector(".get-palettes").addEventListener("click", function () {
//     var baseColor = hex.innerText
//         .substring(0, hex.innerText.length - 1)
//         .substr(1);
//     getPalettes(baseColor);
// });
