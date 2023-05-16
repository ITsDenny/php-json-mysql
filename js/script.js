let getData = new XMLHttpRequest();
getData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);

        var table = document.getElementById("myTable");

        for (var i = 0; i < json.length; i++) {
            var item = json[i];

            var row = table.insertRow();
            //akses data JSON taskname,description

            var taskname = item.taskname;
            var description = item.description;
            //menambah data ke tabel


            var cellTaskName = row.insertCell();
            cellTaskName.innerHTML = taskname;

            var cellDescription = row.insertCell();
            cellDescription.innerHTML = description;

        }
    }
};

getData.open("GET", "function.php", true);
getData.send();


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
            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
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