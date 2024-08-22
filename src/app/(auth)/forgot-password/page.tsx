'use client'

import Button from '@/components/Button'
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import DefaultLayout from '@/components/layouts/auth/DefaultLayout'

interface Errors {
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
}

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState<string>('')
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<string | null>(null)

    const submitForm: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <DefaultLayout
            title="Forgot Password"
            description="Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that
                will allow you to choose a new one.."
        >
            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button>Email Password Reset Link</Button>
                </div>
            </form>
        </DefaultLayout>
    )
}

export default Page
