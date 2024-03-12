window.addEventListener('load', render);

async function render() {
  let data = await getJson('./task.json');
  let jsons = JSON.parse(data);
  console.log(jsons);

  let {playlist, songlist, mvlist} = jsons;

  renderPlayList(playlist);
  renderSongList(songlist);
  renderMvList(mvlist);

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
    });
    xhr.send();
  })
}

function renderPlayList(data) {
  let list = document.querySelectorAll('.play-list')[0];
  data.forEach((json, index) => {
    let {title, cover, listen_num} = json;
    let item = document.createElement('li');
    item.className = "play-item";
    let innerHTML = 
      `<div class="covers">
        <a href="#">
          <img src="${cover}" alt="" class="cover">
          <div class="cover-mask"></div>
          <img src="./imgs/cover_play.png" class="play-icon">
        </a>
      </div>
      <div class="title">
          ${title}
      </div>
      <div class="listen-num">
        播放量：${listen_num}
      </div> `;
    item.innerHTML = innerHTML;
    list.appendChild(item);
  });
}

function renderSongList(data) {
  let list = document.querySelectorAll('.song-list')[0];
  data.forEach((json, index) => {
    let {name, singer, interval, cover} = json;
    let item = document.createElement('li');
    item.className = "song-item";
    let innerHTML = `
    <div class="covers song-cover">
      <img src="${cover}" alt="" class="cover">
      <div class="cover-mask"></div>
      <img src="./imgs/cover_play.png" class="play-icon">
    </div>
    <div class="info">
      <div class="name">${name}</div>
      <div class="singer">${singer.join(" / ")}</div>
    </div>
    <div class="interval">${format(interval)}</div>
    `;
    item.innerHTML = innerHTML;
    list.appendChild(item);
  });
}

function renderMvList(data) {
  let list = document.querySelectorAll('.mv-list')[0];
  data.forEach((json, index) => {
    let {title, singer, listen_num, cover} = json;
    let item = document.createElement('li');
    item.className = "mv-item";
    let innerHTML = `
    <div class="covers">
      <img src="${cover}" alt="" class="cover">
      <div class="cover-mask"></div>
      <img src="./imgs/cover_play.png" alt="" class="play-icon">
    </div>
    <div class="title">${title}</div>
    <div class="singer">${singer}</div>
    <div class="listen-num">
      <img src="./imgs/watch.svg" alt="" class="watch-icon">
      ${listen_num}
    </div>
    `;
    item.innerHTML = innerHTML;
    list.appendChild(item);
  });
}

function format(interval) {
  if(interval > 3600) return "60:00";
  let minutes = parseInt(interval / 60);
  let seconds = parseInt(interval % 60);
  return ("00" + minutes).slice(-2) + ":" + ("00" + seconds).slice(-2);
}