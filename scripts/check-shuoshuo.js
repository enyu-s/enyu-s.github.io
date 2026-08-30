const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const data = JSON.parse(fs.readFileSync(path.join(root, 'shuoshuo/data.json'), 'utf8'))

if (!Array.isArray(data)) throw new Error('shuoshuo/data.json must contain an array')

data.forEach((item, index) => {
  if (!item || typeof item !== 'object') throw new Error(`item ${index} must be an object`)
  if (item.date != null && typeof item.date !== 'string') throw new Error(`item ${index}.date must be text`)
  if (item.content != null && typeof item.content !== 'string') throw new Error(`item ${index}.content must be text`)
  if (item.image != null && typeof item.image !== 'string') throw new Error(`item ${index}.image must be text`)
  if (!item.content && !item.image) throw new Error(`item ${index} needs content or image`)
})

const page = fs.readFileSync(path.join(root, 'shuoshuo/index.html'), 'utf8')
for (const asset of ['/css/shuoshuo.css', '/js/shuoshuo.js', 'id="shuoshuo-list"']) {
  if (!page.includes(asset)) throw new Error(`shuoshuo page is missing ${asset}`)
}

console.log(`shuoshuo check passed (${data.length} posts)`)
