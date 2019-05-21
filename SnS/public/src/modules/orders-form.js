class OrdersForm extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "closed"
        });
        this.content = this.innerText;
        this.shadow.innerHTML = `
			<style>
			
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                #order_body {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;   
                    align-items: center;                    
                    min-height: 50px;
                    text-align: left;
                }
                
                #orderPhoto {
                    height: 50px;
                    width: 50px;
                }

                
			</style>

                <div id="order_body">
                    <img id="orderPhoto" src="" alt="">
                    <p id="orderId"></p>
                    <p id="orderName"></p>
                    <p id="orderPrice"></p>
                    <p id="orderCount"></p>
                    <p id="orderSum"></p>                    
                </div>
    
            </div>  
		`

    }

    connectedCallback (){

    }
    static get observedAttributes() {
        return ["img", "id", "name", "price","count","sum"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        attrName === 'img' ? this.shadow.querySelector('#orderPhoto').src = newVal : null;
        attrName === 'id' ? this.shadow.querySelector('#orderId').innerText = newVal : null;
        attrName === 'name' ? this.shadow.querySelector('#orderName').innerText = newVal : null;
        attrName === 'price' ? this.shadow.querySelector('#orderPrice').innerText = newVal : null;
        attrName === 'count' ? this.shadow.querySelector('#orderCount').innerText = newVal : null;
        attrName === 'sum' ? this.shadow.querySelector('#orderSum').innerText = newVal : null;

    }

}

customElements.define(
    "orders-form",
    OrdersForm
);
