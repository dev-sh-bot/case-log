import { useState } from 'react';
import { FaCog, FaUser, FaShieldAlt, FaBell, FaSave, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSaving, setIsSaving] = useState(false);

    // Dashboard Settings
    const [dashboardSettings, setDashboardSettings] = useState({
        autoRefresh: true,
        refreshInterval: 30, // seconds
        showNotifications: true,
        darkMode: false,
        compactView: false
    });

    // Profile Settings
    const [profileSettings, setProfileSettings] = useState({
        fullName: 'Admin User',
        email: 'admin@caselogtech.com',
        role: 'System Administrator',
        timezone: 'UTC-05:00',
        dateFormat: 'MM/DD/YYYY',
        language: 'English'
    });

    // Notification Settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        systemAlerts: true,
        caseUpdates: true,
        newTechnicians: false,
        criticalIssues: true,
        dailyReports: true
    });

    // Security Settings
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false,
        sessionTimeout: 120, // minutes
        passwordExpiry: 90, // days
        loginAttempts: 5,
        auditLogging: true
    });

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            // Simulate API call to save settings
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Settings saved successfully!');
        } catch {
            alert('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    const toggleSetting = (category, setting) => {
        switch (category) {
            case 'dashboard':
                setDashboardSettings(prev => ({
                    ...prev,
                    [setting]: !prev[setting]
                }));
                break;
            case 'notifications':
                setNotificationSettings(prev => ({
                    ...prev,
                    [setting]: !prev[setting]
                }));
                break;
            case 'security':
                setSecuritySettings(prev => ({
                    ...prev,
                    [setting]: !prev[setting]
                }));
                break;
            default:
                break;
        }
    };

    const handleInputChange = (category, field, value) => {
        switch (category) {
            case 'profile':
                setProfileSettings(prev => ({
                    ...prev,
                    [field]: value
                }));
                break;
            case 'dashboard':
                setDashboardSettings(prev => ({
                    ...prev,
                    [field]: value
                }));
                break;
            case 'security':
                setSecuritySettings(prev => ({
                    ...prev,
                    [field]: value
                }));
                break;
            default:
                break;
        }
    };

    return (
        <div className="page-section">

            <div className="flex h-full">
                {/* Left Sidebar */}
                <div className="w-64 page-card mr-6">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>

                        {/* Tab Navigation */}
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'dashboard'
                                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <FaCog className="text-lg" />
                                <span className="font-medium text-sm">Dashboard</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'profile'
                                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <FaUser className="text-lg" />
                                <span className="font-medium text-sm">Profile</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'notifications'
                                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <FaBell className="text-lg" />
                                <span className="font-medium text-sm">Notifications</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'security'
                                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <FaShieldAlt className="text-lg" />
                                <span className="font-medium text-sm">Security</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="page-header mb-6">
                        <div>
                            <h1 className="page-title">
                                {activeTab === 'dashboard' ? 'Dashboard Settings' :
                                    activeTab === 'profile' ? 'Profile Settings' :
                                        activeTab === 'notifications' ? 'Notification Settings' :
                                            'Security Settings'}
                            </h1>
                            <p className="page-subtitle mt-1">
                                {activeTab === 'dashboard' ? 'Configure your dashboard preferences and display options' :
                                    activeTab === 'profile' ? 'Manage your account information and preferences' :
                                        activeTab === 'notifications' ? 'Control how and when you receive notifications' :
                                            'Manage security settings and authentication options'}
                            </p>
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                            className="flex items-center px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50"
                            style={{ backgroundColor: '#0B1F3A' }}
                        >
                            <FaSave className="mr-2" size={14} />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                    {/* Settings Content */}
                    <div className="space-y-6">
                        {/* Dashboard Settings */}
                        {activeTab === 'dashboard' && (
                            <div className="page-card p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Preferences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Auto Refresh</p>
                                            <p className="text-sm text-gray-500">Automatically refresh dashboard data</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('dashboard', 'autoRefresh')}
                                            className={`text-2xl ${dashboardSettings.autoRefresh ? 'text-blue-600' : 'text-gray-400'}`}
                                        >
                                            {dashboardSettings.autoRefresh ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Show Notifications</p>
                                            <p className="text-sm text-gray-500">Display notification badges on dashboard</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('dashboard', 'showNotifications')}
                                            className={`text-2xl ${dashboardSettings.showNotifications ? 'text-blue-600' : 'text-gray-400'}`}
                                        >
                                            {dashboardSettings.showNotifications ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Compact View</p>
                                            <p className="text-sm text-gray-500">Use compact layout for dashboard cards</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('dashboard', 'compactView')}
                                            className={`text-2xl ${dashboardSettings.compactView ? 'text-blue-600' : 'text-gray-400'}`}
                                        >
                                            {dashboardSettings.compactView ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </div>

                                    <div className="p-3 border border-gray-200 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-700">Refresh Interval (seconds)</label>
                                        <input
                                            type="number"
                                            min="10"
                                            max="300"
                                            value={dashboardSettings.refreshInterval}
                                            onChange={(e) => handleInputChange('dashboard', 'refreshInterval', parseInt(e.target.value))}
                                            className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Profile Settings */}
                        {activeTab === 'profile' && (
                            <div className="page-card p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileSettings.fullName}
                                            onChange={(e) => handleInputChange('profile', 'fullName', e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={profileSettings.email}
                                            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                        <input
                                            type="text"
                                            value={profileSettings.role}
                                            disabled
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Timezone</label>
                                        <select
                                            value={profileSettings.timezone}
                                            onChange={(e) => handleInputChange('profile', 'timezone', e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="UTC-05:00">Eastern Time (UTC-05:00)</option>
                                            <option value="UTC-06:00">Central Time (UTC-06:00)</option>
                                            <option value="UTC-07:00">Mountain Time (UTC-07:00)</option>
                                            <option value="UTC-08:00">Pacific Time (UTC-08:00)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notification Settings */}
                        {activeTab === 'notifications' && (
                            <div className="page-card p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                                <div className="space-y-4">
                                    {Object.entries(notificationSettings).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {key === 'emailNotifications' ? 'Receive notifications via email' :
                                                        key === 'systemAlerts' ? 'Get alerts for system issues' :
                                                            key === 'caseUpdates' ? 'Notifications for case status changes' :
                                                                key === 'newTechnicians' ? 'Notify when new technicians are added' :
                                                                    key === 'criticalIssues' ? 'Immediate alerts for critical issues' :
                                                                        'Daily summary reports'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggleSetting('notifications', key)}
                                                className={`text-2xl ${value ? 'text-blue-600' : 'text-gray-400'}`}
                                            >
                                                {value ? <FaToggleOn /> : <FaToggleOff />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <div className="page-card p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Configuration</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('security', 'twoFactorAuth')}
                                            className={`text-2xl ${securitySettings.twoFactorAuth ? 'text-blue-600' : 'text-gray-400'}`}
                                        >
                                            {securitySettings.twoFactorAuth ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Audit Logging</p>
                                            <p className="text-sm text-gray-500">Track all administrative actions</p>
                                        </div>
                                        <button
                                            onClick={() => toggleSetting('security', 'auditLogging')}
                                            className={`text-2xl ${securitySettings.auditLogging ? 'text-blue-600' : 'text-gray-400'}`}
                                        >
                                            {securitySettings.auditLogging ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 border border-gray-200 rounded-lg">
                                            <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                                            <input
                                                type="number"
                                                min="30"
                                                max="480"
                                                value={securitySettings.sessionTimeout}
                                                onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="p-3 border border-gray-200 rounded-lg">
                                            <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
                                            <input
                                                type="number"
                                                min="3"
                                                max="10"
                                                value={securitySettings.loginAttempts}
                                                onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 