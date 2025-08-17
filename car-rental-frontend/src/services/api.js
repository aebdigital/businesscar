// Production API base URL
const API_BASE = 'https://carflow-reservation-system.onrender.com/api';

// Tenant email for BusinessCar company
const TENANT_EMAIL = 'info@businesscar.sk';

// API Configuration
const API_CONFIG = {
  // Use tenant-specific endpoints when available
  useTenantEndpoints: true,
  // Fallback to general endpoints if tenant-specific fail
  enableFallback: true,
  // Use mock data for development (set to false for production)
  useMockData: false
};


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
  // Get all cars with filtering (main endpoint from README)
  getCars: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add filters to query parameters as documented in README
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.carClass) queryParams.append('carClass', filters.carClass);
    if (filters.fuelType) queryParams.append('fuelType', filters.fuelType);
    if (filters.transmission) queryParams.append('transmission', filters.transmission);
    if (filters.seats) queryParams.append('seats', filters.seats);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.sort) queryParams.append('sort', filters.sort);

    try {
      const url = `${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars?${queryParams}`;
      console.log('🚗 Making API request to:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('📡 API Response status:', response.status);
      const result = await handleResponse(response);
      console.log('✅ API Response data:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Cars API failed:', error);
      return {
        success: false,
        data: [],
        count: 0,
        error: error.message
      };
    }
  },

  // Get single car by ID (README endpoint)
  getCarById: async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Car details API failed:', error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // Get all available cars for RIVAL tenant (legacy method)
  getAvailableCars: async (filters = {}) => {
    const queryParams = new URLSearchParams({
      ...filters
    });

    // Try tenant-specific endpoint first
    if (API_CONFIG.useTenantEndpoints) {
      try {
        const url = `${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars?${queryParams}`;
        console.log('🚗 Legacy API request to:', url);
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('📡 Legacy API Response status:', response.status);
        if (response.ok) {
          const result = await handleResponse(response);
          console.log('✅ Legacy API Response data:', result);
          console.log('Cars returned from tenant API:', result.data?.length || 0, 'cars');
          return result.data || [];
        }
      } catch (error) {
        console.error('❌ Tenant-specific API failed, trying fallback:', error.message);
      }
    }

    // Fallback to general endpoint
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
        console.error('All car API endpoints failed:', error.message);
        return [];
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

    // Fallback to general endpoint
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
        console.error('All car details endpoints failed:', error.message);
        return null;
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
          return result.data || { isAvailable: false, status: 'unknown' };
        }
      } catch (error) {
        console.warn('Tenant-specific availability check failed, trying fallback:', error.message);
      }
    }

    // Fallback to general endpoint
    if (API_CONFIG.enableFallback) {
      try {
        const response = await fetch(`${API_BASE}/public/cars/${carId}/availability?${queryParams}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await handleResponse(response);
        return result.data || { isAvailable: false, status: 'unknown' };
      } catch (error) {
        console.error('All availability check endpoints failed:', error.message);
      }
    }

    // Return unavailable if API fails
    return { isAvailable: false, status: 'unavailable' };
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
  },

  // Additional car-related endpoints from README
  getAvailable: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/available`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getCarSpecifications: async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/specifications`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: true, data: {}, usingMockData: true };
    }
  },

  getCarPricing: async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/pricing`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { 
        success: false, 
        data: {},
        error: error.message
      };
    }
  },

  getCarEquipment: async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/equipment`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { 
        success: false, 
        data: [],
        error: error.message
      };
    }
  },

  getCarBadges: async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/badges`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getCarPhotos: async (carId, options = {}) => {
    const queryParams = new URLSearchParams();
    if (options.size) queryParams.append('size', options.size);
    if (options.includeAll) queryParams.append('includeAll', options.includeAll);
    
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/photos?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { 
        success: false, 
        data: [],
        error: error.message
      };
    }
  },

  getCarBrands: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/brands`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getCarsByBrand: async (brand) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/by-brand/${brand}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getFilterOptions: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/filter-options`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        data: {
          categories: [],
          fuelTypes: [],
          transmissions: [],
          brands: []
        },
        error: error.message
      };
    }
  },

  searchCars: async (searchParams) => {
    const queryParams = new URLSearchParams();
    if (searchParams.query) queryParams.append('query', searchParams.query);
    if (searchParams.brand) queryParams.append('brand', searchParams.brand);
    if (searchParams.model) queryParams.append('model', searchParams.model);
    if (searchParams.minPrice) queryParams.append('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) queryParams.append('maxPrice', searchParams.maxPrice);
    
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/search?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getCarReservedDates: async (carId, dateRange = {}) => {
    const queryParams = new URLSearchParams();
    if (dateRange.startDate) queryParams.append('startDate', dateRange.startDate);
    if (dateRange.endDate) queryParams.append('endDate', dateRange.endDate);
    
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/reserved-dates?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  }
};

// Reservations API
export const reservationsAPI = {
  // Create a new reservation using RIVAL tenant-specific endpoint
  createPublicReservation: async (reservationData) => {
    console.log('Sending reservation data to BusinessCar backend:', reservationData);
    
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

// Additional Services API (from README)
export const additionalServicesAPI = {
  getServices: async () => {
    try {
      // Try tenant-specific endpoint first
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/services`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        return handleResponse(response);
      }
    } catch (error) {
      console.warn('Tenant-specific services endpoint failed:', error);
    }

    // Fallback to general endpoint
    try {
      const response = await fetch(`${API_BASE}/public/services?tenantId=${encodeURIComponent(TENANT_EMAIL)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Services API failed:', error);
      return { success: false, data: [], error: error.message };
    }
  },

  getServicesForVehicle: async (vehicleId) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/services/vehicle/${vehicleId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  calculateServicePrice: async (serviceId, quantity, days, distance, basePrice) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/services/calculate-price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          quantity,
          days,
          distance,
          basePrice
        })
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  verifyDiscountCode: async (code) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/verify-discount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Banner Management API (from README)
export const bannerAPI = {
  getBanners: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/banners`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getActiveBanners: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/banners?active=true`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getBannersByPosition: async (position, page = null) => {
    const queryParams = new URLSearchParams();
    if (position) queryParams.append('position', position);
    if (page) queryParams.append('page', page);
    
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/banners?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  }
};

// Website Settings API (from README)
export const websiteSettingsAPI = {
  getWebsiteSettings: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/website-settings`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: {}, error: error.message };
    }
  },

  getInfoBar: async (page = 'homepage') => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/info-bar?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: {}, error: error.message };
    }
  },

  getModal: async (page = 'homepage') => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/modal?page=${page}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: {}, error: error.message };
    }
  }
};

// Blog API (from README)
export const blogAPI = {
  getBlogPosts: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.tags) queryParams.append('tags', filters.tags);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.sort) queryParams.append('sort', filters.sort);
    
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs?${queryParams}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getBlogPost: async (slug) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs/${slug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: {}, error: error.message };
    }
  },

  getBlogCategories: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blog-categories`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  getBlogTags: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blog-tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  likeBlogPost: async (slug) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs/${slug}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  addBlogComment: async (slug, commentData) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Newsletter API (from README)
export const newsletterAPI = {
  subscribeToNewsletter: async (subscriberData) => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriberData)
      });
      
      return handleResponse(response);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Location API (from README)
export const locationAPI = {
  getPickupLocations: async () => {
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/pickup-locations`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      return handleResponse(response);
    } catch (error) {
      return { 
        success: false, 
        data: [],
        error: error.message
      };
    }
  }
};

export default {
  auth: authAPI,
  cars: carsAPI,
  reservations: reservationsAPI,
  booking: bookingAPI,
  additionalServices: additionalServicesAPI,
  banner: bannerAPI,
  websiteSettings: websiteSettingsAPI,
  blog: blogAPI,
  newsletter: newsletterAPI,
  location: locationAPI
}; 