export default class SiteModel {
  static async all () {
    return await chrome.storage.sync.get( ['sites'] )
  }

  create () {}
  update () {}
  remove () {}

  // find () {}
  // find_by () {}
  // where () {}
}
