import {addMeshPanel, updateMesh, removeMesh} from "./mesh.mjs"

export function addMeshesPanel() {

  $("body").append("<div id='meshes' class='panel'><img class='close' src='/app/imgs/panels/nav/close.png'></div>")

  let panel = $("#meshes.panel")

  panel.append("<h3>Meshes</h3>")

  panel.append("<div class='table'><table id='meshes' class='table'><thead><tr></tr></thead><tbody></tbody></table></div>")

  let tableHead = $("#meshes.table thead tr")

  tableHead.append("<th><h4>ID</h4></th>")
  tableHead.append("<th><h4>Type</h4></th>")
  tableHead.append("<th><h4>Settings</h4></th>")
  tableHead.append("<th><h4>Lock</h4></th>")
  tableHead.append("<th><h4>Trash</h4></th>")

  panel.append("<p id='none'><b>None</b></p>")

  $("#meshes.panel div.table").on("scroll", function(event) {

    $("#meshes.table tbody").css("clip-path", "inset(" + $(this).scrollTop() + "px 0px 0px 0px)")

  })

  tooltips.meshCount = 0

  return panel

}

export function updateMeshesPanel(type, mesh) {

  let table = $("#meshes.table tbody")

  switch (type) {

    case "add":

      meshes.push(mesh)

      tooltips.meshCount += 1

      $("#none").css("display", "none")
      $("div.table").css("display", "block")

      let row = "<tr id=" + mesh.uuid + ">"

      row += "<td><p>" + tooltips.meshCount + "</p></td>"
      row += "<td><p>" + mesh.class.replace(/\b\w/g, function(char) { return char.toUpperCase() }).replace("-", " ") + "</p></td>"
      row += "<td><img title='Settings' class='settings' src='/app/imgs/panels/tools/gear.png'></td></td>"
      row += "<td><img title='Lock' class='lock' src='/app/imgs/panels/lock/" + mesh.lock + ".png'></td>"
      row += "<td><img title='Trash' class='trash " + (mesh.lock == "locked" ? "disabled" : "") + "' src='/app/imgs/panels/tools/trash.png'></td>"

      table.append(row + "</tr>")

      let tableRow = table.find("tr#" + mesh.uuid + "")

      tableRow.find(".settings").click(function() { addMeshPanel(mesh) })
      tableRow.find(".lock").click(function() { updateMesh(mesh, "lock") })
      tableRow.find(".trash").click(function() { removeMesh(mesh) })

      break

    case "update":

      break

    case "remove":

      $("#mesh." + mesh.uuid + "").remove()
      $("#meshes.table tr#" + mesh.uuid + "").remove()

      meshes = meshes.filter(obj => obj.uuid != mesh.uuid)

      if (!meshes.length) {

        $("#none").css("display", "block")
        $("div.table").css("display", "none")

      }

      break

  }

}