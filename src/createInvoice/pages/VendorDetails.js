'use client'

import { FormikProps } from 'formik'
import { FileText } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'


export default function VendorDetails({ formik }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <FileText className="h-5 w-5 mt-1 text-blue-600" />
        <div className="flex-1">
          <h2 className="font-medium mb-4">Vendor Details</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Vendor Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm mb-1.5 block">
                    Vendor <span className="text-destructive">*</span>
                  </label>
                  <Select
                    name="vendor"
                    value={formik.values.vendor}
                    onValueChange={(value) => formik.setFieldValue('vendor', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A - 1 Exterminators">A - 1 Exterminators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">550 Main St., Lynn</p>
                </div>

                <Button variant="link" className="text-blue-600 h-auto p-0">
                  View Vendor Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

