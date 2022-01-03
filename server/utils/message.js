 const moment = require('moment')

let generateMessage = (from, text) => {
  // console.log('first alert', alert)
  return {
    from,
    text,
    // createdAt: new Date().getTime()
    createdAt: moment().valueOf()
  }
};

let generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `http://www.google.com/maps?q=${latitude},${longitude}`,
    // createdAt: new Date().getTime(),
    createdAt: moment().valueOf()
  }
}


module.exports = { generateMessage, generateLocationMessage }


