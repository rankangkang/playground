window.addEventListener('load', render)

function render() {
  let { topCollections, bottomCollections } = data
  let grids = document.querySelectorAll('.collections')[0]

  topCollections.forEach((collection, index) => {
    if (index > 2) return
    let { avatar, nickname } = collection.User
    let { bgcolor, icons } = collection
    console.log({ avatar, nickname, bgcolor, icons })
    let item = document.createElement('div')
    item.className = 'collection-item'
    item.style.background = bgcolor
    let iconsStr = ''
    icons.forEach((icon, idx) => {
      if (index < 15) iconsStr += icon.show_svg + '\n'
    })
    let innerHtml = `
    <div class="avatar">
      <div class="avatar-mask">
        <img src="${avatar}" alt="avatar">
      </div>
    </div>
    <div class="nickname">${nickname}</div>
    <div class="icons top-collections">
      ${iconsStr}
    </div>
    `

    item.innerHTML = innerHtml
    grids.append(item)
  })

  bottomCollections.forEach((collection, index) => {
    if (index > 2) return
    let { avatar, nickname } = collection.User
    let { bgcolor, icons } = collection
    console.log({ avatar, nickname, bgcolor, icons })
    let item = document.createElement('div')
    item.className = 'collection-item'
    item.style.background = bgcolor

    let iconsStr = ''
    icons.forEach((icon, idx) => {
      if (index > 6) return
      let li = `
        <div class="icon-png">
          <img src="${icon.file}" alt="${icon.name}">
        </div>
      `
      iconsStr += li + '\r'
    })

    let innerHtml = `
    <div class="avatar">
      <div class="avatar-mask">
        <img src="${avatar}" alt="avatar">
      </div>
    </div>
    <div class="nickname">${nickname}</div>
    <div class="icons bottom-collections">
      ${iconsStr}
    </div>
    `

    item.innerHTML = innerHtml
    grids.append(item)
  })
}
