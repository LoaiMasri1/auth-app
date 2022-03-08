let Password = document.getElementById("Password");
        let ConfirmPassword = document.getElementById("ConfirmPassword");
        let passwordlHelp = document.getElementById("passwordlHelp");
        let ConfirmpasswordlHelp = document.getElementById("ConfirmpasswordlHelp");
        let SubmitBtn = document.getElementById("SubmitBtn");
        let typingTimer;
        let doneTypingInterval = 1300;  
        SubmitBtn.addEventListener('click', Main);
        Password.addEventListener('keyup', PasswordCheck);
        ConfirmPassword.addEventListener('keyup', test) 
         function PasswordCheck() {
            if (Password.value.length < 8) {
                passwordlHelp.innerHTML = "Password is less than 8 characters";
                passwordlHelp.style.color = "red";
                return false
            }
            if (Password.value.length > 20) {
                passwordlHelp.innerHTML = "Password more than 20 characters";
                passwordlHelp.style.color = "red";
                return false
            }
            if (checkPassword(Password.value)) {
                passwordlHelp.innerHTML = "The password is valid";
                passwordlHelp.style.color = "green";
            } else {
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
            } else {
                ConfirmpasswordlHelp.innerHTML = "The two password don't match";
                ConfirmpasswordlHelp.style.color = "red";
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
            PasswordCheck();
            ConfirmPasswordCheck();
        }