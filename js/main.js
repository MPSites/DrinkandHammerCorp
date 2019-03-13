$(document).ready(function(){
        
        showProducts();
        showCategories();

        $('.sort-items').click(onSortProducts);
    

});

    function onSortProducts(e){
        e.preventDefault();

        let sortBy = $(this).data('sortby');
        let order = $(this).data('order');
        //rememberSort(sortBy,order);

        ajaxDohavatnje(function(products){
            sortProducts(products, sortBy, order);
            displayProducts(products)
        })
    }

    function ajaxDohavatnje(callbackSuccess){
        $.ajax({
            url:"data/items.json",
            type:"get",
            dataType:"json",
            success: callbackSuccess,
            error: function(xhr,status,error){
                console.log(error);
            }
        });
    }

    function showProducts(){
        ajaxDohavatnje(function(products){
            displayProducts(products);
        });
    }

    /* ---- display products ---- */

    function displayProducts(products){
        //console.log(data);
        var productsHtml= "";
        for(product of products){
            productsHtml += makeProducts(product);
        }
        
        document.getElementById("item-container").innerHTML = productsHtml;

        bindCartEvents();
    };

     /* ---- sort area ---- */

    function sortProducts(products, sortBy, order){
        products.sort(function(a,b){
            let valueA = (sortBy=='cena')? a.cena : a.name;
            let valueB = (sortBy=='cena')? b.cena : b.name;
            if(valueA > valueB)
                return order=='asc' ? 1 : -1;
            else if(valueA < valueB)
                return order=='asc' ? -1 : 1;
            else
                return 0;
        })
    }

    function bindCartEvents() {
        $(".add-to-cart").click(addToCart);
    }

    function productsInCart() {
        return JSON.parse(localStorage.getItem("products"));
    }

    function addToCart() {
        let id = $(this).data("id");
    
        var products = productsInCart();
    
        if(products) {
            if(productIsAlreadyInCart()) {
                updateQuantity();
            } else {
                addToLocalStorage()
            }
        } else {
            addFirstItemToLocalStorage();
        }
    
        function productIsAlreadyInCart() {
            return products.filter(p => p.id == id).length;
        }
    
        function addToLocalStorage() {
            let products = productsInCart();
            products.push({
                id : id,
                quantity : 1
            });
            localStorage.setItem("products", JSON.stringify(products));
        }
    
        function updateQuantity() {
            let products = productsInCart();
            for(let i in products)
            {
                if(products[i].id == id) {
                    products[i].quantity++;
                    break;
                }      
            }
    
            localStorage.setItem("products", JSON.stringify(products));
        }
    
        
    
        function addFirstItemToLocalStorage() {
            let products = [];
            products[0] = {
                id : id,
                quantity : 1
            };
            localStorage.setItem("products", JSON.stringify(products));
        }
    }

    function clearCart() {
        localStorage.removeItem("products");
    }

    /* ---- display categories ---- */

    function showCategories(){
        $.ajax({
            url:"data/categories.json",
            type:"get",
            dataType:"json",
            success: function(data){
                //console.log(data);
                displayCategories(data)
        
            },
            error: function(xhr,status,error){
                console.log(error);
            }
        });
    }

    function displayCategories(categories) {
        //console.log(categories);
        var cat=categories;
        var ispisKat="<ul class='side-filter-cat'>";
        cat.forEach(function(element){
            ispisKat += `<a href="#" data-id="${element.id}" class="filter-cat"><li>${element.name}</li></a>`
        });
        ispisKat+=`<a href="#" class="cat-reset"><li>All</li></a></ul>`;
        document.getElementById("cats").innerHTML=ispisKat;
        
        
        $('.filter-cat').click(filterByCategory);
        $('.cat-reset').click(categoryReset);

    };

    /* ---- make products ---- */

    function makeProducts(product){
        let madeProduct="";
        madeProduct +=`<div class="item-box">
                            <img src="${product.image}" alt="${product.name}" class="item-img">
                            <div class="item-dsc">
                                    <h3>${product.name}</h3>                            
                                    <p class="p-dsc">${product.DSC}</p>`;
                                    if(isNaN(product.cena)){
                                        madeProduct += `<div class="currency"><span class="item-cena" style="color:red">${product.cena}</span></div>`;
                                    }else{
                                        madeProduct += `<div class="price"><div class="price-img"><span class="item-cena">${product.cena}</span><div class="price-icon"></div></div><button class="add-to-cart" data-id="${product.id}"><img class="buy-out" src="images/buy-out.png" alt="buy-out" /></button></div>`;
                                    }
                                madeProduct+=` </div>
                                </div>
                            </div>`;
        return madeProduct;
                               
    };

    /* ---- search ---- */

    $('#srcText').on('keyup', function(){
        var input = $('#srcText').val();
        var niz = $('.item-box');
        //console.log(input);
        niz.each(function(index,part){
            var price = $(part).find('.item-dsc h3').text();
            var name = $(part).find('.item-cena').text();
            if(input==""){
                $(part).show();
            }
            else if((price.toLowerCase().indexOf(input.toLowerCase()) != -1) || (name.toLowerCase().indexOf(input.toLowerCase()) != -1) ){
                $(part).show();
            }
            else{
                $(part).hide();
            }
        });
    });

    /* ---- filtering by Categories ---- */

    function filterByCategory(e){
        e.preventDefault();
        var categoryId = $(this).data('id');
        //console.log(categoryId);
        $.ajax({
            url: "data/items.json",
            method: "get",
            success: function(products){
                products = filterCategory(products, categoryId);
                displayProducts(products);
            },
            error: function(xhr,error,status){
                console.log(error);
            }
        });
        
    }

    function categoryReset(e){
        e.preventDefault();
        $.ajax({
            url: "data/items.json",
            method: "get",
            success: function(products){
                displayProducts(products);
            },
            error: function(xhr,error,status){
                console.log(error);
            }
        });
    }

    function filterCategory(products, categoryId){
        //console.log(products);
        //console.log(categoryId);
        return products.filter(x => x.category.id == categoryId);
    }
    
