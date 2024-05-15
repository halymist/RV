// Define your data array here
const dataArray = [
    ["Náklady celkem", 8, 14], 
    ["Náklady pomocných činností", 6, 10], 
    ["Druhotné mzdy", 5, 12], 
    ["Hnojiva - nakupovaná", 10, 15], 
    ["Odpisy HIM - přímé", 9, 16], 
    ["Osiva (sadba) - nakupovaná", 11, 18], 
    ["Osiva (sadba) - vlastní", 7, 13], 
    ["Ostatní přímé náklady a služby", 4, 11], 
    ["Ostatní přímý materiál", 3, 9], 
    ["PHM - přímé", 10, 17], 
    ["Pojistné - přímé", 5, 12], 
    ["Prodané množství", 8, 14], 
    ["Prostředky ochrany rostlin", 6, 10], 
    ["Správní režie", 9, 16], 
    ["Tržby za výrobky", 11, 18]
];

var Selected;
// Function to generate table
function generateTable(dataArray) {
    const tableBody = document.querySelector('#data-table tbody');

    // Add table rows
    dataArray.forEach(rowData => {
        const row = tableBody.insertRow();
        rowData.forEach((cellData, index) => {
            const cell = row.insertCell();
            if (index === 0) {
                cell.textContent = cellData;
                cell.style.fontWeight = 'bold'; // Bold for indicator name
                cell.addEventListener('click', () => {
                    // Remove selected class from all rows
                    tableBody.querySelectorAll('tr').forEach(row => {
                        row.classList.remove('selected');
                    });
                    // Add selected class to clicked row
                    row.classList.add('selected');
                    // Display selected row in visual div
                    const visualDiv = document.getElementById('visual');
                    Selected = cellData;
                    visualDiv.textContent = `Selected row: ${Selected}`;
                });
            } else {
                cell.textContent = cellData || ''; // Empty cell if no data
            }
        });
    });
}

// Call the function to generate the table
generateTable(dataArray);
