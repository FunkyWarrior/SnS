class CartElement extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "closed"
        });
        this.content = this.innerText;
        this.shadow.innerHTML = `
			<style>
			* {                
                box-sizing: border-box;
            }
            
            p {                    
                white-space: nowrap; 
                
            }
            
            h5{
                width: 33%;
            }
            
            input {
            width: 50%;
            border: none;
            
            }
            
            .cart_element {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                width: 100%;                
                justify-content: space-between;
                align-items: center;                
                max-height: 100px;                
                border: 5px solid brown;            
            }
            .cart_element>*{
            margin: 0 5px 0 0;
            }
                .cart_element_img {
                width: 33%;
                max-height: 90px;
            
            }
            .inner{
                display: flex;
                flex-direction: column;
                                 
            }
            #txt{
                width: 15%;
            }
            
            .delete_product { 
                 flex-basis: 29px;
            }

			</style>
			
			<div class="cart_element">
			    <img class="cart_element_img" src="" alt="">
			    
			    <h5 class="cart_element_name"></h5>
			    <div id="txt" class="inner">
                    <p class="cart_element_price"></p>
                    <input id="count" type="text" value="1" readonly>
			    </div>
			    <div class="inner">
			        <button id="delete" class="delete_product">X</button>
			        <button id="more" class="delete_product">+</button>
			        <button id="less" class="delete_product">-</button>    
			    </div>
            </div>  
		`

    }

    connectedCallback() {
        this.shadow.querySelector('#delete').addEventListener('click', deleteProduct);
        this.shadow.querySelector('#more').addEventListener('click', moreProduct);
        this.shadow.querySelector('#less').addEventListener('click', lessProduct);
    }
    static get observedAttributes() {
        return ["img", "name", "price","count"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        attrName === 'img' ? this.shadow.querySelector('.cart_element_img').src = newVal : null;
        attrName === 'name' ? this.shadow.querySelector('.cart_element_name').innerText = newVal : null;
        attrName === 'price' ? this.shadow.querySelector('.cart_element_price').innerText = newVal : null;
        attrName === 'count' ? this.shadow.querySelector('#count').value = newVal : null;
    }


}




customElements.define(
    "cart-element",
    CartElement
);
