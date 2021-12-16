var selectedRow = null;
var counter =0;
document.getElementById('btn').addEventListener('click',
function(){
    document.querySelector('.big-modal').style.display='flex';
    document.getElementById("heading").innerText="Create User";
});
document.getElementById('okayButton').addEventListener('click',
function(){
    
    document.getElementById("errmsg1").innerHTML="";
    document.getElementById("errmsg").innerHTML="";
    document.getElementById("errmsg2").innerHTML="";
   if(validate())
    {
        var data=readData();
        if (selectedRow == null)
            insertNewRecord(data);
        else {
            updateRecord(data);
        }
    resetForm();
    document.querySelector('.big-modal').style.display='none';
    }
    
});

function readData()
{
    var info={};
    info['firstName']=document.getElementById('first').value;
    info['lastName']=document.getElementById('last').value;
    info['userName']=document.getElementById('Username').value;

    
    return info;
}
function insertNewRecord(data) {
    document.querySelector(".bg-flex").style.display="flex";
    document.getElementById("text").innerHTML="Inserted";
        document.getElementById("removebtn").addEventListener('click',function(){
        
            document.querySelector(".bg-flex").style.display="none";
        });
    counter=counter+1;
    var table = document.getElementById("table-id").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    document.getElementById("index").innerHTML=counter;
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = counter;
    cell1 =newRow.insertCell(1);
    cell1.innerHTML="<img src=\"photo.jpg\"width=\"100px\"height=\"100px\", id=\"imageround\">";
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.firstName;
    newRow.cells[2].style.overflow="overlay";
    cell3 = newRow.insertCell(3);
    cell3.innerHTML =data.lastName;
    newRow.cells[3].style.overflow="overlay";
    cell4= newRow.insertCell(4);
    cell4.innerHTML =data.userName;
    newRow.cells[4].style.overflow="overlay";
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<button onClick ="onEdit(this)" id ="editbtn">Edit</button>
    <button onClick ="onDelete(this)" id ="delbtn">Delete</button>`;
}
function resetForm() {
    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("Username").value = "";
    selectedRow = null;
}
function onDelete(td) {
        document.querySelector(".bg-flex").style.display="flex";
        counter--;
        document.getElementById("text").innerHTML="Deleted";
        document.getElementById("removebtn").addEventListener('click',function(){
        
            document.querySelector(".bg-flex").style.display="none";
        });
        row = td.parentElement.parentElement;
        document.getElementById("index").innerHTML=row.rowIndex;
        document.getElementById("table-id").deleteRow(row.rowIndex);
        var tables = document.getElementById("table-id");
        for (var i = 1; i < tables.rows.length; i++) 
        {
           var firstCol = tables.rows[i].cells[0];
           firstCol.innerText = i;
        }
        resetForm();
        
}
function onEdit(td) {
    document.getElementById("heading").innerText="Edit User";
    selectedRow = td.parentElement.parentElement;
    document.getElementById("first").value = selectedRow.cells[2].innerHTML;
    document.getElementById("last").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Username").value = selectedRow.cells[4].innerHTML;
    document.querySelector('.big-modal').style.display='flex';
}
function updateRecord(formData) {
    selectedRow.cells[2].innerHTML = formData.firstName;
    selectedRow.cells[3].innerHTML = formData.lastName;
    selectedRow.cells[4].innerHTML = formData.userName;
    document.querySelector(".bg-flex").style.display="flex";
    document.getElementById("index").innerHTML=selectedRow.rowIndex;
    document.getElementById("text").innerHTML="Edited";
    document.getElementById("removebtn").addEventListener('click',function(){
    
        document.querySelector(".bg-flex").style.display="none";
    });
}
function validate() {
    isValid = true;
    var user =document.getElementById("Username").value;
    var apos =user.indexOf('@');
    var dotpos =user.lastIndexOf('.');
    if ((document.getElementById("first").value == "") || (document.getElementById("Username").value == "") || (document.getElementById("last").value == "")){
        document.getElementById("errmsg").innerHTML="*this field is required";
        document.getElementById("first").focus();
        document.getElementById("errmsg2").innerHTML="**this field is required";
        document.getElementById("Username").focus();
        document.getElementById("errmsg1").innerHTML="*this field is required";
        document.getElementById("last").focus();
        isValid = false;
    }
    else
    {
        
        
    if (apos<1 || dotpos<apos+2 || dotpos+2>=user.length)
    {
        document.getElementById("errmsg2").innerHTML="*Enter valid email";
        document.getElementById("Username").focus();
        isValid = false;
    }
    if(!isNaN(document.getElementById("first").value))
    {
        document.getElementById("errmsg").innerHTML="*Enter valid name";
        document.getElementById("first").focus();
        isValid = false;
    }
    if(!isNaN(document.getElementById("last").value))
    {
        document.getElementById("errmsg1").innerHTML="*Enter valid lastname";
        document.getElementById("last").focus();
        isValid = false;
    }
    }
    return isValid;
}
