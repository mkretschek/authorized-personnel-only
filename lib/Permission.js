
const returnTrue = () => true;

const registerCode = require('./registerCode');


class Permission {
  constructor(code, grantedByDefault = false, check = null) {
    registerCode(code);

    this.code = code;
    this.grantedByDefault = Boolean(grantedByDefault);
    this.check = check || returnTrue;
    this.sets = null;
  }

  checkSets(permissions, ...params) {
    const sets = this.sets;
    if (!sets) return false;

    let i, len;

    for (i = 0, len = sets.length; i < len; i += 1) {
      if (permissions[sets[i].code] && this.check(...params)) return true;
    }

    return false;
  }

  checkPermission(permissions, ...params) {
    if (!permissions || !permissions.hasOwnProperty(this.code)) {
      return this.grantedByDefault;
    }

    return (permissions[this.code] && this.check(...params))
      || this.checkSets(permissions, ...params);
  }

  partOf(set) {
    if (!this.sets) this.sets = new Set();
    if (this.sets.indexOf(set) === -1) this.sets.push(set);
    return this;
  }
}

module.exports = Permission;
