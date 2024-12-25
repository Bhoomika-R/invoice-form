import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChevronLeft, Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import FileUpload from '../createInvoice/pages/FileUpload'
import iconContainer from '../assets/images/IconContainer.png'
import iconContainer1 from '../assets/images/IconContainer1.png'
import iconContainer2 from '../assets/images/IconContainer2.png'

const validationSchema = Yup.object({
  vendor: Yup.string().required('Vendor is required'),
  purchaseOrder: Yup.string().required('Purchase Order is required'),
  invoiceNumber: Yup.string().required('Invoice Number is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  totalAmount: Yup.number().required('Total Amount is required').positive(),
  paymentTerms: Yup.string().required('Payment Terms are required'),
  dueDate: Yup.date().required('Due Date is required'),
  glPostDate: Yup.date().required('GL Post Date is required'),
  description: Yup.string(),
  lineAmount: Yup.number().required('Line Amount is required').positive(),
  department: Yup.string().required('Department is required'),
  account: Yup.string().required('Account is required'),
  location: Yup.string().required('Location is required'),
  expenseDescription: Yup.string().required('Expense Description is required'),
  comments: Yup.string(),
})

export default function InvoiceForm({ onLogout }) {
  const [activeTab, setActiveTab] = useState('vendor')

  const formik = useFormik({
    initialValues: {
      vendor: '',
      purchaseOrder: '',
      invoiceNumber: '',
      invoiceDate: '',
      totalAmount: '',
      paymentTerms: '',
      dueDate: '',
      glPostDate: '',
      description: '',
      lineAmount: '',
      department: '',
      account: '',
      location: '',
      expenseDescription: '',
      comments: '',
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('invoiceData', JSON.stringify(values))
      alert('Form submitted successfully!')
    },
  })

  useEffect(() => {
    const savedData = localStorage.getItem('invoiceData')
    if (savedData) {
      formik.setValues(JSON.parse(savedData))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex items-center justify-between gap-4 h-14">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold">Create New Invoice</h1>
          </div>
          <Button onClick={onLogout} className='submit'>Logout</Button>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex gap-6">
          <div className="w-[600px]">
            <FileUpload />
          </div>

          <div className="flex-1">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vendor" className={`font-medium ${activeTab === 'vendor' ? 'text-color' : ''} ${activeTab === 'vendor' ? 'border-bottom-active' : ''}`}>Vendor Details</TabsTrigger>
                  <TabsTrigger value="invoice" className={`font-medium ${activeTab === 'invoice' ? 'text-color' : ''} ${activeTab === 'invoice' ? 'border-bottom-active' : ''}`}>Invoice Details</TabsTrigger>
                  <TabsTrigger value="comments" className={`font-medium ${activeTab === 'comments' ? 'text-color' : ''} ${activeTab === 'comments' ? 'border-bottom-active' : ''}`}>Comments</TabsTrigger>
                </TabsList>

                <TabsContent value="vendor">
                  <section>
                    <div className='flex gap-2 items-center'>
                      <img src={iconContainer} />
                      <p className="text-lg font-bold">Vendor Details</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                      <div className='mt-4'>
                        <h3 className="text-sm font-bold">Vendor Information</h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Vendor <span className="text-destructive red-color">*</span>
                          </label>
                          <Select
                            name="vendor"
                            value={formik.values.vendor}
                            onValueChange={(value) => formik.setFieldValue('vendor', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select vendor" className='border-color' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A - 1 Exterminators" className="bg-white">A - 1 Exterminators</SelectItem>
                            </SelectContent>
                          </Select>
                          {formik.touched.vendor && formik.errors.vendor && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.vendor}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>


                </TabsContent>

                <TabsContent value="invoice">
                  <section>
                    <div className='flex gap-2 items-center'>
                      <img src={iconContainer1} />
                      <p className="text-lg font-bold">Invoice Details</p>
                    </div>
                    <div className="grid gap-4">
                      <div className='mt-4'>
                        <h3 className="text-sm font-bold">General Information</h3>
                      </div>
                      <section className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm mb-1.5 block">
                              Purchase Order Number <span className="text-destructive red-color">*</span>
                            </label>
                            <Select
                              name="purchaseOrder"
                              value={formik.values.purchaseOrder}
                              onValueChange={(value) => formik.setFieldValue('purchaseOrder', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select PO Number" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="po1" className="bg-white">PO-001</SelectItem>
                              </SelectContent>
                            </Select>
                            {formik.touched.purchaseOrder && formik.errors.purchaseOrder && (
                              <div className="text-red-500 text-sm mt-1">{formik.errors.purchaseOrder}</div>
                            )}
                          </div>
                        </div>
                      </section>
                      <div className='mt-4'>
                        <h3 className="text-sm font-bold">Invoice Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">

                        <div>
                          <label className="text-sm mb-1.5 block">
                            Invoice Number <span className="text-destructive red-color">*</span>
                          </label>
                          <Input
                            {...formik.getFieldProps('invoiceNumber')}
                          />
                          {formik.touched.invoiceNumber && formik.errors.invoiceNumber && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.invoiceNumber}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Invoice Date <span className="text-destructive red-color">*</span>
                          </label>
                          <Input type="date" {...formik.getFieldProps('invoiceDate')} />
                          {formik.touched.invoiceDate && formik.errors.invoiceDate && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.invoiceDate}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Total Amount <span className="text-destructive red-color">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">$</span>
                            <Input
                              type="number"
                              className="pl-7"
                              placeholder="0.00"
                              {...formik.getFieldProps('totalAmount')}
                            />
                          </div>
                          {formik.touched.totalAmount && formik.errors.totalAmount && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.totalAmount}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Payment Terms <span className="text-destructive red-color">*</span>
                          </label>
                          <Select
                            name="paymentTerms"
                            value={formik.values.paymentTerms}
                            onValueChange={(value) => formik.setFieldValue('paymentTerms', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select terms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="net30" className="bg-white">Net 30</SelectItem>
                            </SelectContent>
                          </Select>
                          {formik.touched.paymentTerms && formik.errors.paymentTerms && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.paymentTerms}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Invoice Due Date <span className="text-destructive red-color">*</span>
                          </label>
                          <Input type="date" {...formik.getFieldProps('dueDate')} />
                          {formik.touched.dueDate && formik.errors.dueDate && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm mb-1.5 block">
                            GL Post Date <span className="text-destructive red-color">*</span>
                          </label>
                          <Input type="date" {...formik.getFieldProps('glPostDate')} />
                          {formik.touched.glPostDate && formik.errors.glPostDate && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.glPostDate}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm mb-1.5 block">
                          Invoice Description <span className="text-destructive red-color">*</span>
                        </label>
                        <Input {...formik.getFieldProps('description')} />
                        {formik.touched.description && formik.errors.description && (
                          <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold">Expense Details</h3>
                      <div className="text-sm">
                        <span>$0.00</span>
                        <span className="mx-1">/</span>
                        <span className="text-blue-600">$0.00</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Line Amount <span className="text-destructive red-color">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">$</span>
                            <Input
                              className="pl-7"
                              placeholder="0.00"
                              {...formik.getFieldProps('lineAmount')}
                            />
                          </div>
                          {formik.touched.lineAmount && formik.errors.lineAmount && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.lineAmount}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Department <span className="text-destructive red-color">*</span>
                          </label>
                          <Select
                            name="department"
                            value={formik.values.department}
                            onValueChange={(value) => formik.setFieldValue('department', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dept1" className="bg-white">Department 1</SelectItem>
                            </SelectContent>
                          </Select>
                          {formik.touched.department && formik.errors.department && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.department}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Account <span className="text-destructive red-color">*</span>
                          </label>
                          <Select
                            name="account"
                            value={formik.values.account}
                            onValueChange={(value) => formik.setFieldValue('account', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="acc1" className="bg-white">Account 1</SelectItem>
                            </SelectContent>
                          </Select>
                          {formik.touched.account && formik.errors.account && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.account}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm mb-1.5 block">
                            Location <span className="text-destructive red-color">*</span>
                          </label>
                          <Select
                            name="location"
                            value={formik.values.location}
                            onValueChange={(value) => formik.setFieldValue('location', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="loc1" className="bg-white">Location 1</SelectItem>
                            </SelectContent>
                          </Select>
                          {formik.touched.location && formik.errors.location && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm mb-1.5 block">
                          Description <span className="text-destructive red-color">*</span>
                        </label>
                        <Input {...formik.getFieldProps('expenseDescription')} />
                        {formik.touched.expenseDescription && formik.errors.expenseDescription && (
                          <div className="text-red-500 text-sm mt-1">{formik.errors.expenseDescription}</div>
                        )}
                      </div>

                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Expense Coding
                      </Button>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="comments">
                  <section>
                  <div className='flex gap-2 items-center'>
                      <img src={iconContainer2} />
                      <p className="text-lg font-bold">Comments</p>
                    </div>
                    <Textarea
                      placeholder="Add a comment and use @name to tag someone"
                      className="min-h-[120px] mt-2"
                      {...formik.getFieldProps('comments')}
                    />
                    {formik.touched.comments && formik.errors.comments && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.comments}</div>
                    )}
                  </section>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" type="button" className="border-color" onClick={() => formik.resetForm()}>
                  Save as Draft
                </Button>
                <Button type="submit" className="submit">Submit & New</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

