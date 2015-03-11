window.onload = function() {
    function nameValidation() {
        var firstName = document.getElementById("first_name");
        var lastName = document.getElementById("last_name");
        var phoneNumber = document.getElementById("phone_number");
        var submitButton = document.getElementById("submit-button");

        var isFirstNameValid = false;
        var isLastNameValid = false;

        if (firstName.value.length < 3) {
            firstName.style.color = "#aaa";
        }
        else if (firstName.value.length < 15) {
            firstName.style.color = "#87cefa";
            isFirstNameValid = true;
        }
        else {
            firstName.style.color = "#ff6a69";
        }

        if (lastName.value.length < 3) {
            lastName.style.color = "#aaa";
        }
        else if (lastName.value.length < 15) {
            lastName.style.color = "#87cefa";
            isLastNameValid = true;
        }
        else {
            lastName.style.color = "#ff6a69";
        }

        var isPhoneValid = phoneValidation(phoneNumber);

        if (isPhoneValid && isFirstNameValid && isLastNameValid) {
            submitButton.removeAttribute("class", "invalid-submit");
            submitButton.setAttribute("class", "valid-submit");            
            submitButton.disabled = false;
        }
        else {
            submitButton.removeAttribute("class", "valid-submit");
            submitButton.setAttribute("class", "invalid-submit");
            submitButton.disabled = true;
        }


    }

    function phoneValidation(phoneInput) {

        var cleanedInput = phoneInput.value.toString().replace(/\D+/g, "").replace(/^[01]/, "");
        var isValid = false;

        if (cleanedInput.length < 10) {
            phoneInput.style.color = "#aaa";
        }
        else if (cleanedInput.length === 10) {
            phoneInput.style.color = "#87cefa";
            isValid = true;
        }
        else {
            phoneInput.style.color = "#ff6a69";
        }

        return isValid;
    }

    window.setInterval(nameValidation, 100);

}
