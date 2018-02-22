const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors());

var port = process.env.PORT || 3000;


// clean up cohorts csv
var instructors = require("./instructors.js")
var instructorsarray = instructors.instructors.split("\n")
var instructorsdata = []
var keys = instructorsarray[0].split(",")

for (let i = 1; i <instructorsarray.length; i++) {
    let roomarray = instructorsarray[i].split(",")
    let roomdic={}
    roomarray.forEach((value, j) => {
        roomdic[keys[j]] = value
    });
    instructorsdata.push(roomdic)
}




function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].ID == id){
            return data[i];
        }
    }
    return null;
}


app.get('/', (req, res) => {
    res.json({data: instructorsdata});
    })



app.get("/:id", function (req, res) {
    var record = findById(instructorsdata, req.params.id);
    if (!record){
        res.status = 404;
        res.json({
            error: {
                message: "No record found!"
            }
        });
    }

    res.json({data: record});
});


app.listen(port, () => console.log('Example app listening on port '+ port))
