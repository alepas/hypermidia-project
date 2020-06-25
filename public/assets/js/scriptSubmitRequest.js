
function submitRequest(){
    document.getElementById("alert_message").innerHTML = "";
    fetch("../../v1/contactUs", { 
        method: "post",
        headers: new Headers({
           "Content-Type": "application/json"
        }),
        body: JSON.stringify({
           name: document.getElementById("fullname").value,
           email: document.getElementById("email").value,
           topic: document.getElementById("topic").value,
           issue: document.getElementById("issue").value,
           privacy: document.getElementById("privacy").value
        })
     })
     .then(
        document.getElementById("alert_message").innerHTML = "Your request has been correctly submitted. You will receive an answer soon!"
     )
     .catch(
        document.getElementById("alert_message").innerHTML = "Sorry, an error occured. Try to submit your message later."
     )
}
