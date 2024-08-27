import { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import ApiEndpoints from '@/constants/ApiEndpoints';
import axios from '@/lib/axios';

interface ProfileData {
  name: string;
  // Add other profile fields
}

export const useProfile = () => {
    const { user, mutateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfileDetails = async (profileData: ProfileData) => {
        setLoading(true);
        setError(null);
        axios.
            put(ApiEndpoints.profileDetailsUpdate, profileData)
            .then((res) => {
                setLoading(false);
                mutateUser();
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response.data.message);
            });
    };

    const updateProfileAvatar = async (avatar?: File) => {
        setLoading(true);
        setError(null);
        if (avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar);
    
            axios
                .post(ApiEndpoints.profileAvatarUpdate, formData)
                .then((res) => {
                    setLoading(false);
                    mutateUser();
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.response.data.message);
                });
        } else {
            axios
                .delete(ApiEndpoints.profileAvatarUpdate)
                .then((res) => {
                    setLoading(false);
                    mutateUser();
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.response.data.message);
                });
        }
    };

    return {
        user,
        updateProfileDetails,
        updateProfileAvatar,
        loading,
        error
    };
};