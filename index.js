const hex = document.getElementById("hex");
// const hex = document.querySelector(".color-hex");
// const paletteBlock = document.querySelector(".palette-block");
const colorOutput = document.getElementById("colorOutput");
const colorBlock = document.querySelector(".color-block");
const paletteMenu = document.querySelector(".palette-menu");

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

        console.log(hex.innerText)

        hex.innerText = color.toUpperCase() + "!";
        hex.style.backgroundColor = color;
        colorOutput.style.height = "322px";
        colorOutput.style.opacity = 1;

        heading.forEach(function (element) {
            element.style.color = color;
        });
        // colorBlock.style.display = "block";
        // paletteMenu.style.display = "block";
        // paletteBlock.style.display = "none";
    };
}

function getPalettes(baseColor) {
    const paletteModes = document.querySelector(".palette-modes");
    const mode = paletteModes.options[paletteModes.selectedIndex].value;
    const one = document.querySelector(".one");
    const two = document.querySelector(".two");
    const three = document.querySelector(".three");
    const four = document.querySelector(".four");
    const five = document.querySelector(".five");
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
        one.style.backgroundColor = colors[0].hex.value;
        two.style.backgroundColor = colors[1].hex.value;
        three.style.backgroundColor = colors[2].hex.value;
        four.style.backgroundColor = colors[3].hex.value;
        five.style.backgroundColor = colors[4].hex.value;

        one.innerText = colors[0].hex.value;
        two.innerText = colors[1].hex.value;
        three.innerText = colors[2].hex.value;
        four.innerText = colors[3].hex.value;
        five.innerText = colors[4].hex.value;

        paletteBlock.style.display = "block";
    };
}

document.querySelector(".get-color").addEventListener("click", function () {
    const month = document.querySelector(".js-months").value;
    const day = document.querySelector(".js-days").value - 1;
    getColor(month, day, hex);
});

document.querySelector(".get-palettes").addEventListener("click", function () {
    var baseColor = hex.innerText
        .substring(0, hex.innerText.length - 1)
        .substr(1);
    getPalettes(baseColor);
});
