# Link: https://github.com/mrdoob/three.js/tree/670b1e9e85356d98efa4c702e93c85dd52f01e1e/examples/js/loaders

class Importer

    constructor: ->

        @importer = null

    importFile: (type = "", path = "") ->

        type = lower type.trim()

        switch type

            when "3mf"

                this.importer = new THREEMFLoader(); break

            when "amf"

                this.importer = new AMFLoader(); break

            when "collada"

                this.importer = new ColladaLoader(); break

            when "draco"

                this.importer = new DRACOLoader(); break

            when "fbx"

                this.importer = new FBXLoader(); break

            when "gltf"

                this.importer = new GLTFLoader(); break

            when "mmd"

                this.importer = new MMDLoader(); break

            when "obj"

                this.importer = new OBJLoader(); break

            when "ply"

                this.importer = new PLYLoader(); break

            when "stl"

                this.importer = new STLLoader(); break

            when "svg"

                this.importer = new SVGLoader(); break

            when "vrml"

                this.importer = new VRMLLoader(); break

        if this.importer

            loader = this.importer

            loader.load path, (file) ->

                meshes = loader.import file

                for mesh in meshes

                    mesh = new Mesh "custom", mesh: mesh

                    mesh.add()

        this.importer = null

    importFiles: (input) ->

        if input.files

            importer = this

            for file in input.files

                reader = new FileReader()

                reader.readAsDataURL file

                reader.extension = file.name.match(/\.[0-9a-z]+$/i)[0].substring 1

                reader.onload = (file) -> importer.importFile file.target.extension, file.target.result

        this.importer = null
