document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Page loaded. Ready for interactions.");

  // --- Search Bar Functionality ---
  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      const table = document.querySelector(".data-table tbody");
      const rows = table.getElementsByTagName("tr");

      // Loop through all table rows, and hide those who don't match
      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let found = false;

        // Start loop from j=0 since checkbox cell is removed
        for (let j = 0; j < cells.length; j++) {
          if (cells[j].innerText.toLowerCase().includes(filter)) {
            found = true;
            break;
          }
        }
        if (found) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    });
  }

  // --- TODO: Add 'Excel Download' Functionality ---
  const excelButton = document.querySelector(".btn-success");
  if (excelButton) {
    excelButton.addEventListener("click", () => {
      alert("Excel Download functionality not yet implemented.");
      // Here you would add a library like SheetJS (xlsx) to generate an Excel file.
    });
  }

  // --- Pagination logic removed ---

  // --- TODO: Add Sorting Functionality ---
  // Add click listeners to table headers (th) to sort the rows.
});
