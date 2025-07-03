const express = require("express")

const {handleGetShortId} = require("../controllers/")
const router = express.Router()


router.get('/:id', handleGetShortId)

module.exports = router;