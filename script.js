
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

const doHoverEffect = function(){
    s = window.getComputedStyle(this);
    console.log(s.opacity);
    this.style.opacity = (Number(s.opacity) + 0.1);

}

const attachMouseoverListener = function(){
    boxArray = document.getElementsByClassName("box");
    for (let i = 0; i < boxArray.length; i++){
        boxArray[i].addEventListener("mouseover", doHoverEffect);
    }
}

populateGrid(30, 100);
attachMouseoverListener();