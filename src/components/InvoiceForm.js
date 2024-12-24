'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ChevronLeft, Upload } from 'lucide-react'

const invoiceSchema = Yup.object().shape({
  vendor: Yup.string().required('Vendor is required'),
  purchaseOrderNumber: Yup.string().required('Purchase Order Number is required'),
  invoiceNumber: Yup.string().required('Invoice Number is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  totalAmount: Yup.number().required('Total Amount is required').positive(),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  dueDate: Yup.date().required('Due Date is required'),
  description: Yup.string().required('Description is required'),
})

export default function InvoiceForm() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const initialValues = JSON.parse(localStorage.getItem('invoiceData') || 'null') || {
    vendor: '',
    purchaseOrderNumber: '',
    invoiceNumber: '',
    invoiceDate: '',
    totalAmount: '',
    paymentTerms: '',
    dueDate: '',
    description: '',
    expenseDetails: [{
      lineAmount: '',
      department: '',
      account: '',
      location: '',
      description: '',
    }],
    comments: '',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Create New Invoice
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="vendor-details" className="space-y-6">
          <TabsList className="bg-white border-b w-full justify-start rounded-none h-auto p-0 space-x-8">
            <TabsTrigger
              value="vendor-details"
              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-0 pb-4"
            >
              Vendor Details
            </TabsTrigger>
            <TabsTrigger
              value="invoice-details"
              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-0 pb-4"
            >
              Invoice Details
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-0 pb-4"
            >
              Comments
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <Upload className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">Upload Your Invoice</h3>
                  <p className="text-sm text-gray-500 mt-1">To auto-populate fields and save time</p>
                </div>
                <div className="text-center">
                  <Button variant="outline" className="mt-2">
                    Upload File
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">or Drag and drop</p>
                </div>
              </CardContent>
            </Card>

            <Formik
              initialValues={initialValues}
              validationSchema={invoiceSchema}
              onSubmit={(values, { setSubmitting }) => {
                localStorage.setItem('invoiceData', JSON.stringify(values))
                setSubmitting(false)
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="space-y-6">
                  <TabsContent value="vendor-details" className="m-0">
                    <Card>
                      <CardContent className="space-y-4 p-6">
                        <div className="space-y-2">
                          <Label htmlFor="vendor">Vendor *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Vendor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1-3 Hemispheres</SelectItem>
                              <SelectItem value="2">Other Vendors</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-sm">
                          <p>250 Main St. Lynn</p>
                          <button className="text-blue-600 hover:underline mt-2">
                            + View Vendor Details
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="invoice-details" className="m-0">
                    <Card>
                      <CardContent className="space-y-6 p-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">General Information</h3>
                          <div>
                            <Label htmlFor="purchaseOrderNumber">Purchase Order Number *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select PO Number" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="po1">PO-001</SelectItem>
                                <SelectItem value="po2">PO-002</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Invoice Details</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Invoice" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="inv1">INV-001</SelectItem>
                                  <SelectItem value="inv2">INV-002</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="invoiceDate">Invoice Date *</Label>
                              <Input type="date" id="invoiceDate" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="totalAmount">Total Amount *</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5">$</span>
                                <Input type="number" id="totalAmount" className="pl-6" placeholder="0.00" />
                                <span className="absolute right-3 top-2.5">USD</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="paymentTerms">Payment Terms *</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="net30">Net 30</SelectItem>
                                  <SelectItem value="net60">Net 60</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Expense Details</h3>
                            <div className="text-sm">
                              <span>$ 0.00</span>
                              <span className="mx-2">/</span>
                              <span className="text-blue-600">$ 0.00</span>
                            </div>
                          </div>

                          {values.expenseDetails.map((_, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Line Amount *</Label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2.5">$</span>
                                  <Input className="pl-6" placeholder="0.00" />
                                  <span className="absolute right-3 top-2.5">USD</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Department *</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="dept1">Department 1</SelectItem>
                                    <SelectItem value="dept2">Department 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Account *</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Account" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="acc1">Account 1</SelectItem>
                                    <SelectItem value="acc2">Account 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Location *</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Location" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="loc1">Location 1</SelectItem>
                                    <SelectItem value="loc2">Location 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-2">
                                <Label>Description *</Label>
                                <Input placeholder="Enter description" />
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" className="w-full">
                            + Add Expense Coding
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="comments" className="m-0">
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <Label htmlFor="comments">Comments</Label>
                          <Textarea
                            placeholder="Add a comment and use @name to tag someone"
                            className="min-h-[100px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Save as Draft</Button>
                    <Button type="submit">Submit & New</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Tabs>
      </main>
    </div>
  )
}

