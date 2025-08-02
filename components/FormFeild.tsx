import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as ShadcnFormField
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Control, FieldPath, FieldValues } from "react-hook-form"

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  type?: "input" | "textarea"
  icon?: string
}

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "input",
  icon
}: CustomFormFieldProps<T>) => {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Image 
                    src={`/images/${icon}`} 
                    alt={`${label} icon`}
                    width={16}
                    height={16}
                    className="w-4 h-4 text-gray-400"
                  />
                </div>
              )}
              {type === "textarea" ? (
                <Textarea 
                  placeholder={placeholder} 
                  {...field} 
                  className={icon ? "pl-10" : ""}
                />
              ) : (
                <Input 
                  placeholder={placeholder} 
                  {...field} 
                  className={icon ? "pl-10" : ""}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField