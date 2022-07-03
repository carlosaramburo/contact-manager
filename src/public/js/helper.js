// Validation of telephone inputs to only allow numbers [0-9]
for(const textbox of document.getElementsByClassName('num')) {
    textbox.addEventListener('keypress', (event) => {
        let ch = String.fromCharCode(event.which);
        if(!/^[0-9]+$/.test(ch)) {
            event.preventDefault();
        }
    });

    // Preventing pasting on inputs
    textbox.onpaste = e => {
        e.preventDefault();
        return false;
    };

    // Preventing dragging and dropping on inputs
    textbox.ondragstart = e => {
        e.preventDefault();
        return false;
    }

    textbox.ondrop = e => {
        e.preventDefault();
        return false;
    }
}

const genderTransform = (gender) => {
    if(gender == 1) {
        return "Male";
    }
    else if (gender == 2) {
        return "Female";
    }
    else {
        return "N/A";
    }
}

const showMessage = (request, status) => {
    let divAlert = document.getElementById('requestAlert');

    if(document.getElementById('addContactForm')) {
        document.getElementById('addContactForm').reset();
    }

    let type = "";
    let message = "";

    switch(request) {
        case("getAllContacts"):
            switch(status) {
                case("ERROR"):
                    type = "danger";
                    message = "Couldn't get contact list."
                    break;
            }
            break;
        case("add"):
            switch(status) {
                case("OK"):
                    type = "success";
                    message = "Contact successfully added."
                    break;
                case("ERROR"): 
                    type = "danger";
                    message = "Couldn't add contact."
                    break;
            }
            break;
        case("getContactbyId"):
            switch(status) {
                case("OK"):
                    type = "success";
                    message = "Couldn't retrieve contact data."
                    break;
            }
            break;
        case("edit"):
            switch(status) {
                case("OK"):
                    type = "success";
                    message = "Contact successfully updated."
                    break;
                case("ERROR"): 
                    type = "danger";
                    message = "Couldn't update contact data."
                    break;
            }
            break;
        case("delete"):
            switch(status) {
                case("OK"):
                    type = "success";
                    message = "Contact successfully deleted."
                    break;
                case("ERROR"): 
                    type = "danger";
                    message = "Couldn't delete contact."
                    break;
            }
            break;
    }

    divAlert.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
    `;
}

const fillEditForm = (contact) => {
    document.getElementById('name').value = contact.name;
    document.getElementById('address').value = contact.address;
    document.getElementById('phoneNumber').value = contact.phoneNumber;

    if(contact.gender == 1)
        document.getElementById("male").checked = true;
    else if(contact.gender == 2) {
        document.getElementById("female").checked = true;
    }
    else if(contact.gender == 3)
        document.getElementById("n/a").checked = true;
}