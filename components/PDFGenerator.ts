"use client"

export interface PDFData {
  name: string
  email: string
  phoneNumber: string
  position: string
  description: string
}

export const generatePDF = async (data: PDFData): Promise<void> => {
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
        <title>${data.name} - Profile</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background-color 0.2s;
          }
          .print-button:hover {
            background: #1d4ed8;
          }
          .download-icon {
            width: 16px;
            height: 16px;
            fill: currentColor;
          }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button class="print-button" onclick="window.print()">
            <svg class="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF (Ctrl+P)
          </button>
          <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">
            Click the button above or press Ctrl+P, then choose "Save as PDF"
          </p>
        </div>
        
        <div class="header">
          <h1>${data.name}</h1>
          <p>${data.position}</p>
        </div>

        <div class="contact-grid">
          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="contact-item">
              <div class="contact-label">Email</div>
              <div class="contact-value">${data.email}</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">Phone</div>
              <div class="contact-value">${data.phoneNumber}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Professional Details</div>
            <div class="contact-item">
              <div class="contact-label">Current Position</div>
              <div class="contact-value">${data.position}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">About</div>
          <div class="about-content">
            ${data.description.replace(/\n/g, '<br>')}
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
    throw new Error('Failed to generate PDF')
  }
}
