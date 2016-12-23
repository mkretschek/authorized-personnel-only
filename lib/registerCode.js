
const codes = [];

function registerCode(code) {
  if (!code && code !== 0) { throw new Error('Invalid code'); }

  // Codes MUST be unique
  if (codes.indexOf(code) !== -1) {
    throw new Error(`Duplicate permission code: ${code}`);
  }

  codes.push(code);
}

module.exports = registerCode;
