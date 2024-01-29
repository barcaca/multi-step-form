'use client'
import { StepFour } from '@/app/(form)/step_four/page'
import StepOne from '@/app/(form)/step_one/page'
import { StepThree } from '@/app/(form)/step_three/page'
import { StepTwo } from '@/app/(form)/step_two/page'
import { useMultiContext } from '@/contexts/multistep-form-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z.string().email({ message: 'This field is required' }),
  phone: z.string().min(8, { message: 'This field is required' }),
  plan: z.string(),
  onlineService: z.boolean(),
  largerStorage: z.boolean(),
  customProfile: z.boolean(),
  userTotal: z.number(),
})

type NewFormData = z.infer<typeof formSchema>

export function MultiForm() {
  const { step, nextStep, prevStep, createUserData, isYear } = useMultiContext()
  const form = useForm<NewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      plan: '',
      onlineService: false,
      largerStorage: false,
      customProfile: false,
      userTotal: 0,
    },
  })

  function onSubmit(values: NewFormData) {
    nextStep()
    let userPlanTotal = 0
    if (values.plan === 'Arcade') {
      userPlanTotal += 9
    }
    if (values.plan === 'Advanced') {
      userPlanTotal += 12
    }
    if (values.plan === 'Pro') {
      userPlanTotal += 15
    }
    if (values.onlineService) {
      userPlanTotal += 1
    }
    if (values.largerStorage) {
      userPlanTotal += 2
    }
    if (values.customProfile) {
      userPlanTotal += 2
    }
    if (isYear) {
      userPlanTotal *= 10
    }
    values.userTotal += userPlanTotal
    if (step === 4) {
      createUserData(values)
    }
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:relative lg:flex-1"
      >
        <FormProvider {...form}>
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
          {step === 4 && <StepFour />}
        </FormProvider>
        {step < 5 && (
          <div className="absolute bottom-0 left-0 flex w-full justify-between bg-white p-4 lg:bottom-0">
            <Button
              type="button"
              variant={'outline'}
              className={`${step === 1 ? 'invisible' : ''}`}
              onClick={() => prevStep()}
            >
              Go Back
            </Button>
            <Button type="submit">
              {step === 4 ? 'Confirm' : 'Next Step'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}
