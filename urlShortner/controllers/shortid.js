
const shortid = require("shortid")
const URL = require('../models/url');


async function handleGetShortId(params) {
    const shortId = req.params.shortId;
   
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                   timestamp: Date.now(),
                }
                
            },
        }
    );
    res.redirect(entry.redirectURL)
}

module.exports = {
    handleGetShortId,
}