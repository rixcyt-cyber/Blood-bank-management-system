/ Blood Bank Inventory (in-memory storage)
let bloodInventory = {
    "A+": 0,
    "A-": 0,
    "B+": 0,
    "B-": 0,
    "O+": 0,
    "O-": 0,
    "AB+": 0,
    "AB-": 0,
};

// Update the Blood Inventory Table
function updateInventoryTable() {
    const inventoryTableBody = document.querySelector("#inventoryTable tbody");
    inventoryTableBody.innerHTML = "";
    for (const [bloodType, units] of Object.entries(bloodInventory)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${bloodType}</td><td>${units}</td>`;
        inventoryTableBody.appendChild(row);
    }
}

// Handle Donor Registration
document.querySelector("#donorForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#donorName").value;
    const age = document.querySelector("#donorAge").value;
    const bloodType = document.querySelector("#bloodType").value;
    const units = parseInt(document.querySelector("#donorUnits").value);

    // Add units to the corresponding blood type in inventory
    if (bloodType && units > 0) {
        bloodInventory[bloodType] += units;
        alert(`Donor added! Blood units added to ${bloodType} inventory.`);
        updateInventoryTable();
    } else {
        alert("Please fill in all fields correctly.");
    }

    // Reset the form
    document.querySelector("#donorForm").reset();
});

// Handle Blood Request
document.querySelector("#bloodRequestForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const requesterName = document.querySelector("#requesterName").value;
    const unitsRequested = parseInt(document.querySelector("#requestUnits").value);
    const requestBloodType = document.querySelector("#requestBloodType").value;

    if (requestBloodType && unitsRequested > 0 && bloodInventory[requestBloodType] >= unitsRequested) {
        // Deduct the requested units from the inventory
        bloodInventory[requestBloodType] -= unitsRequested;
        alert(`Request fulfilled! ${unitsRequested} units of ${requestBloodType} blood given to ${requesterName}.`);
        updateInventoryTable();
    } else if (bloodInventory[requestBloodType] < unitsRequested) {
        alert(`Not enough ${requestBloodType} blood available.`);
    } else {
        alert("Please fill in all fields correctly.");
    }

    // Reset the form
    document.querySelector("#bloodRequestForm").reset();
});

// Initialize the inventory table
updateInventoryTable();
