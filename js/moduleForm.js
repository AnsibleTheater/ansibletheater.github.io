var module;
var outputTask = {};
function addModuleForm(moduleName) {
  clearModuleSearch();
  module = findModuleByModuleName(moduleName);
  console.log(module);

  outputTask = {};
  outputTask[moduleName] = {};

  $("#moduleModalTitle").text(moduleName);
  $("#moduleModalDescription").html(module.short_description);
  $("#moduleModalOptions").empty();

  Object.keys(module.options).forEach(function(key, index) {
    var opt = module.options[key];
    var newLabel =
      '<label class="col col-form-label mw-25" data-html="true" data-toggle="tooltip" title="' +
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
        newElem =
          '<input type="text" oninput="updateModuleOption(this.id, this.value)" class="form-control" id="' + key + 'Input" placeholder="' + opt.default + '">';
        break;
    }
    $("#moduleModalOptions").append('<div class="form-group row">' + newLabel + '<div class="col">' + newElem + "</div>" + "</div>");
  });

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $("#moduleModal").modal("show");

  console.log(module);
}

function updateModuleOption(moduleOptionId, value) {
  var moduleOption = moduleOptionId.slice(0, -5);
  outputTask[module.module][moduleOption] = value;
  if (value == "") {
    delete outputTask[module.module][moduleOption];
  }
}

function addToPlaybook() {
  playbookJS[0].tasks.push(outputTask);
  $("#moduleModal").modal("hide");
  document.dispatchEvent(new Event("generatePlaybook"));
}
