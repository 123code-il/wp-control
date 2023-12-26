import BaseModel from './base_model'
import { faviconRetrieve } from "~/src/javascripts/helpers";

export default class SiteModel extends BaseModel {
  static defaults () {
    return {
      id: null,
      favicon: null,
      label: null,
      url: null,
      urlAdmin: null
    }
  }

  constructor ( data ) {
    super( data )
  }

  get favicon () {
    return faviconRetrieve( this.url )
  }

  get urlAdmin () {
    return this.url + this.wpAdminPath
  }
}
