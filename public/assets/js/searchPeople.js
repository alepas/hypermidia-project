var people = [];

function savePeople(person){
    people.push(person.toLowerCase());
}

function filterPeople(){
    for(var i=0; i<8; i++){
        document.getElementById("person_" + i).style.display = "none";
    }

    var filter = document.getElementById("filter").value.toLowerCase();

    for(var i=0; i< people.length; i++){
        if(people[i].includes(filter))
            document.getElementById("person_" + i).style.display = "block";
    }

}