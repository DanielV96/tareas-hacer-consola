const { v4: uiidv4 } = require('uuid')

class Tarea {
  id = ''
  desc = ''
  completadoEn = null

  constructor(desc) {
    this.id = uiidv4()
    this.desc = desc
    this.completadoEn = null //Aplicando libreria
  }
}

module.exports = Tarea
