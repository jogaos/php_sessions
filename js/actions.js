function searchId(user) {

    txtIdMessage = document.getElementById("idMessage");
    txtNewUser = document.getElementById("user");
    btnSaveStudent = document.getElementById("createUser");

    if (txtNewUser.length == 0) {
        txtNewUser.innerHTML = "";
        txtIdMessage.innerHTML = "";
        btnSaveStudent.disabled = true;
        txtNewUser.classList.remove("success");
        txtNewUser.classList.remove("warning");
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                response = JSON.parse(this.responseText);

                if (response.success) {
                    txtNewUser.classList.add("warning");
                    txtNewUser.classList.remove("success");
                    btnSaveStudent.disabled = true;
                } else {
                    txtNewUser.classList.add("success");
                    txtNewUser.classList.remove("warning");
                    btnSaveStudent.disabled = false;
                }
            }
        };
        xmlhttp.open("GET", "backend/searchNewUser.php?newUser=" + user, true);
        xmlhttp.send();
    }

}

function sendData() {
    newUser = document.getElementById("user").value;
    newName = document.getElementById("name").value;
    newRole = document.getElementById("role").value;
    newPass = document.getElementById("password").value;
    type = document.getElementById("type").value;

    var data = {user: newUser, name: newName, password: newPass, type: type, role: newRole};

    mdlMessage = document.getElementById("messageModal");

    txtmdlMessage = document.getElementById("mdlMessage");
    txtmdlSuccess = document.getElementById("mdlSuccess");

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);

            txtmdlSuccess.value = response.success;
            txtmdlMessage.innerHTML = response.message;
        }
    };
    xmlhttp.open("POST", "process.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
}

function searchData() {
    user = document.getElementById("user").value;
    pass = document.getElementById("password").value;
    type = document.getElementById("type").value;

    resultMessage = document.getElementById("resultMessage");

    var data = {user: user, password: pass, type: type};

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);

            resultMessage.innerHTML = response.message;
            if(!response.success){
                resultMessage.classList.add("redMessage");
            }else{
                resultMessage.classList.remove("redMessage");
                location.href = "welcome.php";
            }
        }
    };
    xmlhttp.open("POST", "process.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
}

function logout() {
    type = document.getElementById("type").value;

    resultMessage = document.getElementById("resultMessage");

    var data = {type: type};

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);

            if(response.success){
                location.href = "login.php";
            }
        }
    };
    xmlhttp.open("POST", "process.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
}

function cleanData() {
    mdlSuccess = document.getElementById("mdlSuccess").value;
    type = document.getElementById("type").value;
    console.log(type);
    if (type == "1") {
        if (mdlSuccess == "true") {
            document.getElementById("idMessage").innerHTML = "";
            document.getElementById("name").value = "";
            document.getElementById("role").value = "";
            document.getElementById("password").value = "";
            document.getElementById("user").value = "";
            document.getElementById("user").classList.remove("success");
            document.getElementById("user").classList.remove("warning");
        }
    } else {
        location.href = "read.php";
    }
}