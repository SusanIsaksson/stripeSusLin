
//let stripe = Stripe('pk_test_51JZwfhIMTHb0TS9a5j5WbnuPHSwsdmvhjvM4FCmlQP9L6dKJhsSekUu99eCFTAy0pqMeHyGAQSejOfPCzlLyd3TL006JYP3wyJ');
let stripe = Stripe('pk_test_51JbhAtI15NR3oivl1Rxdgpnad3GN14mR2OTtJbM2e6VNPEa1cYL7PTMdHBlpU2aUGa4ncdbvUyBiUZ16303LmKq100BkngM59V');

async function checkoutBtn() {

    let cart = JSON.parse(localStorage.getItem("cart"));
    try {

        if (Object.keys(cart).length == 0) {
            throw new Error("You cart is empty!");
        }

        const response = await fetch('api/session/new', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                line_items: Object.values(cart)
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
    let cart = JSON.parse(localStorage.getItem("cart"))
    console.log(cart)

    if (cart == null) {
        cart = {}
    }

    Object.keys(cart).forEach(key => {
        console.log(key)
        let cartCardDiv = document.getElementById("cartCardDiv")

        let productCardDiv = document.createElement("div")
        productCardDiv.classList = "card"

        let productCard = document.createElement("div")
        productCard.classList = "container"

        /* let productImg = document.createElement("img")
        productImg.src = "./assets/" + cart[key].img */

        let productTitle = document.createElement("h2")
        productTitle.innerText = key

        let productPrice = document.createElement("h5")
        productPrice.innerText = cart[key].price_data.unit_amount /100 + " kr"


        let productQuantity = document.createElement("h5")
        productQuantity.innerText = "Antal: " + cart[key].quantity 
        let deleteBtn = document.createElement("button") 
        deleteBtn.innerText = "Ta bort"
        deleteBtn.style.width = "100px"

        //Appendar produkter
        productCardDiv.appendChild(productCard)
        productCard.appendChild(productTitle)
        /* productCard.appendChild(productImg) */
        productCard.appendChild(productPrice)
        productCard.appendChild(productQuantity)
        productCard.appendChild(deleteBtn)
        
        cartCardDiv.appendChild(productCardDiv)



    });


}



