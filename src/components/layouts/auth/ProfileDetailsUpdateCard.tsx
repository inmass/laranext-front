
import CardLayout from '@/components/layouts/CardLayout';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import { useProfile } from '@/hooks/api/profile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const ProfileDetailsSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

type ProfileDetailsFormData = z.infer<typeof ProfileDetailsSchema>;

const ProfileDetailsUpdateCard = () => {

    const { user, updateProfileDetails, loading } = useProfile();

    const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset } = useForm<ProfileDetailsFormData>({
        resolver: zodResolver(ProfileDetailsSchema),
        defaultValues: {
            name: user?.name
        },
        mode: 'onChange'
    });

    const onSubmit = async (data: ProfileDetailsFormData) => {
        if (await updateProfileDetails({ name: data.name })) {
            const formDefaults = { 
                name: data.name
            };
            reset(formDefaults);
        }
    };

    return (
        <CardLayout
            className="md:col-span-2"
            title="General information"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>

                    <Input
                        id="name"
                        type="text"
                        className={`block mt-1 w-full ${errors.name ? 'border-red-500' : ''}`}
                        {...register('name')}
                    />

                    <InputError messages={errors.name?.message ? [errors.name.message] : []} className="mt-2" />
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
                        disabled={loading || !isValid || !isDirty}
                    >
                        {loading ?'Updating...' : 'Update Profile'}
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
}

export default ProfileDetailsUpdateCard;