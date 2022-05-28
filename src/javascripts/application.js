import { Application } from "@hotwired/stimulus";
import SitesController from "./controllers/sites_controller";

window.Stimulus = Application.start();
Stimulus.register("sites", SitesController);
