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

            if (response.success) {
                const user = {
                    id: response.data?.id || 1,
                    name: response.data?.name || 'Admin User',
                    email: data.email,
                    token: response.data?.token || response.token,
                    role: response.data?.role || 'admin'
                };

                dispatch(addUser(user));
                triggerToast('Login successful', 'success');
                navigate('/', { replace: true });
            } else {
                throw new Error(response.message || 'Login failed');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            triggerToast(error.message || 'Login failed. Please check your credentials.', 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-800 dark:bg-facebook-dark">
            <div className="w-full max-w-md bg-white dark:bg-facebook-card rounded-2xl shadow-2xl p-8 flex flex-col items-center">
                <img src={LOGO} className="w-28 mb-4" alt="Case Log" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-facebook-text mb-2">CASE LOG</h1>
                <p className="text-gray-600 dark:text-facebook-textSecondary mb-8">Admin Dashboard</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
                    <label htmlFor="email" className="block">
                        <span className="text-gray-700 dark:text-facebook-text font-medium text-sm">Email Address</span>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required', })}
                            className="w-full py-3 px-4 mt-2 text-sm bg-gray-50 dark:bg-facebook-surface border border-gray-300 dark:border-facebook-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted"
                            placeholder="admin@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
                    </label>

                    <label htmlFor="Password" className="block">
                        <span className="text-gray-700 dark:text-facebook-text font-medium text-sm">Password</span>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="Password"
                                {...register('password', { required: 'Password is required', })}
                                className="w-full py-3 px-4 mt-2 text-sm bg-gray-50 dark:bg-facebook-surface border border-gray-300 dark:border-facebook-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted"
                                placeholder="Enter your password"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute top-7 right-3 -translate-y-1/2 text-gray-500 dark:text-facebook-textSecondary">
                                {showPassword ? <MdVisibilityOff size="1.3em" /> : <MdVisibility size="1.3em" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>}
                    </label>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3 text-base font-medium text-white rounded-lg transition disabled:opacity-50 flex items-center justify-center mt-6 bg-slate-800 dark:bg-facebook-dark hover:bg-slate-700 dark:hover:bg-facebook-hover">
                        {isSubmitting ?
                            <ColorRing
                                visible={true}
                                height="24"
                                width="24"
                                colors={['#8484c1', "#8484c1", "#8484c1", "#8484c1", "#8484c1"]}
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