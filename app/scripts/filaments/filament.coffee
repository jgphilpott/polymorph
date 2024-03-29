class Filament

    constructor: (type = "pla") ->

        switch type.lower()

            when "abs"

                @filament = new ABSFilament(); break

            when "nylon"

                @filament = new NylonFilament(); break

            when "petg"

                @filament = new PETGFilament(); break

            when "pla"

                @filament = new PLAFilament(); break

        this.filament.getName = this.getName
        this.filament.setName = this.setName

        this.filament.getDescription = this.getDescription
        this.filament.setDescription = this.setDescription

        this.filament.getBrand = this.getBrand
        this.filament.setBrand = this.setBrand

        this.filament.getColor = this.getColor
        this.filament.setColor = this.setColor

        this.filament.getDiameter = this.getDiameter
        this.filament.setDiameter = this.setDiameter

        this.filament.getDensity = this.getDensity
        this.filament.setDensity = this.setDensity

        this.filament.getWeight = this.getWeight
        this.filament.setWeight = this.setWeight

        this.filament.getCost = this.getCost
        this.filament.setCost = this.setCost

        this.filament.getFan = this.getFan
        this.filament.setFan = this.setFan

        this.filament.getTemperatureBed = this.getTemperatureBed
        this.filament.setTemperatureBed = this.setTemperatureBed

        this.filament.getTemperatureNozzle = this.getTemperatureNozzle
        this.filament.setTemperatureNozzle = this.setTemperatureNozzle

        this.filament.getTemperatureStandby = this.getTemperatureStandby
        this.filament.setTemperatureStandby = this.setTemperatureStandby

        this.filament.getRetractionSpeed = this.getRetractionSpeed
        this.filament.setRetractionSpeed = this.setRetractionSpeed

        this.filament.getRetractionDistance = this.getRetractionDistance
        this.filament.setRetractionDistance = this.setRetractionDistance

        this.filament.reset = this.reset

        return this.filament

    getName: ->

        return clone this.name

    setName: (name, save = true) ->

        this.name = name

        if save then settings.set "filaments." + this.type + ".name", this.name

        return this

    getDescription: ->

        return clone this.description

    setDescription: (description, save = true) ->

        this.description = description

        if save then settings.set "filaments." + this.type + ".description", this.description

        return this

    getBrand: ->

        return clone this.brand

    setBrand: (brand, save = true) ->

        this.brand = brand

        if save then settings.set "filaments." + this.type + ".brand", this.brand

        return this

    getColor: ->

        return clone this.color

    setColor: (color, save = true) ->

        this.color = color

        if save then settings.set "filaments." + this.type + ".color", this.color

        return this

    getDiameter: ->

        return adaptor "convert", "length", clone this.diameter

    setDiameter: (diameter, save = true) ->

        this.diameter = adaptor "invert", "length", diameter

        if save then settings.set "filaments." + this.type + ".diameter", this.diameter

        return this

    getDensity: ->

        return adaptor "convert", "density", clone this.density

    setDensity: (density, save = true) ->

        this.density = adaptor "invert", "density", density

        if save then settings.set "filaments." + this.type + ".density", this.density

        return this

    getWeight: ->

        return adaptor "convert", "mass", clone this.weight

    setWeight: (weight, save = true) ->

        this.weight = adaptor "invert", "mass", weight

        if save then settings.set "filaments." + this.type + ".weight", this.weight

        return this

    getCost: ->

        return clone this.cost

    setCost: (cost, save = true) ->

        this.cost = cost

        if save then settings.set "filaments." + this.type + ".cost", this.cost

        return this

    getFan: ->

        return clone this.fan

    setFan: (fan, save = true) ->

        this.fan = fan

        if save then settings.set "filaments." + this.type + ".fan", this.fan

        return this

    getTemperatureBed: ->

        return interpreter "convert", "temperature", clone this.temperature.bed

    setTemperatureBed: (temperature, save = true) ->

        this.temperature.bed = interpreter "invert", "temperature", temperature

        if save then settings.set "filaments." + this.type + ".temperature.bed", this.temperature.bed

        return this

    getTemperatureNozzle: ->

        return interpreter "convert", "temperature", clone this.temperature.nozzle

    setTemperatureNozzle: (temperature, save = true) ->

        this.temperature.nozzle = interpreter "invert", "temperature", temperature

        if save then settings.set "filaments." + this.type + ".temperature.nozzle", this.temperature.nozzle

        return this

    getTemperatureStandby: ->

        return interpreter "convert", "temperature", clone this.temperature.standby

    setTemperatureStandby: (temperature, save = true) ->

        this.temperature.standby = interpreter "invert", "temperature", temperature

        if save then settings.set "filaments." + this.type + ".temperature.standby", this.temperature.standby

        return this

    getRetractionSpeed: ->

        return adaptor "convert", "speed", clone this.retraction.speed

    setRetractionSpeed: (speed, save = true) ->

        this.retraction.speed = adaptor "invert", "speed", speed

        if save then settings.set "filaments." + this.type + ".retraction.speed", this.retraction.speed

        return this

    getRetractionDistance: ->

        return adaptor "convert", "length", clone this.retraction.distance

    setRetractionDistance: (distance, save = true) ->

        this.retraction.distance = adaptor "invert", "length", distance

        if save then settings.set "filaments." + this.type + ".retraction.distance", this.retraction.distance

        return this

    reset: ->

        defaults = settings.filaments.defaults()[this.type]

        this.setName defaults.name
        this.setDescription defaults.description
        this.setBrand defaults.brand
        this.setColor defaults.color

        this.setDiameter adaptor "convert", "length", defaults.diameter
        this.setDensity adaptor "convert", "density", defaults.density
        this.setWeight adaptor "convert", "mass", defaults.weight

        this.setCost defaults.cost
        this.setFan defaults.fan

        this.setTemperatureBed interpreter "convert", "temperature", defaults.temperature.bed
        this.setTemperatureNozzle interpreter "convert", "temperature", defaults.temperature.nozzle
        this.setTemperatureStandby interpreter "convert", "temperature", defaults.temperature.standby

        this.setRetractionSpeed adaptor "convert", "speed", defaults.retraction.speed
        this.setRetractionDistance adaptor "convert", "length", defaults.retraction.distance

        return this
