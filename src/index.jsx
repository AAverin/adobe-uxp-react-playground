import React from 'react'

import './styles.css'
import { Demos } from './panels/Demos.jsx'
import ReactDOM from 'react-dom'

import { entrypoints } from 'uxp'

entrypoints.setup({
  plugin: {
    create (plugin) {
      /* optional */ console.log('created', plugin)
    },
    destroy () {
      /* optional */ console.log('destroyed')
    }
  },
  panels: {
    demos1: {
      show (event) {
        console.log(event)
        const demosRoot = document.getElementById('demos1')
        ReactDOM.render(<Demos />, demosRoot)
        event.node.appendChild(demosRoot)
      }
    }
  }
})
