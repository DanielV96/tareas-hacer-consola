const inquirer = require('inquirer')
const colors = require('colors')
const Tarea = require('../models/tarea')

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué deseas hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Crear tarea`,
      },
      {
        value: 2,
        name: `${'2.'.green} Listar tarea(s)`,
      },
      {
        value: 3,
        name: `${'3.'.green} Listar tareas completada(s)`,
      },
      {
        value: 4,
        name: `${'4.'.green} Listar tareas Pendiente(s) `,
      },
      {
        value: 5,
        name: `${'5.'.green} Completar tareas`,
      },
      {
        value: 6,
        name: `${'6.'.green} Borrar tarea`,
      },
      {
        value: 0,
        name: `${'7.'.green} Salir`,
      },
    ],
  },
]

const inquirerMenu = async () => {
  console.clear()
  console.log(colors.green('======================='))
  console.log(colors.green('Seleccione una opción').bgWhite)
  console.log(colors.green('======================='))

  const { opcion } = await inquirer.prompt(preguntas)
  return opcion
}

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presiona ${'enter'.cyan} para continuar`,
    },
  ]
  console.log('\n')
  await inquirer.prompt(question)
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingresar un valor válido'
        }
        return true
      },
    },
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}

const listadotareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + 'cancelar',
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'borrar',
      choices,
    },
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadotareasBorrar,
  confirmar,
}
