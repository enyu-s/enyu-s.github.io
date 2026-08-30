(() => {
  const wall = document.querySelector('#shuoshuo-list')
  if (!wall) return

  const renderEmpty = text => {
    wall.className = 'shuoshuo-empty'
    wall.textContent = text
  }

  fetch('/shuoshuo/data.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('load failed')
      return response.json()
    })
    .then(items => {
      if (!Array.isArray(items) || items.length === 0) {
        renderEmpty('暂无动态')
        return
      }

      wall.className = 'shuoshuo-wall'
      const fragment = document.createDocumentFragment()
      items.forEach(item => {
        if (!item || (!item.content && !item.image)) return

        const article = document.createElement('article')
        article.className = 'shuoshuo-item'

        if (item.date) {
          const time = document.createElement('time')
          time.className = 'shuoshuo-time'
          time.dateTime = item.date
          time.textContent = item.date
          article.appendChild(time)
        }

        if (item.content) {
          const content = document.createElement('p')
          content.className = 'shuoshuo-content'
          content.textContent = item.content
          article.appendChild(content)
        }

        if (item.image) {
          const image = document.createElement('img')
          image.className = 'shuoshuo-image no-lightbox'
          image.src = item.image
          image.alt = item.alt || ''
          image.loading = 'lazy'
          article.appendChild(image)
        }

        fragment.appendChild(article)
      })

      wall.replaceChildren(fragment)
      if (!wall.children.length) renderEmpty('暂无动态')
    })
    .catch(() => renderEmpty('动态加载失败'))
})()
