document.addEventListener("generatePlaybook", generatePlaybookEvent, false);

function generatePlaybookEvent(e) {
  $("#yaml-code").html(jsyaml.dump(playbookJS));
  //Prism.highlightElement(document.getElementById("yaml-code"));
}
