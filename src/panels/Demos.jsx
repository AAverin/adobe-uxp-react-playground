import React, { useReducer, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { ColorPicker } from '../components/ColorPicker.jsx'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import styled, { css } from 'styled-components'

const GlobalStateContext = React.createContext({})

const initialState = {
  selected: undefined
}
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'selected': {
      return {
        ...state,
        selected: action.payload
      }
    }
  }
}

export const useGlobalState = () => {
  return useContext(GlobalStateContext)
}

const _Button = props => {
  const { children } = props
  return (
    <div tabIndex={1} {...props}>
      {children}
    </div>
  )
}

const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 20, // columns
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
    mediaQuery: 'only screen',
    container: {
      xs: 20
    }
  }
}

const Header = styled.p`
  margin: 4px 0px 2px 0px;
  padding: 0px;
  text-align: center;
  color: white;
  font-size: 11px;
  font-weight: bold;
`

const Button = styled(_Button)`
  color: #dbdbdb;
  margin: 1px 0px;
  background: #494949;
  height: 20px;
  width: 100%;
  min-width: 5px;
  justify-content: center;
  display: flex;
  align-items: center;

  padding: 0px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border: 1px solid #5b5b5b;

  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  ${({ selected }) =>
    selected &&
    css`
      background-color: #313131;
    `};
`

const FlexboxGridBug = () => {
  const { state, dispatch } = useGlobalState()
  return (
    <ThemeProvider theme={theme}>
      <>
        <Row>
          <Col xs>
            <Header>Title</Header>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <Button
              selected={state.selected == 1}
              onClick={() => {
                dispatch({
                  type: 'selected',
                  payload: 1
                })
                console.log('Button 1 click')
              }}
            >
              Button 1
            </Button>
          </Col>
          <Col xs={10}>
            <Button
              selected={state.selected == 2}
              onClick={() => {
                dispatch({
                  type: 'selected',
                  payload: 2
                })
                console.log('Button 2 click')
              }}
            >
              Button 2
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <Button
              selected={state.selected == 3}
              onClick={() => {
                dispatch({
                  type: 'selected',
                  payload: 3
                })
                console.log('Button 3 click')
              }}
            >
              Button 3
            </Button>
          </Col>
          <Col xs={10}>
            <Button
              selected={state.selected == 4}
              onClick={() => {
                console.log('Button 4 click')
                dispatch({
                  type: 'selected',
                  payload: 4
                })
              }}
            >
              Button 4
            </Button>
          </Col>
        </Row>
      </>
    </ThemeProvider>
  )
}

export const Demos = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  return (
    <GlobalStateContext.Provider
      value={{
        state: state,
        dispatch: dispatch
      }}
    >
      <FlexboxGridBug />
    </GlobalStateContext.Provider>
  )
}
