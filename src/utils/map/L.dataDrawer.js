import Wkt from 'wicket/wicket-leaflet'
import { uuid } from "../dataUtils.js";


L.Control.DataDrawer = L.Control.extend({
  options: {
    position: 'topleft'
  },
  initialize: function (options) {
    L.Util.extend(this.options, options)
  },
  onAdd: function () {
    this._container = L.DomUtil.create('div')
    const a = L.DomUtil.create('div', 'leaflet-bar', this._container)
    a.id = 'wktDrawer'
    a.appendChild(this._genIcon())
    a.appendChild(this._genUtils())
    return this._container
  },
  _onClickControl: function () {
    const icon = document.getElementById('wktDrawerIcon')
    const utils = document.getElementById('wktDrawerUtils')
    icon.style.display = 'none'
    utils.style.display = 'block'
  },
  _resetControl: function () {
    const icon = document.getElementById('wktDrawerIcon')
    const utils = document.getElementById('wktDrawerUtils')
    icon.style.display = 'flex'
    utils.style.display = 'none'
  },
  _genUtils: function () {
    const dataDrawer = document.createElement('div')
    dataDrawer.id = 'wktDrawerUtils'
    dataDrawer.style.display = 'none'
    dataDrawer.style.padding = '10px'
    dataDrawer.style.background = 'white'
    dataDrawer.innerHTML = '<div id="wktDrawerDataList" style="border-bottom: 1px solid black;margin-bottom: 5px"></div><div>WKT/GeoJSON:</div>' +
      '<textarea id="wktDrawerWKTInput" rows="15" cols="50" style="border: 1px solid">' +
      '</textarea>'
    const buttonBox = document.createElement('div')
    buttonBox.style.textAlign = 'right'
    const cancelButton = document.createElement('button')
    cancelButton.style.padding = '5px 10px'
    cancelButton.style.background = 'lightgray'
    cancelButton.innerHTML = 'Cancel'
    cancelButton.onclick = this._resetControl
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
        this._map.options.dataLayers[uuid()] = {
          label: textarea.value.substr(0, 40) + '...',
          graph: data,
          raw: textarea.value
        }
        data.addTo(this._map)
        textarea.value = ''
        const dataListDom = document.getElementById('wktDrawerDataList')
        const dataList = this._map.options.dataLayers
        dataListDom.innerHTML = ''
        Object.keys(dataList).forEach(dataKey => {
          const data = dataList[dataKey]
          const item = document.createElement('div')
          const label = document.createElement('button')
          label.innerHTML = data.label
          label.onclick = () => {
            textarea.value = data.raw
          }
          const removeButton = document.createElement('button')
          removeButton.style.marginLeft = '15px'
          removeButton.innerHTML = '×'
          removeButton.onclick = () => {
            delete dataList[dataKey]
            dataListDom.removeChild(item)
            this._map.removeLayer(data.graph)
          }
          item.appendChild(label)
          item.appendChild(removeButton)
          dataListDom.appendChild(item)
        })
      } catch (e) {
        alert(e.message)
      }
    }
    buttonBox.appendChild(cancelButton)
    buttonBox.appendChild(drawButton)
    dataDrawer.appendChild(buttonBox)
    return dataDrawer
  },
  _genIcon: function () {
    const icon = document.createElement('a')
    icon.id = 'wktDrawerIcon'
    icon.style.display = 'flex'
    icon.style.alignItems = 'center'
    icon.style.justifyContent = 'center'
    icon.style.cursor = 'pointer'
    icon.title = 'Draw WKT'
    icon.innerHTML = '<svg t="1679301152122" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6684" width="20" height="20"><path d="M880.2 116.5L800 70.2c-22.1-12.8-50.5-5.2-63.3 16.9l-231.5 401c-12.8 22.1-5.2 50.5 16.9 63.3l80.2 46.3c22.1 12.8 50.5 5.2 63.3-16.9l231.5-401.1c12.9-22.1 5.3-50.4-16.9-63.2zM329 774.8c205.5 0 255.6-53.7 255.6-53.7 12.8-22.2 5.2-50.5-16.9-63.2L467.4 600c-22.1-12.8-50.5-5.2-63.3 17l-57.9 100.2c-12.7 22.1-47.6 57.6-17.2 57.6z m416.7 69.4H166.9c-25.6 0-46.3 20.7-46.3 46.3v23.2c0 25.6 20.7 46.3 46.3 46.3h578.8c25.6 0 46.3-20.7 46.3-46.3v-23.2c0-25.6-20.7-46.3-46.3-46.3z" fill="#040000" p-id="6685"></path></svg>'
    icon.onclick = this._onClickControl
    return icon
  }
})

export default function dataDrawer (options) {
  return new L.Control.DataDrawer(options)
}
