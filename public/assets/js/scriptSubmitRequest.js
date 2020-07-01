
function submitRequest(){
   var topics = document.getElementById("topic");
   var v_name = document.getElementById("fullname").value;
   var v_email = document.getElementById("email").value;
   var v_issue = document.getElementById("issue").value;

   if(v_name != "" && v_email != "" && v_issue != ""){
    fetch("../../v1/contactUs", { 
        method: "post",
        headers: new Headers({
           "Content-Type": "application/json"
        }),
        body: JSON.stringify({
           name: v_name,
           email: v_email,
           topic: topics.options[topics.selectedIndex].text,
           issue: v_issue,
           privacy: document.getElementById("privacy").checked 
        })
     })
     .then(function(response) {
        document.getElementById("response").innerHTML = "Your message has been sent successfully. We will reply to your email address as soon as possible.";
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("issue").value = "";
        topics.selectedIndex = 0;
        document.getElementById("privacy").checked = false;
     })
   }
   else{
      document.getElementById("response").innerHTML = "You must fill in all the fields.";
   }
}
