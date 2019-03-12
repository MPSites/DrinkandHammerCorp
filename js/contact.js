window.onload = function() {
    document.getElementById("confirm").addEventListener("click", function() {

        var uredu = true;

        var data = {
                name:"",
                contact:"",
                msg:""
            };

        var ime = document.querySelector("#name").value.trim();
        var email = document.querySelector("#email").value.trim();
        var message = document.querySelector("#msg").value;
        
        var imeError = document.querySelector("#errorName");
        var emailError = document.querySelector("#errorEmail");
        var messageError = document.querySelector("#errorMsg");

        var reIme = /^[\w\s]{5,}$/;
        var reEmail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
 
        if(ime == "") {
           imeError.innerHTML = "Forgot something?";
           uredu = false;
        } else if(!reIme.test(ime)) {
            imeError.innerHTML = "Wrong name format";
            uredu = false;
        } else {
            data.name=ime;
            imeError.innerHTML = "";   
        }

        if(email == "") {
            emailError.innerHTML = "Forgot something?"; 
            uredu = false;  
         } else if(!reEmail.test(email)) {
             emailError.innerHTML = "Wrong Contact";
             uredu = false;
            } else {
             data.contact=email;
             emailError.innerHTML = "";   
         }

        if(message == "") {
            messageError.innerHTML = "Forgot something?"; 
            uredu = false;  
        }  else {
             data.msg=message;
             messageError.innerHTML = "";   
        }
        console.log(data)
         
        if(uredu) {
            var output = `<h3>Welcome</h3>
                         <span>Name:</span><span class="output">${data.name}</span><br/>
                                <span>Contact:</span><span class="output">${data.contact}</span><br/>
                                <span>Message:</span>
                                    <p>${data.msg}</p>;`
            document.querySelector('.customer-info').innerHTML = output;
        }
		
		
    });
	
}