'use client'
import { Textarea } from '@/components/ui/textarea'


export default function Comments({ formik }) {
  return (
    <div>
      <Textarea
        placeholder="Add a comment and use @name to tag someone"
        className="min-h-[120px]"
        {...formik.getFieldProps('comments')}
      />
    </div>
  )
}

