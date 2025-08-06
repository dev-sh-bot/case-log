import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import LOGO from '../assets/images/icons.png';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { triggerToast } from '../utils/helper';
import { api } from '../utils/api';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const response = await api.login({
                email: data.email,
                password: data.password
            });

            // Handle the API response structure
            const user = {
                id: response.admin?.id || 1,
                name: response.admin?.name || 'Admin User',
                email: response.admin?.email || data.email,
                token: response.token,
                role: 'admin'
            };

            dispatch(addUser(user));
            triggerToast('Login successful', 'success');
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Login error:', error);
            triggerToast(error.message || 'Login failed. Please check your credentials.', 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 dark:from-facebook-dark dark:to-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-facebook-card rounded-2xl shadow-2xl border border-gray-200 dark:border-facebook-border p-8 flex flex-col items-center">
                <img src={LOGO} className="w-40 mb-4" alt="EverPase" />
                <p className="text-gray-600 dark:text-facebook-textSecondary mb-8">Admin Dashboard</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-gray-700 dark:text-facebook-text font-medium text-sm">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required', })}
                            className="w-full py-3 px-4 mt-2 text-sm bg-gray-50 dark:bg-facebook-surface border border-gray-300 dark:border-facebook-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted"
                            placeholder="admin@example.com"
                        />
                        {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email?.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="Password" className="block text-gray-700 dark:text-facebook-text font-medium text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="Password"
                                {...register('password', { required: 'Password is required', })}
                                className="w-full py-3 px-4 mt-2 text-sm bg-gray-50 dark:bg-facebook-surface border border-gray-300 dark:border-facebook-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted"
                                placeholder="Enter your password"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute top-5 md:top-7 right-3 -translate-y-1/2 text-gray-500 dark:text-facebook-textSecondary">
                                {showPassword ? <MdVisibilityOff size="1.3em" /> : <MdVisibility size="1.3em" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password?.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3 text-base font-medium text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-600 dark:to-blue-700 shadow-lg hover:shadow-xl">
                        {isSubmitting ?
                            <ColorRing
                                visible={true}
                                height="24"
                                width="24"
                                colors={['#3B82F6', "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"]}
                                wrapperStyle={{ margin: "0 auto" }}
                            />
                            :
                            <>Sign In</>
                        }
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-facebook-textMuted">
                    <p>Admin access only</p>
                </div>
            </div>
        </div>
    );
}

export default Login;