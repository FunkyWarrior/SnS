class userRegistrationForm extends HTMLElement {
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
			
                input {
                    width: 100%;
                
                }
                
                p {
                    margin-top: 20px;
                    margin-bottom: 5px;
                }

                                
                h2 {                    
                    top:0;
                    text-align: center;
                    padding: 0 0;
                    background-color: #b0bec5;
                    width: 100%;
                    height: 30px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }                
                
                #user_registration_form {
                    background-color: #5777A8;
                    justify-content: center;                
                    display: flex;
                    flex-wrap: wrap;
                    border-radius: 8px;
                }
                
                #reg_form {
                    width: 80%;                    
                }
                
                #submit {
                    width: 100%;
                    margin: 20px 0;
                    height: 30px;
                }                
                
                #close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 3;
                    border-top-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                    width: 30px;
                    height: 30px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    display:block;
                }
                    
			</style>
			
			<div id="user_registration_form">
                <h2>Registration form</h2>
                <form id="reg_form" onsubmit="return false">
                    <p><span style="color: red">*</span>Enter your name(letters only):</p>
                    <input class="reg_input" type="text" minlength="1" maxlength="40" pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}" name="Name" placeholder="Name" required>
                    <p>Enter your last Name(letters only):</p>
                    <input class="reg_input" type="text" minlength="1" maxlength="40" pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}" name="Last Name" placeholder="Last Name" >
                    <p><span style="color: red">*</span>Enter your email:</p>
                    <input class="reg_input" type="email" name="Email" required>
                    <p>Enter your phone(380xxxxxxxxx):</p>
                    <input class="reg_input" type="tel" pattern="380[0-9]{9}" name="Phone" >
                    <p>Enter your avatar url link:</p>
                    <input class="reg_input" type="text">
                    <p><span style="color: red">*</span>Enter your password:</p>
                    <input class="reg_input" type="password" minlength="6" maxlength="25" required>               
                    <p><span style="color: red">*</span>Confirm your password:</p>
                    <input class="reg_input" type="password" minlength="6" maxlength="25" required>                    
                    <input id="submit" type="submit" value="Submit">                    
                </form>
                <button id="close">X</button>
            </div>
		`
    }

    connectedCallback (){
        this.shadow.querySelector('#close').addEventListener('click',closeWindow);
        this.shadow.querySelector('#reg_form').addEventListener('submit',addUserToDataBase);
    }

}

customElements.define(
    "user-reg-form",
    userRegistrationForm
);