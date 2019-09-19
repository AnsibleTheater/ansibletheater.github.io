var module;
var outputTask = {};
function addModuleForm(moduleName) {
  clearModuleSearch();
  module = findModuleByModuleName(moduleName);

  outputTask = {};
  outputTask["guid"] = uuidv4();
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
    $("#moduleModalOptions").append('<div class="py-1 row">' + newLabel + '<div class="col">' + newElem + "</div>" + "</div>");
  });

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $("#moduleModal").modal("show");
}

function updateModuleOption(moduleOptionId, value) {
  var moduleOption = moduleOptionId.slice(0, -5);
  outputTask[module.module][moduleOption] = value;
  if (value == "") {
    delete outputTask[module.module][moduleOption];
  }
}

function updateModuleTaskDetails(detailId, value) {
  var detail = detailId.slice(0, -5);
  outputTask[detail] = value;
  if (value == "") {
    delete outputTask[detail];
  }
}

function orderOutputTaskElements() {
  tempTask = {};
  guid = "";
  if ("name" in outputTask) {
    tempTask["name"] = outputTask["name"];
    delete outputTask["name"];
  }
  tempTask[module.module] = outputTask[module.module];
  delete outputTask[module.module];

  guid = outputTask["guid"];
  delete outputTask["guid"];

  var keys = Object.keys(outputTask);
  keys.sort();
  for (var i = 0; i < keys.length; i++) {
    tempTask[keys[i]] = outputTask[keys[i]];
  }

  tempTask["guid"] = guid;

  outputTask = tempTask;
}

function addToPlaybook() {
  orderOutputTaskElements();
  console.log(outputTask);
  playbookJS[0].tasks.push(outputTask);
  $("#moduleModal").modal("hide");
  document.dispatchEvent(new Event("generatePlaybook"));
}
