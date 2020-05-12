// Прогружает, когда страница готова
$(document).ready(function () {
    loadRegistedUsers();
    renderTable();
});

// Загрузка из localStorage
function loadRegistedUsers() {
    registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
}

//Сохранение в localStorage
function saveRegisteredUsers() {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

var curr = undefined;

// Рендер таблицы в хтмл
function renderTable() {
    var addForm = document.getElementById('add_form');
    var table = document.getElementById('myTable');
    var form = document.getElementById('details');

    for (var i = 0; i < registeredUsers.length; i++) {
        var btnSave = document.createElement("button");
        btnSave.innerHTML = "Save";
        btnSave.onclick = saveCell;

        var btnEdit = document.createElement("input");
        btnEdit.type = "button";
        btnEdit.value = "Edit";
        btnEdit.onclick = editCell;

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkBox";

        var row = document.createElement("tr");
        table.appendChild(row);
        var cell = document.createElement("td");
        row.appendChild(cell);
        cell.appendChild(checkbox);
        var cell = document.createElement("td");

        cell.innerHTML = i;
        for (key in registeredUsers[i]) {
            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = registeredUsers[i][key];
        }
        var cell = document.createElement("td");
        row.appendChild(cell);
        cell.appendChild(btnEdit);
        cell.appendChild(btnSave);
    }

    var addTable = function () {
        var email = document.getElementById('add_email');
        var password = document.getElementById('add_password');
        var lastName = document.getElementById('add_lastname');
        var firstName = document.getElementById('add_firstname');
        var username = document.getElementById('add_username');
        var phone = document.getElementById('add_phone');
        var isBanned = document.getElementById('add_isbanned');

        var btnSave = document.createElement("button");
        btnSave.type = "button";
        btnSave.innerHTML = "Save";
        btnSave.onclick = saveCell;

        var btnEdit = document.createElement("input");
        btnEdit.type = "button";
        btnEdit.value = "Edit";
        btnEdit.onclick = editCell;

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkBox";
        var row = document.createElement("tr");
        if (
            email.value != "" &&
            password.value != "" &&
            firstName.value != "" &&
            lastName.value != "") {
            table.appendChild(row);
            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.appendChild(checkbox);

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = firstName.value;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = lastName.value;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = email.value;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = username.value;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = phone.value;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = password.value;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = isBanned.checked;

            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.appendChild(btnEdit);
            cell.appendChild(btnSave);

            let properties = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                username: username.value,
                phone: phone.value,
                password: password.value,
                isBanned: isBanned.checked
            };
            registeredUsers.push(properties);
            saveRegisteredUsers();

            document.getElementById("details").reset();
        } else {
            alert("Enter Input Values");
        }
    };

    var btnClick = document.getElementById('add_submit');
    btnClick.onclick = addTable;
    var btnDelete = document.getElementById('delete_button');
    btnDelete.onclick = deleteRow;

}

// Удалние строки
function deleteRow() {
    let tabDel = document.getElementById("myTable");
    let rowCount = tabDel.rows.length;
    for (var i = 0; i < rowCount; i++) {
        let row = tabDel.rows[i];
        let chkbox = row.cells[0].childNodes[0];
        if (chkbox.checked) {
            tabDel.deleteRow(i);
            rowCount--;
            registeredUsers.splice(i - 1, 1);
            i--;
        }
    }
    saveRegisteredUsers();
}

// Изменение строки
function editCell(e) {
    var lastName = document.getElementById('add_lastname');
    var firstName = document.getElementById('add_firstname');
    var email = document.getElementById('add_email');
    var username = document.getElementById('add_username');
    var phone = document.getElementById('add_phone');
    var password = document.getElementById('add_password');
    var isBanned = document.getElementById('add_isbanned');

    var t = e.target.parentElement.parentElement;
    var trs = t.getElementsByTagName("tr");
    tds = t.getElementsByTagName("td");

    tds[1].appendChild(firstName);

    tds[2].appendChild(lastName);

    tds[3].appendChild(email);

    tds[4].appendChild(username);

    tds[5].appendChild(phone);

    tds[6].appendChild(password);

    tds[7].appendChild(isBanned);

    curr = t;

}

// Сохранение строки
function saveCell(e) {
    if (curr != undefined) {
        var inputs = curr.getElementsByTagName("td");
        var headers = document.getElementById('myTable').getElementsByTagName('th');
        let properties = {};
        let oldInputs = [];
        for (var i = 1; i < inputs.length - 1; i++) {
            let currInput = inputs[i].getElementsByTagName("input")[0];
            let oldInput = inputs[i].innerText;
            let propertyName = headers[i].innerText;
            var value = '';
            if (currInput.id == 'add_isbanned') { // special case
                value = currInput.checked;
            } else { // ordinary input
                value = currInput.value;
            }
            properties[propertyName] = value;
            currInput.parentElement.innerHTML = value;
            oldInputs[i] = oldInput;
        }
        curr = undefined;
        let propertiesProps = Object.entries(oldInputs);
        for (i = 0; i < registeredUsers.length; i++) {
            let user = registeredUsers[i];
            // go through every user and compare values
            let userProps = Object.entries(user);

            for (o = 0; o < userProps.length; o++) {
                if (userProps[o][1] != propertiesProps[o][1]) {
                    break;
                }
                registeredUsers[i] = properties;
            }
        }
        saveRegisteredUsers();
    }
}
