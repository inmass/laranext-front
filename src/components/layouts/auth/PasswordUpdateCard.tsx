import CardLayout from '@/components/layouts/CardLayout';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import { useProfile } from '@/hooks/api/profile';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const passwordSchema = z.object({

    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),

}).refine((data) => data.newPassword === data.confirmPassword, {

    message: "Passwords don't match",
    path: ["confirmPassword"],
    
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordUpdateCard: React.FC = () => {
    const { updatePassword, loading } = useProfile();
    const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset, watch } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        mode: 'onChange'
    });

    const watchAllFields = watch();

    const onSubmit = async (data: PasswordFormData) => {
        if (await updatePassword({
            current_password: data.currentPassword,
            password: data.newPassword,
            password_confirmation: data.confirmPassword
        })) {
            reset();
        }
    };

    const shouldShowError = () => {
        return Object.values(watchAllFields).some(value => value !== '');
    }

    return (
        <CardLayout title="Change Password">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="currentPassword">Current Password</label>
                    <Input
                        id="currentPassword"
                        type="password"
                        className={`block mt-1 w-full ${shouldShowError() && errors.currentPassword ? 'border-red-500' : ''}`}
                        {...register('currentPassword')}
                    />
                    <InputError messages={shouldShowError() && errors.currentPassword?.message ? [errors.currentPassword.message] : []} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="newPassword">New Password</label>
                    <Input
                        id="newPassword"
                        type="password"
                        className={`block mt-1 w-full ${shouldShowError() && errors.newPassword ? 'border-red-500' : ''}`}
                        {...register('newPassword')}
                    />
                    <InputError messages={shouldShowError() && errors.newPassword?.message ? [errors.newPassword.message] : []} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        className={`block mt-1 w-full ${shouldShowError() && errors.confirmPassword ? 'border-red-500' : ''}`}
                        {...register('confirmPassword')}
                    />
                    <InputError messages={shouldShowError() && errors.confirmPassword?.message ? [errors.confirmPassword.message] : []} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Button
                        type="submit"
                        disabled={loading || !isValid || !isDirty}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
};

export default PasswordUpdateCard;