"use client"

import { generatePDF } from "@/components/PDFGenerator"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface FormData {
  name: string
  email: string
  phoneNumber: string
  position: string
  description: string
}

export default function PDFPreview() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedData = localStorage.getItem('pdfData')
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      // If no data found, redirect back to form
      router.push('/')
    }
  }, [router])

  const downloadPDF = async () => {
    if (!formData) return

    try {
      // Use jsPDF to directly download the PDF
      await generatePDF(formData)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with buttons */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/?from=preview')}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/chevron-left.svg"
              alt="Back"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Back to Form
          </Button>
          <Button 
            onClick={downloadPDF}
            variant="outline" 
            className="bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 flex items-center gap-2 px-6"
          >
            <Image
              src="/images/Download.svg"
              alt="Download PDF"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Download PDF
          </Button>
        </div>

        {/* PDF Content */}
        <div 
          id="pdf-content" 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{formData.name}</h1>
              <p className="text-xl opacity-90">{formData.position}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Image
                        src="/images/mail.svg"
                        alt="Email"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-800 font-medium">{formData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Image
                        src="/images/phone-call.svg"
                        alt="Phone"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-800 font-medium">{formData.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Position Details */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Professional Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Image
                        src="/images/position.svg"
                        alt="Position"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Position</p>
                      <p className="text-gray-800 font-medium text-lg">{formData.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                About
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed text-justify">
                  {formData.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-gray-500 text-sm">
                <p>Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download button for mobile */}
        <div className="mt-8 text-center md:hidden">
          <Button 
            onClick={downloadPDF}
            variant="outline" 
            className="bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <Image
              src="/images/Download.svg"
              alt="Download PDF"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
