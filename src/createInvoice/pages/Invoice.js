'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'
import VendorDetails from '../../components/VendorDetails'
import InvoiceDetails from '../../components/InvoiceDetails'
import Comments from '../../components/comments'
import FileUpload from '../../components/FileUpload'
import '../../index.css'
const validationSchema = Yup.object({
  vendor: Yup.string().required('Vendor is required'),
  purchaseOrder: Yup.string().required('Purchase Order is required'),
  invoiceNumber: Yup.string().required('Invoice Number is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  totalAmount: Yup.number().required('Total Amount is required').positive(),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  dueDate: Yup.date().required('Due Date is required'),
  description: Yup.string(),
})

export default function CreateInvoice() {
  const [activeTab, setActiveTab] = useState('vendor')

  const formik = useFormik({
    initialValues: {
      vendor: 'A - 1 Exterminators',
      purchaseOrder: '',
      invoiceNumber: '',
      invoiceDate: '',
      totalAmount: '',
      paymentTerms: '',
      dueDate: '',
      glPostDate: '',
      description: '',
      expenses: [],
      comments: '',
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('invoiceData', JSON.stringify(values))
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex items-center gap-4 h-14">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Create New Invoice</h1>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex gap-6">
          <div className="w-[400px]">
            <FileUpload />
          </div>

          <div className="flex-1">
            <div className="border-b mb-6">
              <div className="flex space-x-6">
                <Button
                  variant={activeTab === 'vendor' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('vendor')}
                  className="relative h-11 rounded-none font-normal"
                >
                  Vendor Details
                  {activeTab === 'vendor' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary " />
                  )}
                </Button>
                <Button
                  variant={activeTab === 'invoice' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('invoice')}
                  className="relative h-11 rounded-none font-normal text-color"
                >
                  Invoice Details
                  {activeTab === 'invoice' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </Button>
                <Button
                  variant={activeTab === 'comments' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('comments')}
                  className="relative h-11 rounded-none font-normal"
                >
                  Comments
                  {activeTab === 'comments' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </Button>
              </div>
            </div>

            {activeTab === 'vendor' && <VendorDetails formik={formik} />}
            {activeTab === 'invoice' && <InvoiceDetails formik={formik} />}
            {activeTab === 'comments' && <Comments formik={formik} />}

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">Save as Draft</Button>
              <Button type="submit" onClick={() => formik.handleSubmit()}>
                Submit & New
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

