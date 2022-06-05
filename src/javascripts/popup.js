import { Application } from '@hotwired/stimulus';
import Controller from '~/src/javascripts/controllers/sites_list_controller';

window.Stimulus = Application.start();
Stimulus.register("sites_list", Controller);
