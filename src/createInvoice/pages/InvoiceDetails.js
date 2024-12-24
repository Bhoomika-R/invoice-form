'use client'

import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

export default function InvoiceDetails({ formik }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-sm font-medium mb-4">General Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm mb-1.5 block">
              Purchase Order Number <span className="text-destructive">*</span>
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
                <SelectItem value="po1">PO-001</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium mb-4">Invoice Details</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1.5 block">
                Invoice Number <span className="text-destructive">*</span>
              </label>
              <Select
                name="invoiceNumber"
                value={formik.values.invoiceNumber}
                onValueChange={(value) => formik.setFieldValue('invoiceNumber', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inv1">INV-001</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm mb-1.5 block">
                Invoice Date <span className="text-destructive">*</span>
              </label>
              <Input type="date" {...formik.getFieldProps('invoiceDate')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1.5 block">
                Total Amount <span className="text-destructive">*</span>
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
            </div>
            <div>
              <label className="text-sm mb-1.5 block">
                Payment Terms <span className="text-destructive">*</span>
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
                  <SelectItem value="net30">Net 30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1.5 block">
                Invoice Due Date <span className="text-destructive">*</span>
              </label>
              <Input type="date" {...formik.getFieldProps('dueDate')} />
            </div>
            <div>
              <label className="text-sm mb-1.5 block">
                GL Post Date <span className="text-destructive">*</span>
              </label>
              <Input type="date" {...formik.getFieldProps('glPostDate')} />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1.5 block">
              Invoice Description <span className="text-destructive">*</span>
            </label>
            <Input {...formik.getFieldProps('description')} />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Expense Details</h3>
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
                Line Amount <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input className="pl-7" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="text-sm mb-1.5 block">
                Department <span className="text-destructive">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dept1">Department 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1.5 block">
                Account <span className="text-destructive">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acc1">Account 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm mb-1.5 block">
                Location <span className="text-destructive">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loc1">Location 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm mb-1.5 block">
              Description <span className="text-destructive">*</span>
            </label>
            <Input />
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense Coding
          </Button>
        </div>
      </section>
    </div>
  )
}

