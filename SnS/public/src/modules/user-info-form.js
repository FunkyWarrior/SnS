class UserInfoForm extends HTMLElement {
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
                
                a {
                    text-decoration: none;
                    color: #fafafa  ;
                }
                
                a:hover {
                    filter: invert(100%)
                }
                
                #user_info_form {
                    position: relative;
                    align-items: flex-end;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    border-radius: 8px 8px 0 0;                
                }
                
                #user_info_form>* {
                    padding: 0 10px;
                }
                
                #user_avatar {
                    margin: 5px;                    
                    height: 50px;
                    width: 70px;
                    border-radius: 50%;
                }
                #user_name{
                    font-size: 30px;
                }
                
                
                #more_user_info_form {
                    position: absolute;
                    font-size: 16px;
                    display: none;                   
                    background-color: #f9a825;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);                                      
                    text-align: left;
                    width: 100%;    
                    top:100%;
                    border-radius: 0 0 8px 8px;               
                }
                   
                #user_info{
                    margin-top: 40px;                    
                }   
                
                .clip {                    
                    white-space: nowrap; 
                    overflow: hidden; 
                    text-overflow: ellipsis;
                }
                
                .change_input,
                #submit_change {
                    display: none;
                    width: 80%;
                }
                
                #submit_change {
                width: 100%;
                margin: 15px 0;
                }
                
                #change {                
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 30px;
                    border-bottom-right-radius: 8px;
                }
			                
                #close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 2;
                    border-bottom-left-radius: 8px;
                    width: 30px;
                    height: 30px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    display:none;
                }
                
			</style>
			
                <div id=user_info_form>
                    <img id="user_avatar" src="" alt="">
                    <h8 id="user_name" style="color:#1a237e"></h8>
                    <a href="#" id="more_user_info_button" >Info</a>
                    <div id="more_user_info_form">
                        <form id= "user_info" onsubmit="return false">
                            <p id="name" class="clip"></p>
                            <input class="change_input" maxlength="40" minlength="1" name="Name" pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}" placeholder="New Name" type="text">
                            <p id="lname" class="clip"></p>
                            <input class="change_input" maxlength="40" minlength="1" name="Last Name" pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}" placeholder="New Last Name" type="text">
                            <p id="email" class="clip"></p>
                            <input class="change_input" name="Email" placeholder="Email can't be changed" type="email" readonly>
                            <p id="phone" class="clip"></p>
                            <input class="change_input" name="Phone" pattern="380[0-9]{9}" placeholder="New Phone" type="tel">
                            <p id="avatar" class="clip"></p>
                            <input class="change_input" placeholder="New Avatar URL" type="text">
                            <p id="pass"> </p>
                            <input class="change_input" maxlength="25" minlength="6" placeholder="New Password" type="password">                        
                            <input id="submit_change" type="submit" value="Submit">
                        </form>
                        <button id="change">Change</button>
                        <button id="close">X</button>
                    </div>
                    <a href="#" id="log_out_button" class="clip">Log Out</a>
                </div>
		`
    }

    connectedCallback (){
        this.shadow.querySelector('#more_user_info_button').addEventListener('click',moreUserInfo,false);
        this.shadow.querySelector('#change').addEventListener('click',changeInfo);
        this.shadow.querySelector('#log_out_button').addEventListener('click',logOut);
        this.shadow.querySelector('#user_info').addEventListener('submit',changeUserInfo);
        this.shadow.querySelector('#close').addEventListener('click',closeInfoForm);

    }
    static get observedAttributes() {
        return ["avatar1","name1","name2","lname","email","phone","avatar2","pass"]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        attrName === 'avatar1' ? this.shadow.querySelector('#user_avatar').src = newVal : null;
        attrName === 'name1' ? this.shadow.querySelector('#user_name').innerText = newVal : null;
        attrName === 'name2' ? this.shadow.querySelector('#name').innerText = newVal : null;
        attrName === 'lname' ? this.shadow.querySelector('#lname').innerText = newVal : null;
        attrName === 'email' ? this.shadow.querySelector('#email').innerText = newVal : null;
        attrName === 'phone' ? this.shadow.querySelector('#phone').innerText = newVal : null;
        attrName === 'avatar2' ? this.shadow.querySelector('#avatar').innerText = newVal : null;
        attrName === 'pass' ? this.shadow.querySelector('#pass').innerText = newVal : null
    }

}

customElements.define(
    "user-info-form",
    UserInfoForm
);