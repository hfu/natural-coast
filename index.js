const fs = require('fs')
const es = require('event-stream')

const modify = f => {
  if (f.properties.featurecla === 'Null island') return null
  f.tippecanoe = {
    layer: f.properties.featurecla,
    minzoom: f.properties.min_zoom,
    maxzoom: 10
  }
  return f
}

for (const path of fs.readdirSync('src')
  .filter(f => f.endsWith('.ndjson'))) {
  const s = fs.createReadStream(`src/${path}`)
  .on('error', err => {
    console.error(err)
    s.resume()
  })
  .on('end', () => {
  })
  .pipe(es.split())
  .pipe(es.mapSync(line => {
    s.pause()
    if (line.length !== 0) {
      let f = modify(JSON.parse(line))
      if (f) console.log(JSON.stringify(f))
    }
    s.resume()
  }))
}
