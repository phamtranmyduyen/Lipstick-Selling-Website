/*---------------------------------------------------header-----------------------------------------------*/
const header = document.querySelector("header")
window.addEventListener("scroll", function() {
    x = window.pageYOffset
    if (x > 1) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
})

function anMenu() {
    if (bien % 2 == 0)
        document.querySelector(".main-header").style.display = "block";
    else document.querySelector(".main-header").style.display = "none";
    bien++;
}
/*---------------------------------------------------product---------------------------------------------------*/
function dropdown() {
    if (bien % 2 == 0) {
        document.querySelector(".product-content-right-info").style.display = "block";
        document.querySelector(".up").style.display = "block";
        document.querySelector(".dropdown").style.display = "none";
        bien++;
    } else if (bien % 2 != 0) {
        document.querySelector(".product-content-right-info").style.display = "none";
        document.querySelector(".up").style.display = "none";
        document.querySelector(".dropdown").style.display = "block";
        bien++;
    }
    if (bien == 2)
        bien = 0;
}

function imgbigsmall() {
    const bigimg = document.querySelector(".product-content-left-big-img img")
    const smallimg = document.querySelectorAll(".product-content-left-small-img img")
    smallimg.forEach(function(imgitem) {
        imgitem.addEventListener("click", function() {
            bigimg.src = imgitem.src
        })
    })

}

/*---------------------------------------------------------------------------------------------------------------*/

function setInputValue(selector, value) {
    var element = document.getElementById(selector);
    element.value = value;
}

function getInputValue(selector) {
    var element = document.getElementById(selector);
    return element.value;
}
// function img(event,id) {
//     var selectedFile = event.target.files[0];
//     var reader = new FileReader();

//     var imgtag = document.getElementById(id);
//     imgtag.title = selectedFile.name;

//     reader.onload = function (event) {
//         imgtag.src = event.target.result;
//     };

//     reader.readAsDataURL(selectedFile);
// }

/*--------------------------------------------user-login-register-----------------------------------------------*/
//hiển thị -> info-user
function renderListUser() {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    let tableContent = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Họ và tên</td>
        <td style="text-align:center">Tên tài khoản</td>
        <td style="text-align:center">Email</td>
        <td style="text-align:center">Số điện thoại</td>
        <td style="text-align:center">Ngày sinh</td>
        <td style="text-align:center">Tùy chọn</td>
    </tr>`;

    user.forEach((userItem, index) => {
        let userID = index;
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${userItem.fullname}</td>
            <td>${userItem.username}</td>
            <td>${userItem.email}</td>
            <td>${userItem.phone}</td>
            <td>${userItem.birthday}</td>
            <td style="text-align:center">
                <a href="#" onclick='onEditUser(${userID})' onclick='editUser()' ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteUser(${userID})'><i class="far fa-trash-alt"></i></a>
            </td>
        </tr>`;
    })
    console.log(document.getElementById('infoUser-table'));
    document.getElementById('infoUser-table').innerHTML = tableContent;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^0(1\d{9}|9\d{8})$/;
    return re.test(phone);
}
//save -> register
function save() {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    let fullname = getInputValue('fullname');
    let username = getInputValue('username');
    let password = getInputValue('password');
    let repassword = getInputValue('repassword');
    let email = getInputValue('email');
    let phone = getInputValue('phone');
    let birthday = getInputValue('birthday');

    if (_.isEmpty(fullname)) {
        document.getElementById('error-fullname').innerHTML = "Vui lòng nhập họ và tên";
    } else if (fullname.length < 2) {
        document.getElementById('error-fullname').innerHTML = 'Họ và tên tối thiểu 2 ký tự';
        fullname = '';
    } else document.getElementById('error-fullname').innerHTML = '';

    //valicateUsername (Tránh tên tài khoản trùng nhau)
    var valicateUsername = true;
    user.forEach((userItem, index) => {
        if (username == userItem.username) {
            valicateUsername = false;
        }
    })
    if (_.isEmpty(username)) {
        document.getElementById('error-username').innerHTML = "Vui lòng nhập tên tài khoản";
    } else if (username.length < 3) {
        document.getElementById('error-username').innerHTML = 'Tên tài khoản tối thiểu 3 ký tự';
        username = '';
    } else if (valicateUsername == false) {
        document.getElementById('error-username').innerHTML = 'Tên tài khoản đã tồn tại';
        username = '';
    } else document.getElementById('error-username').innerHTML = '';

    //valivatePass
    if (_.isEmpty(password)) {
        document.getElementById('error-password').innerHTML = "Vui lòng nhập mật khẩu";
    } else if (password.length < 8) {
        document.getElementById('error-password').innerHTML = 'Mật khẩu tối thiểu 8 ký tự';
        password = '';
    } else document.getElementById('error-password').innerHTML = '';

    if (_.isEmpty(repassword)) {
        document.getElementById('error-repassword').innerHTML = "Vui lòng nhập lại mật khẩu";
    } else if (password != repassword) {
        document.getElementById('error-repassword').innerHTML = 'Mật khẩu nhập lại không đúng';
        repassword = '';
    } else document.getElementById('error-repassword').innerHTML = '';

    if (_.isEmpty(email)) {
        document.getElementById('error-email').innerHTML = "Vui lòng nhập email";
    } else if (!validateEmail(email)) {
        document.getElementById('error-email').innerHTML = 'Email không đúng định dạng';
        email = '';
    } else document.getElementById('error-email').innerHTML = '';

    if (_.isEmpty(phone)) {
        document.getElementById('error-phone').innerHTML = "Vui lòng nhập số điện thoại";
    } else if (!validatePhone(phone)) {
        document.getElementById('error-phone').innerHTML = 'Số điện thoại không đúng định dạng';
        phone = '';
    } else document.getElementById('error-phone').innerHTML = '';



    if (fullname && username && password && repassword && email && phone) {
        alert('Đăng ký thành công');
        window.location = "login.html";
        user.push({
            fullname: fullname,
            username: username,
            password: password,
            email: email,
            phone: phone,
            birthday: birthday
        });
        localStorage.setItem('user', JSON.stringify(user));
        // this.renderListUser();

    }
    console.log(user);
}

function deleteUser(id) {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    if (confirm('Bạn muốn xóa thông tin khách hàng này?')) {
        user.splice(id, 1);
        localStorage.setItem('user', JSON.stringify(user));
        renderListUser();
    }
}

function findUser() {
    let userArray = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    let fullnameInput = getInputValue('find-fullname');
    let usernameInput = getInputValue('find-username');
    let tableContent = `<tr>
    <td style="text-align:center">STT</td>
    <td style="text-align:center">Họ và tên</td>
    <td style="text-align:center">Tên tài khoản</td>
    <td style="text-align:center">Email</td>
    <td style="text-align:center">Số điện thoại</td>
    <td style="text-align:center">Ngày sinh</td>
    <td style="text-align:center">Tùy chọn</td>
    </tr>`;
    for (i = 0; i < userArray.length; i++) {
        if (userArray[i].fullname.toUpperCase() == fullnameInput.toUpperCase() || userArray[i].username.toUpperCase() == usernameInput.toUpperCase()) {
            tableContent += `<tr>
            <td>${i + 1}</td>
            <td>${userArray[i].fullname}</td>
            <td>${userArray[i].username}</td>
            <td>${userArray[i].email}</td>
            <td>${userArray[i].phone}</td>
            <td>${userArray[i].birthday}</td>
            <td style="text-align:center">
                <a href="#" ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteUser(${i})'><i class="far fa-trash-alt"></i></a>
            </td>
            </tr>`;
        } else {
            tableContent += ``;
        }
    }
    document.getElementById('infoUser-table').innerHTML = tableContent;
}

var userID;

function onEditUser(id) {
    document.querySelector('.edit-user-form-wrapper').style.display = "block";
    userID = id;
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    setInputValue('editFullname', user[id].fullname);
    setInputValue('editUsername', user[id].username);
    setInputValue('editEmail', user[id].email);
    setInputValue('editPhone', user[id].phone);
    setInputValue('editBirthday', user[id].birthday);
}

function editUser() {
    let fullname = getInputValue('editFullname');
    let username = getInputValue('editUsername');
    let email = getInputValue('editEmail');
    let phone = getInputValue('editPhone');
    let birthday = getInputValue('editBirthday');
    let password = '';
    if (_.isEmpty(fullname)) {
        document.getElementById('error-fullname').innerHTML = "Vui lòng nhập họ và tên";
    } else if (fullname.length < 2) {
        document.getElementById('error-fullname').innerHTML = 'Họ và tên tối thiểu 2 ký tự';
        fullname = '';
    } else document.getElementById('error-fullname').innerHTML = '';

    if (_.isEmpty(username)) {
        document.getElementById('error-username').innerHTML = "Vui lòng nhập tên tài khoản";
    } else if (username.length < 3) {
        document.getElementById('error-username').innerHTML = 'Tên tài khoản tối thiểu 3 ký tự';
        username = '';
    } else document.getElementById('error-username').innerHTML = '';

    if (_.isEmpty(email)) {
        document.getElementById('error-email').innerHTML = "Vui lòng nhập email";
    } else if (!validateEmail(email)) {
        document.getElementById('error-email').innerHTML = 'Email không đúng định dạng';
        email = '';
    } else document.getElementById('error-email').innerHTML = '';

    if (_.isEmpty(phone)) {
        document.getElementById('error-phone').innerHTML = "Vui lòng nhập số điện thoại";
    } else if (!validatePhone(phone)) {
        document.getElementById('error-phone').innerHTML = 'Số điện thoại không đúng định dạng';
        phone = '';
    } else document.getElementById('error-phone').innerHTML = '';

    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    for (i = 0; i < user.length; i++) {
        if (i == userID) {
            password = user[i].password;
        }
    }

    if (fullname && username && email && phone) {
        user[userID] = {
            fullname,
            username,
            password,
            email,
            phone,
            birthday
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.renderListUser();
        alert('Thay đổi thành công');
    }
}

function closeEditUser() {
    document.querySelector('.edit-user-form-wrapper').style.display = "none";
}

//Lấy username + password
function getLogin() {
    var login = false;
    let userArray = JSON.parse(localStorage.getItem('user'));
    var username = getInputValue('username-login');
    var password = getInputValue('password-login');
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    for (i = 0; i < userArray.length; i++) {
        if (userArray[i].username == username && userArray[i].password == password && i == 0) {
            login = true;
            window.location.href = "admin.html";
        } else if (userArray[i].username == username && userArray[i].password == password && i != 0) {
            login = true;

            //lưu tài khoản vào localStorage
            userLogin.push({
                fullname: userArray[i].fullname,
                username: userArray[i].username,
                password: userArray[i].password,
                email: userArray[i].email,
                phone: userArray[i].phone,
            })
            localStorage.setItem('userLogin', JSON.stringify(userLogin));
            //chuyển trang
            window.location.href = "main.html";
        }
    }
    if (login == false) {
        document.getElementById('error').innerHTML = "Đăng nhập không thành công";
    }
}

function logout() {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('cart');
    document.getElementById('disableLogin').style.display = "block";
    document.getElementById('logout').style.display = "none";
    document.getElementById('enableLogin').style.display = "none";
    window.location = "main.html";
}

function statusLogin() {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (userLogin != null) {
        // console.log("Đã đăng nhập");
        document.getElementById('disableLogin').style.display = "none";
        document.getElementById('logout').style.display = "block";
        document.getElementById('enableLogin').style.display = "block";

    }
    if (userLogin == null) {
        // console.log("Chưa đăng nhập");
        document.getElementById('disableLogin').style.display = "block";
        document.getElementById('logout').style.display = "none";
        document.getElementById('enableLogin').style.display = "none";
    }
}

function innerUsernameLogin() {
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    for (i = 0; i < userLogin.length; i++) {
        document.getElementById('usernameLogin').innerHTML = userLogin[i].fullname;
    }
}

function adminLogin() {
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    let userArray = JSON.parse(localStorage.getItem('user'));
    userLogin.push({
        fullname: userArray[0].fullname,
        username: userArray[0].username,
        password: userArray[0].password,
        email: userArray[0].email,
        phone: userArray[0].phone,
    })
    localStorage.setItem('userLogin', JSON.stringify(userLogin));
    window.location = 'main.html';
}

function nameUser() {
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
    user.forEach((userItem, index) => {
        var userID = index;
        if (userLogin[0].fullname == 'admin' && userID == 0) {
            window.location = 'admin.html';
        } else {
            window.location = 'orderUser.html';
        }
    })

}
/*---------------------------------------------Thương hiệu------------------------------------------------- */
function trademark(trademarkID, trademarkName) {
    this.trademarkID = trademarkID;
    this.trademarkName = trademarkName;
}

function trademarkMenu() {
    var trademarkArr = [
        new trademark("mac", "MAC"),
        new trademark("dior", "DIOR"),
        new trademark("gucci", "GUCCI"),
        new trademark("ysl", "YSL"),
        new trademark("chanel", "CHANEL"),
        new trademark("ce", "3CE")
    ];
    var s = "";
    for (i = 0; i < trademarkArr.length; i++) {
        var a = '<a href="product.html? ' + trademarkArr[i].trademarkID + ' ?  ?  ?  &1"><li>' + trademarkArr[i].trademarkName + '</li></a>';
        s += a;
    }
    document.getElementById('submenu').innerHTML = s;
    if (localStorage.getItem('trademark') === null) {
        localStorage.setItem('trademark', JSON.stringify(trademarkArr));
    }
}

function optionTrademark() {
    let trademark = localStorage.getItem('trademark') ? JSON.parse(localStorage.getItem('trademark')) : [];
    let optionTrademark = `<option value="" selected>Chọn thương hiệu</option>`;
    trademark.forEach((trademarkItem, index) => {
        optionTrademark += `
        <option value="${trademarkItem.trademarkName}">${trademarkItem.trademarkName}</option>
        `
    })
    document.getElementById('find-trademark-product').innerHTML = optionTrademark;
    document.getElementById('trademark-product').innerHTML = optionTrademark;
    document.getElementById('editTrademarkProduct').innerHTML = optionTrademark;
}
/*--------------------------------------------product----------------------------------------------*/
// function getBase64FromImageUrl(url) {
//     var img = new Image();

//     img.setAttribute('crossOrigin', 'anonymous');

//     img.onload = function () {
//         var canvas = document.createElement("canvas");
//         canvas.width =this.width;
//         canvas.height =this.height;

//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(this, 0, 0);

//         var dataURL = canvas.toDataURL("image/png");

//         alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
//     };

//     img.src = url;
// }
function saveProduct() {
    let idproduct = getInputValue('id-product');
    let name = getInputValue('name-product');
    let trademark = getInputValue('trademark-product');
    let img = getInputValue('img-product').replace(/^.*\\/, "");
    let money = getInputValue('money-product');
    if (_.isEmpty(idproduct)) {
        document.getElementById('error-add-id-product').innerHTML = "Vui lòng nhập mã sản phẩm";
    } else document.getElementById('error-add-id-product').innerHTML = '';

    if (_.isEmpty(name)) {
        document.getElementById('error-add-name-product').innerHTML = "Vui lòng nhập tên sản phẩm";
    } else document.getElementById('error-add-name-product').innerHTML = '';

    if (_.isEmpty(trademark)) {
        document.getElementById('error-add-trademark-product').innerHTML = "Vui lòng chọn thương hiệu";
    } else document.getElementById('error-add-trademark-product').innerHTML = '';

    if (_.isEmpty(money)) {
        document.getElementById('error-add-money-product').innerHTML = "Vui lòng nhập giá sản phẩm";
    } else document.getElementById('error-add-money-product').innerHTML = '';



    if (idproduct && name && trademark && money) {
        if (img == '') {
            img = 'demo.png';
        }
        let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
        product.push({
            idproduct: idproduct,
            name: name,
            trademark: trademark,
            img: img,
            money: money,
        });
        localStorage.setItem('product', JSON.stringify(product));
        alert('Thêm sản phẩm thành công');
        this.renderListProduct();
    }
}

function renderListProduct() {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let tableProduct = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Mã sản phẩm</td>
        <td style="text-align:center">Tên sản phẩm</td>
        <td style="text-align:center">Tên thương hiệu</td>
        <td style="text-align:center">Ảnh</td>
        <td style="text-align:center">Giá</td>
        <td style="text-align:center">Lựa chọn</td>
    </tr>`;

    product.forEach((productItem, index) => {
        let productID = index;
        index++;
        tableProduct += `<tr>
            <td>${index}</td>
            <td>${productItem.idproduct}</td>
            <td>${productItem.name}</td>
            <td>${productItem.trademark}</td>
            <td style="width:15%">
                <img style="width:50%" src='img/${productItem.img}'/>
                <a href="#" onclick="onEditImgProduct(${productID})"><i class="far fa-image"></i></a>                 
            </td>
            <td>${productItem.money}.000 đ</td>
            <td style="text-align:center">
                <a href="#" onclick="onEditProduct(${productID})"><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteProduct(${productID})'><i class="far fa-trash-alt"></i></a>
            </td>
        </tr>`;
    })
    document.getElementById('infoProduct-table').innerHTML = tableProduct;
}

function deleteProduct(id) {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    if (confirm('Bạn muốn xóa thông tin sản phẩm này?')) {
        product.splice(id, 1);
        localStorage.setItem('product', JSON.stringify(product));
        renderListProduct();
    }
}

function findProduct() {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let name = getInputValue('find-name-product');
    let trademark = getInputValue('find-trademark-product');
    let tableContent = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Mã sản phẩm</td>
        <td style="text-align:center">Tên sản phẩm</td>
        <td style="text-align:center">Tên thương hiệu</td>
        <td style="text-align:center">Ảnh</td>
        <td style="text-align:center">Giá</td>
        <td style="text-align:center">Lựa chọn</td>
    </tr>`;
    for (i = 0; i < product.length; i++) {
        if (product[i].name.toUpperCase() == name.toUpperCase() || product[i].trademark.toUpperCase() == trademark.toUpperCase()) {
            tableContent += `<tr>
            <td>${i + 1}</td>
            <td>${product[i].idproduct}</td>
            <td>${product[i].name}</td>
            <td>${product[i].trademark}</td>
            <td style="width:30%"><img style="width:50%" src='img/${product[i].img}'/></td>
            <td>${product[i].money}.000 đ</td>
            <td style="text-align:center">
                <a href="#" onclick="onEditProduct(${productID})" ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteProduct(${i})'><i class="far fa-trash-alt"></i></a>
            </td>
            </tr>`;
        } else {
            tableContent += ``;
        }
    }
    document.getElementById('infoProduct-table').innerHTML = tableContent;
}

var productID;

function onEditProduct(id) {
    document.querySelector('.edit-product-form-wrapper').style.display = "block";
    productID = id;
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    setInputValue('editIdProduct', product[id].idproduct);
    setInputValue('editNameProduct', product[id].name);
    setInputValue('editTrademarkProduct', product[id].trademark);
    setInputValue('editMoneyProduct', product[id].money);
    document.getElementById('editImgProduct').file = product[id].img;
}

function editProduct() {
    let idproduct = getInputValue('editIdProduct');
    let name = getInputValue('editNameProduct');
    let trademark = getInputValue('editTrademarkProduct');
    let money = getInputValue('editMoneyProduct');
    let img = document.getElementById('editImgProduct').file;
    if (_.isEmpty(idproduct)) {
        document.getElementById('error-id-product').innerHTML = "Vui lòng nhập mã sản phẩm";
    } else document.getElementById('error-id-product').innerHTML = '';

    if (_.isEmpty(name)) {
        document.getElementById('error-name-product').innerHTML = "Vui lòng nhập tên sản phẩm";
    } else document.getElementById('error-name-product').innerHTML = '';

    if (_.isEmpty(trademark)) {
        document.getElementById('error-trademark-product').innerHTML = "Vui lòng chọn thương hiệu";
    } else document.getElementById('error-trademark-product').innerHTML = '';

    if (_.isEmpty(money)) {
        document.getElementById('error-money-product').innerHTML = "Vui lòng nhập giá sản phẩm";
    } else document.getElementById('error-money-product').innerHTML = '';

    if (idproduct && name && trademark && money) {
        let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
        product[productID] = {
            idproduct,
            name,
            img,
            trademark,
            money
        };
        localStorage.setItem('product', JSON.stringify(product));
        this.renderListProduct();
        alert('Thay đổi thành công');
    }
}

function onEditImgProduct(id) {
    document.querySelector('.edit-product-img-form-wrapper').style.display = "block";
    productID = id;
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    document.getElementById('editImgProduct').file = product[id].img;
}

function editImgOfProduct() {
    var img = getInputValue('editImgProduct').replace(/^.*\\/, "");
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    product[productID].img = img;
    localStorage.setItem('product', JSON.stringify(product));
    this.renderListProduct();
    alert('Thay đổi thành công');
}

function closeEditProduct() {
    document.querySelector('.edit-product-form-wrapper').style.display = "none";
}

function closeEditProductImg() {
    document.querySelector('.edit-product-img-form-wrapper').style.display = "none";
}
/*-------------------------------------inner danh mục sản phẩm--------------------------------------------------------------*/
let perPage = 8;
let currentPage = 1;
let start = 0;
let end = perPage;
let count = [];

var filterMode = false;

function enableFilter() {
    if (getInputValue('filter') == 'filter') {
        count = [];
        filterMode = false;
    } else filterMode = true;
}

function disableFilter() {
    filterMode = false;
    console.log(filterMode);
}

function innerProduct() {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let productContent = '';
    let linkTrademark = '';
    let titleTrademark = '';

    //lấy url và tách bằng ?
    var url = window.location.href;
    var id = url.split('?');
    console.log(id)

    //Lấy tên thương hiệu
    let id1 = JSON.stringify(id[1]).split(/[^a-zA-Z]+/);
    console.log(id1);
    trademarkProduct = id1[1];
    console.log(trademarkProduct);

    //kiểm tra đang tìm kiếm
    let id3 = JSON.stringify(id[3]).split(/[^a-zA-Z]+/);
    id3 = id3[1];
    console.log(id3);

    //lấy tên sản phẩm
    let id2 = JSON.stringify(id[2]).split(/[^a-zA-Z]+/);
    var nameProduct = '';
    for (var i = 1; i < id2.length; i++) {
        nameProduct += id2[i] + ' ';
    }
    nameProduct = nameProduct.trimEnd().toUpperCase();
    console.log(nameProduct)

    //Không tìm kiếm => Inner hết
    if (id3 != 'find') {
        if (filterMode == true) {
            console.log(getInputValue('filter'));
            if (getInputValue('filter') == 'low') {
                count = [];
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) > parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            } else {
                count = [];
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) < parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            }
        }

        product.forEach((productItem, index) => {
            index++;
            if (productItem.trademark.search(trademarkProduct.toUpperCase()) != -1) {
                count.push(index);
                if (count.length > start && count.length <= end) {
                    productContent += `<div class="cartegory-right-cotent-item">
                    <a href="detail-product.html? '+ ${productItem.trademark} +' '+${productItem.idproduct}+'">
                        <img style="width:80%" src="img/${productItem.img}"/>
                        <h1>${productItem.name}</h1>
                        <p>${productItem.money}.000 đ</p>
                    </a>
                    </div>`;
                    linkTrademark = `<p>${productItem.trademark}</p>`;
                    titleTrademark = `<p>${productItem.trademark}</p>`;
                }
            }

        });
        document.getElementById('cartegory-right-cotent').innerHTML = productContent;
        document.getElementById('link-trademark').innerHTML = linkTrademark;
        document.getElementById('title-trademark').innerHTML = titleTrademark;
    }
    //Nếu đang tìm kiếm => lọc tên
    else {
        if (filterMode == true) {
            console.log(getInputValue('filter'));
            count = [];
            if (getInputValue('filter') == 'low') {
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) > parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            } else {
                count = [];
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) < parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            }
        }

        product.forEach((productItem) => {
            if (productItem.trademark.search(trademarkProduct.toUpperCase()) != -1 && productItem.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) {
                console.log(productItem.name)
                productContent += `<div class="cartegory-right-cotent-item">
                    <a href="detail-product.html? '+ ${productItem.trademark} +' '+${productItem.idproduct}+'">
                        <img style="width:80%" src="img/${productItem.img}"/>
                        <h1>${productItem.name}</h1>
                        <p>${productItem.money}.000 đ</p>
                    </a>
                    </div>`;
                linkTrademark = `<p>${productItem.trademark}</p>`;
                titleTrademark = `<p>${productItem.trademark}</p>`;
            }
            if (productItem.trademark.search(trademarkProduct.toUpperCase()) != -1 && nameProduct == " ") {
                window.location = 'product.html?' + productItem.trademark + '?  ?  ?  &1';
            }
            document.getElementById('cartegory-right-cotent').innerHTML = productContent;
            document.getElementById('link-trademark').innerHTML = linkTrademark;
            document.getElementById('title-trademark').innerHTML = titleTrademark;
        });
    }

}
innerProduct();
let totalPage = Math.ceil(count.length / perPage)

function getCurrentPage(currentPage) {
    count = [];
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
}

function renderPage() {
    let page = ``;
    if (totalPage == 1) {
        document.querySelector('.cartegory-right-bottom-item').innerHTML = '';
    } else {
        for (let i = 1; i <= totalPage; i++) {
            page += `<a onclick='clickPage()' style="margin:0 10px; cursor: pointer"><li>${i}</li></a>`;
        }
        document.getElementById('page').innerHTML = page;
    }
}

function clickPage() {
    const currentPages = document.querySelectorAll('#page a');
    for (let i = 0; i < currentPages.length; i++) {
        currentPages[i].addEventListener('click', () => {
            let value = i + 1;
            currentPage = value;
            getCurrentPage(currentPage);
            innerProduct();
        })
    }
}

function nextPage() {
    currentPage++;
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    getCurrentPage(currentPage)
    innerProduct();
}

function prevPage() {
    currentPage--;
    if (currentPage <= 1) {
        currentPage = 1;
    }
    getCurrentPage(currentPage)
    innerProduct();
}
/*----------------------------------inner product-related----------------------------------------------------------*/
//inner 4 sp liên quan
function innerProductRelative() {

    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let valueRelated = ``;
    //lấy url và tách bằng ?
    var url = window.location.href;
    var id = url.split('?');
    console.log(id)

    //Lấy tên thương hiệu
    let id1 = JSON.stringify(id[1]).split(/[^a-zA-Z]+/);
    trademarkProduct = id1[1];

    //lấy tên sản phẩm
    let id2 = JSON.stringify(id[1]).split(/[^a-zA-Z]+/);
    var nameProduct = '';
    for (var i = 1; i < id2.length; i++) {
        nameProduct += id2[i] + ' ';
    }
    nameProduct = nameProduct.split(' ');
    nameProduct = nameProduct[1].toUpperCase();
    //lấy tên sp => nếu trùng sp sẽ không nằm trong ds sản phẩm liên quan

    var tmp = []; // thỏa đk => push vào tmp để đếm số lượng sản phẩm inner
    product.forEach((item, index) => {
        index++;
        if ((item.trademark.toUpperCase() == trademarkProduct.toUpperCase()) && item.idproduct.toUpperCase() != nameProduct && tmp.length < 4) {
            tmp.push(index);
            console.log(tmp)
            valueRelated += `<div class="product-related-content-item"><a href="detail-product.html? '+ ${item.trademark} +' '+${item.idproduct}+'">
                <img src="./img/${item.img}"/>
                <h4 style="margin-top:15px">${item.name}</h1>
                <p>${item.money}.000 đ</p>
                </a></div>`
        }
    })
    document.getElementById('product-related-content').innerHTML = valueRelated;
}

/*-------------------------------------chi tiết sản phẩm--------------------------------------------------------------*/

function saveDetailProduct() {
    let iddetailproduct = getInputValue('id-detail-product');
    let img1 = getInputValue('img1-product').replace(/^.*\\/, "");
    let img2 = getInputValue('img2-product').replace(/^.*\\/, "");
    let img3 = getInputValue('img3-product').replace(/^.*\\/, "");
    let img4 = getInputValue('img4-product').replace(/^.*\\/, "");
    let img5 = getInputValue('img5-product').replace(/^.*\\/, "");
    let color1 = getInputValue('color1-product');
    let color2 = getInputValue('color2-product');
    let color3 = getInputValue('color3-product');
    let color4 = getInputValue('color4-product');
    let color5 = getInputValue('color5-product');
    let imgcontent1 = getInputValue('contentImg1Product').replace(/^.*\\/, "");
    let imgcontent2 = getInputValue('contentImg2Product').replace(/^.*\\/, "");
    let imgcontent3 = getInputValue('contentImg3Product').replace(/^.*\\/, "");
    let imgcontent4 = getInputValue('contentImg4Product').replace(/^.*\\/, "");
    let imgcontent5 = getInputValue('contentImg5Product').replace(/^.*\\/, "");
    let imgcontent6 = getInputValue('contentImg6Product').replace(/^.*\\/, "");
    if (iddetailproduct && (img1 || img2 || img3 || img4 || img5) && (imgcontent1 || imgcontent2 || imgcontent3 || imgcontent4 || imgcontent5 || imgcontent6)) {
        let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
        detailProduct.push({
            iddetailproduct: iddetailproduct,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            img5: img5,
            color1: color1,
            color2: color2,
            color3: color3,
            color4: color4,
            color5: color5,
            imgcontent1: imgcontent1,
            imgcontent2: imgcontent2,
            imgcontent3: imgcontent3,
            imgcontent4: imgcontent4,
            imgcontent5: imgcontent5,
            imgcontent6: imgcontent6
        });
        localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
        alert('Thêm sản phẩm thành công');
        this.renderListDetailProduct();
    }
}

function renderListDetailProduct() {
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    let tableImgProduct = `<tr>
        <td>STT</td>
        <td>Mã sản phẩm</td>
        <td>Ảnh 1</td>
        <td>Ảnh 2</td>
        <td>Ảnh 3</td>
        <td>Ảnh 4</td>
        <td>Ảnh 5</td>
        <td>Lựa chọn</td>
    </tr>`;
    let tableColorProduct = `<tr>
        <td>STT</td>
        <td>Mã sản phẩm</td>
        <td>Màu 1</td>
        <td>Màu 2</td>
        <td>Màu 3</td>
        <td>Màu 4</td>
        <td>Màu 5</td>
        <td>Lựa chọn</td>
    </tr>`;
    let tableContent = `<tr>
        <td>STT</td>
        <td>Mã sản phẩm</td>
        <td>Ảnh giới thiệu 1</td>
        <td>Ảnh giới thiệu 2</td>
        <td>Ảnh giới thiệu 3</td>
        <td>Ảnh giới thiệu 4</td>
        <td>Ảnh giới thiệu 5</td>
        <td>Ảnh giới thiệu 6</td>
        <td>Lựa chọn</td>
    </tr>`

    detailProduct.forEach((productItem, index) => {
        let detailProductID = index;
        index++;
        tableImgProduct += `<tr>
            <td>${index}</td>
            <td style="width:10%">${productItem.iddetailproduct}</td>
            <td>
                <img style="width:50%" src='img/${productItem.img1}'/>
                <a href="#" onclick="onEditImg1DetailProduct(${detailProductID})"><i class="far fa-image"></i></a>   
            </td>
            <td>
                <img style="width:50%" src='img/${productItem.img2}'/>
                <a href="#" onclick="onEditImg2DetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td>
                <img style="width:50%" src='img/${productItem.img3}'/>
                <a href="#" onclick="onEditImg3DetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td>
                <img style="width:50%" src='img/${productItem.img4}'/>
                <a href="#" onclick="onEditImg4DetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td>
                <img style="width:50%" src='img/${productItem.img5}'/>
                <a href="#" onclick="onEditImg5DetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td style="width:10%">
                <a href="#" onclick='deleteDetailProduct(${detailProductID})'><i class="far fa-trash-alt"></i></a>
            </td>
        </tr>`;
    })
    document.getElementById('img-product-table').innerHTML = tableImgProduct;

    detailProduct.forEach((productItem, index) => {
        let detailProductID = index;
        index++;
        tableColorProduct += `<tr>
            <td>${index}</td>
            <td>${productItem.iddetailproduct}</td>
            <td>${productItem.color1}</td>
            <td>${productItem.color2}</td>
            <td>${productItem.color3}</td>
            <td>${productItem.color4}</td>
            <td>${productItem.color5}</td>
            <td>
                <a href="#" onclick="onEditDetailProduct(${detailProductID})" ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteDetailProduct(${detailProductID})'><i class="far fa-trash-alt"></i></a>
            </td>
        </tr>`;
    })
    document.getElementById('color-product-table').innerHTML = tableColorProduct;

    detailProduct.forEach((productItem, index) => {
        let detailProductID = index;
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${productItem.iddetailproduct}</td>
            <td style="width:15%">
                <img style="width:90%" src='img/${productItem.imgcontent1}'/>
                <a href="#" onclick="onEditImg1ContentDetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td style="width:15%">
                <img style="width:90%" src='img/${productItem.imgcontent2}'/>
                <a href="#" onclick="onEditImg2ContentDetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td style="width:15%">
                <img style="width:90%" src='img/${productItem.imgcontent3}'/>
                <a href="#" onclick="onEditImg3ContentDetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td style="width:15%">
                <img style="width:90%" src='img/${productItem.imgcontent4}'/>
                <a href="#" onclick="onEditImg4ContentDetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td style="width:15%">
                <img style="width:90%" src='img/${productItem.imgcontent5}'/>
                <a href="#" onclick="onEditImg5ContentDetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td style="width:15%">
                <img style="width:90%" src='img/${productItem.imgcontent6}'/>
                <a href="#" onclick="onEditImg6ContentDetailProduct(${detailProductID})"><i class="far fa-image"></i></a> 
            </td>
            <td>
                <a href="#" onclick='deleteDetailProduct(${detailProductID})'><i class="far fa-trash-alt"></i></a>
            </td>
        </tr>`;
    })
    document.getElementById('content-product-table').innerHTML = tableContent;
}

function deleteDetailProduct(id) {
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    if (confirm('Bạn muốn xóa thông tin sản phẩm này?')) {
        detailProduct.splice(id, 1);
        localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
        renderListDetailProduct();
    }
}

function findDetailProduct() {
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    let iddetailproduct = getInputValue('find-id-detail-product');
    let tableImgProduct = `<tr>
        <td>STT</td>
        <td>Mã sản phẩm</td>
        <td>Ảnh 1</td>
        <td>Ảnh 2</td>
        <td>Ảnh 3</td>
        <td>Ảnh 4</td>
        <td>Ảnh 5</td>
        <td>Lựa chọn</td>
    </tr>`;
    let tableColorProduct = `<tr>
        <td>STT</td>
        <td>Mã sản phẩm</td>
        <td>Màu 1</td>
        <td>Màu 2</td>
        <td>Màu 3</td>
        <td>Màu 4</td>
        <td>Màu 5</td>
        <td>Lựa chọn</td>
    </tr>`;
    let tableContent = `<tr>
        <td>STT</td>
        <td>Mã sản phẩm</td>
        <td>Ảnh giới thiệu 1</td>
        <td>Ảnh giới thiệu 2</td>
        <td>Ảnh giới thiệu 3</td>
        <td>Ảnh giới thiệu 4</td>
        <td>Ảnh giới thiệu 5</td>
        <td>Ảnh giới thiệu 6</td>
        <td>Lựa chọn</td>
    </tr>`
    for (i = 0; i < detailProduct.length; i++) {
        if (detailProduct[i].iddetailproduct == iddetailproduct) {
            tableImgProduct += `<tr>
                <td>${i + 1}</td>
                <td style="width:10%">${detailProduct[i].iddetailproduct}</td>
                <td><img style="width:50%" src='img/${detailProduct[i].img1}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].img2}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].img3}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].img4}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].img5}'/></td>
                <td style="width:10%">
                    <a href="#" ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteDetailProduct(${productID})'><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>`;
            tableColorProduct += `<tr>
                <td>${i + 1}</td>
                <td>${detailProduct[i].iddetailproduct}</td>
                <td>${detailProduct[i].color1}</td>
                <td>${detailProduct[i].color2}</td>
                <td>${detailProduct[i].color3}</td>
                <td>${detailProduct[i].color4}</td>
                <td>${detailProduct[i].color5}</td>
                <td>
                    <a href="#" ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteDetailProduct(${productID})'><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>`;
            tableContent += `<tr>
                <td>${i + 1}</td>
                <td>${detailProduct[i].iddetailproduct}</td>
                <td><img style="width:50%" src='img/${detailProduct[i].imgcontent1}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].imgcontent2}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].imgcontent3}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].imgcontent4}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].imgcontent5}'/></td>
                <td><img style="width:50%" src='img/${detailProduct[i].imgcontent6}'/></td>
                <td>
                    <a href="#" ><i class="far fa-edit"></i></a> | <a href="#" onclick='deleteDetailProduct(${productID})'><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>`;

        } else {
            tableImgProduct += ``;
            tableColorProduct += ``;
            tableContent += ``;
        }
    }
    document.getElementById('img-product-table').innerHTML = tableImgProduct;
    document.getElementById('color-product-table').innerHTML = tableColorProduct;
    document.getElementById('content-product-table').innerHTML = tableContent;
}
/**------------------------------------edit chi tiết sản phẩm----------------------------------------------------- */
var detailProductID;

function onEditDetailProduct(id) {
    document.querySelector('.edit-detail-product-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    setInputValue('editIdDetailProduct', detailProduct[id].iddetailproduct);
    document.getElementById('editImg1Product').file = detailProduct[id].img1;
    document.getElementById('editImg2Product').file = detailProduct[id].img2;
    document.getElementById('editImg3Product').file = detailProduct[id].img3;
    document.getElementById('editImg4Product').file = detailProduct[id].img4;
    document.getElementById('editImg5Product').file = detailProduct[id].img5;
    setInputValue('editColor1Product', detailProduct[id].color1);
    setInputValue('editColor2Product', detailProduct[id].color2);
    setInputValue('editColor3Product', detailProduct[id].color3);
    setInputValue('editColor4Product', detailProduct[id].color4);
    setInputValue('editColor5Product', detailProduct[id].color5);
    document.getElementById('editContentImg1Product').file = detailProduct[id].imgcontent1;
    document.getElementById('editContentImg2Product').file = detailProduct[id].imgcontent2;
    document.getElementById('editContentImg3Product').file = detailProduct[id].imgcontent3;
    document.getElementById('editContentImg4Product').file = detailProduct[id].imgcontent4;
    document.getElementById('editContentImg5Product').file = detailProduct[id].imgcontent5;
    document.getElementById('editContentImg6Product').file = detailProduct[id].imgcontent6;
}

function editDetailProduct() {
    let iddetailproduct = getInputValue('editIdDetailProduct');
    let img1 = document.getElementById('editImg1Product').file;
    let img2 = document.getElementById('editImg2Product').file;
    let img3 = document.getElementById('editImg3Product').file;
    let img4 = document.getElementById('editImg4Product').file;
    let img5 = document.getElementById('editImg5Product').file;
    let color1 = getInputValue('editColor1Product');
    let color2 = getInputValue('editColor2Product');
    let color3 = getInputValue('editColor3Product');
    let color4 = getInputValue('editColor4Product');
    let color5 = getInputValue('editColor5Product');
    let imgcontent1 = document.getElementById('editContentImg1Product').file;
    let imgcontent2 = document.getElementById('editContentImg2Product').file;
    let imgcontent3 = document.getElementById('editContentImg3Product').file;
    let imgcontent4 = document.getElementById('editContentImg4Product').file;
    let imgcontent5 = document.getElementById('editContentImg5Product').file;
    let imgcontent6 = document.getElementById('editContentImg6Product').file;
    if (_.isEmpty(iddetailproduct)) {
        document.getElementById('error-id-detail-product').innerHTML = "Vui lòng nhập mã sản phẩm";
    } else document.getElementById('error-id-detail-product').innerHTML = '';


    if (iddetailproduct && (color1 || color2 || color3 || color4 || color5)) {
        let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
        detailProduct[detailProductID] = {
            iddetailproduct,
            img1,
            img2,
            img3,
            img4,
            img5,
            color1,
            color2,
            color3,
            color4,
            color5,
            imgcontent1,
            imgcontent2,
            imgcontent3,
            imgcontent4,
            imgcontent5,
            imgcontent6
        };
        localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
        this.renderListDetailProduct();
        alert('Thay đổi thành công');
    }
}
//edit img1
function onEditImg1DetailProduct(id) {
    document.querySelector('.edit-detail-product-img1-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editImg1Product').file = detailProduct[id].img1;
}

function editImg1DetailProduct() {
    let img1 = getInputValue('editImg1Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].img1 = img1;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img2
function onEditImg2DetailProduct(id) {
    document.querySelector('.edit-detail-product-img2-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editImg2Product').file = detailProduct[id].img2;
}

function editImg2DetailProduct() {
    let img2 = getInputValue('editImg2Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].img2 = img2;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img3
function onEditImg3DetailProduct(id) {
    document.querySelector('.edit-detail-product-img3-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editImg3Product').file = detailProduct[id].img3;
}

function editImg3DetailProduct() {
    let img3 = getInputValue('editImg3Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].img3 = img3;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img4
function onEditImg4DetailProduct(id) {
    document.querySelector('.edit-detail-product-img4-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editImg4Product').file = detailProduct[id].img4;
}

function editImg4DetailProduct() {
    let img4 = getInputValue('editImg4Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].img4 = img4;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img 5
function onEditImg5DetailProduct(id) {
    document.querySelector('.edit-detail-product-img5-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editImg5Product').file = detailProduct[id].img5;
}

function editImg5DetailProduct() {
    let img5 = getInputValue('editImg5Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].img5 = img5;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img content 1
function onEditImg1ContentDetailProduct(id) {
    document.querySelector('.edit-detail-product-content-img1-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editContentImg1Product').file = detailProduct[id].imgcontent1;
}

function editImg1ContentDetailProduct() {
    let img1 = getInputValue('editContentImg1Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].imgcontent1 = img1;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img content 2
function onEditImg2ContentDetailProduct(id) {
    document.querySelector('.edit-detail-product-content-img2-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editContentImg1Product').file = detailProduct[id].imgcontent1;
}

function editImg2ContentDetailProduct() {
    let img2 = getInputValue('editContentImg2Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].imgcontent2 = img2;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img content 3
function onEditImg3ContentDetailProduct(id) {
    document.querySelector('.edit-detail-product-content-img3-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editContentImg3Product').file = detailProduct[id].imgcontent1;
}

function editImg3ContentDetailProduct() {
    let img3 = getInputValue('editContentImg3Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].imgcontent3 = img3;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img content 4
function onEditImg4ContentDetailProduct(id) {
    document.querySelector('.edit-detail-product-content-img4-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editContentImg4Product').file = detailProduct[id].imgcontent1;
}

function editImg4ContentDetailProduct() {
    let img4 = getInputValue('editContentImg4Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].imgcontent4 = img4;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img content 5
function onEditImg5ContentDetailProduct(id) {
    document.querySelector('.edit-detail-product-content-img5-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editContentImg5Product').file = detailProduct[id].imgcontent1;
}

function editImg5ContentDetailProduct() {
    let img5 = getInputValue('editContentImg5Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].imgcontent5 = img5;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}
//edit img content 6
function onEditImg6ContentDetailProduct(id) {
    document.querySelector('.edit-detail-product-content-img6-form-wrapper').style.display = "block";
    detailProductID = id;
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    document.getElementById('editContentImg6Product').file = detailProduct[id].imgcontent1;
}

function editImg6ContentDetailProduct() {
    let img6 = getInputValue('editContentImg6Product').replace(/^.*\\/, "");
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    detailProduct[detailProductID].imgcontent6 = img6;
    localStorage.setItem('detailProduct', JSON.stringify(detailProduct));
    this.renderListDetailProduct();
    alert('Thay đổi thành công');
}

function closeEditImg1DetailProduct() {
    document.querySelector('.edit-detail-product-img1-form-wrapper').style.display = "none";
}

function closeEditImg2DetailProduct() {
    document.querySelector('.edit-detail-product-img2-form-wrapper').style.display = "none";
}

function closeEditImg3DetailProduct() {
    document.querySelector('.edit-detail-product-img3-form-wrapper').style.display = "none";
}

function closeEditImg4DetailProduct() {
    document.querySelector('.edit-detail-product-img4-form-wrapper').style.display = "none";
}

function closeEditImg5DetailProduct() {
    document.querySelector('.edit-detail-product-img5-form-wrapper').style.display = "none";
}

function closeEditImg1ContentDetailProduct() {
    document.querySelector('.edit-detail-product-content-img1-form-wrapper').style.display = "none";
}

function closeEditImg2ContentDetailProduct() {
    document.querySelector('.edit-detail-product-content-img2-form-wrapper').style.display = "none";
}

function closeEditImg3ContentDetailProduct() {
    document.querySelector('.edit-detail-product-content-img3-form-wrapper').style.display = "none";
}

function closeEditImg4ContentDetailProduct() {
    document.querySelector('.edit-detail-product-content-img4-form-wrapper').style.display = "none";
}

function closeEditImg5ContentDetailProduct() {
    document.querySelector('.edit-detail-product-content-img5-form-wrapper').style.display = "none";
}

function closeEditImg6ContentDetailProduct() {
    document.querySelector('.edit-detail-product-content-img6-form-wrapper').style.display = "none";
}

function closeEditDetailProduct() {
    document.querySelector('.edit-detail-product-form-wrapper').style.display = "none";
}
/*---------------------------------------------inner chi tiết sản phẩm----------------------------------- */
function innerDetailProduct() {
    let detailProduct = localStorage.getItem('detailProduct') ? JSON.parse(localStorage.getItem('detailProduct')) : [];
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];

    let imgProduct = ``;
    let nameProduct = ``;
    let idProduct = ``;
    let moneyProduct = ``;
    let colorProduct = `<option value="" selected>Chọn màu</option>`;
    let contentProduct = ``;
    let infotrademarkdetail = ``;
    let infonamedetail = ``;

    var url = window.location.href;
    var id = url.split('?');
    id = JSON.stringify(id[1]).split(/[^a-zA-Z]+/);
    id = id[2];


    detailProduct.forEach((productItem) => {
        if (productItem.iddetailproduct.search(id) != -1) {
            imgProduct += `
            <div class="product-content-left-big-img">
                <img src='img/${productItem.img1}'/>
            </div>
            <div class="product-content-left-small-img">
                <img src='img/${productItem.img2}'/>
                <img src='img/${productItem.img3}'/>
                <img src='img/${productItem.img4}'/>
                <img src='img/${productItem.img5}'/>
            </div>
            `


            colorProduct += `
            <option value="${productItem.color1}">${productItem.color1}</option>
            <option value="${productItem.color2}">${productItem.color2}</option>
            <option value="${productItem.color3}">${productItem.color3}</option>
            <option value="${productItem.color4}">${productItem.color4}</option>
            <option value="${productItem.color5}">${productItem.color5}</option>
            `

            contentProduct += `
                <img style="width:100%; margin-top:20px" src='img/${productItem.imgcontent1}'/>
                <img style="width:100%" src='img/${productItem.imgcontent2}'/>
                <img style="width:100%" src='img/${productItem.imgcontent3}'/>
                <img style="width:100%" src='img/${productItem.imgcontent4}'/>
                <img style="width:100%" src='img/${productItem.imgcontent5}'/>
                <img style="width:100%" src='img/${productItem.imgcontent6}'/>
            `
        }
    });
    document.getElementById('product-content-left').innerHTML = imgProduct;
    document.querySelector('.product-content-right-product-color').innerHTML = colorProduct;
    document.getElementById('content-product').innerHTML = contentProduct;
    product.forEach((productItem, index) => {
        index++;
        if (productItem.idproduct.search(id) != -1) {
            nameProduct += `${productItem.name}`
            idProduct += `Mã sản phẩm: ${productItem.idproduct}`
            moneyProduct += `${productItem.money}.000 đ`
            infotrademarkdetail += `${productItem.trademark}`
            infonamedetail += `${productItem.name}`
        }
    });

    document.getElementById('nameproduct').innerHTML = nameProduct;
    document.getElementById('idproduct').innerHTML = idProduct;
    document.getElementById('moneyproduct').innerHTML = moneyProduct;
    document.getElementById('info-trademark-detail-product').innerHTML = infotrademarkdetail;
    document.getElementById('info-name-detail-product').innerHTML = infonamedetail;



    // if (colorProduct.length) {
    //     document.querySelector('.product-content-right-product-color').style.display = 'none';
    //     document.querySelector('.quantity').style.marginTop = '-30px';
    // }
}
/*----------------------------------------------valicate màu------------------------------------------------- */
function valicateColor() {
    var color = getInputValue('product-content-right-product-color');
    if (_.isEmpty(color))
        document.getElementById('error-color').innerHTML = "Vui lòng chọn màu sản phẩm";
    else document.getElementById('error-color').innerHTML = '';
}
/*-------------------------------------------setInput giỏ hàng------------------------------------------------- */
function deliveryInfo() {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (userLogin != null) {
        for (i = 0; i < userLogin.length; i++) {
            setInputValue('fullname-delivery', userLogin[i].fullname);
            setInputValue('phone-delivery', userLogin[i].phone);
        }
    }
}
/*------------------------------------------save vào giỏ hàng và save đơn hàng-------------------------------- */
function saveCart() {
    var cartMode = false; // Mode==true: đặt lại trùng sản phẩm và màu => thì tăng số lượng
    // Mode==false: đặt sp mới => push thêm vào Item
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    var name = document.getElementById('nameproduct').outerText;
    var money = document.getElementById('moneyproduct').outerText;
    var color = getInputValue('product-content-right-product-color');
    var quantity = getInputValue('quantity');
    if (userLogin == null) {
        if (confirm('Bạn chưa đăng nhập. Hãy đăng nhập để thêm sản phẩm vào giỏ hàng và mua hàng cùng chúng tôi.'))
            window.location = "login.html"
    } else if (name && money && color && quantity) {

        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        let cartOfficial = localStorage.getItem('cartOfficial') ? JSON.parse(localStorage.getItem('cartOfficial')) : [];
        for (var i = 0; i < cartOfficial.length; i++) {
            if (name == cartOfficial[i].name && color == cartOfficial[i].color) {
                cartOfficial[i].quantity = parseFloat(cartOfficial[i].quantity, 3) + parseFloat(quantity, 3);
                cartMode = true;
                let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
        console.log(cartMode)
        if (cartMode == false) {
            cartOfficial.push({
                name: name,
                money: money,
                color: color,
                quantity: quantity,
                usernameUser: userLogin[0].username,
            });

        }

        //Lưu vào 2 Item
        //cart => tạm thời => xóa khi đăng xuất
        //cartOfficial => giữ nguyên => set vào cart khi đăng nhập
        localStorage.setItem('cart', JSON.stringify(cartOfficial));
        localStorage.setItem('cartOfficial', JSON.stringify(cartOfficial));
        alert('Bạn đã thêm sản phẩm vào giỏ hàng!');
    }
}
/*------------------------------------------chốt đơn hàng----------------------------------------------------- */
//Set Item cartOfficial vào orderClosing khi submit chốt đơn
// => Đơn hàng inner từ orderClosing
function orderClosing() {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    let cartOfficial = JSON.parse(localStorage.getItem('cartOfficial'));
    let a = localStorage.getItem('a') ? JSON.parse(localStorage.getItem('a')) : [];
    let b = localStorage.getItem('b') ? JSON.parse(localStorage.getItem('b')) : [];
    for (i = 0; i < cartOfficial.length; i++) {
        if (userLogin[0].username == cartOfficial[i].usernameUser)
            a.push({
                name: cartOfficial[i].name,
                color: cartOfficial[i].color,
                quantity: cartOfficial[i].quantity,
                money: cartOfficial[i].money,
                usernameUser: cartOfficial[i].usernameUser
            });
    }
    console.log(a);
    localStorage.setItem('orderClosing', JSON.stringify(a));


    localStorage.removeItem('cart');
    for (i = 0; i < cartOfficial.length; i++) {
        if (userLogin[0].username != cartOfficial[i].usernameUser)
            b.push({
                name: cartOfficial[i].name,
                color: cartOfficial[i].color,
                quantity: cartOfficial[i].quantity,
                money: cartOfficial[i].money,
                usernameUser: cartOfficial[i].usernameUser
            });
    }
    localStorage.setItem('cartOfficial', JSON.stringify(b))

}
/*------------------------------------------save chi tiết đơn hàng----------------------------------------------------- */
function onclickCart() {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (userLogin == null) {
        if (confirm('Bạn chưa đăng nhập. Hãy đăng nhập để truy cập vào giỏ hàng và mua hàng cùng chúng tôi?')) {
            window.location = "login.html";
        }
    } else window.location = "cart.html"
}

function saveDetailOrder() {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    let cartOfficial = JSON.parse(localStorage.getItem('cartOfficial'));
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var pay;
    var statusOrder = 'Chưa xử lý';
    var checkedPay = document.getElementsByName('method-payment');
    for (var i = 0; i < checkedPay.length; i++) {
        if (checkedPay[i].checked) {
            pay = checkedPay[i].value;
        }
    }
    let fullnameUser = getInputValue('fullname-delivery');
    let phoneUser = getInputValue('phone-delivery');
    let province = getInputValue('province-delivery');
    let district = getInputValue('district-delivery');
    let ward = getInputValue('ward-delivery');
    let address = getInputValue('address-delivery');

    if (_.isEmpty(province)) {
        document.getElementById('error-province').innerHTML = "Vui lòng nhập Thành phố/Tỉnh";
    } else document.getElementById('error-province').innerHTML = '';

    if (_.isEmpty(district)) {
        document.getElementById('error-district').innerHTML = "Vui lòng nhập Quận/huyện";
    } else document.getElementById('error-district').innerHTML = '';

    if (_.isEmpty(ward)) {
        document.getElementById('error-ward').innerHTML = "Vui lòng nhập Phường/xã";
    } else document.getElementById('error-ward').innerHTML = '';

    if (_.isEmpty(address)) {
        document.getElementById('error-address').innerHTML = "Vui lòng nhập địa chỉ nhà";
    } else document.getElementById('error-address').innerHTML = '';

    if (_.isEmpty(pay)) {
        document.getElementById('error-pay').innerHTML = "Vui lòng chọn phương thức thanh toán";
    } else document.getElementById('error-pay').innerHTML = '';


    if (fullnameUser && phoneUser && province && district && ward && address && pay) {
        let detailOrder = localStorage.getItem('detailOrder') ? JSON.parse(localStorage.getItem('detailOrder')) : [];
        for (i = 0; i < userLogin.length; i++) {
            for (j = 0; j < cartOfficial.length; j++) {
                if (userLogin[i].username == cartOfficial[j].usernameUser) {
                    detailOrder.push({
                        date: date,
                        fullnameUser: fullnameUser,
                        usernameUser: userLogin[i].username,
                        emailUser: userLogin[i].email,
                        phoneUser: phoneUser,
                        province: province,
                        district: district,
                        ward: ward,
                        address: address,
                        pay: pay,
                        name: cartOfficial[j].name,
                        color: cartOfficial[j].color,
                        quantity: cartOfficial[j].quantity,
                        money: cartOfficial[j].money,
                        statusOrder: statusOrder
                    });
                }
            }
        }

        localStorage.setItem('detailOrder', JSON.stringify(detailOrder));
        alert("Bạn đã đặt hàng thành công!");
        window.location = "orderUser.html";
    }
}
/*----------------------------------inner thông tin đơn hàng của khách bên phải------------------------------ */
function infoCartRight() {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    var quantityCart = 0;
    var moneyCart = 0;
    var totalMoneyCart = 0;
    for (i = 0; i < cart.length; i++) {
        if (cart[i].usernameUser == userLogin[0].username) {
            quantityCart += parseInt(cart[i].quantity);
            moneyCart += parseInt(cart[i].money) * parseInt(cart[i].quantity);
            totalMoneyCart += parseInt(cart[i].money) * parseInt(cart[i].quantity);
        }
    }
    document.getElementById('quantityCart-right').innerHTML = quantityCart;
    document.getElementById('moneyCart-right').innerHTML = moneyCart + '.000 đ';
    document.getElementById('totalMoneyCart-right').innerHTML = totalMoneyCart + '.000 đ';

}
/*-------------------------------------------------inner giỏ hàng của khách----------------------------------- */
function renderListCart() {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    let tableCart = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Sản phẩm</td>
        <td style="text-align:center">Tên sản phẩm</td>
        <td style="text-align:center">Màu</td>
        <td style="text-align:center">Số lượng</td>
        <td style="text-align:center">Thành tiền</td>
        <td style="text-align:center">Xóa</td>
    </tr>`;
    console.log(userLogin)
    var i = 0;
    userLogin.forEach((userItem) => {
        product.forEach((productItem) => {
            cart.forEach((cartItem) => {
                if (cartItem.name == productItem.name && userItem.username == cartItem.usernameUser) {
                    cartID = i;
                    i++;
                    tableCart += `<tr>
                    <td>${i}</td>
                    <td style="width:15%"><img style="width:50%" src='img/${productItem.img}'/></td>
                    <td>${cartItem.name}</td>
                    <td>${cartItem.color}</td>
                    <td>${cartItem.quantity}</td>
                    <td>${parseInt(cartItem.money) * parseInt(cartItem.quantity)}.000 đ</td>
                    <td style="text-align:center">
                        <a href="#" onclick='deleteProductOfCart(${cartID})'><i class="far fa-trash-alt"></i></a>
                    </td>
                    </tr>`;
                }
            })
        })
    })

    document.getElementById('detail-cart').innerHTML = tableCart;
}
/*-----------------------------------------------xóa sản phẩm trong giỏ hàng----------------------------------- */
function deleteProductOfCart(id) {
    let cartOfficial = localStorage.getItem('cartOfficial') ? JSON.parse(localStorage.getItem('cartOfficial')) : [];
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        cartOfficial.splice(id, 1);
        localStorage.setItem('cartOfficial', JSON.stringify(cartOfficial));
        cart.splice(id, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderListCart();
        infoCartRight();
    }
}
/*-------------------------------------------------inner đơn hàng của khách----------------------------------- */
function renderListOrderOfUser() {
    let detailOrder = localStorage.getItem('detailOrder') ? JSON.parse(localStorage.getItem('detailOrder')) : [];
    let userLogin = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let tableCart = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Sản phẩm</td>
        <td style="text-align:center">Tên sản phẩm</td>
        <td style="text-align:center">Màu</td>
        <td style="text-align:center">Số lượng</td>
        <td style="text-align:center">Thành tiền</td>
        <td style="text-align:center">Trạng thái</td>
    </tr>`;
    var stt = 0;
    detailOrder.forEach((detailOrderItem, detailOrderIndex) => {
        detailOrderIndex++;
        product.forEach((productItem, productIndex) => {
            productIndex++;
            if (detailOrderItem.usernameUser == userLogin[0].username && productItem.name == detailOrderItem.name) {
                stt += 1;
                tableCart += `<tr>
                    <td>${stt}</td>
                    <td style="width:25%"><img style="width:50%" src='img/${productItem.img}'/></td>
                    <td>${detailOrderItem.name}</td>
                    <td>${detailOrderItem.color}</td>
                    <td>${detailOrderItem.quantity}</td>
                    <td>${parseFloat(detailOrderItem.money, 3) * parseFloat(detailOrderItem.quantity, 3)}.000 đ</td>
                    <td style="text-align:center">${detailOrderItem.statusOrder}</td>
                    </tr>`;
            }
        })
    })

    document.getElementById('orderUser').innerHTML = tableCart;
}
/*-------------------------------------------------inner thông tin đơn hàng----------------------------------- */
function renderListOrder() {
    let detailOrder = localStorage.getItem('detailOrder') ? JSON.parse(localStorage.getItem('detailOrder')) : [];

    let tableOrder = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Ngày</td>
        <td style="text-align:center">Tên khách hàng</td>
        <td style="text-align:center">Thành tiền</td>
        <td style="text-align:center">Trạng thái</td>
    </tr>`;
    detailOrder.forEach((detailOrderItem, detailOrderIndex) => {
        orderID = detailOrderIndex;
        detailOrderIndex++;
        tableOrder += `<tr>
                <td>${detailOrderIndex}</td>
                <td>${detailOrderItem.date}</td>
                <td>${detailOrderItem.fullnameUser}</td>
                <td>${parseFloat(detailOrderItem.money, 3) * parseFloat(detailOrderItem.quantity, 3)}.000 đ</td>
                <td style="text-align:center">
                    <a href="#" onclick="onDetailOrder(${orderID})">${detailOrderItem.statusOrder}</a>
                </td>
                </tr>`;
    })

    document.getElementById('infoOrder-table').innerHTML = tableOrder;
}


/*--------------------------------------------inner chi tiết đơn hàng---------------------------------------- */
function onDetailOrder(id) {
    document.querySelector('.detail-order-form-wrapper').style.display = "block";
    orderID = id;
    let detailOrder = localStorage.getItem('detailOrder') ? JSON.parse(localStorage.getItem('detailOrder')) : [];
    if (detailOrder[id].pay) {
        document.getElementById('dateOrder').innerHTML = detailOrder[id].date;
        document.getElementById('userOrder').innerHTML = detailOrder[id].fullnameUser;
        document.getElementById('emailOrder').innerHTML = detailOrder[id].emailUser;
        document.getElementById('phoneOrder').innerHTML = detailOrder[id].phoneUser;
        document.getElementById('addressOrder').innerHTML = detailOrder[id].address + ', phường ' + detailOrder[id].ward + ', quận ' + detailOrder[id].district + ', thành phố ' + detailOrder[id].province;
        document.getElementById('payOrder').innerHTML = detailOrder[id].pay;
        document.getElementById('nameOrder').innerHTML = detailOrder[id].name;
        document.getElementById('colorOrder').innerHTML = detailOrder[id].color;
        document.getElementById('quantityOrder').innerHTML = detailOrder[id].quantity;
        document.getElementById('moneyOrder').innerHTML = detailOrder[id].money;
        setInputValue('statusOrder', detailOrder[id].statusOrder);
    }
}
//Xử lý đơn hàng
function handleOrder() {
    var statusOrder = getInputValue('statusOrder');
    let detailOrder = localStorage.getItem('detailOrder') ? JSON.parse(localStorage.getItem('detailOrder')) : [];
    detailOrder[orderID].statusOrder = statusOrder;
    localStorage.setItem('detailOrder', JSON.stringify(detailOrder));
    this.renderListOrder();
}
/*-------------------------------------------------tìm kiếm đơn hàng----------------------------------- */
function findOrder() {
    let detailOrder = localStorage.getItem('detailOrder') ? JSON.parse(localStorage.getItem('detailOrder')) : [];
    var fullnameUser = getInputValue('find-fullname-order');
    var date = getInputValue('find-date-order');
    var status = getInputValue('find-status-order');
    let tableOrder = `<tr>
        <td style="text-align:center">STT</td>
        <td style="text-align:center">Ngày</td>
        <td style="text-align:center">Tên khách hàng</td>
        <td style="text-align:center">Thành tiền</td>
        <td style="text-align:center">Trạng thái</td>
    </tr>`;
    for (i = 0; i < detailOrder.length; i++) {
        if (detailOrder[i].fullnameUser == fullnameUser || detailOrder[i].date == date || detailOrder[i].statusOrder == status) {
            tableOrder += `<tr>
            <td>${i + 1}</td>
            <td>${detailOrder[i].date}</td>
            <td>${detailOrder[i].fullnameUser}</td>
            <td>${parseFloat(detailOrder[i].money, 3) * parseFloat(detailOrder[i].quantity, 3)}.000 đ</td>
            <td style="text-align:center">
                <a href="#" onclick="onDetailOrder(${i})">${detailOrder[i].statusOrder}</a>
            </td>
            </tr>`;
        } else {
            tableOrder += ``;
        }
    }
    document.getElementById('infoOrder-table').innerHTML = tableOrder;
}

function closeDetailOrder() {
    document.querySelector('.detail-order-form-wrapper').style.display = "none";
}
//lấy lại cart khi đăng nhập
function cartOfUser() {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    let cartOfficial = localStorage.getItem('cartOfficial') ? JSON.parse(localStorage.getItem('cartOfficial')) : [];
    if (userLogin != null) {
        for (j = 0; j < cartOfficial.length; j++) {
            if (userLogin[0].username == cartOfficial[j].usernameUser) {
                localStorage.setItem('cart', JSON.stringify(cartOfficial))
            }
        }
    }
}
//Xử lý mua hàng
function buyCart() {
    if (localStorage.getItem('cart') == null) {
        alert('Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy mua sắm cùng DTTT để đặt hàng ngay những sản phẩm hấp dẫn!')

    } else location.href = "delivery.html";
}
/*---------------------------------------------------find main----------------------------------------------- */
function findProductMain() {
    let nameProduct = getInputValue('find');
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];

    var findMode = false;
    product.forEach((productItem) => {
        if (productItem.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) {
            window.location.href = "product.html?" + productItem.trademark.toLowerCase() + "?" + nameProduct.toLowerCase() + "?find?&1";
            findMode = true;
        }
        if (productItem.trademark.toUpperCase().search(nameProduct.toUpperCase()) != -1) {
            window.location.href = "product.html?" + productItem.trademark.toLowerCase() + "?" + " " + "?find?&1";
            findMode = true;
        }
    })
    if (findMode == false) alert('Không tìm thấy sản phẩm');
}