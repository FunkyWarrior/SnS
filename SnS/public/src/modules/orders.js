class Orders extends HTMLElement {
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
                
                #order_container {
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction: column;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);   
                    border-radius: 8px;                                   
                    background-color: lightcoral;
                    overflow-y: hidden;
                    overflow-x: hidden;  
                    height: 70px; 
                }
                
                #order_container>*{
                    margin: 5px;
                    border: 1px dashed grey;
                }
                
                #order_container:hover{
                    height: 100%;
                }
                
                #order_header {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                                     
                }
                
                #order_header>*{
                    
                    display: flex;
                align-items: center;
                }
                
                #userPhoto {
                    width:60px;
                    height: 60px;
                }
                
                #status {
                    height: 20px;
                }
                select {
                    height: 20px;
                }
			</style>
			<div id="order_container">
			    <div id="order_header">
                    <img id="userPhoto" src="" alt="">
                    <p id="userId"></p>
                    <p id="name"></p>
                    <p id="lname"></p>
                    <p id="email"></p>
                    <p id="phone"></p>	                    
                    <select  >                                            
                        <option id="status1"></option>
                        <option id="status2"></option>                            
                    </select>                    	                    	    
                </div> 
            </div>  
		`

    }

    connectedCallback (){
        this.shadow.querySelector('select').addEventListener('change',changeStatus);


    }
    static get observedAttributes() {
        return ["img", "id", "name", "lname","email","phone","status1","status2"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        attrName === 'img' ? this.shadow.querySelector('#userPhoto').src = newVal : null;
        attrName === 'id' ? this.shadow.querySelector('#userId').innerText = newVal : null;
        attrName === 'name' ? this.shadow.querySelector('#name').innerText = newVal : null;
        attrName === 'lname' ? this.shadow.querySelector('#lname').innerText = newVal : null;
        attrName === 'email' ? this.shadow.querySelector('#email').innerText = newVal : null;
        attrName === 'phone' ? this.shadow.querySelector('#phone').innerText = newVal : null;
        attrName === 'status1' ? this.shadow.querySelector('#status1').innerText = newVal : null
        attrName === 'status2' ? this.shadow.querySelector('#status2').innerText = newVal : null
    }


}




customElements.define(
    "orders-container",
    Orders
);
