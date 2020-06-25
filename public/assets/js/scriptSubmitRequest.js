
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
     .then(
        console.log("200")
     )
     .catch(
       console.log("500")
     )
}
