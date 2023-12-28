import BaseModel from 'src/javascripts/models/base'
import Favicon from 'src/javascripts/helpers/favicon'

export default class SiteModel extends BaseModel {
  static defaults () {
    return {
      favicon: null,
      id: null,
      label: null,
      url: null,
      urlAdmin: null,
    }
  }

  constructor ( data ) {
    super( data )
  }

  get favicon () {
    return new Favicon( this.url );
  }

  get urlAdmin () {
    return this.url + this.wpAdminPath
  }
}
