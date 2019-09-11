function addModuleForm(moduleName) {
  clearModuleSearch();
  var module = findModuleByModuleName(moduleName);
  console.log(module);

  $("#moduleModalTitle").text(moduleName);
  $("#moduleModalDescription").html(module.short_description);
  $("#moduleModalOptions").empty();

  Object.keys(module.options).forEach(function(key, index) {
    var opt = module.options[key];
    console.log("" + opt);
    var newLabel =
      '<label class="col-sm-2 col-form-label" data-html="true" data-toggle="tooltip" title="' +
      opt.description.join("<br>") +
      '" for="' +
      key +
      'Input">' +
      key +
      "</label>";
    var newElem = "";
    opt.default = opt.default || "";
    switch (opt.type) {
      default:
        newElem = '<input type="text" class="form-control" id="' + key + 'Input" placeholder="' + opt.default + '">';
        break;
    }
    $("#moduleModalOptions").append('<div class="form-group row">' + newLabel + '<div class="col-sm-10">' + newElem + "</div>" + "</div>");
  });

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $("#moduleModal").modal("show");

  console.log(module);
}
