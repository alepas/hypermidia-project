fetch("../v1/faq")
.then(function(response) {
    if (!response.ok) 
        throw new Error("HTTP error, status = " + response.status);
    return response.json();
})
.then(function(json) {
    for (var i = 1; i < json.length + 1; i++) {
        let {answer, question} = json[i-1];

        document.getElementById("button" + i).innerHTML =  `${question}`;
        document.getElementById("answer_" + i).innerHTML =  `${answer}`;
    }
});