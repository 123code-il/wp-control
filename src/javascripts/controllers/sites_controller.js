import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    'label',
    'url',
    'wp_admin_path',
  ]

  add(event) {
    console.log('Sup !!!');
    event.preventDefault();
  }
}
