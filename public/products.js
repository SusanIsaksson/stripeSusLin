const viewProducts = async() => {
    let products = productDB
    console.log(products)

    Object.keys(products).forEach(key => {
        console.log(key)
    })

    let body = document.getElementById("body")

    let productCardDiv = document.createElement("div")

    let productCard = document.createElement("div")

    let productTitle = document.createElement("h3")
    productTitle.innerText = "Produkttitel Hej"

    let productImg = document.createElement("img")
    productImg.style.height = "6em"
    productImg.style.width = "6em"
    productImg.style.background = "lightgreen" 
    //productImg.src = 

    let productDescription = document.createElement('p')
    productDescription.innerText = "Produktbeskrivning"
    //products[key].description 
    

    let productPrice = document.createElement("h4")
    productPrice.innerText = "10 kr"
    //products[key].price_data.unit_amount /100 + " kr" 
    

    /*let addButton = document.createElement('button')
    let addButtonText = document.createElement('p')
    addButtonText.innerHTML = "ADD TO CART" */
    /* addButton.addEventListener('click', () => {
        count += 1;
    }) */
    
    //Appendar produkter 
    
    //productCard.append(productTitle, productImg, productDescription, productPrice, productQuantity, addButton)
    
    productCardDiv.appendChild(productCard)
    
    productCard.appendChild(productTitle)
    productCard.appendChild(productImg)
    productCard.appendChild(productDescription)
    productCard.appendChild(productPrice)
    //productCard.appendChild(addButton)
    //addButton.appendChild(addButtonText)
    
 
    body.append(productCardDiv) 
}
viewProducts()

/*async function productsToView() {
    
    let products = productDB
    console.log(products)

    /* productDB.forEach(key => {
        console.log(key)
    
    let body = document.getElementById("body")

    let productCardDiv = document.createElement("div")

    let productCard = document.createElement("div")

    let productTitle = document.createElement("h2")
    productTitle.innerText = "TestProduct-One"

    let productDescription = document.createElement("p")
    productDescription.innerText = "Här är en produktbeskrivning"

    let productImg = document.createElement("img")
    //productImg.src =
  
    let productPrice = document.createElement("h5")
    productPrice.innerText = "10 kr"
    //cart[key].price_data.unit_amount
    
    
    //Appendar produkter
    productCardDiv.appendChild(productCard)
    productCard.appendChild(productImg)
    productCard.appendChild(productTitle)
    productCard.appendChild(productPrice)
    productCard.appendChild(productDescription)
           
    body.appendChild(productCardDiv)    

    });
}
productsToView()*/