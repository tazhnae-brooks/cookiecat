const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

const {
    Pool
} = require('pg')
const pool = new Pool({
    connectionString: 'postgres://ubtlfhpbj38tfn:p5100a09cb4d89b2b1b580c4e46dc8544b8d35e446433e4ca703aacdfc9542711@ec2-3-84-65-54.compute-1.amazonaws.com:5432/d3pmrrgfd42jnl',
    ssl: {
        rejectUnauthorized: false
    }
});


// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({
        mind: 'corona time'
    });
});


app.get('/query', (req, res) => {
    var name = req.query.name
    var date = req.query.date
    console.log(date);
    console.log(name);


    //database connection
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(`select name, tz, geo, date, x, y from test where name='${name}' and date='${date}'`, (err, response) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(response.rows);
            res.send({
                data: response.rows
            })
        })

    })
})

//temps dropdown
app.get('/query_time', (req, res) => {
    var tz = req.query.tz

    //database connection
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query(`select tz, grid, name, geo, date from test where tz='${tz}'`, (err, response) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.send({
                time: response.rows
            })
        })
    })
})

app.get('/query_save', (req, res) => {
    var date = req.query.date
    var items = req.query.items
    console.log(date)
    console.log(items)


    //database connection
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        // client.query(`insert into test (name, x, y, tz, geo, date) Values ('tazhnae', '{1, 2}','{3, 4}', 'utc', 'geo', '${date}')`, (err, response) => {
        client.query(`UPDATE test SET name='tazhnae', x='{1,2}', y='{5, 6}', tz='utc', geo='amer', date='${date}' WHERE name='tazhnae' AND date='${date}';
        INSERT INTO test (name, x, y, tz, geo, date)
               SELECT 'tazhnae', '{1, 2}', '{3, 4}', 'utc', 'amer', '${date}'
               WHERE NOT EXISTS (SELECT 1 FROM test WHERE name='tazhnae' AND date='${date}');`, (err, response) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.send({
                name: response.rows
            })
        })
    })
})