
import CardLayout from '@/components/layouts/CardLayout';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import { useProfile } from '@/hooks/api/profile';
import { useState } from 'react';


const ProfileDetailsUpdateCard = () => {

    const { user, updateProfileDetails, loading } = useProfile();
    const [name, setName] = useState(user?.name || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProfileDetails({ name });
    };

    return (
        <CardLayout
            className="md:col-span-2"
            title="General information"
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>

                    <Input
                        id="name"
                        type="text"
                        value={name}
                        className="block mt-1 w-full"
                        onChange={(e) => setName(e.target.value)}
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
                        disabled={loading}
                    >
                        {loading ?'Updating...' : 'Update Profile'}
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
}

export default ProfileDetailsUpdateCard;