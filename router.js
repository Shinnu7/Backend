const path = require('path');
const fs = require('fs');
const express = require('express');
let newarr = "";
const router = express.Router();


const Upload = path.join(__dirname, 'Upload');
if (!fs.existsSync(Upload)) fs.mkdirSync(Upload);

const filepath = path.join(__dirname, 'file.json');
if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, "[]", 'utf-8');


function read() {
    try {
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    } catch (error) {
        return null;
    }
}


function write(wdata) {
    return fs.writeFileSync(filepath, JSON.stringify(wdata));
}


router.get('/', (req, res) => {
    res.send('djkfghfdvdkfjvl');
});

router.put('/update', (req, res) => {
    let { name, email, password } = req.body
    let data = read();
    console.log(name, email, password);

    let index = data.indexOf(newarr[0])
    console.log("index: ", index);

    if (newarr.length > 0) {

        data.splice(index, 1, req.body)
        console.log(data);
        write(data)
        newarr = data.filter((v) => {
            return v.email == email && v.password == password;
        })
        console.log("newdata",newarr);
        
        res.send({
            msg: "congrats your data updated successfully",
            data: newarr[0]
        });
    }
});
router.post('/signin', (req, res) => {
    let { email, password } = req.body
    let data = read();
    // console.log(email, password);

    newarr = data.filter((v) => {
        return v.email == email && v.password == password;
    })
    // console.log("new user: ", newarr);

    if (newarr.length > 0) {
        res.send({
            msg: "congrats you are logged in",
            data: newarr[0]
        });
    }
    else {
        res.send({
            msg: "register first!"
        })
    }
});
router.post('/signup', (req, res) => {
    let data = read()
    // console.log(data);

    let newarr = data.filter((v) => {
        return v.email == req.body.email;
    })
    // console.log(newarr);

    if (newarr.length > 0) {
        res.send({
            msg: "user already exists plz enter diff email",
        });
    } else {
        data.push(req.body)
        console.log(data);

        write(data)
        res.send({
            msg: "congrats user register successfully",
            data: req.body
        });
    }
});

module.exports = router;
