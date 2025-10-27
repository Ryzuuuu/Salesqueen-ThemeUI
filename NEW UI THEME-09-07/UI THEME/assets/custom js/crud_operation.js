function loadTable(url, tbodyId, dataTable) {
  $.getJSON(url, function (data) {
    $(dataTable).DataTable().destroy();
    $("#" + tbodyId).html(data.trs);
    initDataTable(dataTable);
  });
}

function loadTableWithFilter(url, tbodyId, tfootId, dataTable, filterData) {
  $.getJSON(url, filterData, function (data) {
    $(dataTable).DataTable().destroy();
    $("#" + tbodyId).html(data.trs);
    $("#" + tfootId).html(data.tfoot);
    initDataTable(dataTable);
  });
}

function addOneRecord(url, formId) {
  var form = document.getElementById(formId);
  var formData = new FormData(form);
  $.ajax({
    type: "POST",
    url: url,
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (result) {
      if (result.status) {
        toastr.success(result.msg + " successfully!", "Success");
        $("#au_modal").modal("hide");
        refreshTable();
      } else {
        toastr.error("Something went wrong!", "Error");
      }
    },
  });
}

function initDataTable(dataTable) {
  var table = $(dataTable).DataTable({
    language: {
      lengthMenu: "_MENU_",
      search: "", // Removes the "Search:" label
      searchPlaceholder:
        "Search for order ID, customer, order status or something...", // Adds placeholder
    },
    rowReorder: {
      selector: "td:nth-child(2)",
    },
    responsive: true,

    // NEW DOM layout to match the screenshot
    dom:
      '<"row"<"col-sm-12"f>>' + // Search bar on top
      '<"row mt-2"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"B>>' + // Length menu (left) and Buttons (right)
      '<"row"<"col-sm-12"t>>' + // The table itself
      '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>', // Info (left) and Pagination (right)

    // UPDATED buttons array
    buttons: [
      {
        text: '<i class="fa-solid fa-arrow-right-from-bracket me-1"></i> EXPORT', // Added icon
        extend: "collection",
        buttons: [
          {
            text: '<i class="fa-regular fa-file-excel me-1"></i> Excel',
            extend: "excel",
          },
          {
            text: '<i class="fa-regular fa-file-lines me-1"></i> CSV',
            extend: "csv",
          },
          {
            text: '<i class="fa-regular fa-file-pdf me-1"></i> PDF',
            extend: "pdf",
          },
          {
            text: '<i class="fa-solid fa-print me-1"></i> PRINT',
            extend: "print",
          },
        ],
        className: "btn-light", // Styled the button to be light grey as in screenshot
      },
      // Removed the old refresh button object
    ],
  });
}

function deleteIt(url) {
  $.ajax({
    type: "DELETE",
    url: url,
    dataType: "json",
    success: function (response) {
      if (response.isDeleted) {
        toastr.success("Deleted successfully!", "Success");
        refreshTable();
      } else {
        toastr.error("Something went wrong!", "Error");
      }
    },
  });
}
