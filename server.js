//Co-authored-by: Susan Isaksson <SusanIsaksson@users.noreply.github.com> || Co-authored-by: Linda G <Pindilind@users.noreply.github.com>
require('dotenv').config('.env');

const secretKey = process.env.STRIPE_SECRET_KEY;
const express = require('express');
const server = express();
const stripe = require('stripe')(secretKey)
const jsonDB = {

};

const port = 3000;

server.use('/api', express.json());
//aktivera server.use = tar över server.get
server.use(express.static('public'));



//hämtar filen från "products.json" - se även i server.post/verify
server.get('/api/admin/orders', async (req, res) => {
    //res.status(200).json({jsonDB})
    const raw = fs.readFileSync('products.json')
    const orderList = JSON.parse(raw)
    res.json(orderList)
})

server.post('/api/', async (req, res) => {
    try {
        const raw = fs.readFileSync('products.json')
        const orderList = JSON.parse(raw)
        console.log(orderList)
        orderList.push(req.body)
        fs.writeFileSync('products.json', JSON.stringify(orderList))
        res.json(true)

    }   catch(err) {
        console.log(err)
        res.status(500).json(false)
    }
});

//ny session skapas
server.post('/api/session/new', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.line_items,
        mode: "payment",
        success_url: 'http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}',
        //success_url: "http://localhost:3000/checkout_success.html",
        cancel_url: "http://localhost:3000/checkout_failed.html"
    });
    
    res.status(200).json({ id: session.id })
})

server.post('/api/session/verify', async (req, res) => {
    const sessionId = req.body.sessionId

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session)
    res.status(200).json({ id: session.id })
    console.log(session)
})



server.listen(port, () => {
    console.log(`Tjohoo - vår server är igång på port ` + port)
})

//Co-authored-by: Susan Isaksson <SusanIsaksson@users.noreply.github.com> || Co-authored-by: Linda G <Pindilind@users.noreply.github.com>
