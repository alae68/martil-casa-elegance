import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Plus, Edit, Trash, Search } from 'lucide-react';
import { properties } from '@/data/properties';
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  // We're using the same AdminLayout from AdminDashboard.tsx
  // In a real application, this would be a separate component to avoid duplication
  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: Building 
    },
    { 
      name: 'Properties', 
      path: '/admin/properties', 
      icon: Building 
    },
    // ... other sidebar items
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-moroccan-blue text-white p-2 rounded">
              <span className="font-serif text-sm">M</span>
            </div>
            <div className="font-serif text-lg text-moroccan-blue">
              <span>Martil</span>
              <span className="text-moroccan-gold">Haven</span>
            </div>
          </Link>
        </div>
        <div className="py-4">
          <div className="px-4 mb-4">
            <p className="text-xs uppercase font-medium text-gray-500">Main</p>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  item.path === '/admin/properties'
                    ? 'bg-moroccan-blue/10 text-moroccan-blue border-r-4 border-moroccan-blue'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="px-4 mt-8 mb-4">
            <p className="text-xs uppercase font-medium text-gray-500">Settings</p>
          </div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              {/*<Settings size={18} className="mr-3" />*/}
              <span>General Settings</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              {/*<Database size={18} className="mr-3" />*/}
              <span>System</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-800">{title}</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminProperties = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  
  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowPropertyModal(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowPropertyModal(true);
  };

  const handleDeleteProperty = (id: string) => {
    // In a real application, this would call an API to delete the property
    console.log(`Deleting property with ID: ${id}`);
    
    toast({
      title: "Property Deleted",
      description: "The property has been successfully deleted.",
    });
  };

  const handleSaveProperty = (formData: any) => {
    // In a real application, this would call an API to save the property
    console.log('Saving property:', formData);
    
    toast({
      title: editingProperty ? "Property Updated" : "Property Added",
      description: editingProperty 
        ? "The property has been successfully updated." 
        : "The new property has been successfully added.",
    });
    
    setShowPropertyModal(false);
  };

  return (
    <AdminLayout title="Properties">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search properties..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-moroccan-blue focus:border-moroccan-blue w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleAddProperty}
          className="bg-moroccan-blue text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-moroccan-blue/90 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Property</span>
        </button>
      </div>
      
      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                        <img 
                          src={property.images[0]} 
                          alt={property.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-xs text-gray-500 max-w-[200px] truncate">
                          {property.description.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${property.price}</div>
                    <div className="text-xs text-gray-500">per {property.priceUnit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{property.bedrooms} BR • {property.bathrooms} BA</div>
                    <div className="text-xs text-gray-400">Up to {property.capacity} guests</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${property.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {property.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEditProperty(property)}
                        className="text-moroccan-blue hover:text-moroccan-blue/70 transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProperty(property.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <div className="py-12 text-center">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? `No properties match "${searchTerm}"` : 'No properties have been added yet.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={handleAddProperty}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-moroccan-blue hover:bg-moroccan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-moroccan-blue"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add new property
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Property Form Modal - In a real app this would be a separate component */}
      {showPropertyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                // In a real application, you would gather form data here
                handleSaveProperty({
                  // Form data would be collected here
                });
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Basic property details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      defaultValue={editingProperty?.title || ''}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      defaultValue={editingProperty?.location || ''}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-lg">
                        $
                      </span>
                      <input
                        type="number"
                        className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                        defaultValue={editingProperty?.price || ''}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Unit
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      defaultValue={editingProperty?.priceUnit || 'night'}
                    >
                      <option value="night">Per Night</option>
                      <option value="week">Per Week</option>
                      <option value="month">Per Month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      defaultValue={editingProperty?.bedrooms || ''}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      defaultValue={editingProperty?.bathrooms || ''}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Guests
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      defaultValue={editingProperty?.capacity || ''}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="standard"
                          defaultChecked={!editingProperty?.featured}
                          className="h-4 w-4 text-moroccan-blue focus:ring-moroccan-blue border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Standard</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="featured"
                          defaultChecked={editingProperty?.featured}
                          className="h-4 w-4 text-moroccan-blue focus:ring-moroccan-blue border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Featured</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                    defaultValue={editingProperty?.description || ''}
                  ></textarea>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Private Pool', 'Ocean View', 'Air Conditioning', 'Free WiFi', 
                      'Full Kitchen', 'Terrace', 'Garden', 'BBQ Area', 'Parking',
                      'Courtyard', 'Rooftop Terrace', 'Traditional Hammam'
                    ].map(amenity => (
                      <label key={amenity} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-moroccan-blue focus:ring-moroccan-blue border-gray-300 rounded"
                          defaultChecked={editingProperty?.amenities?.includes(amenity)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Images - In a real app, you'd have proper image uploading */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Images
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(editingProperty?.images || ['', '', '']).map((image: string, index: number) => (
                      <div key={index} className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                        {image ? (
                          <div className="relative w-full h-32">
                            <img
                              src={image}
                              alt={`Property image ${index + 1}`}
                              className="h-full w-full object-cover rounded"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                            >
                              <Trash size={14} className="text-red-500" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Plus className="h-10 w-10 text-gray-300" />
                            <p className="mt-2 text-xs text-gray-500">Upload Image</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowPropertyModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-moroccan-blue text-white rounded-lg hover:bg-moroccan-blue/90 transition"
                  >
                    {editingProperty ? 'Update Property' : 'Add Property'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProperties;
