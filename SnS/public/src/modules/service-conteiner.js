class ServiceContainer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "closed"
        });
        this.content = this.innerText;
        this.shadow.innerHTML = `
			<style>
			
                
                
                p {
                    margin: 10px;
                }
                
                h5 {
                    margin: 10px 10px;
                }
                
                .service_conteiner {
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    background-color: #5777A8;
                    justify-content: center;
                    box-shadow: 10px -5px 10px rgba(0, 0, 0, 0.5);
                    border-radius: 8px;    
                }
                
                .service_photo {
                    width: 100%;
                    height: 50%;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                 
                .service_body_long {
                    display: none;
                }
                
                .add_to_cart_button,
                .more_service_info_button {
                    width: 100%;
                    background-color: #5777A8;
                    text-decoration: none;
                    border: 1px dashed grey;
                    margin-top: 5px;
                }
                
                .add_to_cart_button{
                    background-color: rgba(124,38,41,0.85);
                }
                
                .add_to_cart_button:hover,
                .more_service_info_button:hover {
                    filter: invert(100%)
                }
                
                #short{
                    white-space: nowrap; 
                    overflow: hidden; 
                    text-overflow: ellipsis;
                }
                #short:hover{
                    white-space: normal; 
                    overflow: auto; 
                    text-overflow: ellipsis;
                    cursor: default;
                }
                
                #close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 2;
                    border-top-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                    width: 30px;
                    height: 30px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    display:none;
                }
                
			</style>
			<div class="service_conteiner">
                <img class="service_photo" src="" alt="">
                <h5 id="short" class="service_body_short"></h5>
                <h5 class="service_body_long"></h5>
                <button class="more_service_info_button">More Info</button>
                <button class="add_to_cart_button">Add to cart</button>
                <p class="price"></p>
                <button id="close">X</button>      
            </div>  
		`

    }

    connectedCallback (){
        this.shadow.querySelector('.more_service_info_button').addEventListener('click',moreInfoButton);
        this.shadow.querySelector('.add_to_cart_button').addEventListener('click',addToCartButton)

    }
    static get observedAttributes() {
        return ["img", "text1", "text2", "price"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        attrName === 'text1' ? this.shadow.querySelector('.service_body_short').innerText = newVal : null;
        attrName === 'text2' ? this.shadow.querySelector('.service_body_long').innerText = newVal : null;
        attrName === 'img' ? this.shadow.querySelector('.service_photo').src = newVal : null;
        attrName === 'price' ? this.shadow.querySelector('.price').innerText = newVal : null
    }


}




customElements.define(
    "service-conteiner",
    ServiceContainer
);
