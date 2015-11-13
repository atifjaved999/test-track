// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs




//= require new_theme/global/plugins/jquery.min.js
//= require new_theme/global/plugins/jquery-migrate.min.js

//= require new_theme/global/plugins/jquery-ui/jquery-ui.min.js

//= require new_theme/global/plugins/bootstrap/js/bootstrap.min.js

//= require new_theme/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js
//= require new_theme/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js

//= require new_theme/global/plugins/jquery.blockui.min.js
//= require new_theme/global/plugins/uniform/jquery.uniform.min.js

//= require new_theme/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js

//= require new_theme/global/plugins/jquery.cokie.min.js
//= require new_theme/global/plugins/jquery-validation/js/jquery.validate.min.js
//= require new_theme/global/plugins/bootstrap-tabdrop/js/bootstrap-tabdrop.js
//= require new_theme/global/plugins/ckeditor/ckeditor.js
//= require new_theme/global/scripts/metronic.js
//= require new_theme/global/plugins/select2/select2.min.js
//= require new_theme/global/plugins/datatables/media/js/jquery.dataTables.min.js
//= require new_theme/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js
//= require new_theme/global/plugins/bootstrap-toastr/toastr.js
//= require new_theme/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js
//= require new_theme/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js



$.fn.serializeObject = function() {
    var o = Object.create(null),
            elementMapper = function(element) {
                element.name = $.camelCase(element.name);
                return element;
            },
            appendToResult = function(i, element) {
                var node = o[element.name];

                if ('undefined' != typeof node && node !== null) {
                    o[element.name] = node.push ? node.push(element.value) : [node, element.value];
                } else {
                    o[element.name] = element.value;
                }
            };

    $.each($.map(this.serializeArray(), elementMapper), appendToResult);
    return o;
};
function add_fields(link, association, content) {
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g");
    $("#qwe").append(content.replace(regexp, new_id));
}
function remove_fields(link) {
    $(link).prev("input[type=hidden]").val("1");
    $(link).parent().hide();
}

$(document).bind('click', function(e)
{   
    if (!($(e.target).is("label")) && !($(e.target).is("span")) && !($(e.target).is("input")))
    {
        $(".three-col-box-popup.absolute").fadeOut(500);
        $(".menu-view-product-popup").fadeOut(500);
    }
});


function check_delivery(element)
{
    if (element.checked)
        {
            $('#store_delivery_radius').val("3");
            $('#store_min_order').val("10")
        }
    else
        {
        $('#store_delivery_radius').val("");
            $('#store_min_order').val("")
        }
}


$(document).ready(function(){
  if($("#store_offer_table_service").is(":checked"))
  {
  $(".tables-count").show();
  }

  $('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function(e) {
    e.preventDefault();
    var el = $(this).closest(".portlet").children(".portlet-body");
    if ($(this).hasClass("collapse")) {
        $(this).removeClass("collapse").addClass("expand");
        el.slideUp(200);
    } else {
        $(this).removeClass("expand").addClass("collapse");
        el.slideDown(200);
    }
});

});

function pdf_export()
  {
    $("#print").attr('value', $(".print").html());
    $("#export_form").submit();
  }

  function Print(user)
  {
    var d = new Date();
    date = d.getDay() + "/" + d.getMonth() + "/" + d.getYear();
    $(".print").append("<br/><p class='center-center' style='color: black !important'>Printed by " + user + "," + date + "</p><br />");
    var printContents = $(".report").html();
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
  function excel_export(action)
  {
    var prv = $('#export').attr('action');
    $('#export').attr('action',action);
    $('#export').removeAttr('data-remote');
    $('#export').submit();
    $('#export').attr('action',prv);
    $('#export').attr('data-remote',"true");
  }


