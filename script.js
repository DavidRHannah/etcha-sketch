let theme = "gray";
let overlap = false;
let progressive = false;
let useCustom = false;
let customColor = "rgb(0,0,0)";
let red = 0;
let green = 0;
let blue = 0;

const updateCustomColorPreview = function(){
    const customColorPreview = document.getElementById("customColorPreview");
    customColorPreview.style.backgroundColor = customColor;
}

const parseCustomColor = function(){
    customColor = "rgb(" + red + "," + green + "," + blue + ")";
    updateCustomColorPreview();
}

const connectSettingButtons = function(){
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", ()=>{
        populateGrid(40, 100);
        connectSeasonButtons();
        attachMouseoverListener();
    });

    const randomBtn = document.getElementById("randomBtn");
    randomBtn.addEventListener("click", ()=>{
        theme="random";
    });
    
    const overlapCheck = document.getElementById("overlap");
    overlapCheck.addEventListener("change", ()=>{
        if (overlapCheck.checked){
            overlap = true;
        } else{
            overlap = false;
        }
    });

    const progressiveCheck = document.getElementById("progressive");
    progressiveCheck.addEventListener("change",()=>{
        if (progressiveCheck.checked){
            progressive = true;
        } else{
            progressive = false;
        }
    });

    const customColorCheck = document.getElementById("custom");
    customColorCheck.addEventListener("change",()=>{
        if (customColorCheck.checked) {
            useCustom = true;
        } else {
            useCustom = false;
        }
    });

    const rInput = document.getElementById("redInput");
    const gInput = document.getElementById("greenInput");
    const bInput = document.getElementById("blueInput");
    
    rInput.addEventListener("change", ()=>{
        red = Number(rInput.value)
        if (red > 255){
            red = 255
        }else if (red < 0){
            red = 0
        }
        parseCustomColor();
    });
    gInput.addEventListener("change", ()=>{
        green = Number(gInput.value)
        if (green > 255){
            green = 255
        }else if (green < 0){
            green = 0
        }
        console.log(green);
        parseCustomColor();
    });
    bInput.addEventListener("change", ()=>{
        blue = Number(bInput.value)
        if (blue > 255){
            blue = 255
        }else if (blue < 0){
            blue = 0
        }
        parseCustomColor();
    });
}

const connectSeasonButtons = function(){
    const grayBtn = document.getElementById("grayScaleBtn");
    const fallBtn = document.getElementById("fallBtn");
    const winterBtn = document.getElementById("winterBtn");
    const springBtn = document.getElementById("springBtn");
    const summerBtn = document.getElementById("summerBtn");

    grayBtn.addEventListener("click", ()=>{theme = "gray";});
    fallBtn.addEventListener("click", ()=>{ theme = "fall";});
    winterBtn.addEventListener("click", ()=>{ theme = "winter";});
    springBtn.addEventListener("click", ()=>{ theme = "spring";});
    summerBtn.addEventListener("click", ()=>{ theme = "summer";});
}

const populateGrid = function(rowCount, colCount){
    gridContainerDiv = document.getElementById("grid");
    gridContainerDiv.innerHTML = "";
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

const getColor = function(setting){
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
    
    if (useCustom){
        return customColor;
    }

    let palette;
    switch(setting.toLowerCase()){
        case "random":
            return ("#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}));
        case "gray":
            return "#000000";
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

    let ranColorIndex = Math.floor(Math.random() * 5);
    var randomColor = palette[ranColorIndex];

    return randomColor;
}

const doHoverEffect = function(){
    s = window.getComputedStyle(this);
    op = s.opacity;
    bg = s.backgroundColor;
    
    if (op == 0.1 && bg == "rgb(0, 0, 0)"){
        this.style.backgroundColor = getColor(theme);
        this.style.opacity = Math.min(Number(op) + 0.1, 1);

    } else if (op != 0.1) {
        if (overlap && progressive)
        {
            this.style.backgroundColor = getColor(theme);
            this.style.opacity = Math.min(Number(op) + 0.1, 1);
        } 
        else if (progressive)
        {
            this.style.opacity = Math.min(Number(op) + 0.1, 1);
        } 
        else if (overlap)
        {
            this.style.backgroundColor = getColor(theme);
            this.style.opacity = 0.2;
        }
    }
}

const attachMouseoverListener = function(){
    boxArray = document.getElementsByClassName("box");
    for (let i = 0; i < boxArray.length; i++){
        boxArray[i].addEventListener("mouseover", doHoverEffect);
    }
}

populateGrid(40, 100);
connectSettingButtons();
connectSeasonButtons();
attachMouseoverListener();
