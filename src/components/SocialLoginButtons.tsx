import Button from './Button'
import { useAuth } from '../hooks/auth'
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const SocialLoginButtons = () => {

    const { socialLogin } = useAuth();

    return (
        <div 
            className="mt-4 flex flex-col items-center"
            id="social-login-buttons"
        >
            <Button
                onClick={() => socialLogin("facebook")}
                style={{
                    backgroundColor: '#3b5998',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    margin: '5px',
                    cursor: 'pointer',
                    border: 'none',
                }}
            >
                <FaFacebookF className="w-5 h-5 mr-2" />
                Login with Facebook
            </Button>
            <Button
                onClick={() => socialLogin("google")}
                style={{
                    backgroundColor: '#db4437',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    margin: '5px',
                    cursor: 'pointer',
                    border: 'none',
                }}
            >
                <FaGoogle className="w-5 h-5 mr-2" />
                Login with Google
            </Button>
        </div>
    )
}

export default SocialLoginButtons