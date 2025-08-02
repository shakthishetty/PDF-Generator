"use client"

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
      // Create a new window with the PDF content
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        alert('Please allow popups to download PDF')
        return
      }

      // Create the HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${formData.name} - Profile</title>
          <style>
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2563eb, #1d4ed8);
              color: white;
              padding: 40px 20px;
              text-align: center;
              margin: -20px -20px 30px -20px;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 2.5em;
              font-weight: bold;
            }
            .header p {
              margin: 0;
              font-size: 1.2em;
              opacity: 0.9;
            }
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 1.4em;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 15px;
              border-bottom: 2px solid #dbeafe;
              padding-bottom: 5px;
            }
            .contact-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-bottom: 30px;
            }
            @media (max-width: 600px) {
              .contact-grid {
                grid-template-columns: 1fr;
              }
            }
            .contact-item {
              margin-bottom: 15px;
            }
            .contact-label {
              font-size: 0.9em;
              color: #6b7280;
              margin-bottom: 3px;
            }
            .contact-value {
              color: #1f2937;
              font-weight: 500;
            }
            .about-content {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2563eb;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 0.9em;
            }
            .print-button {
              background: #2563eb;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              margin: 20px auto;
              display: block;
            }
            .print-button:hover {
              background: #1d4ed8;
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <button class="print-button" onclick="window.print()">🖨️ Print to PDF (Ctrl+P)</button>
            <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">
              Click the button above or press Ctrl+P, then choose "Save as PDF"
            </p>
          </div>
          
          <div class="header">
            <h1>${formData.name}</h1>
            <p>${formData.position}</p>
          </div>

          <div class="contact-grid">
            <div class="section">
              <div class="section-title">Contact Information</div>
              <div class="contact-item">
                <div class="contact-label">Email</div>
                <div class="contact-value">${formData.email}</div>
              </div>
              <div class="contact-item">
                <div class="contact-label">Phone</div>
                <div class="contact-value">${formData.phoneNumber}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Professional Details</div>
              <div class="contact-item">
                <div class="contact-label">Current Position</div>
                <div class="contact-value">${formData.position}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">About</div>
            <div class="about-content">
              ${formData.description.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
        </html>
      `

      // Write the content to the new window
      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // Focus on the new window
      printWindow.focus()

      // Auto-trigger print dialog after a short delay
      setTimeout(() => {
        printWindow.print()
      }, 500)

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
            onClick={() => router.push('/')}
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
