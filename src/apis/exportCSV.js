import { saveAs } from 'file-saver';

export const exportCSV = (table) => {
    let csv = [];
    const rows = document.querySelectorAll("table tr"); 
    for (const row of rows.values()) {
        const cells = row.querySelectorAll("td, th");
        const rowText = Array.from(cells).map(cell => cell.innerText);
        csv.push(rowText.join(','));       
    }
    const csvFile = new Blob([csv.join('\n')], {type: "text/csv;charset=utf-8;"});
    saveAs(csvFile, "Greach_"+table+"_Data.csv");
}