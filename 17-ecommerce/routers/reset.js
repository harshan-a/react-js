import express from "express"

import setDefault from "../populate.js"


const router = express.Router() 

router.post("/", setDefault)

export default router