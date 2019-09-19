var playbookJS = [];
playbookJS[0] = { name: "test", hosts: "all", become: true, tasks: [], guid: "6e8fd54445fc44ab90dcef85b87e982b" };
playbookJS[0].tasks[0] = {
  name: "test template task",
  template: { dest: "/etc/hosts", src: "hosts.j2" },
  guid: "8d1d64ab16cc446d96088f1ab3403795"
};

function uuidv4() {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function main() {
  document.dispatchEvent(new Event("generatePlaybook"));
}
