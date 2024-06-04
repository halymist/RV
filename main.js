// Define your data array here
const dataArray = [
    ["Řepka", 2018,"Náklady celkem", 8, 14, 12], 
    ["Řepka", 2018,"Výnos", 8, 14, 12], 
    ["Řepka", 2018,"Náklady pomocných činností", 6, 10, 11], 
    ["Řepka", 2018,"Druhotné mzdy", 5, 12, 12], 
    ["Řepka", 2018,"Hnojiva - nakupovaná", 10, 15, 13], 
    ["Řepka", 2018,"Odpisy HIM - přímé", 9, 16, 14], 
    ["Řepka", 2018,"Osiva (sadba) - nakupovaná", 11, 18, 18], 
    ["Řepka", 2018,"Osiva (sadba) - vlastní", 7, 13, 13], 
    ["Řepka", 2018,"Ostatní přímé náklady a služby", 4, 11, 10], 
    ["Řepka", 2018,"Ostatní přímý materiál", 3, 9, 10], 
    ["Řepka", 2018,"PHM - přímé", 10, 17, 16], 
    ["Řepka", 2018,"Pojistné - přímé", 5, 12, 12], 
    ["Řepka", 2018,"Prodané množství", 8, 14, 12], 
    ["Řepka", 2018,"Prostředky ochrany rostlin", 6, 10, 12], 
    ["Řepka", 2018,"Správní režie", 9, 16, 15], 
    ["Řepka", 2018,"Tržby za výrobky", 11, 18, 17],
    ["Kukuřice", 2018,"Náklady celkem", 8, 14, 12], 
    ["Kukuřice", 2018,"Výnos", 8, 14, 12], 
    ["Kukuřice", 2018,"Náklady pomocných činností", 6, 10, 11], 
    ["Kukuřice", 2018,"Druhotné mzdy", 5, 12, 12], 
    ["Kukuřice", 2018,"Hnojiva - nakupovaná", 10, 15, 13], 
];



function getDistinctValues(dataArray, columnIndex) {
    const distinctValues = {};
    dataArray.forEach(row => {
        const value = row[columnIndex];
        if (!distinctValues[value]) {
            if (columnIndex == 2) {
                if (preselectedUkazatel.includes(value)) {
                    distinctValues[value] = { value: value, selected: true };
                } else {
                    distinctValues[value] = { value: value, selected: false };
                }
            } else {
                distinctValues[value] = { value: value, selected: true };
            }
        }
    });
    return Object.values(distinctValues);
}

const preselectedUkazatel = ["Náklady celkem", "Výnos", "Tržby za výrobky"];
// Get distinct values for each of the first three columns
const distinctPlodina = getDistinctValues(dataArray, 0); // Column 1 (Plodina)
const distinctRok = getDistinctValues(dataArray, 1); // Column 2 (Rok)
const distinctUkazatel = getDistinctValues(dataArray, 2);

function filterData() {
    return dataArray.filter(row => {
        const plodinaSelected = distinctPlodina.some(item => item.value === row[0] && item.selected);
        const rokSelected = distinctRok.some(item => item.value === row[1] && item.selected);
        const ukazatelSelected = distinctUkazatel.some(item => item.value === row[2] && item.selected);
        return plodinaSelected && rokSelected && ukazatelSelected;
    });
}

function populateDropdowns() {
    const plodinaDropdown = document.getElementById('plodinaDropdown');
    const rokDropdown = document.getElementById('rokDropdown');
    const ukazatelDropdown = document.getElementById('ukazatelDropdown');

    // Populate Plodina dropdown
    distinctPlodina.forEach(item => {
        const option = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.selected;
        checkbox.addEventListener('change', () => {
            item.selected = checkbox.checked; // Update the selected state
            filteredArray = filterData();
            generateTable(filteredArray);
            generateGraphs(filteredArray);
        });
        option.appendChild(checkbox);
        const label = document.createElement('label'); // Create a label element
        label.textContent = item.value; // Set the label text to the item value
        option.appendChild(label);
        plodinaDropdown.appendChild(option);
    });

    // Populate Rok dropdown
    distinctRok.forEach(item => {
        const option = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.selected;
        checkbox.addEventListener('change', () => {
            item.selected = checkbox.checked; // Update the selected state
            filteredArray = filterData();
            generateTable(filteredArray);
            generateGraphs(filteredArray);
        });
        option.appendChild(checkbox);
        const label = document.createElement('label'); // Create a label element
        label.textContent = item.value; // Set the label text to the item value
        option.appendChild(label);
        rokDropdown.appendChild(option);
    });

    // Populate Ukazatel dropdown
    distinctUkazatel.forEach(item => {
        const option = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.selected;
        checkbox.addEventListener('change', () => {
            item.selected = checkbox.checked; // Update the selected state
            filteredArray = filterData();
            generateTable(filteredArray)
            generateGraphs(filteredArray);
        });
        option.appendChild(checkbox);
        const label = document.createElement('label'); // Create a label element
        label.textContent = item.value; // Set the label text to the item value
        option.appendChild(label);
        ukazatelDropdown.appendChild(option);
    });
}

function toggleDropdown(dropdown) {
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}


// Function to generate table
function generateTable(filteredArray) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    // Add table rows
    filteredArray.forEach(rowData => {
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
                });
            } else {
                cell.textContent = cellData || ''; // Empty cell if no data
            }
        });
    });
}

function generateGraphs(filteredArray) {
    const visualDiv = document.getElementById('visual');
    visualDiv.innerHTML = ''; // Clear the existing content
    const crops = {}; // To store data for each crop

    // Process the filtered array to segregate data by crops
    filteredArray.forEach(row => {
        const crop = row[0]; // The crop name
        const indicator = row[2]; // The indicator name
        const values = row.slice(3); // The values

        if (!crops[crop]) {
            crops[crop] = [];
        }

        crops[crop].push([indicator, ...values]);
    });

    // Generate a bar graph for each crop
    Object.keys(crops).forEach(crop => {
        const ctx = document.createElement('canvas');
        visualDiv.appendChild(ctx);
        const labels = [];
        const values = [];

        crops[crop].forEach(row => {
            const indicator = row[0];
            const userValue = row[1];
            const crValue = row[2];
            const klimaValue = row[3];

            labels.push(`user;${indicator}`);
            values.push(userValue);
            labels.push(`čr;${indicator}`);
            values.push(crValue);
            labels.push(`klima;${indicator}`);
            values.push(klimaValue);
        });
        const h2FontSize = parseFloat(window.getComputedStyle(document.querySelector("h2")).fontSize);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Values',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: crop,
                        color: 'black', // Set the color of the title
                        font: {
                            size: h2FontSize // Set the font size of the title
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function(label, index, labels) {
                                let realLabel = this.getLabelForValue(label);
                                var subCategory = realLabel.split(";")[0];
                                return subCategory;
                            }
                        }
                    },
                    xAxis2: {
                        type: 'category',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                let realLabel = this.getLabelForValue(label);
                                var indicator = realLabel.split(";")[1];
                                if (index % 3 === 1) {
                                    return indicator;
                                } else {
                                    return '';
                                }
                            }
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

const data = [
    "Náklady celkem", 8, 14, 12,
    "Výnos", 9, 13, 11,
    "Tržby za výrobky", 11, 18, 17
];

populateDropdowns();

let filteredArray = filterData();
generateTable(filteredArray);
generateGraphs(filteredArray);




