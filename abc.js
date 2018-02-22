function parseABCToArr(string) {
    let  times = 0, notesCount = 0, maxTone = 0, minTone = 0;
    return string.match(/[a-zA-Z]\d{0,1}\/{0,1}\d{0,1}/g).map(el => {
        let notes;
        el.replace(/([a-zA-z]){1}(\d){0,1}\/{0,1}(\d){0,1}/, (full, note, tone, part) => {
            notes = {
                note: note2code(note),
                tone: tone || 0,
                part: part || 1
            };
            times += 1/(+part || 1)
            notesCount++;
            maxTone = Math.max(maxTone, (notes.note && tone) || 0);
            minTone = Math.min(minTone, (notes.note && tone) || 0);
        });
        window._totalCountParts = Math.ceil(times);
        window._totalCountNotes = Math.ceil(notesCount);
        window._maxTone = maxTone;
        window._minTone = minTone;
        return notes;
    })
}

function generateTableWithNotes(notes, table, keys) {
    keys = keys || 15;
    if (!table) {
        table = document.body.appendChild(document.createElement('table'));
    }
    HTMLTableGenerator(Math.ceil(window._totalCountNotes), keys, table)
        .then(table => {
            notes.forEach((element, i) => {
                const field = table.rows[i].cells[Math.min(element.note + (7*tone2keyPart(element.tone, keys)), keys)]
                field.innerHTML = element.tone;
                field.className = `n${element.note} note`;
                field.parentElement.className = `d${element.part}`;
            });
        });
}

function HTMLTableGenerator(rows, cols, table) {
    for (let i = 0; i <= rows; i++) {
        const row = table.insertRow(i);
        for (let k = 0; k <= cols; k++) {
            row.insertCell(k);
        }
    }
    return new Promise((r, j) => {
        r(table);
    })
}

function note2code(note) {
    return ['z', 'c', 'd', 'e', 'f', 'g', 'a', 'b'].indexOf(note.toLowerCase());
}

function tone2keyPart(tone, keys) {
    return Math.floor(tone/((window._maxTone - window._minTone)/Math.min(keys/7)));
}