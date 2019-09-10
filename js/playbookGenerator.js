document.addEventListener("generatePlaybook", generatePlaybookEvent, false);

function generatePlaybookEvent(e) {
  $("#yaml-code").text(jsyaml.dump(playbookJS));
  Prism.highlightElement(document.getElementById("yaml-code"));
}
