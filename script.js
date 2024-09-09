let theme = "fall";

const connectSeasonButtons = function(){
    const fallBtn = document.getElementById("fallBtn");
    const winterBtn = document.getElementById("winterBtn");
    const springBtn = document.getElementById("springBtn");
    const summerBtn = document.getElementById("summerBtn");

    fallBtn.addEventListener("click", ()=>{ theme = "fall"; });
    winterBtn.addEventListener("click", ()=>{ theme = "winter"; });
    springBtn.addEventListener("click", ()=>{ theme = "spring"; });
    summerBtn.addEventListener("click", ()=>{ theme = "summer"; });
}

const populateGrid = function(rowCount, colCount){
    gridContainerDiv = document.getElementById("grid");
    for (let i = 1; i <= rowCount; i++){
        let rowDiv = document.createElement('div');
        rowDiv.id = ('row-'+i);
        rowDiv.className = 'flex-grid';
        for (let j = 1; j <= colCount; j++){
            let boxDiv = document.createElement('div');
            boxDiv.id = ('box-'+j);
            boxDiv.className = 'box';
            rowDiv.appendChild(boxDiv);
        }
        gridContainerDiv.appendChild(rowDiv);
    }
}

const getRandomColor = function(season){
    const fallPalette = [
        "#FF6F00",  // Burnt Orange
        "#C62828",  // Deep Red
        "#F9A825",  // Golden Yellow
        "#2C6B4F",  // Forest Green
        "#6D4C41"   // Brown
    ];
    const summerPalette = [
        "#FFD600",  // Sunny Yellow
        "#03A9F4",  // Sky Blue
        "#FF6F61",  // Coral
        "#4CAF50",  // Tropical Green
        "#F5F5DC"   // Sandy Beige
    ];
    const winterPalette = [
        "#FFFFFF",  // Snow White
        "#B3E5FC",  // Ice Blue
        "#9E9E9E",  // Cool Gray
        "#003366",  // Midnight Blue
        "#E0F2F1"   // Frosty Mint
    ];
    const springPalette = [
        "#F48FB1",  // Blossom Pink
        "#A5D6A7",  // Mint Green
        "#E1BEE7",  // Lavender
        "#FFF59D",  // Fresh Yellow
        "#81D4FA"   // Sky Blue
    ];
    
    let palette;
    switch(season.toLowerCase()){
        case "fall":
            palette = fallPalette;
            break;
        case "summer":
            palette = summerPalette;
            break;
        case "winter":
            palette = winterPalette;
            break;
        case "spring":
            palette = springPalette;
    }

    let ranColorIndex = Math.floor(Math.random() * 6);
    var randomColor = palette[ranColorIndex];

    return randomColor;
}

const doHoverEffect = function(){
    s = window.getComputedStyle(this);
    op = s.opacity;
    if (s.backgroundColor == "rgb(0, 0, 0)"){
        this.style.backgroundColor = getRandomColor(theme);
    }
    this.style.opacity = (Number(op) + 0.2);
}

const attachMouseoverListener = function(){
    boxArray = document.getElementsByClassName("box");
    for (let i = 0; i < boxArray.length; i++){
        boxArray[i].addEventListener("mouseover", doHoverEffect);
    }
}

populateGrid(30, 100);
connectSeasonButtons();
attachMouseoverListener();