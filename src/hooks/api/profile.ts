import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import ApiEndpoints from '@/constants/ApiEndpoints';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface ProfileData {
  name: string;
  // Add other profile fields
}

export const useProfile = () => {
    const { user, mutateUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const updateProfileDetails = async (profileData: ProfileData) => {
        setLoading(true);
        return axios.
            put(ApiEndpoints.profileDetailsUpdate, profileData)
            .then((res) => {
                mutateUser();
                setLoading(false);
                toast.success('Profile updated successfully');
                return true;
            })
            .catch((error) => {
                setLoading(false);
                return false;
            });
        };

    const updateProfileAvatar = async (avatar?: File) => {
        setLoading(true);
        if (avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar);
    
            axios
                .post(ApiEndpoints.profileAvatarUpdate, formData)
                .then((res) => {
                    mutateUser();
                    setLoading(false);
                    toast.success('Avatar updated successfully');
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else {
            axios
                .delete(ApiEndpoints.profileAvatarUpdate)
                .then((res) => {
                    mutateUser();
                    setLoading(false);
                    toast.success('Avatar removed successfully');
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const updatePassword = async (passwordData: { current_password: string, password: string, password_confirmation: string }): Promise<boolean> => {
        setLoading(true);
        return axios
            .put(ApiEndpoints.profilePasswordUpdate, passwordData)
            .then((res) => {
                mutateUser();
                setLoading(false);
                toast.success('Password updated successfully');
                return true;
            })
            .catch((error) => {
                setLoading(false);
                return false;
            });
    }

    return {
        user,
        updateProfileDetails,
        updateProfileAvatar,
        updatePassword,
        loading
    };
};