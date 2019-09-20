function clearModuleSearch() {
  $(".tooltip").tooltip("hide");
  $("#module-search").val("");
  $("#module-search-results").empty();
  $("#module-search-results").append('<a class="dropdown-item">None</a>');
}

function moduleSearch() {
  var searchTerm = $("#module-search").val();
  $(".tooltip").tooltip("hide");
  $("#module-search-results").empty();
  if (searchTerm.length > 2) {
    var result = ansibleData.modules.filter(obj => {
      return obj.module.toLowerCase().includes(searchTerm.toLowerCase());
    });
    result = result.concat(
      ansibleData.modules.filter(obj => {
        if (result.includes(obj)) {
          return false;
        }
        return obj.short_description.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    result.forEach(element => {
      $("#module-search-results").append(
        '<a class="dropdown-item" data-html="true" onclick=addModuleForm("' +
          element.module +
          '") data-toggle="tooltip" title="' +
          element.short_description +
          '">' +
          element.module +
          "</a>"
      );
    });
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  } else {
    $("#module-search-results").append('<a class="dropdown-item">None</a>');
  }
}

function findModuleByModuleName(moduleName) {
  var result = ansibleData.modules.filter(obj => {
    return obj.module === moduleName;
  });
  return result[0];
}
