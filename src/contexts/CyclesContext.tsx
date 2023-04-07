/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useReducer, useState } from 'react'

interface CreateCycleDate {
  task: string;
  minutesAmount: number
}
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupetdDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleDate) => void,
  interruptCurrentCycle: () => void,
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderPropds {
  children: ReactNode
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export function CyclesContextProvider({ children }: CyclesContextProviderPropds) {



  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {

      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle: any) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interrupetdDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      }
      
    if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED'){

      return {
        ...state,
        cycles:  state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            })
      }



    }
      return state
    }, {
    cycles: [],
    activeCycleId: null,}

  
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle: any) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {

    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleDate) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      }
    })
    // setCycles((state) => [...state, newCycle])
    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      }
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interrupetdDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    // setActiveCycleId(null)
  }


  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
