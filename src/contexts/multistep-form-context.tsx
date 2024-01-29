'use client'
import { ReactNode, createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface FormData {
  name: string
  email: string
  phone: string
  plan: string
  onlineService: boolean
  largerStorage: boolean
  customProfile: boolean
  userTotal: number
}

export interface UserData {
  id: string
  name: string
  email: string
  phone: string
  plan: string
  onlineService: boolean
  largerStorage: boolean
  customProfile: boolean
  userTotal: number
}

interface MultiStepContextType {
  user: UserData[]
  step: number
  isYear: boolean
  nextStep: () => void
  prevStep: () => void
  setPlan: () => void
  changePlan: () => void
  createUserData: (data: FormData) => void
}

export const MultiStepContext = createContext({} as MultiStepContextType)

interface MultiStepContextProviderProps {
  children: ReactNode
}

export function MultiStepContenxtProvider({
  children,
}: MultiStepContextProviderProps) {
  const [isYear, setIsYear] = useState(false)
  const [step, setStep] = useState(3)
  const [user, setUser] = useState<UserData[]>([])

  function createUserData(data: FormData) {
    const newUser: UserData = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      plan: data.plan,
      onlineService: data.onlineService,
      largerStorage: data.largerStorage,
      customProfile: data.customProfile,
      userTotal: data.userTotal,
    }
    setUser([...user, newUser])
    console.log(newUser)
  }
  function nextStep() {
    if (step === 5) return
    setStep((prev) => prev + 1)
  }
  function prevStep() {
    if (step === 1) return
    setStep((prev) => prev - 1)
  }
  function setPlan() {
    setIsYear((prev) => !prev)
  }
  function changePlan() {
    setStep((prev) => prev - 2)
  }

  return (
    <MultiStepContext.Provider
      value={{
        user,
        step,
        isYear,
        setPlan,
        nextStep,
        prevStep,
        changePlan,
        createUserData,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  )
}

export const useMultiContext = () => useContext(MultiStepContext)
