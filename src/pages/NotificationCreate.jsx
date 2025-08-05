import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBell, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { triggerToast } from '../utils/helper';

const NotificationCreate = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await api.createNotification(data);
            if (response) {
                triggerToast('Notification created successfully!', 'success');
                reset();
                navigate(-1);
            } else {
                throw new Error('Failed to create notification');
            }
        } catch (error) {
            console.error('Failed to create notification:', error);
            triggerToast('Failed to create notification. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="page-section">
            {/* Form Content */}
            <div className="page-card p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaBell className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="title"
                                {...register('title', {
                                    required: 'Title is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Title must be at least 3 characters'
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: 'Title must be less than 100 characters'
                                    }
                                })}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted ${errors.title
                                    ? 'border-red-300 dark:border-red-500'
                                    : 'border-gray-300 dark:border-facebook-border'
                                    }`}
                                placeholder="Enter notification title"
                            />
                        </div>
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters'
                                },
                                maxLength: {
                                    value: 500,
                                    message: 'Description must be less than 500 characters'
                                }
                            })}
                            rows={6}
                            className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted resize-vertical ${errors.description
                                ? 'border-red-300 dark:border-red-500'
                                : 'border-gray-300 dark:border-facebook-border'
                                }`}
                            placeholder="Enter notification description"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 dark:text-facebook-textMuted">
                            Provide a detailed description for the notification (10-500 characters)
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-facebook-border">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-facebook-textSecondary bg-gray-100 dark:bg-facebook-surface rounded-lg hover:bg-gray-200 dark:hover:bg-facebook-hover transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all disabled:opacity-50 shadow-md hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <FaSave className="mr-2" />
                                    Create Notification
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotificationCreate;