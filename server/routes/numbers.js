const {Router} = require('express')
const mongodb = require('mongodb')
const router = Router()

router.get("/", (req, res) => {
     const db = req.app.get("db");
    db.collection("numbers")
        .find({})
        .toArray((err, numbers) => {
            if (err) {
                res.status(500).json({ errors: { global: err } });
                return;
            }
            res.json({ numbers })
        })
});

router.delete("/:_id", (req, res) => {
    const db = req.app.get("db");
    db.collection("numbers").deleteOne(
        { _id: new mongodb.ObjectId(req.params._id) },
        err => {
            if (err) {
                res.status(500).json({ errors: { global: err } });
                return;
            }
            res.json({})
        }
    )
});

router.post("/",  (req, res) => {
    const db = req.app.get("db");
    db.collection("numbers").insertOne(req.body, (err, r) => {
        if (err) {
            res.status(500).json({ errors: { global: err } });
            return;
        }
        res.json({ number: r.ops[0] });
    });
});

router.put("/:_id", (req, res) => {
    const db = req.app.get("db");
    const { _id, ...numberData } = req.body.number;
        db.collection("numbers").findOneAndUpdate(
            { _id: new mongodb.ObjectId(req.params._id) },
            { $set: numberData },
            { returnOriginal: false },
            (err, r) => {
                if (err) {
                    res.status(500).json({ errors: { global: err } });
                    return;
                }
                res.json({ number: r.value });
            }
        );
});

module.exports = router;

