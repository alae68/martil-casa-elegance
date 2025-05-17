import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useProperties } from '@/contexts/PropertiesContext';
import AdminLayout from '@/components/AdminLayout';
import PropertyForm from '@/components/PropertyForm';
import { Button } from '@/components/ui/button';
import { Property } from '@/data/properties';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminProperties = () => {
  const { toast } = useToast();
  const { properties, addProperty, updateProperty, deleteProperty, loading } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowPropertyModal(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyModal(true);
  };

  const handleDeleteProperty = (id: string) => {
    deleteProperty(id);
    
    toast({
      title: "Property Deleted",
      description: "The property has been successfully deleted.",
    });
  };

  const handleSaveProperty = (formData: any) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, {
        ...formData,
        rating: editingProperty.rating || 0,
        reviews: editingProperty.reviews || 0,
      });
      
      toast({
        title: "Property Updated",
        description: "The property has been successfully updated.",
      });
    } else {
      addProperty({
        ...formData,
        rating: 0,
        reviews: 0,
      });
      
      toast({
        title: "Property Added",
        description: "The new property has been successfully added.",
      });
    }
    
    setShowPropertyModal(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Properties" currentPath="/admin/properties">
        <div className="flex justify-center items-center h-64">
          <p>Loading properties...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Properties" currentPath="/admin/properties">
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
        
        <Button 
          onClick={handleAddProperty}
          className="bg-moroccan-blue text-white hover:bg-moroccan-blue/90 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add New Property</span>
        </Button>
      </div>
      
      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {property.location}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-gray-900">${property.price}</div>
                    <div className="text-xs text-gray-500">per {property.priceUnit}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    <div>{property.bedrooms} BR • {property.bathrooms} BA</div>
                    <div className="text-xs text-gray-400">Up to {property.capacity} guests</div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${property.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {property.featured ? 'Featured' : 'Standard'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
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
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                <Button 
                  onClick={handleAddProperty}
                  className="bg-moroccan-blue hover:bg-moroccan-blue/90"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add new property
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Property Form Modal */}
      {showPropertyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <PropertyForm
            property={editingProperty || undefined}
            onSubmit={handleSaveProperty}
            onCancel={() => setShowPropertyModal(false)}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProperties;
