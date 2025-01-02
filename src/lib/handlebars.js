/* const timeago = require("timeago.js"); */
const {format} = require("timeago.js");

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp, "es");
};

module.exports = helpers;