class User extends Ui {
    formVerification(form) {
        // get dom elements for form validation
        var nom = document.getElementById('surname');
        var prenom = document.getElementById('name');
        var email = document.getElementById('email');
        var adresse = document.getElementById('address');
        var ville = document.getElementById('city');

        var errors = 0;
        var form = {
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value
        };

        // Check lastName
        if(form.lastName !== null && form.lastName.length > 2) {
            var letters = /^[A-Za-z]+$/;
            //Verifie si il y a que des lettres dans le nom
            if(form.lastName.match(letters)) { 
                this.styleSuccess(nom);
            } else {
                this.styleError(nom);
                errors++;
            }
        } else {
            this.styleError(nom);
            errors++;
        }

        // Check Name
        if(form.firstName !== null && form.firstName.length > 2) {
            var letters = /^[A-Za-z]+$/;
            //Verifie si il y a que des lettres dans le prenom
            if(form.firstName.match(letters)) { 
                this.styleSuccess(prenom);
            } else {
                this.styleError(prenom);
                errors++;
            }
        } else {
            this.styleError(prenom);
            errors++;
        }

        // Check Email
        if(form.email !== null && this.validateEmail(form.email)) {
            this.styleSuccess(email);
        } else {
            this.styleError(email);
            errors++;
        }

        // Check Address
        if(form.address !== null && form.address.length > 8) {
            var regex = /^\d+\s[A-z]+\s[A-z]+/;
            //Verifie si c'est une adresse
            if(form.address.match(regex)) { 
                this.styleSuccess(adresse);
            } else {
                this.styleError(adresse);
                errors++;
            }
        } else {
            this.styleError(adresse);
            errors++;
        }

        // Check City
        if(form.city !== null && form.city.length > 2) {
            var letters = /^[A-Za-z]+$/;
            //Verifie si il y a que des lettres dans la ville
            if(form.city.match(letters)) { 
                this.styleSuccess(ville);
            } else {
                this.styleError(ville);
                errors++;
            }
        } else {
            this.styleError(ville);
            errors++;
        }

        // Show error message || post request 
        if(errors !== 0) {
            this.showErrorForm();
            return null;
        }

        return form;
    }

    validateEmail(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
}