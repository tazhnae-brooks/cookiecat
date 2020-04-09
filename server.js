const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
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
            // console.log(response.rows);
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

app.post('/query_save', (req, res) => {
    var items = req.body.items
    var date = req.body.date
    var names = []
    var namesWithGrid = {
        // "gene": {
        //     "x":{},
        //     "y":{}
        // },
        // "tazhnae": {
        //     "x": {},
        //     "y":{}
        // }
    }

    items.forEach((row) => {
        for (var col = 1; col <= 12; col++) {
            var name = row[col.toString()]
            // console.log(name)
            if (name && !(name in namesWithGrid)) {
                names.push(name)
                namesWithGrid[name] = {
                    "x": "",
                    "y": ""
                }
            }
            if (namesWithGrid[name]) {
                namesWithGrid[name]["x"] = (namesWithGrid[name]["x"] == "" ? namesWithGrid[name]["x"] + row.row : namesWithGrid[name]["x"] + "," + row.row)
                namesWithGrid[name]["y"] = (namesWithGrid[name]["y"] == "" ? namesWithGrid[name]["y"] + col : namesWithGrid[name]["y"] + "," + col)
            }
        }
    })

    console.log(namesWithGrid)


    //database connection
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        names.forEach(name => {
            var x = namesWithGrid[name]["x"]
            var y = namesWithGrid[name]["y"]

            client.query(`
                UPDATE test SET name='${name}', x='{${x}}', y='{${y}}', tz='utc', geo='amer', date='${date}' 
                WHERE name='tazhnae' AND date='${date}';
                INSERT INTO test (name, x, y, tz, geo, date)
                SELECT '${name}', '{${x}}', '{${y}}', 'utc', 'amer', '${date}'
                WHERE NOT EXISTS(SELECT 1 FROM test WHERE name = '${name}'
                AND date = '${date}');
               `, (err, response) => {
                release()
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                // res.send({
                //     name: response.rows
                // })
            })
        })

    })
})