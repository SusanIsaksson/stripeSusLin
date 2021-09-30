//Co-authored-by: Susan Isaksson <SusanIsaksson@users.noreply.github.com> || Co-authored-by: Linda G <Pindilind@users.noreply.github.com>
require('dotenv').config('.env');

const secretKey = process.env.STRIPE_SECRET_KEY;
const express = require('express');
const server = express();
const stripe = require('stripe')(secretKey)
const fs = require('fs')


const port = 3000;

server.use('/api', express.json());
//aktivera server.use = tar över server.get
server.use(express.static('public'));



//hämtar filen från "products.json" - se även i server.post/verify
server.get('/api/admin/orders', async (req, res) => {
    
    const raw = fs.readFileSync('orders.json')
    const orderList = JSON.parse(raw)
    res.json(orderList) 
}) 

server.post('/api/session/verify', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId)

    if(session.payment_status == 'paid') {
        res.status(200).json({ paid: true})

        const key = session.payment_intent;

        //const paymentIntent = await stripe.paymentIntent.retrieve(key);
        //console.log(paymentIntent)

        const raw = fs.readFileSync('orders.json') 
            const orderDB = JSON.parse(raw)
            console.log(orderDB)   
            
            if (!orderDB[key]) {
                orderDB[key] = {
                    //hämtar data från rad 45-50 inkl hårdkodad metadata och modifierar till det vi vill ha
                    amount: session.amount_total,
                    customerId: session.customer,
                    customerEmail: session.customer_details.email,
                    metadata: session.metadata
                }
            }
            fs.writeFileSync('orders.json', JSON.stringify(orderDB))
    }   else {
        res.status(200).json({ paid: false}) 
    }
})


//ny session skapas
server.post('/api/session/new', async (req, res) => {
 
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.line_items,
        mode: "payment",
        metadata: {
            us123uu_testprodukt: 1,
        },
        success_url: 'http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}',
        /* success_url: "http://localhost:3000/", */
        cancel_url: "http://localhost:3000/checkout_failed.html"
    });
    console.log(session)
    
    res.status(200).json({ id: session.id })
})



server.listen(port, () => {
    console.log(`Tjohoo - vår server är igång på port ` + port)
})

//Co-authored-by: Susan Isaksson <SusanIsaksson@users.noreply.github.com> || Co-authored-by: Linda G <Pindilind@users.noreply.github.com>
