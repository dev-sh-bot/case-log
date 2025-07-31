export const APP_URL = "http://localhost:3000/";
export const API_URL = "https://caselog.techvince.com/api/";
export const ASSETS_URL = "https://caselog.techvince.com/"
export const itemsPerPage = 25;

export const dummyOptions = [
    {
        label: 'Home',
        type: 'link',
        href: '/',
    },
    {
        label: 'Profile',
        type: 'link',
        href: '/profile',
    },
    {
        label: 'Settings',
        type: 'link',
        href: '/settings',
    },
    {
        label: 'Log Out',
        type: 'button',
        action: () => {
            console.log('Logging out...');
        },
    },
];

export const CasePriority = {
    'low': {
        status: "Low Priority",
        badgeColor: "bg-green-100",
        color: "text-green-600",
        dotColor: "bg-green-600"
    },
    'medium': {
        status: "Medium Priority",
        badgeColor: "bg-yellow-100",
        color: "text-yellow-600",
        dotColor: "bg-yellow-600"
    },
    'high': {
        status: "High Priority",
        badgeColor: "bg-red-100",
        color: "text-red-600",
        dotColor: "bg-red-600"
    }
}

export const CaseStatus = {
    'pending': {
        name: "Pending",
        color: "orange",
        badgeColor: "bg-yellow-100",
        textColor: "text-yellow-600"
    },
    'in_progress': {
        name: "In Progress",
        color: "blue",
        badgeColor: "bg-blue-100",
        textColor: "text-blue-600"
    },
    'completed': {
        name: "Completed",
        color: "green",
        badgeColor: "bg-green-100",
        textColor: "text-green-600"
    },
    'cancelled': {
        name: "Cancelled",
        color: "red",
        badgeColor: "bg-red-100",
        textColor: "text-red-600"
    },
}

export const TechnicianStatus = {
    'active': {
        name: "Active",
        color: "green",
        badgeColor: "bg-green-100",
        textColor: "text-green-600"
    },
    'inactive': {
        name: "Inactive",
        color: "gray",
        badgeColor: "bg-gray-100",
        textColor: "text-gray-600"
    },
    'suspended': {
        name: "Suspended",
        color: "red",
        badgeColor: "bg-red-100",
        textColor: "text-red-600"
    }
};