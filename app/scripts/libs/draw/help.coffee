class Help

    constructor : (self = this) ->

        @active = false
        @events = false

        $("#help").click (event) ->

            event.stopPropagation()

            if not self.getActive()

                self.setActive true

            else

                self.setActive false

            if not self.events

                self.events = true

                $("#navbar #menu").mousemove -> self.addHelpBox this, "This is the Menu icon!"
                $("#navbar #menu").mouseout -> self.removeHelpBox this

                $("#navbar #title").mousemove -> self.addHelpBox this, "This is the Title!"
                $("#navbar #title").mouseout -> self.removeHelpBox this

                $("#forkme").mousemove -> self.addHelpBox this, "This is the Fork Me icon!"
                $("#forkme").mouseout -> self.removeHelpBox this

                $("#help").mousemove -> self.addHelpBox this, "This is the Help icon!"
                $("#help").mouseout -> self.removeHelpBox this

                $("#camera.panel").mousemove -> self.addHelpBox this, "This is the camera panel!"
                $("#camera.panel").mouseout -> self.removeHelpBox this

                $("#lights.panel").mousemove -> self.addHelpBox this, "This is the lights panel!"
                $("#lights.panel").mouseout -> self.removeHelpBox this

                $("#menu.panel").mousemove -> self.addHelpBox this, "This is the menu panel!"
                $("#menu.panel").mouseout -> self.removeHelpBox this

                $("#mesh.panel").mousemove -> self.addHelpBox this, "This is a mesh panel!"
                $("#mesh.panel").mouseout -> self.removeHelpBox this

                $("#meshes.panel").mousemove -> self.addHelpBox this, "This is the meshes panel!"
                $("#meshes.panel").mouseout -> self.removeHelpBox this

                $("#settings.panel").mousemove -> self.addHelpBox this, "This is the settings panel!"
                $("#settings.panel").mouseout -> self.removeHelpBox this

                $("#shapes.panel").mousemove -> self.addHelpBox this, "This is the shapes panel!"
                $("#shapes.panel").mouseout -> self.removeHelpBox this

                $("#shortcuts.panel").mousemove -> self.addHelpBox this, "This is the shortcuts panel!"
                $("#shortcuts.panel").mouseout -> self.removeHelpBox this

    setActive : (active = false) ->

        this.active = active

        if active

            $("*").addClass "help"
            $("#help").css "width": "35px", "height": "35px", "filter": "drop-shadow(0px 0px 5px #ccc)"

        else

            $("#help-box").remove()

            $("*").removeClass "help"
            $("#help").css "width": "", "height": "", "filter": ""

    getActive : (self = this) ->

        return self.active

    addHelpBox : (element, text = "") ->

        if this.active

            $("#help-box").remove()
            $("body").append "<div id='help-box'><p>" + text + "</p></div>"

            $(element).attr "data-title", $(element).attr "title"
            $(element).removeAttr "title"

            helpBox = $("#help-box")
            gapSize = 10

            if event.pageX >= window.innerWidth / 2
                helpBox.css "left", event.pageX - helpBox.outerWidth() - gapSize
            else if event.pageX < window.innerWidth / 2
                helpBox.css "left", event.pageX + gapSize

            if event.pageY >= window.innerHeight / 2
                helpBox.css "top", event.pageY - helpBox.outerHeight() - gapSize
            else if event.pageY < window.innerHeight / 2
                helpBox.css "top", event.pageY + gapSize

    removeHelpBox : (element) ->

        $("#help-box").remove()

        $(element).attr "title", $(element).attr "data-title"
