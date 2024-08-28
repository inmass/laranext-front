
import CardLayout from '@/components/layouts/CardLayout';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import { useProfile } from '@/hooks/api/profile';
import { useState } from 'react';
import toast from 'react-hot-toast';


const PasswordUpdateCard = () => {

    const { user, updatePassword, loading } = useProfile();
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }
        
        if (await updatePassword({ current_password: currentPassword, password, password_confirmation: passwordConfirmation })) {
            clearFields();
        }
    };

    const clearFields = () => {
        setCurrentPassword('');
        setPassword('');
        setPasswordConfirmation('');
    }

    const validateFields = () => {
        if (!currentPassword || !password || !passwordConfirmation) {
            toast.error('Please fill all fields');
            return false;
        }

        if (password !== passwordConfirmation) {
            toast.error('New password and password confirmation do not match');
            return false;
        }

        return true;
    }

    return (
        <CardLayout
            title="Change Password"
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="current_password">Current Password</label>

                    <Input
                        id="current_password"
                        type="password"
                        className="block mt-1 w-full"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="password">New Password</label>

                    <Input
                        id="password"
                        type="password"
                        className="block mt-1 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="password_confirmation">Confirm Password</label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        className="block mt-1 w-full"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ?'Updating...' : 'Update Password'}
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
}

export default PasswordUpdateCard;