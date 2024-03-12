window.addEventListener('load', renderList);
async function renderList() {
  let jsons = JSON.parse(await getJson("./task.json"));
  console.log(jsons);
  let list = document.querySelectorAll('.list')[0];
  jsons.forEach((json, index) => {
    let {cover, avatar, name, badge, likes, views} = json;
    let item = document.createElement('li');
    item.className = "list-item";
    let innerHTML = `
    <div class="cover">
      <img src="${cover}" alt="">
    </div>
    <div class="info">
      <div class="avatar">
        <img src="${avatar}" alt="">
      </div>
      <div class="name">${name}</div>
      <div class="popularity">
        <div class="like">
          <img src="./imgs/icon-like.svg" alt="">
          ${likes}
        </div>
        <div class="view">
          <img src="./imgs/icon-view.svg" alt="">
          ${views}
        </div>
      </div>
    </div>
    `;
    item.innerHTML = innerHTML;
    list.appendChild(item);
  });
}

function getJson(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.status >= 200 && xhr.status < 300) {
          try {
            let response = xhr.response;
            resolve(response);
          } catch(e) {
            reject(e);
          }
        }
        else {
          reject(new Error('request failed for ' + xhr.statusText))
        }
      }
    });
    xhr.send();
  })
}

window.addEventListener("load", function() {
  let navBtn = document.querySelector(".nav-btn");
  let navBack = document.querySelector(".nav-back-btn");
  let menu = document.querySelector(".task-menu");
  navBtn.addEventListener("click", () => {
    menu.style.display = "block";
    navBack.style.display = "block";
    navBtn.style.display = "none";
  });
  navBack.addEventListener("click", () => {
    menu.style.display = "none";
    navBtn.style.display = "block";
    navBack.style.display = "none";
  })
});

