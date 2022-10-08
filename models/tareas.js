const Tarea = require('./tarea')
const colors = require('colors')

class Tareas {
  _listado = {}

  constructor() {
    this._listado = {}
  }

  get getListadoArray() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  cargarTareasFromArray(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompleto() {
    this.getListadoArray.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green
      const { desc, completadoEn } = tarea
      const estado = completadoEn ? 'completado'.green : 'pendiente'.red

      console.log(`${idx} ${desc}:: ${estado}`)
    })
  }

  listarPendientesCompletadas(completadas = true) {
    let contador = 0
    this.getListadoArray.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea
      const estado = completadoEn ? 'completado'.green : 'pendiente'.red

      if (completadas && estado === 'completado'.green) {
        contador++
        console.log(`${(contador + '.').green} ${desc}:: ${completadoEn}`)
      }

      if (!completadas && estado === 'pendiente'.red) {
        contador++
        console.log(`${(contador + '.').red} ${desc} :: ${estado}`)
      }
    })
  }

  borrarTareas(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }
}

module.exports = Tareas
