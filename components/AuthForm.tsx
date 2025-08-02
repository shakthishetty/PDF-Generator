"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import CustomFormField from "./FormFeild"
import { generatePDF } from "./PDFGenerator"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

const AuthForm = ({type}:{type: FormType}) => {
  const router = useRouter()
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      position: "",
      description: "",
    },
  })

  // Load existing data from localStorage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('pdfData')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        // Populate the form with existing data
        form.reset(parsedData)
      } catch (error) {
        console.error('Error parsing stored data:', error)
      }
    }
  }, [form])
 
  function onSubmit(values: FormData) {
    // Store the form data in localStorage to pass to the PDF page
    localStorage.setItem('pdfData', JSON.stringify(values))
    
    // Navigate to the PDF preview page
    router.push('/pdf-preview')
  }

  const downloadPDF = async (values: FormData) => {
    try {
      await generatePDF(values)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  const handleDownloadPDF = async () => {
    const values = form.getValues()
    const isValid = await form.trigger()
    
    if (isValid) {
      await downloadPDF(values)
    }
  }

  const isSignUp = type === "viewPdf"

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add Your Details</h2>
        <p className="text-gray-600 mt-2">Fill in the information below to generate your PDF</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <CustomFormField
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            icon="user.svg"
          />
          
          <CustomFormField
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            icon="mail.svg"
          />
          
          <CustomFormField
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter your phone number"
            icon="phone-call.svg"
          />
          
          <CustomFormField
            control={form.control}
            name="position"
            label="Position"
            placeholder="Enter your position/title"
            icon="position.svg"
          />
          
          <CustomFormField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Enter a brief description"
            type="textarea"
            icon="Description.svg"
          />
          
          <div className="pt-4 flex gap-3">
            <Button type="submit"  className="bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 px-10">
              <Image
                src="/images/view.svg"
                alt="View PDF"
                width={16}
                height={16}
                className="w-4 h-4 mr-2"
              />
              View PDF
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 px-10 max-sm:px-4"
              onClick={handleDownloadPDF}
            >
              <Image
                src="/images/Download.svg"
                alt="Download PDF"
                width={16}
                height={16}
                className="w-4 h-4 mr-2"
              />
              Download PDF
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm