const express = require("express")
const {handleGetAllUsers, handleGetUserById, handlePatchUserById, handleDeleteUserById, handleCreateNewUser} = require("../controllers/user")
const router = express.Router()

router
.post("/", handleCreateNewUser)
.get("/", handleGetAllUsers)

router
.route("/:id")
.get(handleGetUserById)
.patch(handlePatchUserById)
.delete(handleDeleteUserById)


module.exports = router