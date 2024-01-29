'use client'
import { Button } from '@/components/ui/button'
import { useMultiContext } from '@/contexts/multistep-form-context'
import { useFormContext } from 'react-hook-form'

export function StepFour() {
  const { getValues } = useFormContext()
  const { isYear, changePlan } = useMultiContext()
  const formValues = getValues()

  function planValue() {
    let value = 0
    if (formValues.plan === 'Arcade') {
      value += 9
    }
    if (formValues.plan === 'Advanced') {
      value += 12
    }
    if (formValues.plan === 'Pro') {
      value += 15
    }
    return multiply(value)
  }
  function multiply(value: number) {
    return isYear ? (value *= 10) : value
  }
  function addOns(values: number) {
    let newValue = 0
    if (formValues.onlineService) {
      newValue += 1
    }
    if (formValues.largerStorage) {
      newValue += 2
    }
    if (formValues.customProfile) {
      newValue += 2
    }

    return multiply(newValue) + values
  }

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md bg-slate-100 p-6">
        <div className="mb-6 flex items-center justify-between border-b-2 pb-6">
          <div className="flex flex-col items-start text-left">
            <p className="font-bold text-sky-950">
              {formValues.plan}({isYear ? 'Yearly' : 'Monthly'})
            </p>
            <Button
              variant={'link'}
              onClick={() => changePlan()}
              className="h-auto p-0 text-gray-400 underline"
            >
              Change
            </Button>
          </div>
          <p className="font-bold text-sky-950">
            ${planValue()}/{isYear ? 'yr' : 'mo'}
          </p>
        </div>
        {formValues.onlineService && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start text-left">
              <p className="text-sm text-gray-400">Online Service</p>
            </div>
            <p className="text-sm text-sky-950">
              ${multiply(1)}/{isYear ? 'yr' : 'mo'}
            </p>
          </div>
        )}
        {formValues.largerStorage && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start text-left">
              <p className="text-sm text-gray-400">Larger Storage</p>
            </div>
            <p className="text-sm text-sky-950">
              ${multiply(2)}/{isYear ? 'yr' : 'mo'}
            </p>
          </div>
        )}
        {formValues.customProfile && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start text-left">
              <p className="text-sm text-gray-400">Custom Profile</p>
            </div>
            <p className="text-sm text-sky-950">
              ${multiply(2)}/{isYear ? 'yr' : 'mo'}
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between px-6">
        <div className="flex flex-col items-start text-left">
          <p className="text-sm text-gray-400">
            Total (per {isYear ? 'year' : 'month'} )
          </p>
        </div>
        <p className="font-bold text-indigo-600">
          ${addOns(planValue())}/{isYear ? 'yr' : 'mo'}
        </p>
      </div>
    </>
  )
}
