const c = document.querySelector('.pagination')
const indexs = Array.from(document.querySelectorAll('.index'))
let cur = -1
indexs.forEach((index, i) => {
  index.addEventListener('click', (e) => {
    // clear
    c.className = 'pagination'
    void c.offsetWidth; // Reflow
    c.classList.add('open')
    c.classList.add(`i${i + 1}`)
    if (cur > i) {
      c.classList.add('flip')
    }
    cur = i

    var offset = index.innerHTML * 12;
    console.log(offset);
    console.log(index.innerHTML);

    fetch("../../v1/services?limit=12&offset=" + offset)
    .then(function(response) {
    if (!response.ok) 
        throw new Error("HTTP error, status = " + response.status);
    return response.json();
    })

    .then(function(json) {
      for (var i = 0; i < 12; i++) {
        document.getElementById("service_" + i).style.display = "none";
      }
      for (var i = 0; i < json.length; i++) {
          let {title, photo, id_service} = json[i];

          document.getElementById("service_desc_" + i).innerHTML =  `${title}`;
          document.getElementById("service_" + i).style.display = "block";
          document.getElementById("service_img_" + i).src = `${photo}`;
          document.getElementById("service_link_" + i).onclick = function() 
              {localStorage["id_service"] = `${id_service}`;};
      }
  });
  })
})