const product=[
    {
        id:0,
        image:"/assets/premium-icon.png" ,
        title: 'Pink Suit',
        price:1200,
    },
    {
        id:1,
        image:"/assets/premium-icon.png",
        title:'Blue Suit',
        price:1500,
    },
    {
        id:2,
        image:"/assets/premium-icon.png",
        title:'Orange Suit',
        price:1800, 
    },
    {
        id:3,
        image:"/assets/premium-icon.png",
        title:'Black Suit',
        price:2000,
    }
];
const categories =[...new Set(product.map((item)=>
{return item}))]
let i=0;
document.getElementById('root').innerHTML= categories.map((item)=>
{
    var {image,title,price}=item;
    return(
        // `<div class = 'box'>
        // <div class = 'img-box'>
        // <img class = 'images' src=${image}></img>
        // </div>
        // <div class = 'bottom'>
        // <p>${title}</p>
        // <h2> ${price}.00</h2>`+
        // "<button onclick = 'addtocart("+(i++)+")'>Add to Cart</button>"+
        // `</div>
        // </div>`

        `<div class="bg-slate-900 text-white border-2 border-white p-3 mt-10 rounded-lg w-full h-60 shadow-md">
        <div class="flex justify-between items-center border-b pb-4 mb-4">
            <h2 class="text-2xl font-semibold">Your Items</h2>
            <p class="text-white">1 item</p>
        </div>

        <!-- Shopping Bag Items -->
        <div class="space-y-4">
            <div class="flex items-center justify-between bg-slate-900 text-white p-2 rounded-lg shadow-sm">
                <img src="">
                <div class="ml-4 flex-grow">
                    <h2 class="text-xl font-semibold">Product Name :</h2>
                    <select name="size" id="size" class=" bg-slate-900 text-white border-2 border-white bg-transparent ">
                        <option value="Size" hidden class="bg-slate-900 text-white border-2 border-white"> Select Size</option>
                       
                        <option value="S" class="bg-slate-900">S</option>
                        <option value="M" class="bg-slate-900">M</option>
                        <option value="L" class="bg-slate-900">L</option>
                        <option value="XL" class="bg-slate-900">XL</option>
                        <option value="XXL" class="bg-slate-900">XXL</option>
                        <option value="XXXL" class="bg-slate-900">XXXL</option>
                      </select>
                   
                </div>
                <div class="text-right">
                    <p class="text-xl font-semibold text-white">₹1200</p>
                    <button class="text-orange-100 cursor-pointer">Remove from Wishlist</button>
                </div>
            </div>
        </div>

        <div class=" flex justify-between items-center">
            <a href="index.html" class="text-orange-100 hover:text-orange-400 mx-2">Continue Shopping</a>
            <button class="bg-orange-100 text-black w-40 p-1 hover:text-orange-400 rounded-md " onclick = 'addtocart("+(i++)+")'>Add to Bag</button>
        </div>
    </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a,1);
    displaycart();
}
function displaycart(a){
    let j =0 ,total=0;
    document.getElementById("count").innerHTML= cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your Cart is Empty";
        document.getElementById("total").innerHTML= "$ "+0+".00";
    }
    else{
        document.getElementById('cartItem').innerHTML = cart.map((items)=>
        
        {
            var {image,title,price} = items;
            total = total+price;
            document.getElementById("total").innerHTML="$" +total+".00";
            return(
                `<div class = 'cart-item'>
                <div class = 'row-img'>
                <img class = 'rowimg' src=${image}>
                </div>
                <p style = 'font-size:12px;'>${title}</p>
                <h2 style ='font-size:15px;'>${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick ='delElement("+(j++)+")'></i></div>"
            );
        }) .join('');
    }
}

