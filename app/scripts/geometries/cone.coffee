# Link: https://threejs.org/docs/#api/en/geometries/ConeGeometry

newCone = (radius = 5, height = 10, radialSegments = 42, position = [0, 0, 0], type = "normal", color = blackThree) ->

    geometry = new THREE.ConeGeometry radius, height, radialSegments
    material = new MeshMaterial type, color

    cone = new THREE.Mesh geometry, material

    cone.position.set position[0], position[1], position[2]
    cone.rotation.x = deg$rad 90

    cone.class = "cone"
    cone.name = "Cone"

    return cone

addCone = (radius = 5, height = 10, radialSegments = 42, position = [0, 0, 0], type = "normal", color = blackThree) ->

    return addMesh newCone radius, height, radialSegments, position, type, color