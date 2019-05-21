class AlertWindow extends HTMLElement {
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
                
                #alert_window {
                display: flex;
                    width: 300px;
                    height: 200px;
                    align-items: center;

                }
                
                h1  {
                    text-align: center;                    
                    width: 100%;
                    color: #ff6589;
                }
                
			</style>
			
                <div id='alert_window' title="Click to close">
                    <h1></h1>

                </div>
		`
    }

    connectedCallback (){
        this.shadow.querySelector('#alert_window').addEventListener('click',closeAlert);
    }
    static get observedAttributes() {
        return ["text"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        attrName === 'text' ? this.shadow.querySelector('h1').innerText = newVal : null;
    }

}

customElements.define(
    "alert-window",
    AlertWindow
);