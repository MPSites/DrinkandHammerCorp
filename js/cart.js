$(document).ready(function(){
    let products = productsInCart();

    if(!products.length)
        showEmptyCart();
    else
        displayCartData();

});

function displayCartData(){
    let products = productsInCart();

    $.ajax({
        url: "data/items.json",
        success: function(data){
            let productsForDisplay = [];

            data = data.filter(p => {
                for(let prod of products){
                    if(p.id == prod.id){
                        p.quantity = prod.quantity;
                        return true;
                    }

                }
                return false;
            });
            generateCart(data);
        }
    })
}

function generateCart(products){
    html = "";
    for(let p of products){
        html += `<div class="cart-item">              
                    <div class="cart-image">
                    <img src="${p.image}" alt="${p.name}" />
                    </div>
                
                    <div class="cart-dsc">
                        <span>${p.name}</span>
                    </div>
                
                    <div class="item-quantity">
                        <span>${p.quantity}</span>
                    </div>
                
                    <div class="total-price">${p.cena * p.quantity}<em>gold</em></div>
                    <div class="cart-remove">
                            <button class="remove-btn" onclick='removeFromCart(${p.id})'><img class="remove" src="images/remove.png" alt="remove" /></button>
                    </div>
                </div>`;
    }
    html += `<div class="order">
                <div class="cashout"><span><button class="back-btn">back to shop</button></span><span><button class="cash-btn">Buy</button></span></div>
            </div>`;
    $('#cart-content').html(html);
}

function showEmptyCart() {
    $("#cart-content").html("<h1>Somebody stole your bag?</h1>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}

function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    displayCartData();
}
