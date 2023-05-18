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

            var updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            cellAction.appendChild(updateButton);

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("data-id",item.id);
            deleteButton.addEventListener("click",function(){
                deleteData(item.id);
            });
            cellAction.appendChild(deleteButton);

        }
    }
};

getData.open("GET", "function.php", true);
getData.send();

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