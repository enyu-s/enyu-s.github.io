(() => {
  const quotes = [
    ['知者不惑，仁者不忧，勇者不惧。', '《论语》'],
    ['千里之行，始于足下。', '《道德经》'],
    ['路漫漫其修远兮，吾将上下而求索。', '屈原'],
    ['纸上得来终觉浅，绝知此事要躬行。', '陆游'],
    ['长风破浪会有时，直挂云帆济沧海。', '李白'],
    ['山重水复疑无路，柳暗花明又一村。', '陆游'],
    ['海内存知己，天涯若比邻。', '王勃']
  ]

  const render = () => {
    const target = document.querySelector('.daily-quote')
    if (!target) return

    const now = new Date()
    const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000)
    const [text, source] = quotes[day % quotes.length]
    target.innerHTML = `<span class="daily-quote-text">“${text}”</span><cite>${source}</cite>`
  }

  render()
  document.addEventListener('pjax:complete', render)
})()
