
import CardLayout from '@/components/layouts/CardLayout';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import InputError from '@/components/InputError';


const PasswordUpdateCard = () => {
    return (
        <CardLayout
            title="Change Password"
        >
            <form>
                <div>
                    <label htmlFor="current_password">Current Password</label>

                    <Input
                        id="current_password"
                        type="password"
                        className="block mt-1 w-full"
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="password">New Password</label>

                    <Input
                        id="password"
                        type="password"
                        className="block mt-1 w-full"
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="password_confirmation">Confirm Password</label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        className="block mt-1 w-full"
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Button
                        type="submit"
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
}

export default PasswordUpdateCard;