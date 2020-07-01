
function submitRequest(){
    var topics = document.getElementById("topic");
    fetch("../../v1/contactUs", { 
        method: "post",
        headers: new Headers({
           "Content-Type": "application/json"
        }),
        body: JSON.stringify({
           name: document.getElementById("fullname").value,
           email: document.getElementById("email").value,
           topic: topics.options[topics.selectedIndex].text,
           issue: document.getElementById("issue").value,
           privacy: document.getElementById("privacy").checked 
        })
     })
     .then(function(response) {
        document.getElementById("response").innerHTML = "Your message has been sent successfully. We will reply to your email address as soon as possible.";
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("issue").value = "";
        topics.options[0].checked = true;
        document.getElementById("privacy").checked = false;
     })
}
