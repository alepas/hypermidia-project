
function submitRequest(){
    var topics = document.getElementById("topic");

    console.log("name " + document.getElementById("fullname").value);
    console.log("e mail " + document.getElementById("email").value);
    console.log("option " + topics.options[topics.selectedIndex].text);
    console.log("issue " + document.getElementById("issue").value);

    document.getElementById("alert_message").innerHTML = "";
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
     .then(
        document.getElementById("alert_message").innerHTML = "Your request has been correctly submitted. You will receive an answer soon!"
     )
     .catch(
        document.getElementById("alert_message").innerHTML = "Sorry, an error occured. Try to submit your message later."
     )
}
