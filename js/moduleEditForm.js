function editModuleForm(moduleGuid) {
  var module = findModuleByGuid(moduleGuid);
  var moduleName;
  if ("name" in module) {
    moduleName = Object.keys(module)[1];
  } else {
    moduleName = Object.keys(module)[0];
  }

  addModuleForm(moduleName);
  instantiateModuleFormWithValues(moduleName, module);
}

function instantiateModuleFormWithValues(moduleName, module) {
  updateGuid(module["guid"]);
  if ("name" in module) {
    updateName(module["name"]);
  }
  Object.keys(module[moduleName]).forEach(function(key, index) {
    console.log(module[moduleName][key]);
    $("#" + key + "Input").val(module[moduleName][key]);
    updateModuleOption(key + "Input", module[moduleName][key]);
  });
}

function findModuleByGuid(moduleGuid) {
  return findModuleByGuidRec(moduleGuid, playbookJS);
}

function findModuleByGuidRec(moduleGuid, object) {
  var type = Object.prototype.toString.call(object);
  if (type === "[object Object]") {
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "guid" && object[keys[i]] == moduleGuid) {
        return object;
      } else {
        result = findModuleByGuidRec(moduleGuid, object[keys[i]]);
        if (result !== false) {
          return result;
        }
      }
    }
  } else if (type === "[object Array]") {
    for (i = 0; i < object.length; i++) {
      result = findModuleByGuidRec(moduleGuid, object[i]);
      if (result !== false) {
        return result;
      }
    }
  }

  return false;
}
