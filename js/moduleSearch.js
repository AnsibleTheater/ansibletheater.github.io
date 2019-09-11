function clearModuleSearch() {
  $("#module-search").val("");
}

function moduleSearch() {
  var searchTerm = $("#module-search").val();
  $("#module-search-results").empty();
  if (searchTerm.length > 2) {
    var result = ansibleData.modules.filter(obj => {
      return obj.module.includes(searchTerm);
    });
    result.forEach(element => {
      $("#module-search-results").append(
        '<a class="dropdown-item" onclick=addModuleForm("' +
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
