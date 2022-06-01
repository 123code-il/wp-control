import { Application } from '@hotwired/stimulus';

window.Stimulus = Application.start();
Stimulus.register("sites", SitesController);
