window.delete_item_new = function(element) {
    $.ajax({
      method: "DELETE",
      url: $(element).attr("data-url"),
      success: function() {}
    });
};


window.add_new_order_source = function(element) {
  if (true) {
    window.edit = true;
    $.get($(element).attr("data-url"), function(data) {
      $(element).parents(".table-toolbar").next().find("tbody").prepend(data);
    });
  } else {
    return alert("Please first save the open record");
  }
};

window.add_new_option_value = function(element) {
  if (true) {
    window.edit = true;
    $.get($(element).attr("data-url"), function(data) {
      $(element).parents(".table-toolbar").next().find("tbody").prepend(data);
    });
  } else {
    return alert("Please first save the open record");
  }
};


window.delete_new_order_source = function(element) {
  $(element).parent().parent().parent().remove();
  window.edit = false;
  return
};


window.enable_new = function(element) {
  if ($(element).hasClass("green")) {
    $(element).removeClass("green");
    $(element).addClass("red");
    $(element).prop("value", "No");
  } else {
    $(element).removeClass("red");
    $(element).addClass("green");
    $(element).prop("value", "Yes");
  }
};



function check_validation_errors(inputs){
  var errors = []
  $.each(inputs, function(index, value) {
    if(!$(this).val().trim()){
      $(this).tooltip({title: "Blank Field.", placement: "bottom"}).tooltip("show")
      errors.push(index)
    } else{
      $(this).tooltip("destroy")
    }
  });

  if (errors.length > 0) {
    return true
  }else{
    return false
  }
}

window.save_item = function(element, method) {

  var inputs = $(element).parent().parent().find("input")

  var errors = check_validation_errors(inputs)


  if (!errors) {
    details = $(element).parent().parent().parent().find(":input").serializeObject();
    return $.ajax({
      url: $(element).attr("data-url"),
      data: details,
      method: method,
      success: function(data) {
        window.edit = false
        if (typeof ($(element).attr("partial_id")) === 'undefined') {
          if (data.indexOf('</td>') > -1) {
            return $(element).parent().parent().parent().html(data);
          } else {
            return alert(data);
          }
        } else {
          $("" + $(element).attr("partial_id")).click();
        }
      }
    });
  }
};


function set_toastr_options(){
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}

window.reload_partial = function(data_url, tagret_div_id) {
  Metronic.blockUI({
    boxed: true
  });
  
  $.get(data_url, function(data) {
    Metronic.unblockUI();
    $("#"+tagret_div_id).html(data);
  });
};

