import React, { useState } from 'react';
import { User, Plus, Edit, Trash2, Shield, Users, Settings } from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRoleProps {
  onClose: () => void;
}

const UserRole: React.FC<UserRoleProps> = ({ onClose }) => {
  const [roles, setRoles] = useState<UserRole[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['users.read', 'users.write', 'users.delete', 'system.admin', 'network.full', 'monitoring.full'],
      userCount: 2,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Network Admin',
      description: 'Network management and monitoring permissions',
      permissions: ['network.read', 'network.write', 'monitoring.read', 'devices.read', 'devices.write'],
      userCount: 5,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '3',
      name: 'Network Operator',
      description: 'Read-only access to network information',
      permissions: ['network.read', 'monitoring.read', 'devices.read'],
      userCount: 12,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '4',
      name: 'Guest',
      description: 'Limited read-only access',
      permissions: ['dashboard.read'],
      userCount: 3,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<UserRole | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const availablePermissions = [
    { category: 'User Management', permissions: ['users.read', 'users.write', 'users.delete'] },
    { category: 'System', permissions: ['system.admin', 'system.settings'] },
    { category: 'Network', permissions: ['network.read', 'network.write', 'network.full'] },
    { category: 'Devices', permissions: ['devices.read', 'devices.write', 'devices.delete'] },
    { category: 'Monitoring', permissions: ['monitoring.read', 'monitoring.write', 'monitoring.full'] },
    { category: 'Dashboard', permissions: ['dashboard.read'] }
  ];

  const handleCreateRole = () => {
    if (newRole.name && newRole.description) {
      const role: UserRole = {
        id: Date.now().toString(),
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        userCount: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowCreateModal(false);
    }
  };

  const handleEditRole = (role: UserRole) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowCreateModal(true);
  };

  const handleUpdateRole = () => {
    if (editingRole && newRole.name && newRole.description) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...newRole, updatedAt: new Date() }
          : role
      ));
      setEditingRole(null);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowCreateModal(false);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const togglePermission = (permission: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const getPermissionLabel = (permission: string) => {
    const labels: { [key: string]: string } = {
      'users.read': 'View Users',
      'users.write': 'Create/Edit Users',
      'users.delete': 'Delete Users',
      'system.admin': 'System Administration',
      'system.settings': 'System Settings',
      'network.read': 'View Network',
      'network.write': 'Manage Network',
      'network.full': 'Full Network Access',
      'devices.read': 'View Devices',
      'devices.write': 'Manage Devices',
      'devices.delete': 'Delete Devices',
      'monitoring.read': 'View Monitoring',
      'monitoring.write': 'Manage Monitoring',
      'monitoring.full': 'Full Monitoring Access',
      'dashboard.read': 'View Dashboard'
    };
    return labels[permission] || permission;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Roles</h1>
            <p className="text-gray-400">Manage user roles and permissions</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setEditingRole(null);
                setNewRole({ name: '', description: '', permissions: [] });
                setShowCreateModal(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Role</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                    <p className="text-sm text-gray-400">{role.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    disabled={role.userCount > 0}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{role.userCount} users</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  role.isActive 
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-red-900 text-red-300'
                }`}>
                  {role.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Permissions</h4>
                <div className="space-y-1">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <div key={permission} className="text-xs text-gray-400">
                      • {getPermissionLabel(permission)}
                    </div>
                  ))}
                  {role.permissions.length > 3 && (
                    <div className="text-xs text-blue-400">
                      +{role.permissions.length - 3} more permissions
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-semibold text-white mb-6">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role Name
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter role description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {availablePermissions.map((category) => (
                      <div key={category.category}>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">
                          {category.category}
                        </h4>
                        <div className="space-y-2">
                          {category.permissions.map((permission) => (
                            <label key={permission} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(permission)}
                                onChange={() => togglePermission(permission)}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-300">
                                {getPermissionLabel(permission)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingRole(null);
                    setNewRole({ name: '', description: '', permissions: [] });
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingRole ? handleUpdateRole : handleCreateRole}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingRole ? 'Update Role' : 'Create Role'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRole;
