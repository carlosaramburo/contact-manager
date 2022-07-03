const contactTable = document.getElementById('tableData');
const addContactForm = document.getElementById('addContactForm'); 
const editContactForm = document.getElementById('editContactForm'); 

const getAllContacts = async () => {
    contactTable.innerHTML = '';
        
        try {
            const response = await fetch('http://localhost:3000/getAllContacts');
            if(!response.ok) {
                console.log(response);
                showMessage("getAllContacts", "ERROR");
                document.getElementById("editSubmitBtn").disabled = true;
            }
            else {
                const data = await response.json();
                data.forEach(contact => {
                    contact.gender = genderTransform(contact.gender);
                    contactTable.insertRow().innerHTML = `
                                        <tr>
                                            <td>${contact.idContact}</td>
                                            <td>${contact.name}</td>
                                            <td>${contact.address}</td>
                                            <td>${contact.phoneNumber}</td>
                                            <td>${contact.gender}</td>
                                            <td><button type="button" class="btn btn-dark editBtn" value="${contact.idContact}"><ion-icon name="create-outline">Update</ion-icon></button>     <button type="button" class="btn btn-danger deleteBtn" value="${contact.idContact}"><ion-icon name="trash-outline">Delete</ion-icon></button></td>
                                        </tr>`
                });
                Array.from(document.getElementsByClassName('editBtn')).forEach(editBtn => {
                    editBtn.addEventListener('click', function () {
                        localStorage.setItem('id', editBtn.value);
                        window.location.assign('http://localhost:3000/edit');
                    })
                })
                Array.from(document.getElementsByClassName('deleteBtn')).forEach(deleteBtn => {
                    deleteBtn.addEventListener('click', function () {
                        deleteContact(deleteBtn.value);
                    })
                })
            }
        }
        catch(err) {
            console.log(err);
        }
}

const getContactById = async () => {
    const id = localStorage.getItem('id');
    try {
        const response = await fetch('http://localhost:3000/getContactById/' + id);
        
        if(!response.ok) {
            console.log(response);
            showMessage("getContactById", "ERROR");
            document.getElementById("editSubmitBtn").disabled = true;
        }
        else {
            const data = await response.json();
            fillEditForm(data);
        }
    } catch(err) {
        console.log(err);
    }
}

const insertContact = async () => {
    document.getElementById('addContactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        localStorage.clear();
    
        const formData = new FormData(this);
        const formJSON = JSON.stringify(Object.fromEntries(formData));
    
        try {
            const response = await fetch('http://localhost:3000/insertContact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: formJSON
            });
    
            if(!response.ok) {
                showMessage("add", "ERROR");
            }
            else {
                showMessage("add", "OK");
            }
    
        } catch (err) {
            console.log(err);
        }
    })
}

const editContact = async () => {
    document.getElementById('editContactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const id = localStorage.getItem('id');
        const formData = new FormData(this);
        const formJSON = JSON.stringify(Object.fromEntries(formData));
    
        try {
            const response = await fetch('http://localhost:3000/updateContact/' + id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: formJSON
            });
            
            if(!response.ok) {
                showMessage("edit", "ERROR");
            }
            else {
                showMessage("edit", "OK");
            }
        } catch(err) {
            console.log(err);
        }
    })
}

const deleteContact = async (id) => {
    try {
        const response = await fetch('http://localhost:3000/deleteContact/' + id, {
            method: 'DELETE'
        });

        if(!response.ok) {
            showMessage("delete", "ERROR");
        }
        else {
            showMessage("delete", "OK");
            getAllContacts();
        }
    } catch(err) {
        console.log('Hola');
        console.log(err);
    }
}

if(addContactForm || editContactForm) {
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.assign('http://localhost:3000/')
    });
    if(addContactForm) {
        insertContact();
    }
    else if(editContactForm) {
        getContactById();
        editContact();
    }
}

if(contactTable) {
    localStorage.clear();
    getAllContacts();
}