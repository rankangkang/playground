window.addEventListener('load', rendering);

function get() {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './books.json', true);
    xhr.setRequestHeader('Content-Type', 'text/json');
    xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.status >= 200 && xhr.status < 300) {
          try {
            let response = xhr.response;
            console.log(typeof response)
            resolve(response);
          } catch(e) {
            reject(e);
          }
        }
        else {
          reject(new Error('request failed for ' + xhr.statusText))
        }
      }
    }
    xhr.send();
  });
}

async function rendering() {
  // promise 写法
  // get().then(res => {
  //   console.log(res);
  // }).catch(rej => {
  //   console.log(rej);
  // })
  let res = await get();
  console.log(res);
  let jsons = JSON.parse(res);

  let list = document.querySelectorAll(".book-list")[0];
  jsons.forEach((json, index) => {
    let item = document.createElement('li');
    item.className = "book-item";
    let {title, author, rating, readingCount, cover, tag} = json;
    let tagPath;
    if(tag=="好评如潮") {
      tagPath = "./imgs/hprc.svg";
    }
    else if(tag=="脍炙人口") {
      tagPath = "./imgs/kzrk.svg";
    }
    else if(tag == "值得一读") {
      tagPath = "./imgs/zdyd.svg";
    }
    else {
      tagPath = "";
    }

    let innerHtml = `
      <div class="book-rank">${index + 1}</div>
      <div class="book-cover">
        <img src="${cover}" alt="封面" class="cover-img">
      </div>
      <div class="book-info">
        <div class="book-title">
          ${title}
        </div>
        <div class="author">
          ${author}
        </div>
        <div class="popularity">
          <div class="rating">推荐值 ${rating}% </div>
          ${tagPath == "" ? "" : '<img src="' + tagPath + '" alt="'+ tag +'" class="tag-img"></img>'}
        </div>
      </div>
      <div class="reading-count">
        <img src="./imgs/people.svg" alt="阅读数" class="count-img">
        <span class="count">${readingCount}</span>
      </div>
    `;
    item.innerHTML = innerHtml;
    list.appendChild(item);
  });
}

