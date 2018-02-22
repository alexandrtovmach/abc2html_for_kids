function parseABCToArr(string) {
    let  parts = 0;
    return string.match(/[a-zA-Z]\d{0,1}\/{0,1}\d{0,1}/g).map(el => {
        let notes;
        el.replace(/([a-zA-z]){1}(\d){0,1}\/{0,1}(\d){0,1}/, (full, note, tone, part) => {
            notes = {note, tone, part};
            parts += 1/(+part || 1)
        });
        window._totalCountParts = Math.ceil(parts);
        return notes;
    })
}

function generateTable(notes, table, keys) {
    if (!table) {
        table = document.body.appendChild(document.createElement('table'));
    }
    HTMLTableGenerator(Math.ceil(window._totalCountParts/4), (keys || 15), table)
}

function HTMLTableGenerator(rows, cols, table) {
    for (let i = 0; i <= rows; i++) {
        const row = table.insertRow(i);
        for (let k = 0; k <= cols; k++) {
            row.insertCell(k).innerHTML = 'music';
        }
    }
    return table;
}