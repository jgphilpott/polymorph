import {joinMesh, cutMesh, intersectMesh} from "../../libs/js/meshOperations.mjs"

import * as glassGrayscale from "../libs/colors/glass/grayscale.js"
import * as threeGrayscale from "../libs/colors/three/grayscale.js"
import * as threeRainbow from "../libs/colors/three/rainbow.js"

import {meshMaterial} from "../libs/materials/mesh.mjs"

import {newBox} from "../libs/geometries/boxes.mjs"
import {newCylinder} from "../libs/geometries/cylinders.mjs"
import {newSphere} from "../libs/geometries/spheres.mjs"
import {newTorus} from "../libs/geometries/toruses.mjs"

import {updateMeshesPanel} from "./meshes.mjs"
import {addPanelEvents} from "../libs/etc/events.mjs"
import {addMeshEvents} from "../libs/etc/events.mjs"
import {localMeshes} from "../libs/files/local.mjs"

export function addMeshPanel(mesh, coordinates=null) {

  let panel = $("#mesh." + mesh.uuid + "")

  if (panel.length == 0) {

    $("body").append("<div id='mesh' class='panel " + mesh.uuid + "'><img class='close' src='/app/imgs/panels/nav/close.png'></div>")

    if (!coordinates) coordinates = world2screenCoordinates(mesh.position.x, mesh.position.y, mesh.position.z)

    $("#mesh." + mesh.uuid + "").css({top: coordinates.y, left: coordinates.x})

    panel = $("#mesh." + mesh.uuid + "")

    panel.append("<h3 id='name'><span contenteditable='true'>" + mesh.name + "</span></h3>")

    panel.data("mesh", mesh)

    let operations = "<div id='operations' class='controls'>"
    let colors = "<div id='colors' class='controls'>"
    let tools = "<div id='tools' class='controls'>"
    let meta = "<div id='meta' class='controls'>"

    operations += "<img title='Join' id='join' class='operation' src='/app/imgs/panels/ops/join.png'>"
    operations += "<img title='Cut' id='cut' class='operation' src='/app/imgs/panels/ops/cut.png'>"
    operations += "<img title='Intersect' id='intersect' class='operation' src='/app/imgs/panels/ops/intersect.png'>"

    colors += "<img title='Multi' id='multi' class='color' src='/app/imgs/panels/tools/colors.png'>"
    colors += "<div title='Red' id='red' class='color'></div>"
    colors += "<div title='Orange' id='orange' class='color'></div>"
    colors += "<div title='Yellow' id='yellow' class='color'></div>"
    colors += "<div title='Green' id='green' class='color'></div>"
    colors += "<div title='Blue' id='blue' class='color'></div>"
    colors += "<div title='Purple' id='purple' class='color'></div>"
    colors += "<div title='Pink' id='pink' class='color'></div>"
    colors += "<div title='White' id='white' class='color'></div>"
    colors += "<div title='Gray' id='gray' class='color'></div>"
    colors += "<div title='Black' id='black' class='color'></div>"

    tools += "<img title='Visibility' id='eye' class='tool' src=" + (mesh.material.opacity < 0.5 ? '/app/imgs/panels/visibility/hidden.png' : '/app/imgs/panels/visibility/visible.png') + ">"
    tools += "<div id='visibility' class='tool slider'></div>"
    tools += "<img title='Lock' id='lock' class='tool' src='/app/imgs/panels/lock/unlocked.png'>"
    tools += "<img title='Trash' id='trash' class='tool' src='/app/imgs/panels/tools/trash.png'>"

    meta += "<p id='type'><b>Type:</b> " + mesh.class.replace(/\b\w/g, function(char) { return char.toUpperCase() }).replace("-", " ") + "</p>"
    meta += "<p id='surface'><b>Surface:</b> " + mesh.surface.toFixed(2) + "</p>"
    meta += "<p id='volume'><b>Volume:</b> " + mesh.volume.toFixed(2) + "</p>"

    panel.append(operations + "</div>")
    panel.append(colors + "</div>")
    panel.append(tools + "</div>")
    panel.append(meta + "</div>")

    mesh.material.style ? panel.find("#" + mesh.material.style + ".color").addClass("selected") : panel.find("#multi.color").addClass("selected")

    panel.find("#visibility.slider").slider({min: 0, max: 100, value: mesh.material.opacity * 100, start: sliderStart, slide: sliderSlide, stop: sliderStop})

    panel.append("<div id='properties' class='controls'><div class='head'><img class='fold' src='/app/imgs/panels/nav/fold.png'><h4>Properties</h4></div><div class='body'></div></div>")
    panel.append("<div id='position' class='controls'><div class='head'><img class='fold' src='/app/imgs/panels/nav/fold.png'><h4>Position</h4></div><div class='body'></div></div>")
    panel.append("<div id='rotation' class='controls'><div class='head'><img class='fold' src='/app/imgs/panels/nav/fold.png'><h4>Rotation</h4></div><div class='body'></div></div>")
    panel.append("<div id='scale' class='controls'><div class='head'><img class='fold' src='/app/imgs/panels/nav/fold.png'><h4>Scale</h4></div><div class='body'></div></div>")

    let properties = panel.find("#properties .body")
    let position = panel.find("#position .body")
    let rotation = panel.find("#rotation .body")
    let scale = panel.find("#scale .body")

    if (mesh.class == "box" || mesh.class == "cube") {

      properties.append("<span id='properties-width'><label>Width</label> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></span>")
      properties.append("<span id='properties-height'><label>Height</label> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></span>")
      properties.append("<span id='properties-depth'><label>Depth</label> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></span>")

    } else if (mesh.class == "cylinder") {

      properties.append("<span id='properties-length'><label><p>Length</p> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></label></span>")
      properties.append("<span id='properties-radius-positive'><label><p>Positive Radius</p> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></label></span>")
      properties.append("<span id='properties-radius-negative'><label><p>Negative Radius</p> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></label></span>")
      properties.append("<span id='properties-radius-segments'><label><p>Radial Segments</p> <input type=number step=1 min=3 max=1000><button id='plus'>+</button><button id='minus'>-</button></label></span>")

    } else if (mesh.class == "sphere") {

      properties.append("<span id='properties-radius'><label><p>Radius</p> <input type=number step=0.1 min=0 max=" + data.scale * 5 + "><button id='plus'>+</button><button id='minus'>-</button></label></span>")
      properties.append("<span id='properties-width-segments'><label><p>Width Segments</p> <input type=number step=1 min=3 max=1000><button id='plus'>+</button><button id='minus'>-</button></label></span>")
      properties.append("<span id='properties-height-segments'><label><p>Height Segments</p> <input type=number step=1 min=3 max=1000><button id='plus'>+</button><button id='minus'>-</button></label></span>")

    }

    if (mesh.class == "box" || mesh.class == "cube") {

      properties.find("label").css("width", "45px")
      properties.find("input").css("width", "95px")

    } else if (mesh.class == "cylinder" || mesh.class == "sphere") {

      properties.find("label p").css("margin-bottom", "0px")
      properties.find("label p").css("text-align", "left")
      properties.find("input").css("width", "145px")

    }

    position.append("<span id='position-x'><label id='x'>X</label> <input type=number step=1 min=" + -(data.scale * 3) + " max=" + data.scale * 3 + "><button id='plus'>+</button><button id='minus'>-</button></span>")
    position.append("<span id='position-y'><label id='y'>Y</label> <input type=number step=1 min=" + -(data.scale * 3) + " max=" + data.scale * 3 + "><button id='plus'>+</button><button id='minus'>-</button></span>")
    position.append("<span id='position-z'><label id='z'>Z</label> <input type=number step=1 min=" + -(data.scale * 3) + " max=" + data.scale * 3 + "><button id='plus'>+</button><button id='minus'>-</button></span>")

    rotation.append("<span id='rotation-x'><label id='x'>X</label> <input type=number step=1 min=-360 max=360><button id='plus'>+</button><button id='minus'>-</button></span>")
    rotation.append("<span id='rotation-y'><label id='y'>Y</label> <input type=number step=1 min=-360 max=360><button id='plus'>+</button><button id='minus'>-</button></span>")
    rotation.append("<span id='rotation-z'><label id='z'>Z</label> <input type=number step=1 min=-360 max=360><button id='plus'>+</button><button id='minus'>-</button></span>")

    scale.append("<span id='scale-x'><label id='x'>X</label> <input type=number step=0.1 min=-100 max=100><button id='plus'>+</button><button id='minus'>-</button></span>")
    scale.append("<span id='scale-y'><label id='y'>Y</label> <input type=number step=0.1 min=-100 max=100><button id='plus'>+</button><button id='minus'>-</button></span>")
    scale.append("<span id='scale-z'><label id='z'>Z</label> <input type=number step=0.1 min=-100 max=100><button id='plus'>+</button><button id='minus'>-</button></span>")

    if (mesh.lock == "locked") {

      $("#mesh." + mesh.uuid + " input").addClass("disabled")
      $("#mesh." + mesh.uuid + " button").addClass("disabled")

    }

    $("#mesh." + mesh.uuid + " #position-x input").val(mesh.position.x.toFixed(2))
    $("#mesh." + mesh.uuid + " #position-y input").val(mesh.position.y.toFixed(2))
    $("#mesh." + mesh.uuid + " #position-z input").val(mesh.position.z.toFixed(2))

    $("#mesh." + mesh.uuid + " #rotation-x input").val(radian2degree(mesh.rotation.x).toFixed(2))
    $("#mesh." + mesh.uuid + " #rotation-y input").val(radian2degree(mesh.rotation.y).toFixed(2))
    $("#mesh." + mesh.uuid + " #rotation-z input").val(radian2degree(mesh.rotation.z).toFixed(2))

    panel.find(".color").click(function(event) {

      let color = null
      let opacity = mesh.material.opacity
      let material = this.id == "multi" ? "normal" : "standard"

      panel.find(".color").removeClass("selected")
      $(this).addClass("selected")

      if (["red", "orange", "yellow", "green", "blue", "purple", "pink"].includes(this.id)) {

        color = threeRainbow.rainbow[this.id]

      } else if (["white", "gray", "black"].includes(this.id)) {

        color = threeGrayscale.grayscale[this.id]

      }

      mesh.material.dispose()
      mesh.material = meshMaterial(material, color)

      mesh.material.opacity = opacity
      mesh.material.style = this.id

    })

    panel.find("#eye").click(function(event) {

      let visibility = /[^/]*$/.exec($(this).attr("src"))[0].split(".")[0]
      let slider = panel.find("#visibility.slider")

      if (visibility == "visible") {

        $(this).attr("src", "/app/imgs/panels/visibility/hidden.png")

        mesh.material.opacity = 0

        slider.slider("value", 0)
        sliderFill(slider)

      } else if (visibility == "hidden") {

        $(this).attr("src", "/app/imgs/panels/visibility/visible.png")

        mesh.material.opacity = 1

        slider.slider("value", 100)
        sliderFill(slider)

      }

    })

    panel.find("#lock").click(function(event) { updateMesh(mesh, "lock") })

    $("#mesh." + mesh.uuid + ".panel .fold, #mesh." + mesh.uuid + ".panel h4").click(function(event) { fold(this) })

    $("#mesh." + mesh.uuid + " input").mousedown(function(event) { event.stopPropagation(); if (mesh.lock == "locked") event.preventDefault() })

    $("#mesh." + mesh.uuid + " input").keypress(function(event) { event.stopPropagation(); if (event.keyCode == 13) this.blur() })
    $("#mesh." + mesh.uuid + " input").keydown(function(event) { event.stopPropagation(); if (mesh.lock == "locked") event.preventDefault() })
    $("#mesh." + mesh.uuid + " input").keyup(function(event) {

      let selection = $(this).parent().parent().attr("id").split("-")

      updateMesh(mesh, selection[0], selection[1], Number($(this).val()))

    })

    $("#mesh." + mesh.uuid + " input").on("change", function(event) {

      let selection = $(this).parent().parent().attr("id").split("-")

      updateMesh(mesh, selection[0], selection[1], Number($(this).val()))

    })

    $("#mesh." + mesh.uuid + " button").mousedown(function(event) {

      event.stopPropagation()

      let operation = $(this).attr("id")
      let selection = $(this).parent().parent().attr("id")
      let value = Number($("#mesh." + mesh.uuid + " #" + selection + " input").val())
      let step = Number($("#mesh." + mesh.uuid + " #" + selection + " input").attr("step"))

      if (operation == "plus") {
        value += step
      } else if (operation == "minus") {
        value -= step
      }

      updateMesh(mesh, selection.split("-")[0], selection.split("-")[1], value)

    })

    panel.mouseover(function() { $("#context-menu.panel").remove() })

    sliderStyle(panel.find(".slider"))

    addPanelEvents(panel)

  } else {

    setTimeout(function() { panel.css("background", glassGrayscale.grayGlass) }, 0)
    setTimeout(function() { panel.css("background", glassGrayscale.lightGrayGlass) }, 100)
    setTimeout(function() { panel.css("background", glassGrayscale.grayGlass) }, 200)
    setTimeout(function() { panel.css("background", glassGrayscale.lightGrayGlass) }, 300)

  }

}

export function addMesh(mesh=null, properties={}) {

  if (properties.class) {

    switch (properties.class) {

      case "cube":

        mesh = newBox()
        mesh.rotation.x = degree2radian(0)

        break

      case "cylinder":

        mesh = newCylinder()
        mesh.rotation.x = degree2radian(90)

        break

      case "sphere":

        mesh = newSphere()
        mesh.rotation.x = degree2radian(0)

        break

      case "triangular-prism":

        mesh = newCylinder(10, 5, 5, 3)
        mesh.rotation.x = degree2radian(0)

        break

      case "rectangular-prism":

        mesh = newCylinder(10, 5, 5, 4)
        mesh.rotation.x = degree2radian(0)

        break

      case "pentagonal-prism":

        mesh = newCylinder(10, 5, 5, 5)
        mesh.rotation.x = degree2radian(0)

        break

      case "hexagonal-prism":

        mesh = newCylinder(10, 5, 5, 6)
        mesh.rotation.x = degree2radian(0)

        break

      case "heptagonal-prism":

        mesh = newCylinder(10, 5, 5, 7)
        mesh.rotation.x = degree2radian(0)

        break

      case "octagonal-prism":

        mesh = newCylinder(10, 5, 5, 8)
        mesh.rotation.x = degree2radian(0)

        break

      case "triangular-pyramid":

        mesh = newCylinder(10, 0, 5, 3)
        mesh.rotation.x = degree2radian(90)

        break

      case "rectangular-pyramid":

        mesh = newCylinder(10, 0, 5, 4)
        mesh.rotation.x = degree2radian(90)

        break

      case "pentagonal-pyramid":

        mesh = newCylinder(10, 0, 5, 5)
        mesh.rotation.x = degree2radian(90)

        break

      case "cone":

        mesh = newCylinder(10, 0, 5, 42)
        mesh.rotation.x = degree2radian(90)

        break

      case "torus":

        mesh = newTorus()
        mesh.rotation.y = degree2radian(90)

        break

    }

    properties.class ? mesh.class = properties.class : mesh.class = "custom"
    properties.lock ? mesh.lock = properties.lock : mesh.lock = "unlocked"
    properties.name ? mesh.name = properties.name : mesh.name = "Unnamed"

  }

  if (mesh) {

    mesh.class ? mesh.class = mesh.class : mesh.class = "custom"
    mesh.lock ? mesh.lock = mesh.lock : mesh.lock = "unlocked"
    mesh.name ? mesh.name = mesh.name : mesh.name = "Unnamed"

    if (properties.position) {

      mesh.position.x = properties.position.x ? properties.position.x : properties.position._x ? properties.position._x : 0
      mesh.position.y = properties.position.y ? properties.position.y : properties.position._y ? properties.position._y : 0
      mesh.position.z = properties.position.z ? properties.position.z : properties.position._z ? properties.position._z : 0

    }

    if (properties.rotation) {

      mesh.rotation.x = properties.rotation.x ? properties.rotation.x : properties.rotation._x ? properties.rotation._x : 0
      mesh.rotation.y = properties.rotation.y ? properties.rotation.y : properties.rotation._y ? properties.rotation._y : 0
      mesh.rotation.z = properties.rotation.z ? properties.rotation.z : properties.rotation._z ? properties.rotation._z : 0

    }

    mesh.surface = getSurfaceArea(mesh)
    mesh.volume = getVolume(mesh)

    updateMeshesPanel("add", mesh)
    localMeshes("add", mesh)
    addMeshEvents(mesh)

    scene.add(mesh)

  }

  return mesh

}

export function updateMesh(mesh, type, key=null, value=null) {

  if ((type == "position" || type == "rotation") && mesh.lock != "locked") {

    let input = $("#mesh." + mesh.uuid + " #" + type + "-" + key + " input")

    if (value > input.attr("max")) { value = input.attr("max") }
    if (value < input.attr("min")) { value = input.attr("min") }

    input.val(value)

    if (type == "rotation") { value = degree2radian(value) }

    mesh[type][key] = value

  } else if (type == "operation" && mesh.lock != "locked") {

    if (value == "setup") {

      $("#canvas").css("cursor", "copy")

      events.operation.mesh = mesh
      events.operation.key = key

    } else if (events.operation.key && !camera.dragged) {

      if (events.operation.mesh.uuid != mesh.uuid) {

        let result = null

        switch (key) {

          case "cut":
            result = cutMesh(events.operation.mesh, mesh)
            break

          case "join":
            result = joinMesh(events.operation.mesh, mesh)
            break

          case "intersect":
            result = intersectMesh(events.operation.mesh, mesh)
            break

        }

        addMesh(result)

        let panel = $("#mesh." + events.operation.mesh.uuid + "")
        if (panel.length) addMeshPanel(result, {x: parseFloat(panel.css("left")), y: parseFloat(panel.css("top"))})

        removeMesh(events.operation.mesh)

      }

      $("#canvas").css("cursor", "")

      events.operation.mesh = null
      events.operation.key = null

    }

  } else if (type == "lock") {

    let meshPanel = $("#mesh." + mesh.uuid + "")
    let meshesTableRow = $("#meshes.table tr#" + mesh.uuid + "")

    if (mesh.lock == "locked") {

      mesh.lock = "unlocked"

      meshPanel.find("#join.operation").attr("src", '/app/imgs/panels/ops/join.png')
      meshPanel.find("#cut.operation").attr("src", '/app/imgs/panels/ops/cut.png')
      meshPanel.find("#intersect.operation").attr("src", '/app/imgs/panels/ops/intersect.png')

      meshPanel.find(".operation").removeClass("disabled")
      meshPanel.find(".color").removeClass("disabled")

      meshPanel.find("#eye").removeClass("disabled")
      meshPanel.find("#visibility").removeClass("disabled")
      meshPanel.find("#lock").attr("src", '/app/imgs/panels/lock/unlocked.png')
      meshPanel.find("#trash").removeClass("disabled")

      sliderStyle(meshPanel.find("#visibility"))

      meshPanel.find("input").removeClass("disabled")
      meshPanel.find("button").removeClass("disabled")

      meshesTableRow.find(".lock").attr("src", '/app/imgs/panels/lock/unlocked.png')
      meshesTableRow.find(".trash").removeClass("disabled")

    } else if (mesh.lock == "unlocked") {

      mesh.lock = "locked"

      meshPanel.find("#join.operation").attr("src", '/app/imgs/panels/ops/disabled/join.png')
      meshPanel.find("#cut.operation").attr("src", '/app/imgs/panels/ops/disabled/cut.png')
      meshPanel.find("#intersect.operation").attr("src", '/app/imgs/panels/ops/disabled/intersect.png')

      meshPanel.find(".operation").addClass("disabled")
      meshPanel.find(".color").addClass("disabled")

      meshPanel.find("#eye").addClass("disabled")
      meshPanel.find("#visibility").addClass("disabled")
      meshPanel.find("#lock").attr("src", '/app/imgs/panels/lock/locked.png')
      meshPanel.find("#trash").addClass("disabled")

      sliderStyle(meshPanel.find("#visibility"))

      meshPanel.find("input").addClass("disabled")
      meshPanel.find("button").addClass("disabled")

      meshesTableRow.find(".lock").attr("src", '/app/imgs/panels/lock/locked.png')
      meshesTableRow.find(".trash").addClass("disabled")

    }

  }

  localMeshes("update", mesh)

}

export function removeMesh(mesh) {

  if (mesh.lock != "locked") {

    $("body").css("cursor", "")
    $("#canvas").css("cursor", "")

    events.removeEventListener(mesh, "mousemove")
    events.removeEventListener(mesh, "mousedown")
    events.removeEventListener(mesh, "mouseout")

    events.removeEventListener(mesh, "click")
    events.removeEventListener(mesh, "dblclick")
    events.removeEventListener(mesh, "contextmenu")

    updateMeshesPanel("remove", mesh)
    localMeshes("remove", mesh)

    mesh.geometry.dispose()
    mesh.material.dispose()

    scene.remove(mesh)

  }

}