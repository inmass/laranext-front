
import CardLayout from '@/components/layouts/CardLayout';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import { UserType } from '@/types/User';


const ProfileDetailsUpdateCard = ({ user }: { user?: UserType }) => {
    return (
        <CardLayout
            className="md:col-span-2"
            title="General information"
        >
            <form>
                <div>
                    <label htmlFor="name">Name</label>

                    <Input
                        id="name"
                        type="text"
                        value={user?.name}
                        className="block mt-1 w-full"
                        readOnly
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="email">Email</label>

                    <Input
                        id="email"
                        type="email"
                        value={user?.email}
                        className="block mt-1 w-full"
                        readOnly
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Button
                        type="submit"
                    >
                        Update Profile
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
}

export default ProfileDetailsUpdateCard;