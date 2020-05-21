const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")

router.get('/api', async (req, res) => {
    try {
        const response = await fetch(`${process.env.STACKOVERFLOW_API}?site=stackoverflow.com&page=${req.query.page}`)
        const data = await response.json();
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error Please refresh the page for now" });
    }
})

module.exports = router