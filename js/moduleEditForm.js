function editModuleForm(moduleGuid) {
  var module = findModuleByGuid(moduleGuid);
  console.log("editing module: ", module);
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
