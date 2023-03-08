const express = require('express')
const router = express.Router()

const {createUser, login} = require('../controllers/userController')
const {fetchNotes, createNotes, updateNotes, flagDelete} = require('../controllers/notesController')
const {authentication, authorization} = require('../middleware/authMiddleware')

/*======================== User APIs routes ================================ */

/*----------------- Create User --------------- */
router.post("/api/auth/createUser", createUser)

/*----------------- Login User --------------- */
router.post("/api/auth/login", login)

/*========================= Notes APIs routes ======================== */

/*----------------- Create Notes --------------- */
router.post("/api/notes/createNotes", authentication, createNotes)

/*----------------- Fetch Notes --------------- */
router.get("/api/notes/fetchNotes", authentication, fetchNotes)

/*----------------- Update Notes --------------- */
router.put("/api/notes/updateNotes/:Id", authentication, authorization, updateNotes)

/*----------------- Delete(flag as delete) Notes --------------- */
router.delete("/api/notes/deleteNotes/:Id", authentication, authorization, flagDelete)

module.exports = router