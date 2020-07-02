function showAnswer(id){
    var answer = document.getElementById("answer"+id);
    var button = document.getElementById("button"+id);
    if(answer.style.display == "block"){
        answer.style.display="none";
        button.style.color="green";
        button.style.backgroundColor="white";
        button.style.borderColor="green";
    }else{
        answer.style.display="block";
        button.style.color="white";
        button.style.backgroundColor="green";
        button.style.borderColor="green";
        
    }

}