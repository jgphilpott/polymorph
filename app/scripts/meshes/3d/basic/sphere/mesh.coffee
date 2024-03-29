class Sphere extends Mesh

    constructor: (params = {}) ->

        super "sphere", params

class POLY.SphereMesh extends THREE.Mesh

    constructor: (params = {}) ->

        params.material ?= "normal"

        geometry = new SphereGeometry params
        material = new MeshMaterial params.material, params

        super geometry, material

        this.class = params.class ?= "sphere"
        this.name = params.name ?= "Sphere"

        this.rotation.x = deg$rad 90
        this.rotation.y = deg$rad 180

        return this

    getRadius: ->

        return clone this.params.radius

    setRadius: (radius, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.radius = Number radius
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this

    getThetaSegments: ->

        return clone this.params.thetaSegments

    setThetaSegments: (thetaSegments, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.thetaSegments = Number thetaSegments
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this

    getPhiSegments: ->

        return clone this.params.phiSegments

    setPhiSegments: (phiSegments, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.phiSegments = Number phiSegments
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this

    getThetaStart: ->

        return clone this.params.thetaStart

    setThetaStart: (thetaStart, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.thetaStart = Number thetaStart
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this

    getThetaLength: ->

        return clone this.params.thetaLength

    setThetaLength: (thetaLength, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.thetaLength = Number thetaLength
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this

    getPhiStart: ->

        return clone this.params.phiStart

    setPhiStart: (phiStart, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.phiStart = Number phiStart
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this

    getPhiLength: ->

        return clone this.params.phiLength

    setPhiLength: (phiLength, save = true) ->

        if not this.getLock()

            this.geometry.dispose()
            this.params.phiLength = Number phiLength
            this.geometry = new SphereGeometry this.params

            if save then this.save "update"

        return this
