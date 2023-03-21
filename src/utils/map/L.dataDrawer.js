import Wkt from 'wicket/wicket-leaflet'
import { uuid } from "../dataUtils.js"


L.Control.DataDrawer = L.Control.extend({
  options: {
    position: 'topright'
  },
  initialize: function (options) {
    L.Util.extend(this.options, options)
  },
  onAdd: function () {
    this._container = L.DomUtil.create('div')
    const a = L.DomUtil.create('div', 'leaflet-bar', this._container)
    a.id = 'wktDrawer'
    a.appendChild(this._genUtils())
    return this._container
  },
  _genUtils: function () {
    const dataDrawer = document.createElement('div')
    dataDrawer.id = 'wktDrawerUtils'
    dataDrawer.style.padding = '10px'
    dataDrawer.style.background = 'white'
    dataDrawer.innerHTML = '<div id="wktDrawerDataList" style="border-bottom: 1px solid black;margin-bottom: 5px"></div><div>WKT/GeoJSON:</div>' +
      '<textarea id="wktDrawerWKTInput" rows="15" cols="50" style="border: 1px solid">' +
      '</textarea>'
    const buttonBox = document.createElement('div')
    buttonBox.style.textAlign = 'right'
    const drawButton = document.createElement('button')
    drawButton.style.padding = '5px 10px'
    drawButton.style.background = 'lightgray'
    drawButton.style.marginLeft = '5px'
    drawButton.innerHTML = 'Draw'
    drawButton.onclick = () => {
      const textarea = document.getElementById('wktDrawerWKTInput')
      const wkt = new Wkt.Wkt()
      try {
        if (!this._map.options.dataLayers) {
          this._map.options.dataLayers = {}
        }
        wkt.read(textarea.value.replace(/([ ,]-?)(\.\d+)/gi, '$10$2'))
        const data = wkt.toObject()
        data.on('pm:update', (e) => {
          try {
            const wktStr = wkt.fromObject(e.layer).write()
            this._map.options.dataLayers[e.layer.options.id] = {
              label: wktStr.substr(0, 40) + '...',
              graph: e.layer,
              raw: wktStr
            }
            this.refreshDataList(this._map)
          } catch (exception) {
            const wktStr = `CIRCLE [${e.layer._latlng.lat}, ${e.layer._latlng.lng}] ${e.layer._radius}`
            this._map.options.dataLayers[e.layer.options.id] = {
              label: wktStr.substr(0, 40) + '...',
              graph: e.layer,
              raw: wktStr
            }
            this.refreshDataList(this._map)
          }
        })
        const id = uuid()
        data.options.id = id
        this._map.options.dataLayers[id] = {
          label: textarea.value.substr(0, 40) + '...',
          graph: data,
          raw: textarea.value
        }
        data.addTo(this._map)
        textarea.value = ''
        this.refreshDataList(this._map)
      } catch (e) {
        alert(e.message)
      }
    }
    buttonBox.appendChild(drawButton)
    dataDrawer.appendChild(buttonBox)
    return dataDrawer
  },
  refreshDataList: function (map) {
    const textarea = document.getElementById('wktDrawerWKTInput')
    const dataListDom = document.getElementById('wktDrawerDataList')
    const dataList = map.options.dataLayers
    dataListDom.innerHTML = ''
    Object.keys(dataList).forEach(dataKey => {
      const data = dataList[dataKey]
      const item = document.createElement('div')
      const label = document.createElement('button')
      label.innerHTML = '· ' + data.label
      label.onclick = () => {
        textarea.value = data.raw
      }
      const removeButton = document.createElement('button')
      removeButton.style.marginLeft = '15px'
      removeButton.innerHTML = '×'
      removeButton.onclick = () => {
        delete dataList[dataKey]
        dataListDom.removeChild(item)
        map.removeLayer(data.graph)
      }
      item.appendChild(label)
      item.appendChild(removeButton)
      dataListDom.appendChild(item)
    })
  }
})

export default function dataDrawer (options) {
  return new L.Control.DataDrawer(options)
}
