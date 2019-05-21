const start = function() {
    window.location.hash = '#home';
    const userInfo = document.createElement('user-info-form');
    const regForm = document.createElement('user-reg-form');
    const logForm = document.createElement('user-log-form');
    let services;
    let currentUser = null;
    let users;
    let tabs;
    //--------------------------------------------------------------------------------------------------------------------
    //Создание услуг с данными из db.json
    (function() {
        fetch("http://localhost:3000/services")
            .then(response => response.json()
                .then(json => {
                    services = json;
                    json.forEach(service => {
                        let conteiner = document.getElementById('main').appendChild(
                            document.createElement('service-conteiner')
                        );
                        conteiner.id = `${service.id}`;
                        conteiner.className = 'service_conteiner_shadow';
                        conteiner.setAttribute('img', `${service.servicePhoto}`); //`https://picsum.photos/id/${Math.round(Math.random()*500)}/500/500`);
                        conteiner.setAttribute('text1', service.bodyShort);
                        conteiner.setAttribute('text2', service.bodyLong);
                        conteiner.setAttribute('price', `Price:${service.price}UAH`)
                    })
                })
            )

    })();
    //--------------------------------------------------------------------------------------------------------------------
    let cartArray = [];
    let productArray;
    addToCartButton = function() { //добавление товара в корзину с проверкой есть ли такой товар уже там или нет, если есть увеличить счетчик на 1
        let product = services.find(service => service.id == this.parentNode.parentNode.host.id);
        productArray = Array.from(document.getElementsByClassName('cart_element_shadow'));
        let some = productArray.find(element => element.id.slice(1, element.id.length) === this.parentNode.parentNode.host.id);
        if (currentUser === null) {
            //alert('Please log in')
            alertWindow('Please Login')
        } else {
            display('cart', 'flex');
            if (some) {
                for (x of cartArray) {
                    if (x.productId === product.id) x.count++
                }
                document.cookie = `cartArray=${JSON.stringify(cartArray)}`;
                some.shadow.getElementById('count').value++;
                document.getElementById('sum').innerText = `Sum:${Number((document.getElementById('sum').innerText).slice(4,document.getElementById('sum').innerText.length)) + Number(product.price)}`
            } else {
                cartArray.push({
                    productId: product.id,
                    count: 1
                });
                document.cookie = `cartArray=${JSON.stringify(cartArray)}`;
                let cartElement = document.getElementById('cart').appendChild(document.createElement('cart-element'));
                cartElement.id = `p${product.id}`;
                cartElement.className = "cart_element_shadow";
                cartElement.setAttribute('img', product.servicePhoto);
                cartElement.setAttribute('name', product.bodyShort);
                cartElement.setAttribute('price', `${product.price}  UAH`);
                document.getElementById('sum').innerText = `Sum:${Number((document.getElementById('sum').innerText).slice(4,document.getElementById('sum').innerText.length)) + Number(product.price)}`
            }
        }
    };

    document.getElementById('buy').onclick = function(event) { //пуш в базу информации о заказе
        fetch('http://localhost:3000/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${currentUser.name}`,
                email: `${currentUser.email}`,
                phone: `${currentUser.phone}`,
                userId: `${currentUser.id}`,
                status: 'In progress',
                order: cartArray
            })
        });
        cartArray = [];
        document.cookie = `cartArray=${JSON.stringify(cartArray)}`
        display('cart', 'none');
        document.getElementById('sum').innerText = null;
        for (x = Number(document.getElementsByClassName('cart_element_shadow').length - 1); x >= 0; x--) {
            document.getElementsByClassName('cart_element_shadow')[x].remove()
        }
    };

    deleteProduct = function() { //удаление товара из корзины
        let productHost = this.parentNode.parentNode.parentNode.host;

        document.getElementById('sum').innerText = `Sum:${Number((document.getElementById('sum').innerText).slice(4,document.getElementById('sum').innerText.length)) - Number(productHost.getAttribute('price').slice(0,productHost.getAttribute('price').indexOf(' ')))*productHost.shadow.getElementById('count').value }`
        for (x in cartArray) {
            if (cartArray[x].productId == productHost.id.slice(1, productHost.id.length)) cartArray.splice(x, 1)
        }
        productHost.remove();
        if (cartArray.length === 0) {
            display('cart', 'none')
            document.cookie = "cartArray=; expires=" + new Date(0).toUTCString();
        }
        document.cookie = `cartArray=${JSON.stringify(cartArray)}`;
    };

    moreProduct = function() { //увеличение количества товара в корзине
        let productHost = this.parentNode.parentNode.parentNode.host;
        document.getElementById('sum').innerText = `Sum:${Number((document.getElementById('sum').innerText).slice(4,document.getElementById('sum').innerText.length)) + Number(productHost.getAttribute('price').slice(0,productHost.getAttribute('price').indexOf(' ')))}`
        productHost.shadow.getElementById('count').value++;
        for (x in cartArray) {
            if (cartArray[x].productId == productHost.id.slice(1, productHost.id.length)) cartArray[x].count++
        }
        document.cookie = `cartArray=${JSON.stringify(cartArray)}`;
    };

    lessProduct = function() { //уменьшение количества товара в корзине
        let productHost = this.parentNode.parentNode.parentNode.host;
        document.getElementById('sum').innerText = `Sum:${Number((document.getElementById('sum').innerText).slice(4,document.getElementById('sum').innerText.length)) - Number(productHost.getAttribute('price').slice(0,productHost.getAttribute('price').indexOf(' ')))}`
        productHost.shadow.getElementById('count').value--;
        for (x in cartArray) {
            if (cartArray[x].productId == productHost.id.slice(1, productHost.id.length)) cartArray[x].count--;
            if (cartArray[x].count === 0) {
                cartArray.splice(x, 1);
                productHost.remove()
            }
        }
        if (cartArray.length === 0) {
            display('cart', 'none');
            document.cookie = "cartArray=; expires=" + new Date(0).toUTCString();
        }
        document.cookie = `cartArray=${JSON.stringify(cartArray)}`;
    };

    //--------------------------------------------------------------------------------------------------------------------
    const display = function(what, how) {
        document.getElementById(what).style.display = how
    };
    //--------------------------------------------------------------------------------------------------------------------
    const alertWindow = function(text) {
        let alert = document.getElementById('main').appendChild(
            document.createElement('alert-window'));
        display('alert_shadow', 'block');
        alert.id = 'alert_window_shadow';
        alert.setAttribute('text', text);
    };
    closeAlert = function() {
        document.getElementById('alert_window_shadow').remove();
        display('alert_shadow', 'none');
    }


    //--------------------------------------------------------------------------------------------------------------------
    const getUsers = () => {
        fetch("http://localhost:3000/users")
            .then(response => response.json()
                .then(response => users = response)
                .then(() => checkCookieUser())
            )
    };
    getUsers();
    //--------------------------------------------------------------------------------------------------------------------
    //Увеличение окна товара
    moreInfoButton = function(event) {
        let host = event.target.parentNode.parentNode.host;
        let target = event.target.parentNode;
        host.style.zIndex = "6";
        host.style.width = "400px";
        host.style.height = "500px";
        host.style.position = "fixed";
        host.style.top = "50%";
        host.style.left = "50%";
        host.style.margin = "-250px -200px";
        target.children[1].style.display = "none";
        target.children[2].style.display = "block";
        target.children[3].style.display = "none";
        display('box_shadow', 'block');
        target.children[6].style.display = "block";
        target.children[6].onclick = function(event) {
            host.style = null;
            target.children[2].style.display = "none";
            target.children[3].style.display = "block";
            target.children[1].style.display = "block";
            display('box_shadow', 'none');
            target.children[6].style.display = "none"
        }
    };

    //--------------------------------------------------------------------------------------------------------------------
    closeWindow = function(event) { //функция кнопки Х на некоторых окнах
        display('box_shadow', 'none');
        event.target.parentNode.parentNode.host.remove()
    };

    document.getElementById("nav_button_sing_up").onclick = function(event) { // открытие окна регистрации
        let check = document.getElementById('user_log_form_shadow');
        if (check) {
            check.remove()
            display('box_shadow', 'none');
        }
        document.body.appendChild(regForm);
        regForm.id = "user_reg_form_shadow";
        display('box_shadow', 'block');
        return false;
    };

    addUserToDataBase = function(event) {
        let kotik;
        for (var user in users) {
            if (this.children[5].value === users[user].email) {
                //alert('Данная почта уже занята');
                alertWindow('This email is already taken');
                return false
            }
            // if (this.children[7].value === users[user].phone) {
            //     //alert('Данный номер уже занята');
            //     alertWindow('Данный номер уже занята')
            //     return false
            // }
        }
        if (!(this.children[13].value === this.children[11].value)) {
            //alert('Пароли не совпадают');
            alertWindow('Passwords doesn\'t match');
            return false
        }
        this.children[9].value.length === 0 ? kotik = "img/kotikUser.jpg" : kotik = inputArray[4].value;
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${this.children[1].value}`,
                lastName: `${this.children[3].value}`,
                email: `${this.children[5].value}`,
                phone: `${this.children[7].value}`,
                avatarUrl: `${kotik}`,
                password: `${this.children[11].value}`,
                root: false
            })
        });
        getUsers();
        display('box_shadow', 'none');
        regForm.remove();
        return false;
    };
    //--------------------------------------------------------------------------------------------------------------------
    function checkCookieUser() {
        let temp = false;
        currentUser = null;
        let res = document.cookie
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
                    currentUser = users[user];
                    if (res[1]) {
                        let sum = 0;
                        cartArray = JSON.parse(res[1].cartArray);
                        if (cartArray.length > 0) {
                            display('cart', 'flex');
                            cartArray.forEach(cartItem => {
                                let product = services.find(s => s.id === cartItem.productId);
                                let cartElement = document.getElementById('cart').appendChild(document.createElement('cart-element'));
                                cartElement.id = `p${product.id}`;
                                cartElement.className = "cart_element_shadow";
                                cartElement.setAttribute('img', product.servicePhoto);
                                cartElement.setAttribute('name', product.bodyShort);
                                cartElement.setAttribute('price', `${product.price}  UAH`);
                                cartElement.setAttribute('count', cartItem.count);
                                sum += Number(product.price) * Number(cartItem.count)
                            })
                        }
                        document.getElementById('sum').innerText = `Sum:${sum}`
                    }
                }
            }
            if (temp) {
                if (currentUser.root === true) {
                    document.cookie = "email=; expires=" + new Date(0).toUTCString();
                    currentUser = null
                } else {
                    userForm()
                }
            }
        }
    }


    document.getElementById("nav_button_sing_in").onclick = function(event) { //открытие окна логина
        let check = document.getElementById('user_reg_form_shadow');
        if (check) {
            check.remove();
            display('box_shadow', 'none');
        }
        document.body.appendChild(logForm);
        logForm.id = 'user_log_form_shadow';
        display('box_shadow', 'block');
        return false;
    };

    userLogIn = function(event) {
        let temp = false;
        let inputArray = logForm.shadow.querySelectorAll('input');
        for (let user in users) {
            if (users[user].email === inputArray[0].value) {
                currentUser = users[user];
                temp = true
            }
        }
        if (temp) {
            if (currentUser.password === inputArray[1].value) {
                if (currentUser.root === true) {
                    adminForm();
                    display('box_shadow', 'none');
                    logForm.remove();
                    return false
                } else {
                    userForm();
                    display('box_shadow', 'none');
                    logForm.remove();
                    return false
                }
            } else {
                //alert("Password doesn't match");
                alertWindow('Password doesn\'t match');
                return false
            }
        } else {
            //alert("Email not found");
            alertWindow('Email not found');
            return false
        }
    };
    //--------------------------------------------------------------------------------------------------------------------
    let orders;

    function adminForm() {
        display('nav_button_sing_in', 'none');
        display('nav_button_sing_up', 'none');
        let ordersButton = document.getElementById('nav_menu').appendChild(document.createElement('a'));
        ordersButton.innerText = 'Orders';
        ordersButton.href = "#orders";
        ordersButton.id = 'order_button';
        let reviewsButton = document.getElementById('nav_menu').appendChild(document.createElement('a'));
        reviewsButton.innerText = 'CReviews';
        reviewsButton.href = "#creviews";
        reviewsButton.id = 'reviews_button';
        document.getElementById('order_button').onclick = function getOrders(event) {
            fetch("http://localhost:3000/orders")
                .then(response => response.json()
                    .then(response => orders = response)
                )
                .then(() => {
                    document.getElementById('content').innerHTML = null;
                    let btn = document.getElementById('content').appendChild(document.createElement('button'));
                    btn.innerText = 'Save Changes';
                    orders.sort(function(a, b) {
                        if (a.status > b.status) return -1;
                        if (a.status < b.status) return 1;
                        return 0
                    }).forEach(order => {
                        let userInfo = users.find(x => x.id == order.userId);
                        let ordersContainer = document.getElementById('content').appendChild(
                            document.createElement('orders-container')
                        );
                        ordersContainer.className = 'orders_shadow'
                        ordersContainer.setAttribute('img', `${userInfo.avatarUrl}`);
                        ordersContainer.setAttribute('id', `Order Id:${order.id}`);
                        ordersContainer.setAttribute('name', `Name:${userInfo.name}`);
                        ordersContainer.setAttribute('lname', `Last Name:${userInfo.lastName}`);
                        ordersContainer.setAttribute('email', `Email:${userInfo.email}`);
                        ordersContainer.setAttribute('phone', `Phone:${userInfo.phone}`);
                        ordersContainer.setAttribute('status1', `${order.status}`);
                        order.status === 'In progress' ? ordersContainer.setAttribute('status2', `Done`) : ordersContainer.setAttribute('status2', `In progress`);
                        if (order.status === 'Done') {
                            ordersContainer.shadow.getElementById('order_container').style.backgroundColor = 'lightgreen'
                        }
                        order.order.forEach(product => {
                            let productInfo = services.find(x => x.id === product.productId);
                            let orderForm = ordersContainer.shadow.getElementById('order_container').appendChild(
                                document.createElement('orders-form')
                            );
                            orderForm.setAttribute('img', `${productInfo.servicePhoto}`);
                            orderForm.setAttribute('id', `${productInfo.id}`);
                            orderForm.setAttribute('name', `${productInfo.bodyShort}`);
                            orderForm.setAttribute('price', `Price:${productInfo.price}`);
                            orderForm.setAttribute('count', `Count:${product.count}`);
                            orderForm.setAttribute('sum', `Sum:${Number(productInfo.price) * Number(product.count)}`);
                        })

                    });
                    btn.onclick = function() {
                        changeArray.forEach(change => {
                            let currentOrder = orders.find(some => some.id == change.id);
                            fetch(`http://localhost:3000/orders/${change.id}`, {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: `${currentOrder.name}`,
                                    email: `${currentOrder.email}`,
                                    phone: `${currentOrder.phone}`,
                                    userId: `${currentOrder.userId}`,
                                    status: `${change.status}`,
                                    order: currentOrder.order
                                })
                            })
                        });
                        changeArray = [];
                        getOrders()
                    };
                })


        };
    }
    let changeArray = []
    changeStatus = function(event) {
        let orderId = this.parentNode.children[1].innerText.slice(9, this.parentNode.children[1].innerText.length);
        let change = changeArray.find(change => change.id === orderId);
        if (change) {
            change.status = this.value
        } else {
            changeArray.push({
                id: orderId,
                status: this.value
            })
        }

    };

    //--------------------------------------------------------------------------------------------------------------------

    function userForm() {
        document.cookie = `email=${currentUser.email}`;
        document.getElementById('top_right_panel').appendChild(userInfo);
        userInfo.id = `user_info_form_shadow`;
        userInfo.setAttribute('avatar1', currentUser.avatarUrl);
        userInfo.setAttribute('name1', currentUser.name);
        display('nav_button_sing_in', 'none');
        display('nav_button_sing_up', 'none');
    }

    moreUserInfo = function() {
        userInfo.shadow.getElementById('more_user_info_form').style.display = "block";
        userInfo.shadow.getElementById('close').style.display = "block";
        userInfo.setAttribute('name2', `Name:${currentUser.name}`);
        userInfo.setAttribute('lname', `Last Name:${currentUser.lastName}`);
        userInfo.setAttribute('email', `Email:${currentUser.email}`);
        userInfo.setAttribute('phone', `Phone:${currentUser.phone}`);
        userInfo.setAttribute('avatar2', `Avatar:${currentUser.avatarUrl}`);
        userInfo.setAttribute('pass', `Password:******`);
        return false;
    };

    changeInfo = function() {
        let inputArray = userInfo.shadow.querySelectorAll('input');
        for (var x = 0; x < inputArray.length; x++) {
            inputArray[x].style.display = "block"
        }
        document.getElementById('header').style.zIndex = 4;
        display('box_shadow', 'block');
        return false
    };

    changeUserInfo = function() {
        let inputArray = userInfo.shadow.querySelectorAll('input');
        for (let x = 0; x < inputArray.length - 1; x++) {
            inputArray[x].value.length === 0 ? inputArray[x].value = Object.values(currentUser)[x] : null
        }
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
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
        }).then(() => location.reload());
        return false
    };

    closeInfoForm = function() {
        userInfo.shadow.getElementById('more_user_info_form').style.display = "none";
        let inputArray = userInfo.shadow.querySelectorAll('input');
        display('box_shadow', 'none');
        for (var x = 0; x < inputArray.length; x++) {
            inputArray[x].style.display = "none"
        }
        document.getElementById('header').style.zIndex = 2;
    };

    logOut = function() {
        currentUser = null;
        document.cookie = "email=; expires=" + new Date(0).toUTCString();
        document.cookie = "cartArray=; expires=" + new Date(0).toUTCString();
        display('nav_button_sing_in', 'inline-block');
        display('nav_button_sing_up', 'inline-block');
        display('box_shadow', 'none');
        document.getElementById("user_info_form_shadow").remove();
        cartArray = [];
        display('cart', 'none');
        document.getElementById('sum').innerText = null;
        for (x = Number(document.getElementsByClassName('cart_element_shadow').length - 1); x >= 0; x--) {
            document.getElementsByClassName('cart_element_shadow')[x].remove()
        }
        return false;
    };

    const getTabs = () => {
        fetch("http://localhost:3000/pages")
            .then(response => response.json()
                .then(response => tabs = response)
            )
    };
    getTabs();
    window.addEventListener('hashchange', changeTab);

    function changeTab() {
        if (!(tabs === undefined)) {
            let url = window.location.hash.slice(1);
            if (!(url === '')) {
                let page = tabs.find(p => p.tab === url);
                !(document.getElementById('content') === null) ? document.getElementById('content').remove(): null;
                if (page.tab === "home") {
                    display('main', 'flex');
                } else {
                    display('main', 'none');
                    document.getElementById('main-conteiner').innerHTML += page.content
                }
                return false;
            }
        }
        return false;
    }
};
start();
