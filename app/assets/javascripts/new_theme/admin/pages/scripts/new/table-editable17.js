var TableEditable17 = function () {

    var handleTable17 = function () {

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTable.fnDraw();
        }

        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<input class="form-control " value="' + aData[0] + '">';
            jqTds[1].innerHTML = '<input class="form-control " value="' + aData[1] + '">';

            jqTds[2].innerHTML = '<a class="edit btn btn-xs default" href=""><i class="fa fa-pencil"></i>&nbsp;Save</a>';
            jqTds[3].innerHTML = '<a class="cancel btn btn-xs default" href=""><i class="fa fa-trash-o"></i>&nbsp;Cancel</a>';
            // ComponentsFormTools.init();
        }

        function saveRow(oTable, nRow) {
            var jqInputs = $('input', nRow);

            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);

            oTable.fnUpdate('<a class="edit btn btn-xs default" href=""><i class="fa fa-pencil"></i>&nbsp;Edit</a>', nRow, 2, false);
            oTable.fnUpdate('<a class="delete btn btn-xs default" href=""><i class="fa fa-trash-o"></i>&nbsp;Delete</a>', nRow, 3, false);
            oTable.fnDraw();
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);

            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 3, false);
            oTable.fnDraw();
        }

        var table = $('#sample_editable_17');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            "paging":   false,
            "info":     false,
            "bFilter": false,
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            "pageLength": 20,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "orderCellsTop": true,
            "columnDefs": [{ // set default column settings
                "orderCellsTop": true,
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
            
        });

        var tableWrapper = $("#sample_editable_17_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: true //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_17_new').click(function (e) {
            e.preventDefault();


            if (nNew && nEditing) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    
                    return;
                }
            }

            var aiNew = oTable.fnAddData(['', '', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
            // Set method for creating items
            // $(".save17").attr("method", "POST");
            ComponentsFormTools.init();
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            delete_item_new(this); // Deleting from server side
            alert("Deleted! :)");
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        function saveRowInDB(distance, charges){
            $.ajax({
                  url: '/admin/delivery_charges',
                  data: {"distance": distance,  "charges" : charges},
                  method: 'POST',
                  success: function(data) {
                    alert("Created..!!");
                  }
                });
        }

        function updateRowInDB(distance, charges, id){
            $.ajax({
                  url: '/admin/delivery_charges/'+id,
                  data: {"distance": distance,  "charges" : charges},
                  method: 'PUT',
                  success: function(data) {
                    alert("Updated..!!");
                  }
                });
        }

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

             buton = this.innerHTML.split("&nbsp;");
            buton_text = buton[1];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;

            } else if (nEditing == nRow && buton_text == "Save") {
                /* Editing this row and want to save it */
                var jqInputs = $('input', nRow); // its position is fixed here 
                var errors = check_validation_errors(jqInputs)
                if (!errors){
                    saveRow(oTable, nEditing);
                    nEditing = null;
                    // Real Magic starts here 
                     aData = oTable.fnGetData(nRow);
                    var delivery_charge_id = nRow.id
                    if (!delivery_charge_id) {
                        saveRowInDB(jqInputs[0].value, jqInputs[1].value);
                    } 
                    else {
                        updateRowInDB(jqInputs[0].value, jqInputs[1].value, delivery_charge_id);
                    }
                    // Magic ends
                }


            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable17();
        }

    };

}();