let Age = document.getElementById("Age");
        let Password = document.getElementById("Password");
        let ConfirmPassword = document.getElementById("ConfirmPassword");
        let ConfirmAge = document.getElementById("ConfirmAge");
        let passwordlHelp = document.getElementById("passwordlHelp");
        let ConfirmpasswordlHelp = document.getElementById("ConfirmpasswordlHelp");
        let SubmitBtn = document.getElementById("SubmitBtn");
        let typingTimer;
        let doneTypingInterval = 1300;  
        SubmitBtn.addEventListener('click', Main);
        Password.addEventListener('keyup', PasswordCheck);
        ConfirmPassword.addEventListener('keyup', test) 
        function AgeCheck() {
            if (Age.value >= 18) {
                ConfirmAge.innerHTML = "Age must be over 18 years old";
                ConfirmAge.style.color = "green";
                SubmitBtn.disabled = false;
            } else {
                ConfirmAge.innerHTML = "You are less than 18 years old, the operation cannot be completed";
                ConfirmAge.style.color = "red";
                SubmitBtn.disabled = true;

            }
        }
        function PasswordCheck() {
            if (Password.value.length < 8) {
                passwordlHelp.innerHTML = "Password is less than 8 characters";
                passwordlHelp.style.color = "red";
                SubmitBtn.disabled = true;
                return false
            }
            if (Password.value.length > 20) {
                passwordlHelp.innerHTML = "Password more than 20 characters";
                passwordlHelp.style.color = "red";
                SubmitBtn.disabled = true;
                return false
            }
            if (checkPassword(Password.value)) {

                passwordlHelp.innerHTML = "The password is valid";
                passwordlHelp.style.color = "green";
                SubmitBtn.disabled = false;

            } else {
                SubmitBtn.disabled = true;
                passwordlHelp.innerHTML = "The password is not valid";
                passwordlHelp.style.color = "red";
            }
        }

        function checkPassword(str) {
            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
            return re.test(str);
        }
        function ConfirmPasswordCheck() {
            if (Password.value == ConfirmPassword.value && Password.value != "" && ConfirmPassword.value != "") {
                ConfirmpasswordlHelp.innerHTML = "The two password match";
                ConfirmpasswordlHelp.style.color = "green";
                SubmitBtn.disabled = false;
            } else {
                ConfirmpasswordlHelp.innerHTML = "The two password don't match";
                ConfirmpasswordlHelp.style.color = "red";
                SubmitBtn.disabled = true;
            }
        }
        function test(){
            clearTimeout(typingTimer);
            if (ConfirmPassword.value) {
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            }
        }
        function doneTyping() {
            ConfirmPasswordCheck();
        }
        function Main() {
            AgeCheck();
            PasswordCheck();
            ConfirmPasswordCheck();
        }