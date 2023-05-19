//function for get data from db
let getData = new XMLHttpRequest();
getData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);

        var tableBody = document.getElementById("tbBody");

        for (var i = 0; i < json.length; i++) {
            var item = json[i];

            var row = tableBody.insertRow();

            var taskname = item.taskname;
            var description = item.description;

            var cellTaskName = row.insertCell();
            cellTaskName.innerHTML = taskname;

            var cellDescription = row.insertCell();
            cellDescription.innerHTML = description;

            var cellAction = row.insertCell();
            //update button
            var updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.setAttribute("data-id", item.id);
            updateButton.addEventListener("click", function () {
                var id = this.getAttribute("data-id");
                showUpdateForm(id);
            });

            cellAction.appendChild(updateButton);
            // Fungsi untuk menampilkan form update

            function showUpdateForm(id) {
                updateForm.innerHTML = "";

                var form = document.createElement("form");
                form.addEventListener("submit", function (event) {
                    event.preventDefault();
                    updateData(id, form);
                });

                var tasknameInput = document.createElement("input");
                tasknameInput.type = "text";
                tasknameInput.value = item.taskname;
                tasknameInput.style.padding = "5px";
                tasknameInput.style.marginBottom = "10px";
                form.appendChild(tasknameInput);

                var descriptionInput = document.createElement("input");
                descriptionInput.value = item.description;
                form.appendChild(descriptionInput);

                var submitButton = document.createElement("button");
                submitButton.type = "submit";
                submitButton.textContent = "Update";
                descriptionInput.style.padding = "5px";
                descriptionInput.style.marginBottom = "10px";
                form.appendChild(submitButton);

                updateForm.appendChild(form);
            }

            //delete button 
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("data-id", item.id);
            deleteButton.addEventListener("click", function () {
                deleteData(item.id); // Panggil fungsi deleteData dengan ID sebagai argumen
            });
            cellAction.appendChild(deleteButton);
        }
    }
};




getData.open("GET", "function.php", true);
getData.send();

//Function send updated data



//function save data 
function submitForm(event) {
    event.preventDefault();

    var taskname = document.getElementsByName('taskname')[0].value;
    var description = document.getElementsByName('description')[0].value;

    // Membuat objek JSON
    var data = {
        taskname: taskname,
        description: description
    };

    var sendData = new XMLHttpRequest();
    sendData.open('POST', 'save.php', true);
    sendData.setRequestHeader('Content-Type', 'application/json');
    sendData.onreadystatechange = function () {
        if (sendData.readyState === XMLHttpRequest.DONE && sendData.status === 200) {

            // Menambahkan baris baru ke tabel secara live
            var tableBody = document.getElementById("tbBody");
            var row = tableBody.insertRow(-1);
            var cell1 = row.insertCell();
            cell1.textContent = taskname;
            var cell2 = row.insertCell();
            cell2.textContent = description;

            // Membuat tombol Update
            var updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", function () {
                updateData(row); // Mengirimkan row sebagai parameter updateData
            });
            row.insertCell().appendChild(updateButton);

            // Membuat tombol Delete
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteData(row); // Mengirimkan row sebagai parameter deleteData
            });
            row.insertCell().appendChild(deleteButton);

            // Mengosongkan inputan form
            document.getElementsByName('taskname')[0].value = '';
            document.getElementsByName('description')[0].value = '';

            console.log(sendData.responseText);
        }
    };
    sendData.send(JSON.stringify(data));
}

//function delete data by id

function deleteData(id) {
    var confirmation = confirm("Delete this task?");

    if (confirmation) {
        var deleteRequest = new XMLHttpRequest();
        deleteRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Data deleted!");
                //delete from table
                var row = document.querySelector("[data-id='" + id + "']");
                if (row) {
                    row.parentNode.removeChild(row);
                }
                location.reload();
            }
        };
        deleteRequest.open('POST', 'delete.php', true);
        deleteRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        deleteRequest.send("id=" + id);
    }
}