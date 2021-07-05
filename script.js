const container = document.querySelector('.container');

const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', resetGrid);

function resetGrid() {
    deleteGrid();
    const size = prompt('How many squares per side would you like the grid to be?');
    buildGrid(size);
}

function addHoveredStyle(evt) {
    const cell = evt.target;
    cell.style.backgroundColor = 'grey';
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
    const rows = [...container.children];
    rows.forEach(row => {
        container.removeChild(row);
    });
}

buildGrid(16);
