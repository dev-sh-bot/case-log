// Mock API service for demo mode
// This simulates API endpoints without making actual HTTP requests

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock managers data
const mockManagers = [
  { id: 1, name: 'Sarah Williams' },
  { id: 2, name: 'Mike Johnson' },
  { id: 3, name: 'Lisa Anderson' },
  { id: 4, name: 'Robert Wilson' },
  { id: 5, name: 'Jennifer Davis' }
];

// Mock technicians data
const mockTechnicians = [
  {
    id: 1,
    fullName: 'John Smith',
    email: 'john.smith@caselogtech.com',
    managerName: 'Sarah Williams',
    managerId: 1,
    password: '********',
    createdAt: '2024-01-16',
    status: 'active',
    casesCompleted: 45
  },
  {
    id: 2,
    fullName: 'Emma Johnson',
    email: 'emma.johnson@caselogtech.com',
    managerName: 'Mike Johnson',
    managerId: 2,
    password: '********',
    createdAt: '2024-01-22',
    status: 'active',
    casesCompleted: 38
  },
  {
    id: 3,
    fullName: 'David Brown',
    email: 'david.brown@caselogtech.com',
    managerName: 'Lisa Anderson',
    managerId: 3,
    password: '********',
    createdAt: '2024-02-05',
    status: 'active',
    casesCompleted: 52
  },
  {
    id: 4,
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@caselogtech.com',
    managerName: 'Robert Wilson',
    managerId: 4,
    password: '********',
    createdAt: '2024-02-12',
    status: 'inactive',
    casesCompleted: 28
  },
  {
    id: 5,
    fullName: 'Michael Davis',
    email: 'michael.davis@caselogtech.com',
    managerName: 'Jennifer Davis',
    managerId: 5,
    password: '********',
    createdAt: '2024-02-20',
    status: 'active',
    casesCompleted: 33
  },
  {
    id: 6,
    fullName: 'Lisa Thompson',
    email: 'lisa.thompson@caselogtech.com',
    managerName: 'Sarah Williams',
    managerId: 1,
    password: '********',
    createdAt: '2024-02-25',
    status: 'active',
    casesCompleted: 41
  }
];

// Mock API functions
export const mockApi = {
  // GET /manager-list - returns id and name
  async getManagerList() {
    await delay(500); // Simulate network delay
    return {
      success: true,
      data: mockManagers.map(manager => ({
        id: manager.id,
        name: manager.name
      }))
    };
  },

  // GET /managers - returns full manager data
  async getManagers() {
    await delay(300);
    return {
      success: true,
      data: mockManagers
    };
  },

  // GET /technicians - returns full technician data
  async getTechnicians() {
    await delay(400);
    return {
      success: true,
      data: mockTechnicians
    };
  },

  // POST /managers - create new manager
  async createManager(managerData) {
    await delay(1000);
    const newManager = {
      id: Math.max(...mockManagers.map(m => m.id)) + 1,
      ...managerData,
      createdAt: new Date().toISOString().split('T')[0],
      technicianCount: 0
    };
    mockManagers.push(newManager);
    return {
      success: true,
      data: newManager,
      message: 'Manager created successfully'
    };
  },

  // POST /technicians - create new technician
  async createTechnician(technicianData) {
    await delay(1000);
    const newTechnician = {
      id: Math.max(...mockTechnicians.map(t => t.id)) + 1,
      ...technicianData,
      managerName: mockManagers.find(m => m.id === parseInt(technicianData.manager_id))?.name || 'Unknown',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      casesCompleted: 0
    };
    mockTechnicians.push(newTechnician);
    return {
      success: true,
      data: newTechnician,
      message: 'Technician created successfully'
    };
  },

  // DELETE /managers/:id
  async deleteManager(id) {
    await delay(500);
    const index = mockManagers.findIndex(m => m.id === id);
    if (index > -1) {
      mockManagers.splice(index, 1);
      return {
        success: true,
        message: 'Manager deleted successfully'
      };
    }
    throw new Error('Manager not found');
  },

  // DELETE /technicians/:id
  async deleteTechnician(id) {
    await delay(500);
    const index = mockTechnicians.findIndex(t => t.id === id);
    if (index > -1) {
      mockTechnicians.splice(index, 1);
      return {
        success: true,
        message: 'Technician deleted successfully'
      };
    }
    throw new Error('Technician not found');
  }
};

export default mockApi; 