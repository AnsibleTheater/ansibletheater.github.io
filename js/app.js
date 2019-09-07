// js-yaml courtesy of https://github.com/nodeca/js-yaml
var playbookJS = [];
playbookJS[0] = { name: "test", hosts: "all", become: true, tasks: [] };
playbookJS[0].tasks[0] = {
  name: "test template task",
  template: { dest: "/etc/hosts", src: "hosts.j2" }
};
playbookJS[0].tasks[1] = {
  name: "{{ variable }}",
  ping: null
};

$("#yaml-code").text(jsyaml.dump(playbookJS));
