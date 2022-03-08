const email= document.getElementById('Email');
const password= document.getElementById('Password');
const confirmPassword= document.getElementById('ConfirmPassword');
const age = document.getElementById("Age");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const AGE_REGEX = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/;
const TIME_DELAY = 500;

let emailTimeout;
let passwordTimeout;
let ageTimeout;

function validateEmail() {
    if (EMAIL_REGEX.test(email.value)) {
        clearTimeout(emailTimeout);
        emailTimeout = setTimeout(() => {
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            SubmitBtn.disabled = false;
        }, TIME_DELAY);
    } else {
        clearTimeout(emailTimeout);
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
        SubmitBtn.disabled = true;
    }
}



function validatePassword() {
    if (PASSWORD_REGEX.test(password.value) && password.value.length >= 8) {
        clearTimeout(passwordTimeout);
        passwordTimeout = setTimeout(() => {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
            SubmitBtn.disabled = false;
        }, TIME_DELAY);
    } else {
        clearTimeout(passwordTimeout);
        password.classList.remove("is-valid");
        password.classList.add("is-invalid");
        SubmitBtn.disabled = true;
    }
}

function validateConfirmPassword() {
    if (password.value == confirmPassword.value && confirmPassword.value.length >= 8) {
        clearTimeout(passwordTimeout);
        confirmPassword.classList.remove("is-invalid");
        confirmPassword.classList.add("is-valid");
        SubmitBtn.disabled = false;
    } else {
        clearTimeout(passwordTimeout);
        confirmPassword.classList.remove("is-valid");
        confirmPassword.classList.add("is-invalid");
        SubmitBtn.disabled = true;
    }
}

function validateAge() {
    if (AGE_REGEX.test(age.value)) {
        clearTimeout(ageTimeout);
        ageTimeout = setTimeout(() => {
            age.classList.remove("is-invalid");
            age.classList.add("is-valid");
            SubmitBtn.disabled = false;
        }, TIME_DELAY);
    } else {
        clearTimeout(ageTimeout);
        age.classList.remove("is-valid");
        age.classList.add("is-invalid");
        SubmitBtn.disabled = true;
    }
}

function validateAll() {
    if (EMAIL_REGEX.test(email.value) &&PASSWORD_REGEX.test(password.value) && AGE_REGEX.test(age.value) && password.value.length >= 8 && age.value.length >= 1) {
        SubmitBtn.disabled = false;
    } else {
        SubmitBtn.disabled = true;
    }
}

// on input change
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
age.addEventListener("input", validateAge);
email.addEventListener("input", validateEmail);


// on blur
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);
age.addEventListener("blur", validateAge);
email.addEventListener("blur", validateEmail);
// on submit
document.getElementById("SubmitBtn").addEventListener("click", () => {
    validateAll();
});