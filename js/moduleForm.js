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
          '<input type="text" oninput="updateModuleOption(this.id, this.value)" class="form-control" id="' +
          key +
          'Input" placeholder="' +
          opt.default +
          '">';
        break;
    }
    $("#moduleModalOptions").append(
      '<div class="py-1 row">' +
        newLabel +
        '<div class="col">' +
        newElem +
        "</div>" +
        "</div>"
    );
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
    console.log(value);
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

function updateGuid(guid) {
  outputTask["guid"] = guid;
}

function updateName(name) {
  outputTask["name"] = name;
  $("#nameInput").val(name);
}

function addToPlaybook() {
  orderOutputTaskElements();
  console.log(outputTask);
  if (updateModuleByGuidIfFound(outputTask, outputTask["guid"]) == false) {
    playbookJS[0].tasks.push(outputTask);
  }
  $("#moduleModal").modal("hide");
  document.dispatchEvent(new Event("generatePlaybook"));
}

function updateModuleByGuidIfFound(module, moduleGuid) {
  return updateModuleByGuidIfFoundRec(module, moduleGuid, playbookJS);
}

function updateModuleByGuidIfFoundRec(module, moduleGuid, object) {
  var type = Object.prototype.toString.call(object);
  if (type === "[object Object]") {
    var keys = Object.keys(object);
    var moduleKeys = Object.keys(module);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "guid" && object[keys[i]] == moduleGuid) {
        // Guid found, and will be updated
        // Clear out base object that will be updated
        for (var d = 0; d < keys.length; d++) {
          delete object[keys[d]];
        }

        // Update all keys in base object
        for (var k = 0; k < moduleKeys.length; k++) {
          object[moduleKeys[k]] = module[moduleKeys[k]];
        }
        return object;
      } else {
        result = updateModuleByGuidIfFoundRec(
          module,
          moduleGuid,
          object[keys[i]]
        );
        if (result !== false) {
          return result;
        }
      }
    }
  } else if (type === "[object Array]") {
    for (i = 0; i < object.length; i++) {
      result = updateModuleByGuidIfFoundRec(module, moduleGuid, object[i]);
      if (result !== false) {
        return result;
      }
    }
  }

  return false;
}
