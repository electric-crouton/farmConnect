//escapes XSS

module.exports.escape = (string) => {
  var stringArr = string.split('');
  return stringArr.reduce((string, char) => {
    if(["'", '"'].indexOf(char) > -1) {
      char = char + char;
    }
    return string + char;
  },'');
};