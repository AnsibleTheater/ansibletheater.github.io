var playbookJS = [];
playbookJS[0] = { name: "test", hosts: "all", become: true, tasks: [] };
playbookJS[0].tasks[0] = {
  name: "test template task",
  template: { dest: "/etc/hosts", src: "hosts.j2" }
};

function main() {
  document.dispatchEvent(new Event("generatePlaybook"));
}
