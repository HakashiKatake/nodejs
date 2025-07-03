const express = require("express")

const {handleGenerateNewShortURL, handleGetAnalytics, handleGetShortId} = require("../controllers/url")
const router = express.Router()

router.post("/", handleGenerateNewShortURL)
router.get('/analytics/:shortId', handleGetAnalytics)
router.get('/:shortId', handleGetShortId)

module.exports = router;