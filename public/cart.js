
let stripe = Stripe('pk_test_51JZwfhIMTHb0TS9a5j5WbnuPHSwsdmvhjvM4FCmlQP9L6dKJhsSekUu99eCFTAy0pqMeHyGAQSejOfPCzlLyd3TL006JYP3wyJ');
//let stripe = Stripe('pk_test_51JbhAtI15NR3oivl1Rxdgpnad3GN14mR2OTtJbM2e6VNPEa1cYL7PTMdHBlpU2aUGa4ncdbvUyBiUZ16303LmKq100BkngM59V');



async function checkoutBtn() {

    let cart = JSON.parse(localStorage.getItem("cart"));
    try {
        
        if (!cart || Object.keys(cart).length == 0) {
            throw new Error("You cart is empty!");
      
        }
        const response = await fetch('api/session/new', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                line_items: Object.values(cart),
            })
        });
        const { id } = await response.json();
        localStorage.setItem("session", id)
        //TODO: här ska vi spara URL

        stripe.redirectToCheckout({ sessionId: id })

    } catch (err) {
        console.log(err)
    }
}
printFromLocal()


async function printFromLocal() {
    document.getElementById("cartCardDiv").innerText = ""
    let cart = JSON.parse(localStorage.getItem("cart"))

    
    if (cart == null) {
     
        document.getElementById("emptyCart").innerText = "Din varukorg är tom!"
        
        return     
          
    }
    document.getElementById("emptyCart").innerText = "Du har valt följande klänning:"
   

  
  
    let amount = 0;
    let counter = 0;
    for (const key in cart) {
        
        if (Object.hasOwnProperty.call(cart, key)) {
            const cartRow = cart[key];
            counter += cartRow.quantity
            amount += cartRow.price_data.unit_amount / 100 * cartRow.quantity
        }
       
    }
    document.getElementById("totalPriceDiv").innerText = "Totalt pris: " + amount + " kr"

    

    Object.keys(cart).forEach(key => {

        

        let cartCardDiv = document.getElementById("cartCardDiv")

        let productCardDiv = document.createElement("div")
        productCardDiv.classList = "card"

        let productCard = document.createElement("div")
        productCard.classList = "container"

        let productTitle = document.createElement("h2")
        productTitle.innerText = key

        let productPrice = document.createElement("h5")
        productPrice.innerText = cart[key].price_data.unit_amount / 100 + " kr"


        let productQuantity = document.createElement("h5")
        productQuantity.innerText = "Antal: " + cart[key].quantity

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Ta bort"
        deleteBtn.style.width = "100px"

        deleteBtn.addEventListener('click', () => {
            removeProduct(key);
        })


        //Appendar produkter
        productCardDiv.appendChild(productCard)
        productCard.appendChild(productTitle)
        productCard.appendChild(productPrice)
        productCard.appendChild(productQuantity)
        productCard.appendChild(deleteBtn)

        cartCardDiv.appendChild(productCardDiv)



    });


}

function removeProduct(key) {
    let cart = JSON.parse(localStorage.getItem("cart"))

    cart[key].quantity = cart[key].quantity || 0;
    cart[key].quantity--;

    if (cart[key].quantity === 0) {
        delete cart[key]
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    printFromLocal();
}

