//Co-authored-by: Susan Isaksson <SusanIsaksson@users.noreply.github.com> || Co-authored-by: Linda G <Pindilind@users.noreply.github.com>

const productDB = {
    "TestProduct": {
        description: "produktbeskrivning",
        price_data: {
            currency: "sek",
            product_data: {
                name: "produktnamn"
            },
            unit_amount: 1000
        },
    },
    
};


const addProduct = async (productKey) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const product = productDB[productKey];

    if(cart == null) {
        cart = {}
    } 

    if(!cart[productKey]) {
        cart[productKey] = product;
    }

    cart[productKey].quantity = cart[productKey].quantity || 0;
    cart[productKey].quantity++;

    document.getElementById("cartCounter").innerHTML = cart[productKey].quantity;
    console.log({ cart, line_items: Object.values(cart) });

    localStorage.setItem("cart", JSON.stringify(cart))
};

document.getElementById("addProd").addEventListener("click", () => addProduct ("TestProduct"))



async function verify() {
    try {
        const sessionId = localStorage.getItem('session')
        console.log(sessionId)

        if (!sessionId) {
            throw new Error("inget session ID");
        }

        const response = await fetch('api/session/verify', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId
            })
        });
        const { paid } = await response.json();
        return paid;


    } catch (err) {
        console.log(err)
        return false;
    }
}

//Co-authored-by: Susan Isaksson <SusanIsaksson@users.noreply.github.com> || Co-authored-by: Linda G <Pindilind@users.noreply.github.com>

async function main() {
    const isVerified = await verify();
    console.log(isVerified)

    if(localStorage.getItem('session')) {
        if(isVerified) {
            alert("Beställningen är mottagen. Tack för ditt köp!")
            localStorage.removeItem("cart")
            localStorage.removeItem('session')
        } else {
            alert("Beställningen är avbruten. Försök gärna igen!")
        }
    }

}
main();

