import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaBell, FaSave, FaUsers, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { triggerToast } from '../utils/helper';
import CustomSelect from '../components/Select';
import { InlineLoader, ButtonLoader } from '../components/Loaders';

const NotificationCreate = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [managers, setManagers] = useState([]);
    const [isLoadingManagers, setIsLoadingManagers] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        control
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            type: 'all',
            manager_ids: []
        }
    });

    const watchType = watch('type');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const payload = {
                title: data.title,
                description: data.description,
                type: data.type
            };
            
            if (data.type === 'specific' && data.manager_ids && data.manager_ids.length > 0) {
                payload.manager_ids = data.manager_ids;
            }
            
            const response = await api.createNotification(payload);
            if (response) {
                triggerToast('Notification created successfully!', 'success');
                reset();
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

    const fetchManagers = async () => {
        setIsLoadingManagers(true);
        try {
            const response = await api.getManagerList();
            setManagers(response || []);
        } catch (error) {
            console.error('Failed to fetch managers:', error);
            triggerToast('Failed to fetch managers list', 'error');
        } finally {
            setIsLoadingManagers(false);
        }
    };

    useEffect(() => {
        if (watchType === 'specific') {
            fetchManagers();
        }
    }, [watchType]);

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

                    {/* Type Field */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                            Notification Type <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="relative cursor-pointer">
                                <input
                                    type="radio"
                                    {...register('type', { required: 'Please select a notification type' })}
                                    value="all"
                                    className="sr-only"
                                />
                                <div className={`flex items-center justify-center p-4 border rounded-lg transition-all ${
                                    watchType === 'all'
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-300 dark:border-facebook-border bg-white dark:bg-facebook-surface hover:bg-gray-50 dark:hover:bg-facebook-hover'
                                }`}>
                                    <FaGlobe className="mr-3 text-lg dark:text-white" />
                                    <div className="text-center">
                                        <div className="font-medium dark:text-white">All Managers</div>
                                        <div className="text-sm text-gray-500 dark:text-facebook-textMuted">Send to everyone</div>
                                    </div>
                                </div>
                            </label>
                            <label className="relative cursor-pointer">
                                <input
                                    type="radio"
                                    {...register('type', { required: 'Please select a notification type' })}
                                    value="specific"
                                    className="sr-only"
                                />
                                <div className={`flex items-center justify-center p-4 border rounded-lg transition-all ${
                                    watchType === 'specific'
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                        : 'border-gray-300 dark:border-facebook-border bg-white dark:bg-facebook-surface hover:bg-gray-50 dark:hover:bg-facebook-hover'
                                }`}>
                                    <FaUsers className="mr-3 text-lg dark:text-white" />
                                    <div className="text-center">
                                        <div className="font-medium dark:text-white">Specific Managers</div>
                                        <div className="text-sm text-gray-500 dark:text-facebook-textMuted">Select recipients</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        {errors.type && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type.message}</p>
                        )}
                    </div>

                    {/* Manager Selection - Only show when type is 'specific' */}
                    {watchType === 'specific' && (
                        <div>
                            <label htmlFor="manager_ids" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                                Select Managers <span className="text-red-500">*</span>
                            </label>
                            {isLoadingManagers ? (
                                <div className="p-4 border border-gray-300 dark:border-facebook-border rounded-lg bg-white dark:bg-facebook-surface">
                                    <InlineLoader text="Loading managers..." />
                                </div>
                            ) : managers.length > 0 ? (
                                <Controller
                                    name="manager_ids"
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (watchType === 'specific' && (!value || value.length === 0)) {
                                                return 'Please select at least one manager';
                                            }
                                            return true;
                                        }
                                    }}
                                    render={({ field }) => (
                                        <CustomSelect
                                            {...field}
                                            isMulti={true}
                                            options={managers.map(manager => ({
                                                value: manager.id,
                                                label: `${manager.name} (${manager.email})`
                                            }))}
                                            placeholder="Select managers..."
                                            value={field.value ? managers
                                                .filter(manager => field.value.includes(manager.id))
                                                .map(manager => ({
                                                    value: manager.id,
                                                    label: `${manager.name} (${manager.email})`
                                                })) : []
                                            }
                                            onChange={(selectedOptions) => {
                                                const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                                field.onChange(values);
                                            }}
                                        />
                                    )}
                                />
                            ) : (
                                <div className="flex items-center justify-center p-4 border border-gray-300 dark:border-facebook-border rounded-lg bg-white dark:bg-facebook-surface">
                                    <span className="text-gray-500 dark:text-facebook-textMuted">No managers found</span>
                                </div>
                            )}
                            <p className="mt-2 text-xs text-gray-500 dark:text-facebook-textMuted">
                                You can select multiple managers from the dropdown
                            </p>
                            {errors.manager_ids && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.manager_ids.message}</p>
                            )}
                        </div>
                    )}

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
                            className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all disabled:opacity-50 shadow-md hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
                        >
                            {isSubmitting ? (
                                <ButtonLoader text="Creating..." />
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