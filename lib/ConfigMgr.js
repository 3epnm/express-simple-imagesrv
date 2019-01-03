const ConfigMgr = class {
  static instance

  constructor (options) {
    if (instance) {
      return instance;
    }

    this.options = options;
    this.instance = this;
  }

  getConfig (name) {
    return this.options[name];
  }
}

module.exports = ConfigMgr;