function convertJSONtoString(json){
    return JSON.stringify(json);
}

function convertStringtoJSON(string){
    return JSON.parse(string);
}


$(function(){
    let loginmodal = `
        <div id="myModal" class="Modal is-hidden is-visuallyHidden">
        <!-- Modal content -->
        <div class="Modal-content">
            <div class="modal-header">
                <span class="close" id="closeModal">&times;</span>
                <h2>Login</h2>
            </div>
            <div class="modal-body">
                <form id="login" method="get" action="#">    
                    <label><b>User Name</b></label>    
                    <input type="text" name="Uname" id="uname" class="uname" placeholder="Username">    
                    <br><br>    
                    <label><b>Password</b></label>    
                    <input type="Password" name="Pass" id="pass" class="pass" placeholder="Password">    
                    <br><br>    
                    <input type="button" name="log" id="log" class="log" value="Log In Here">       
                </form>   
            </div>
        </div>
      </div>
    `;

   

    htmlElements.login.click(() => displaymodal());
    let container = htmlElements.container[0];
    function displaymodal(){
        // Get the close button
        $('body').append(loginmodal);
        let modal = document.getElementById("myModal");
        let btnClose = document.getElementById("closeModal");
        let loginBtn = document.getElementById("log");
        modal.className = "Modal is-visuallyHidden";
        setTimeout(function() {
        container.className = "MainContainer is-blurred";
        modal.className = "Modal";
        }, 100);
        container.parentElement.className = "ModalOpen";
        modal.style.display = "block";

        //When the user clicks on login button.
        loginBtn.onclick = (e) => performLogin(e, modal);

        // Close the modal
        btnClose.onclick = () => closeModal(modal);

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            closeModal(modal);
        }
        }
        
    }

    function performLogin(e, modal){
        e.preventDefault();
        let uname = $("#uname").val().trim();
        let upass = $("#pass").val().trim();
        if(uname == "") {
            displayWarning("Email cannot be empty!");
            return;
        }
        if(upass == ""){
            displayWarning("Password cannot be empty!");
            return;
        }
        if(validateEmail(uname)){
            let response = checkUserDetails(uname, upass);
            if(response.result){
               displaySuccess("Login Successful!", modal);
               setCookie("userdetails", convertJSONtoString(response), 24);
            }
            else{
                displayFailed("Login Failed!");
            }
        }
        else
        {
            displayWarning("Please enter valid email!");
        }

    }
    
    function displaySuccess(text, modal){
        let successAlert = `
        <div id="alert-box" data-closable class="alert-box callout success">
             <span>${text}<span>
         </div>
         `;
         $('body').append(successAlert);
        setTimeout(() => {
            $("#alert-box").remove();
            closeModal(modal);
        }, 2000);
    }

    function displayFailed(text){
        let failedAlert = `
        <div id="alert-box" data-closable class="alert-box callout alert">
             <span>${text}<span>
         </div>
         `;
         $('body').append(failedAlert);
            setTimeout(() => {
            $("#alert-box").remove();
        }, 2000);

    }

    function displayWarning(text){
        let warningAlert = `
        <div id="alert-box" data-closable class="alert-box callout warning">
             <span>${text}<span>
         </div>
         `;
         $('body').append(warningAlert);
            setTimeout(() => {
            $("#alert-box").remove();
        }, 2000);
        $("#uname").focus();
    }

    function validateEmail(uname){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(uname);
    }


    function closeModal(modal){
            modal.remove();
            container.classList.remove("MainContainer");
            container.classList.remove("is-blurred");
            container.parentElement.classList.remove("ModalOpen");
    }

});

