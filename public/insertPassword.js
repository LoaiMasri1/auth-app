const password= document.getElementById('Password');
const confirmPassword= document.getElementById('ConfirmPassword');

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const TIME_DELAY = 500;

let passwordTimeout;


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

function validateAll() {
    if (PASSWORD_REGEX.test(password.value) && password.value.length >= 8) {
        SubmitBtn.disabled = false;
    } else {
        SubmitBtn.disabled = true;
    }
}

// on input change
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);


// on blur
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

// on submit
document.getElementById("SubmitBtn").addEventListener("click", () => {
    validateAll();
});