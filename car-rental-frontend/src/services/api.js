// Production API base URL
const API_BASE = 'https://carflow-reservation-system.onrender.com/api';

// Tenant email for RIVAL company
const TENANT_EMAIL = 'rival@test.sk';

// API Configuration
const API_CONFIG = {
  // Use tenant-specific endpoints when available
  useTenantEndpoints: true,
  // Fallback to general endpoints if tenant-specific fail
  enableFallback: true,
  // Use mock data for development (set to false when API is ready)
  useMockData: true
};

// Mock data for development/fallback
const mockCarsData = [
  {
    _id: 'mock1',
    brand: 'Škoda',
    model: 'Octavia',
    year: 2023,
    category: 'stredna',
    fuelType: 'gasoline',
    transmission: 'manual',
    seats: 5,
    doors: 4,
    dailyRate: 45,
    weeklyRate: 280,
    monthlyRate: 1100,
    description: 'Moderný a spoľahlivý sedan, ideálny pre dlhšie cesty.',
    features: ['air-conditioning', 'gps', 'bluetooth'],
    images: [
      {
        url: '/api/placeholder/600/400',
        description: 'Škoda Octavia',
        isPrimary: true
      }
    ],
    location: {
      name: 'Banská Bystrica',
      address: {
        street: 'Zvolenská cesta 6465/8',
        city: 'Banská Bystrica',
        zipCode: '974 05',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'mock2',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    category: 'ekonomicka',
    fuelType: 'gasoline',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 38,
    weeklyRate: 240,
    monthlyRate: 950,
    description: 'Kompaktné auto s nízkou spotrebou paliva.',
    features: ['air-conditioning', 'bluetooth'],
    images: [
      {
        url: '/api/placeholder/600/400',
        description: 'VW Golf',
        isPrimary: true
      }
    ],
    location: {
      name: 'Zvolen',
      address: {
        street: 'Obchodná 9520/4',
        city: 'Zvolen',
        zipCode: '960 01',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'mock3',
    brand: 'BMW',
    model: 'X3',
    year: 2023,
    category: 'vyssia',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 85,
    weeklyRate: 550,
    monthlyRate: 2200,
    description: 'Luxusné SUV s vynikajúcim výkonom.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats', 'leather-seats'],
    images: [
      {
        url: '/api/placeholder/600/400',
        description: 'BMW X3',
        isPrimary: true
      }
    ],
    location: {
      name: 'Banská Bystrica',
      address: {
        street: 'Zvolenská cesta 6465/8',
        city: 'Banská Bystrica',
        zipCode: '974 05',
        country: 'Slovensko'
      }
    }
  }
];

// Helper function to get auth token
const getToken = () => localStorage.getItem('authToken');

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Authentication API
export const authAPI = {
  // Register a new customer
  register: async (customerData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...customerData,
        role: 'customer', // Always set to customer
      })
    });

    const result = await handleResponse(response);
    
    if (result.success) {
      localStorage.setItem('authToken', result.token);
      return result.user;
    } else {
      throw new Error(result.message);
    }
  },

  // Login customer
  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await handleResponse(response);
    
    if (result.success) {
      localStorage.setItem('authToken', result.token);
      return result.user;
    } else {
      throw new Error(result.message);
    }
  },

  // Get current user info
  getCurrentUser: async () => {
    const token = getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = await handleResponse(response);
      return result.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      return null;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  }
};

// Cars API (Using Tenant-Specific Public Endpoints)
export const carsAPI = {
  // Get all available cars for RIVAL tenant
  getAvailableCars: async (filters = {}) => {
    // Use mock data if configured
    if (API_CONFIG.useMockData) {
      console.log('Using mock data for cars');
      return mockCarsData;
    }

    const queryParams = new URLSearchParams({
      ...filters
    });

    // Try tenant-specific endpoint first
    if (API_CONFIG.useTenantEndpoints) {
      try {
        const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars?${queryParams}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await handleResponse(response);
          console.log('Cars returned from tenant API:', result.data?.length || 0, 'cars');
          return result.data || [];
        }
      } catch (error) {
        console.warn('Tenant-specific API failed, trying fallback:', error.message);
      }
    }

    // Fallback to general endpoint or mock data
    if (API_CONFIG.enableFallback) {
      try {
        const response = await fetch(`${API_BASE}/public/cars?${queryParams}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await handleResponse(response);
        console.log('Cars returned from fallback API:', result.data?.length || 0, 'cars');
        return result.data || [];
      } catch (error) {
        console.warn('Fallback API also failed, using mock data:', error.message);
        // Return mock data for development
        return mockCarsData;
      }
    }

    return [];
  },

  // Get single car details for RIVAL tenant
  getCarDetails: async (carId) => {
    // Try tenant-specific endpoint first
    if (API_CONFIG.useTenantEndpoints) {
      try {
        const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await handleResponse(response);
          return result.data;
        }
      } catch (error) {
        console.warn('Tenant-specific car details failed, trying fallback:', error.message);
      }
    }

    // Fallback to general endpoint or mock data
    if (API_CONFIG.enableFallback) {
      try {
        const response = await fetch(`${API_BASE}/public/cars/${carId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await handleResponse(response);
        return result.data;
      } catch (error) {
        console.warn('Fallback car details also failed, using mock data:', error.message);
        // Return mock data
        return mockCarsData.find(car => car._id === carId) || mockCarsData[0];
      }
    }

    return null;
  },

  // Get car availability for date range for RIVAL tenant
  getCarAvailability: async (carId, startDate, endDate) => {
    const queryParams = new URLSearchParams({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });

    // Try tenant-specific endpoint first
    if (API_CONFIG.useTenantEndpoints) {
      try {
        const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/availability?${queryParams}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await handleResponse(response);
          return result.data || { isAvailable: true, status: 'available' };
        }
      } catch (error) {
        console.warn('Tenant-specific availability check failed, trying fallback:', error.message);
      }
    }

    // Fallback to general endpoint or assume available
    if (API_CONFIG.enableFallback) {
      try {
        const response = await fetch(`${API_BASE}/public/cars/${carId}/availability?${queryParams}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await handleResponse(response);
        return result.data || { isAvailable: true, status: 'available' };
      } catch (error) {
        console.warn('Fallback availability check failed, assuming available:', error.message);
      }
    }

    // Default to available
    return { isAvailable: true, status: 'available' };
  },

  // Get cars by category for RIVAL tenant
  getCarsByCategory: async (category) => {
    const response = await fetch(`${API_BASE}/public/users/${TENANT_EMAIL}/cars/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data || [];
  },

  // Get available features for RIVAL tenant
  getFeatures: async () => {
    const response = await fetch(`${API_BASE}/public/users/${TENANT_EMAIL}/features`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data || [];
  }
};

// Reservations API
export const reservationsAPI = {
  // Create a new reservation using RIVAL tenant-specific endpoint
  createPublicReservation: async (reservationData) => {
    console.log('Sending reservation data to RIVAL backend:', reservationData);
    
    // Try tenant-specific endpoint first
    if (API_CONFIG.useTenantEndpoints) {
      try {
        const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/reservations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData)
        });

        if (response.ok) {
          const result = await handleResponse(response);
          return result.data;
        }
      } catch (error) {
        console.warn('Tenant-specific reservation creation failed, trying fallback:', error.message);
      }
    }

    // Fallback to general endpoint
    if (API_CONFIG.enableFallback) {
      try {
        const response = await fetch(`${API_BASE}/public/reservations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData)
        });

        const result = await handleResponse(response);
        return result.data;
      } catch (error) {
        console.error('All reservation endpoints failed:', error.message);
        throw new Error('Rezervácia momentálne nie je možná. Skúste to neskôr alebo nás kontaktujte telefonicky.');
      }
    }

    throw new Error('Rezervácia nie je k dispozícii.');
  },

  // Create a new reservation (authenticated)
  create: async (reservationData) => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData)
    });

    const result = await handleResponse(response);
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },

  // Get customer's reservations
  getMyReservations: async () => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE}/reservations?populate=car`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const result = await handleResponse(response);
    return result.data || [];
  },

  // Cancel reservation
  cancel: async (reservationId, reason) => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE}/reservations/${reservationId}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason })
    });

    const result = await handleResponse(response);
    return result.data;
  }
};

// Utility functions for booking flow
export const bookingAPI = {
  // Complete booking process using PUBLIC API
  completeBooking: async (bookingData, customerData = null) => {
    try {
      let user = await authAPI.getCurrentUser();

      // If no user is logged in, use public reservation endpoint
      if (!user && customerData) {
        // Use public reservation API which auto-creates customer
        const publicReservationData = {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone,
          licenseNumber: customerData.licenseNumber,
          carId: bookingData.selectedCarId,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          pickupLocation: {
            name: bookingData.pickupLocation.name || 'Pickup Location',
            address: {
              street: bookingData.pickupLocation.address || bookingData.pickupLocation.street || '123 Main St',
              city: bookingData.pickupLocation.city || 'New York',
              state: bookingData.pickupLocation.state || 'NY',
              postalCode: bookingData.pickupLocation.postalCode || '10001',
              country: bookingData.pickupLocation.country || 'US'
            }
          },
          dropoffLocation: {
            name: bookingData.dropoffLocation.name || 'Dropoff Location',
            address: {
              street: bookingData.dropoffLocation.address || bookingData.dropoffLocation.street || '123 Main St',
              city: bookingData.dropoffLocation.city || 'New York',
              state: bookingData.dropoffLocation.state || 'NY',
              postalCode: bookingData.dropoffLocation.postalCode || '10001',
              country: bookingData.dropoffLocation.country || 'US'
            }
          },
          specialRequests: bookingData.specialRequests || '',
          // Optional fields
          dateOfBirth: customerData.dateOfBirth,
          licenseExpiry: customerData.licenseExpiry,
          address: customerData.address
        };

        const result = await reservationsAPI.createPublicReservation(publicReservationData);
        
        // The public API should return reservation details and created user info
        return {
          reservation: result.reservation,
          car: result.car || await carsAPI.getCarDetails(bookingData.selectedCarId),
          costs: result.pricing || {
            rentalCost: result.reservation.totalAmount || 0,
            deposit: 0,
            totalCost: result.reservation.totalAmount || 0,
            days: Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))
          },
          user: result.customer,
          credentials: result.credentials // Login credentials for new user
        };
      }

      // If user is logged in, use authenticated endpoint
      if (user) {
        // Get selected car details
        const car = await carsAPI.getCarDetails(bookingData.selectedCarId);

        // Calculate costs
        const days = Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24));
        const rentalCost = car.dailyRate * days;
        const totalCost = rentalCost + (car.deposit || 0);

        // Create reservation using authenticated endpoint
        const reservation = await reservationsAPI.create({
          customer: user._id || user.id,
          car: bookingData.selectedCarId,
          startDate: new Date(bookingData.startDate).toISOString(),
          endDate: new Date(bookingData.endDate).toISOString(),
          pickupLocation: bookingData.pickupLocation,
          dropoffLocation: bookingData.dropoffLocation,
          additionalDrivers: bookingData.additionalDrivers || [],
          specialRequests: bookingData.specialRequests || ''
        });

        return {
          reservation,
          car,
          costs: {
            rentalCost,
            deposit: car.deposit || 0,
            totalCost,
            days
          },
          user
        };
      }

      throw new Error('Authentication required or customer data missing');

    } catch (error) {
      console.error('Booking failed:', error.message);
      throw error;
    }
  }
};

export default {
  auth: authAPI,
  cars: carsAPI,
  reservations: reservationsAPI,
  booking: bookingAPI
}; 