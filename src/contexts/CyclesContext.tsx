/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, marckCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';

interface CreateCycleDate {
  task: string;
  minutesAmount: number
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


export function CyclesContextProvider({ children }: CyclesContextProviderPropds) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer,{
    cycles: [],
    activeCycleId: null,}
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle: any) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch(marckCurrentCycleAsFinishedAction())
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

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
    // reset()
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
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
