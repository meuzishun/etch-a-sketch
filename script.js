const container = document.querySelector('.container');

const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', resetGrid);

function resetGrid() {
    deleteGrid();
    let size = prompt('How many squares per side would you like the grid to be?');
    if (size === null || size === undefined) return;
    while (size < 5 || size > 100) {
        size = prompt('How many squares per side would you like the grid to be? (choose between 5 and 100)');
        if (size === null || size === undefined) break;
    }
    buildGrid(size);
}

function randomNum(num) {
    return Math.floor(Math.random() * num);
}

function randomColor() {
    return `rgb(${randomNum(255)}, ${randomNum(255)}, ${randomNum(255)})`;
}

function extractNumbers(str) {
    const rgbNumbers = str.replace('rgb', '').replace('(', '').replace(')','').split(', ').map(num => Number(num));
    return rgbNumbers;
}

function darkenColor(rgb) {
    const newRGB = rgb.map(num => {
        if (num === 0) return num;
        if (num <= 25) return 0;
        if (num > 25) return num - 25;
    });
    return newRGB;
}

function formatColor(arr) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

function addHoveredStyle(evt) {
    const cell = evt.target;
    if (!cell.style.backgroundColor) {
        cell.style.backgroundColor = randomColor();
        return;
    }
    
    const rgbNumbers = extractNumbers(cell.style.backgroundColor);
    const darkerRGB = darkenColor(rgbNumbers);
    const color = formatColor(darkerRGB);
    cell.style.backgroundColor = color;
}

function buildGrid(num) {
    for (let i = 0; i < num; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < num; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('mouseenter', addHoveredStyle);
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

function deleteGrid() {
    const rows = [...container.querySelectorAll('.row')];
    rows.forEach(row => {
        container.removeChild(row);
    });
}

buildGrid(16);
