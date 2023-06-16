# Link: https://gist.github.com/jgphilpott/9e1cf7758b8d7cf02537bb15aacdba6a

class StrokeLineMaterial extends LineMaterial

    constructor: (params = {}) ->

        super "stroke", params

class POLY.StrokeLineMaterial extends LineThickMaterial

    constructor: (params = {}) ->

        params.opacity = if params.opacity then params.opacity / 100 else 1
        params.color ?= blackThree
        params.linewidth ?= 1

        params.dashed ?= false
        params.dashSize ?= 3
        params.gapSize ?= 2

        super params

        this.setResolution()

    getResolution: ->

        return clone this.resolution

    setResolution: (width = window.innerWidth, height = window.innerHeight) ->

        this.resolution.set width, height