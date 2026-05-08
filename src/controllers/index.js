import { Application } from "@hotwired/stimulus";
const application = Application.start()
window.Stimulus = application

import scroll_animation_controller from "./scroll_animation_controller";
application.register('scroll-animation', scroll_animation_controller)

import toc_controller from "./toc_controller";
application.register('toc', toc_controller)
