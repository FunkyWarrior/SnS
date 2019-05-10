let moreInfoButton;
let addToCartButton;
let addUserToDataBase;
let userLogIn;
let changeUserInfo;

const start = function () {
    let serviceItem = document.querySelector("#service_item");
    let userRegistrationForm = document.querySelector("#user_registration");
    let userLogInForm = document.querySelector("#user_log_in");
    let userInfo = document.querySelector("#user_info");
    let userInfoMenu = userInfo.content.children[0];
    let curentUser = null;
    let users = null;
    let tabs
    //--------------------------------------------------------------------------------------------------------------------
    //Создание услуг с данными из db.jsaon в формы template id="service_item"
    function servicesCreate() {
        fetch("http://localhost:3000/services")
            .then(response => response.json()
                .then(json =>
                    json.forEach(service => {
                        var serviceConteiner = serviceItem.content.children[0];
                        serviceConteiner.id = `service_conteiner_${service.id}`;
                        serviceConteiner.children[0].src = service.servicePhoto;
                        serviceConteiner.children[1].innerText = service.bodyShort;
                        serviceConteiner.children[2].innerText = service.bodyLong;
                        serviceConteiner.children[5].innerText = `Price:${service.price}UAH`;
                        document.getElementById("main").appendChild(serviceItem.content.cloneNode(true))
                    })
                )
            )

    }
    servicesCreate();
    window.location.hash = '#home'
    //--------------------------------------------------------------------------------------------------------------------
    addToCartButton = function () {
        console.log('add to cart')

    };

    //--------------------------------------------------------------------------------------------------------------------


    const getUsers = () => {
        fetch("http://localhost:3000/users")
            .then(response => response.json()
                .then(response => users = response)
                .then(response => checkCookieUser())
            )
    };
    getUsers();
    //--------------------------------------------------------------------------------------------------------------------
    //Увеличение окна товара при клике на кнопку More Info и создание кнопки закрытие id="close"
    moreInfoButton = function(event) {
        var target = event.target.parentNode;
        target.style.zIndex = "2";
        target.style.width = "400px";
        target.style.maxHeight = "500px";
        target.children[1].style.display = "none";
        target.children[2].style.display = "block";
        target.children[3].style.display = "none";
        document.getElementById("box_shadow").style.display = "block";
        var close = event.target.parentNode.appendChild(document.createElement("button"));
        close.id = "close";
        close.innerText = "X";
        document.getElementById("close").onclick = function(event) {
            target.style.width = "17%";
            target.style.maxHeight = "300px";
            target.children[2].style.display = "none";
            target.children[1].style.display = "block";
            target.children[3].style.display = "block";
            document.getElementById("box_shadow").style.display = "none";
            event.target.parentNode.style.zIndex = "1";
            event.target.remove()
        }
    };
    //--------------------------------------------------------------------------------------------------------------------
    //При клике на id=nav_button_sing_up создает форму регистрации из template id="user_registration"
    document.getElementById("nav_button_sing_up").onclick = function(event) {
        getUsers();
        document.body.appendChild(userRegistrationForm.content.cloneNode(true));
        document.getElementById("box_shadow").style.display = "block";
        document.getElementById("close").onclick = function(event) {
            document.getElementById("box_shadow").style.display = "none";
            event.target.parentNode.parentNode.remove();
            event.target.parentNode.remove();
            event.target.remove()
        };
        return false;
    };
    addUserToDataBase = function (event) {
    //Проверка некоторых полей формы регистрации(почта,телефон) на совпадения в базе users.
    //Пароли сравниваються сами с собой.
    //И создание нового пользователя в базе с указанными данными

        var inputArray = document.getElementsByClassName("reg_input");
        for (var user in users) {
            if (inputArray[2].value === users[user].email) {
                alert('Данная почта уже занята');
                return false
            }
            if (inputArray[3].value === users[user].phone) {
                alert('Данный номер уже занята');
                return false
            }
        }

        if (inputArray[inputArray.length - 1].value === inputArray[inputArray.length - 2].value) {} else {
            alert('Пароли не совпадают');
            return false
        }
        if (inputArray[4].value.length === 0) { //если не вставленн аватар использует стандартный
            var kotik = "img/kotikUser.jpg"
        } else {
            kotik = inputArray[4].value
        }
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${inputArray[0].value}`,
                lastName: `${inputArray[1].value}`,
                email: `${inputArray[2].value}`,
                phone: `${inputArray[3].value}`,
                avatarUrl: `${kotik}`,
                password: `${inputArray[5].value}`,
                root: false
            })
        });
        getUsers();
        document.getElementById("box_shadow").style.display = "none";
        document.getElementById("user_registration_form").remove();
        return false
    };
    //--------------------------------------------------------------------------------------------------------------------


    function checkCookieUser() {

        var temp = false;
        curentUser = null;
        var res = document.cookie
            .split("; ")
            .map(
                x => Object.assign({}, {
                    [x.split("=")[0]]: x.split("=")[1]
                })
            );
        if (document.cookie.length > 0) {
            for (var user in users) {
                if (users[user].email === res[0].email) {
                    temp = true;
                    curentUser = users[user]
                }
            }
            if (temp) {
                if (curentUser.root === true) {
                    document.cookie = "email=; expires=" + new Date(0).toUTCString();
                    curentUser = null
                } else {
                    userForm()
                }
            }
        }
    }


    userLogIn = function userLogIn() {
        var temp = false;
        var inputArray = document.getElementsByClassName("log_input");
        for (var user in users) {
            if (users[user].email === inputArray[0].value) {
                curentUser = users[user];
                temp = true
            }
        }
        if (temp) {
            if (curentUser.password === inputArray[1].value) {
                if (curentUser.root === true) {
                    adminForm();
                    document.getElementById("box_shadow").style.display = "none";
                    document.getElementById("user_log_in_form").remove();
                    return false
                } else {
                    userForm();
                    document.getElementById("box_shadow").style.display = "none";
                    document.getElementById("user_log_in_form").remove();
                    return false
                }
            } else {
                alert("Password doesn't match");
                return false
            }
        } else {
            alert("Email not found");
            return false
        }
        return false
    };

    document.getElementById("nav_button_sing_in").onclick = function(event) {
        getUsers();
        document.body.appendChild(userLogInForm.content.cloneNode(true));
        document.getElementById("box_shadow").style.display = "block";
        document.getElementById("close").onclick = function(event) {
            document.getElementById("box_shadow").style.display = "none";
            event.target.parentNode.parentNode.remove();
            event.target.parentNode.remove();
            event.target.remove()
        }
        return false;
    };
    //--------------------------------------------------------------------------------------------------------------------
    function adminForm() {
        console.log('admin')
    }

    //--------------------------------------------------------------------------------------------------------------------
    function userForm() {
        console.log('user');
        document.cookie = `email=${curentUser.email}`;
        userInfoMenu.children[0].src = `${curentUser.avatarUrl}`;
        userInfoMenu.children[1].innerText = `${curentUser.name}`;
        document.getElementById("top_right_panel").appendChild(userInfo.content.cloneNode(true));
        var moreUserInfo = document.getElementById('more_user_info_form');
        var moreUserInfoChildren = moreUserInfo.children[0];
        document.getElementById('more_user_info_button').onclick = function(event) {
            moreUserInfo.style.display = "block";
            moreUserInfoChildren.children[0].innerText = `Name:${curentUser.name}`;
            moreUserInfoChildren.children[2].innerText = `Last Name:${curentUser.lastName}`;
            moreUserInfoChildren.children[4].innerText = `Email:${curentUser.email}`;
            moreUserInfoChildren.children[6].innerText = `Phone:${curentUser.phone}`;
            moreUserInfoChildren.children[8].innerText = `Avatar:${curentUser.avatarUrl}`;
            moreUserInfoChildren.children[10].innerText = `Password:******`
            return false
        };
        document.getElementById("log_out_button").onclick = function(event) {
            logOut()
            return false
        };
        document.getElementById('change').onclick = function(event) {
            document.getElementById("box_shadow").style.display = "block";
            var changeInput = document.getElementsByClassName('change_input');
            for (var x of changeInput) {
                x.style.display = "block";
                x.value = null
            }
            document.getElementById('submit_change').style.display = "block";
            return false
        };



        document.getElementById("nav_button_sing_in").style.display = "none";
        document.getElementById("nav_button_sing_up").style.display = "none"


    }
    changeUserInfo = function () {
        var inputArray = document.getElementsByClassName("change_input");
        console.log(inputArray[4].value);
        for (var x = 0; x < inputArray.length; x++) {
            inputArray[x].value.length === 0 ? inputArray[x].value = Object.values(curentUser)[x] : null
        }
        /*  допработать этот блок(проверка на уже существующую почту и телефон проверяет и данные текущего пользователя)

        for (var user in users) {
            if (inputArray[2].value == users[user].email) {
                alert('Данная почта уже занята')
                return false
            }
            if (inputArray[3].value == users[user].phone) {
                alert('Данный номер уже занята')
                return false
            }
        }

        if (inputArray[inputArray.length - 1].value === inputArray[inputArray.length - 2].value) {} else {
            alert('Пароли не совпадают')
            return false
        }
        if (inputArray[4].value.length === 0) { //если не вставленн аватар использует стандартный
            var kotik = "img/kotikUser.jpg"
        } else {
            kotik = inputArray[4].value
        // }*/
        fetch(`http://localhost:3000/users/${curentUser.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${inputArray[0].value}`,
                lastName: `${inputArray[1].value}`,
                email: `${inputArray[2].value}`,
                phone: `${inputArray[3].value}`,
                avatarUrl: `${inputArray[4].value}`,
                password: `${inputArray[5].value}`,
                root: false
            })
        }).then(response => location.reload());
        getUsers();
        document.getElementById("more_user_info_form").style.display = "none";
        document.getElementById("box_shadow").style.display = "none";
        document.getElementById("box_shadow").style.display = "none";
        for (var x of inputArray) {
            x.style.display = "none"
        }
        document.getElementById('submit_change').style.display = "none";
        return false
    };

    function logOut() {
        curentUser = null;
        document.cookie = "email=; expires=" + new Date(0).toUTCString();
        document.getElementById("nav_button_sing_in").style.display = "inline-block";
        document.getElementById("nav_button_sing_up").style.display = "inline-block";
        document.getElementById("user_info_form").remove()
    }
    const getTabs = () => {
        fetch("http://localhost:3000/pages")
            .then(response => response.json()
                .then(response => tabs = response)
            )
    };
    getTabs();
    window.addEventListener('hashchange', changeTab);

    function changeTab() {
        if  (!(tabs===undefined)) {
        let url = window.location.hash.slice(1);
        let page = tabs.find(p => p.tab === url);
        !(document.getElementById('content') === null) ? document.getElementById('content').remove() : null
        if (page.tab === "home") {
            document.getElementById('main').style.display="flex"
        }else {
            document.getElementById('main').style.display="none";
            document.getElementById('main-conteiner').innerHTML += page.content
        }
        return false;
        }

    }



};
start();

