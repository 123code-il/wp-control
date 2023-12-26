export default class BaseModel {
  static defaults () {
    return {
      created_at: null,
      updated_at: null
    }
  }

  constructor ( data ) {
  }

  static async all () {
    return await chrome.storage.sync.get( ['sites'] )
  }

  static async create ( site ) {
    const sites = await this.all()
    sites.push( site )
    return await chrome.storage.sync.set( { sites } )
  }

  static async update ( site ) {
    const sites = await this.all()
    sites[ site.id ] = site
    return await chrome.storage.sync.set( { sites } )
  }

  static async delete ( site ) {
    const sites = await this.all()
    sites.splice( site.id, 1 )
    return await chrome.storage.sync.set( { sites } )
  }

  // find () {}
  // find_by () {}
  // where () {}
}
