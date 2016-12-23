
const registerCode = require('./registerCode');

class PermissionSet {
  constructor(code, permissions = null) {
    registerCode(code);

    this.code = code;
    this.permissions = Object.create(null);

    if (permissions) this.add(...permissions);
  }

  add(permission, ...permissions) {
    this.permissions[permission.code] = permission;
    permission.partOf(this);

    if (permissions) {
      let i, len;

      for (i = 0, len = permissions.length; i < len; i += 1) {
        this.add(permissions[i]);
      }
    }

    return this;
  }
}

module.exports = PermissionSet;
