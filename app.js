const express = require('express');
const bodyParser = require('body-parser');
const Response = require('response');
const mysql = require('mysql');

const app = express();
const port = 3636;

app.use(bodyParser.json());

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appchatingv1'
})

koneksi.connect((err) =>{
    if(err) throw err;
    console.log('MySQL Connected.');
});

app.get('/',(req, res) => {
    res.send("Server API Webchat");
});

//tampilkan semua pesan
app.get('/api/pesan',(req, res) => {
    let sql = "SELECT * FROM pesan";
    let query = koneksi.query(sql, (err, results) => {
        if(err) throw err;
        res.json({
            "status": 200, 
            "error": null,
            "response": results
        });
    });
});

//tampilkan pesan berdasarkan id
app.get('/api/pesan/:id',(req, res) => {
    let sql = "SELECT * FROM pesan WHERE id_pesan="+req.params.id;
    let query = koneksi.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results)
        res.json({
            "status": 200,
            "error": null,
            "response": results
        });
    });
});

//tambahkan pesan baru
app.post('/api/pesan',(req, res) => {
    let data = {isi_pesan: req.body.isi_pesan, pengirim: req.body.pengirim};
    let sql = "INSERT INTO pesan SET ?";
    let query = koneksi.query(sql, data,(err, results) => {
        if(err) throw err;
        res.json({
            "status": 200, 
            "error": null, 
            "response": results
        });
    });
});

//update pesan
app.put('/api/pesan/:id',(req, res) => {
    let sql = "UPDATE pesan SET isi_pesan='"+req.body.isi_pesan+"', pengirim='"+req.body.pengirim+"' WHERE id_pesan="+req.params.id;
    let query = koneksi.query(sql, (err, results) => {
        if(err) throw err;
        res.json({
            "status": 200, 
            "error": null, 
            "response": results
        });
    });
});

//Delete product
app.delete('/api/pesan/:id',(req, res) => {
    let sql = "DELETE FROM pesan WHERE id_pesan="+req.params.id+"";
    let query = koneksi.query(sql, (err, results) => {
      if(err) throw err;
        res.json({
            "status": 200, 
            "error": null, 
            "response": results
        });
    });
});

app.listen(port, () => {
    console.log(`backend server running on port ${port}`);
})