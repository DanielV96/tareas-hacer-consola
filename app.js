const colors = require('colors')
const { guardarDb, leerDb } = require('./helpers/guardar-leer-archivo')
const Tareas = require('./models/tareas')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadotareasBorrar,
  confirmar,
} = require('./helpers/inquirer')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  const tareasDb = leerDb()
  if (tareasDb) {
    tareas.cargarTareasFromArray(tareasDb)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const desc = await leerInput('Descripcion:')
        tareas.crearTarea(desc)
        break
      case 2:
        tareas.listadoCompleto()
        break
      case 3:
        tareas.listarPendientesCompletadas(true)
        break
      case 4:
        tareas.listarPendientesCompletadas(false)
        break
      case 6:
        const id = await listadotareasBorrar(tareas.getListadoArray)
        //Hacer la confirmación para borrar
        if (id !== 0) {
          const resp = await confirmar('¿Está Seguro?')
          if (resp) {
            tareas.borrarTareas(id)
            console.log('Tarea Borrada')
          }
        }
        console.log({ id })
        break
    }
    guardarDb(tareas.getListadoArray)

    if (opt !== '0') await pausa()
  } while (opt !== '0')
}

main()
