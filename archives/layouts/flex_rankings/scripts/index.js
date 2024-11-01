const jsons = [
  {
    title:
      '在中国，这种实木被低估了！橡木榉木黑胡桃樱桃木优缺点解读！6种仿品真假辨别！10款实木家具分析！',
    banner: 'imgs/banner-1.jpg',
    comments: 95,
    likes: 110,
  },
  {
    title: '时隔3年！微信Call kit回来了，网友：真香啊！',
    banner: 'imgs/banner-2.jpg',
    comments: 297,
    likes: 132,
  },
  {
    title: '618你还在犹豫？东芝厨房电器，一劳永逸的好选择！',
    banner: 'imgs/banner-3.jpg',
    comments: 52,
    likes: 56,
  },
  {
    title: '618必入的4款多功能家电推荐，从此不再担心房子小！',
    banner: 'imgs/banner-4.jpg',
    comments: 150,
    likes: 95,
  },
  {
    title: '618想买洗地机？三款热门洗地机横评，看完再决定',
    banner: 'imgs/banner-5.jpg',
    comments: 79,
    likes: 37,
  },
]

window.onload = function () {
  // let xhr = new XMLHttpRequest();
  let list = document.querySelectorAll('.article-list')[0]
  jsons.forEach((json, index) => {
    let item = document.createElement('div')
    item.className = 'article-item'
    let { title, banner, comments, likes } = json
    let innerHtml = `
    <div class="item-header">
      <img src="imgs/rank-top${index + 1}.png" alt="" class="item-rank">
      <img src="${banner}" alt="" class="item-cover">
      </div>
      <div class="item-title">
        ${title}
      </div>
      <div class="item-footer">
        <div class="item-comments">
          <img src="./imgs/comments.svg" class="item-comments-icon">
          <span class="comments-likes-num">${comments}</span>
        </div>
        <div class="item-likes">
          <img src="./imgs/likes.svg" class="item-likes-icon">
          <span class="comments-likes-num">${likes}</span>
        </div>
      </div>
    </div>
    `
    item.innerHTML = innerHtml
    list.appendChild(item)
  })
}
