import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'


const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export default function LoginForm({ onLogin }) {
  console.log("what is here",onLogin);
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,

    onSubmit: (values) => {
      if (onLogin) {
        onLogin(values.username);
      } else {
        console.error("onLogin is not defined");
      }
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                {...formik.getFieldProps('username')}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
              )}
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
            <Button type="submit" className="w-full submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

