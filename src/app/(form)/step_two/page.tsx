import { AdvancedIcon, ArcadeIcon, ProIcon } from '@/components/icon/icon'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { useMultiContext } from '@/contexts/multistep-form-context'
import { useFormContext } from 'react-hook-form'

const plansData = [
  {
    text: 'Arcade',
    icon: <ArcadeIcon className="lg:size-12" />,
    monthValue: '9',
    yearValue: '90',
  },
  {
    text: 'Advanced',
    icon: <AdvancedIcon className="lg:size-12" />,
    monthValue: '12',
    yearValue: '120',
  },
  {
    text: 'Pro',
    icon: <ProIcon className="lg:size-12" />,
    monthValue: '15',
    yearValue: '150',
  },
]
export function StepTwo() {
  const { control } = useFormContext()
  const { isYear, setPlan } = useMultiContext()
  return (
    <FormField
      control={control}
      name="plan"
      render={({ field }) => (
        <FormItem className="lg:flex lg:flex-col lg:gap-5">
          <FormControl className="lg:grid lg:h-48 lg:grid-cols-3">
            <RadioGroup onChange={field.onChange}>
              {plansData.map((plan, i) => {
                return (
                  <FormItem key={i} className="">
                    <FormControl>
                      <RadioGroupItem
                        value={plan.text}
                        className="peer sr-only"
                      />
                    </FormControl>
                    <FormLabel className="flex h-[80px] cursor-pointer items-center gap-4 rounded-md border p-2 shadow-sm hover:border-indigo-800 peer-focus-visible:ring-1 peer-aria-checked:border-indigo-600 lg:h-full lg:flex-col lg:items-start lg:justify-between lg:p-5">
                      {plan.icon}
                      <div className="flex flex-col font-medium text-sky-950">
                        <p className="text-lg">{plan.text}</p>
                        <p className="-mt-1 text-gray-400">
                          ${isYear ? plan.yearValue : plan.monthValue}/
                          {isYear ? 'yr' : 'mo'}
                        </p>
                        {isYear && (
                          <span className="mt-1 text-xs text-indigo-600">
                            2 months free
                          </span>
                        )}
                      </div>
                    </FormLabel>
                  </FormItem>
                )
              })}
            </RadioGroup>
          </FormControl>
          <div className="flex items-center justify-center gap-5 rounded-sm bg-slate-50 p-2">
            <Label
              className={`lg:text-lg  ${!isYear ? 'text-indigo-600' : 'text-gray-400'}`}
              htmlFor="plan-mode"
            >
              Monthy
            </Label>
            <Switch
              id="plan-mode"
              onClick={() => setPlan()}
              className="data-[state=checked]:bg-sky-950 data-[state=unchecked]:bg-sky-950"
              checked={isYear}
            />
            <Label
              className={`lg:text-lg ${isYear ? 'text-indigo-600' : 'text-gray-400'}`}
              htmlFor="plan-mode"
            >
              Yearly
            </Label>
          </div>
        </FormItem>
      )}
    />
  )
}
