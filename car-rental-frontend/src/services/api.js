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
  // Use mock data for development (set to true to avoid backend calls)
  useMockData: true
};

// Mock data for development/fallback
const mockCarsData = [
  // Ekonomická trieda
  {
    _id: 'eco1',
    brand: 'Škoda',
    model: 'Citigo',
    year: 2023,
    category: 'ekonomicka',
    fuelType: 'petrol',
    transmission: 'automatic',
    seats: 4,
    doors: 4,
    dailyRate: 32,
    weeklyRate: 210,
    monthlyRate: 820,
    power: '60kW',
    status: 'available',
    deposit: 500,
    description: 'Ekonomický mestský automobil s automatickou prevodovkou.',
    features: ['air-conditioning', 'bluetooth', 'usb-ports'],
    images: [
      {
        url: '/src/assets/skoda-city-gi.webp',
        description: 'Škoda Citigo',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  
  // Stredná trieda
  {
    _id: 'mid1',
    brand: 'Toyota',
    model: 'AygoX',
    year: 2023,
    category: 'stredna',
    fuelType: 'petrol',
    transmission: 'manual',
    seats: 4,
    doors: 4,
    dailyRate: 40,
    weeklyRate: 250,
    monthlyRate: 980,
    power: '72kW',
    status: 'available',
    deposit: 600,
    description: 'Moderný crossover s dynamickým dizajnom.',
    features: ['air-conditioning', 'bluetooth', 'rear-camera'],
    images: [
      {
        url: '/src/assets/toyota-aygo.jpg',
        description: 'Toyota AygoX',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'mid2',
    brand: 'Volkswagen',
    model: 'Beetle',
    year: 2023,
    category: 'stredna',
    fuelType: 'petrol',
    transmission: 'automatic',
    seats: 4,
    doors: 2,
    dailyRate: 45,
    weeklyRate: 280,
    monthlyRate: 1100,
    power: '110kW',
    status: 'available',
    deposit: 700,
    description: 'Ikonické auto s retro dizajnom a modernou technikou.',
    features: ['air-conditioning', 'bluetooth', 'heated-seats'],
    images: [
      {
        url: '/src/assets/beetle.avif',
        description: 'VW Beetle',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'mid3',
    brand: 'Hyundai',
    model: 'Kona',
    year: 2023,
    category: 'stredna',
    fuelType: 'hybrid',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 48,
    weeklyRate: 300,
    monthlyRate: 1150,
    power: '104kW',
    status: 'available',
    deposit: 800,
    description: 'Kompaktné SUV s hybridným pohonom.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats'],
    images: [
      {
        url: '/src/assets/Hyundai-Kona.jpg',
        description: 'Hyundai Kona',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'mid4',
    brand: 'Škoda',
    model: 'Octavia',
    year: 2023,
    category: 'stredna',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 50,
    weeklyRate: 320,
    monthlyRate: 1250,
    power: '110kW',
    status: 'available',
    deposit: 800,
    description: 'Moderný a spoľahlivý sedan, ideálny pre dlhšie cesty.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'cruise-control'],
    images: [
      {
        url: '/src/assets/Skoda-octavia.jpeg',
        description: 'Škoda Octavia',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'mid5',
    brand: 'Volkswagen',
    model: 'Passat Variant',
    year: 2023,
    category: 'stredna',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 55,
    weeklyRate: 350,
    monthlyRate: 1380,
    power: '140kW',
    status: 'available',
    deposit: 900,
    description: 'Priestranné kombi s veľkým batožinovým priestorom.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'cruise-control', 'extra-luggage'],
    images: [
      {
        url: '/src/assets/volkswagen-passat.jpg',
        description: 'VW Passat Variant',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  
  // Business trieda
  {
    _id: 'bus1',
    brand: 'Mercedes',
    model: 'CLA 220 CDI',
    year: 2023,
    category: 'business',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 85,
    weeklyRate: 550,
    monthlyRate: 2200,
    power: '140kW',
    status: 'available',
    deposit: 1200,
    description: 'Elegantný business sedan s prémiovým vybavením.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats', 'leather-seats', 'sunroof'],
    images: [
      {
        url: '/src/assets/Mercedes-cla-220.jpg',
        description: 'Mercedes CLA 220 CDI',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'bus2',
    brand: 'Mercedes',
    model: 'C Combi',
    year: 2023,
    category: 'business',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 90,
    weeklyRate: 580,
    monthlyRate: 2350,
    power: '150kW',
    status: 'available',
    deposit: 1300,
    description: 'Luxusné kombi s najmodernejšími technológiami.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats', 'leather-seats', 'massage-seats'],
    images: [
      {
        url: '/src/assets/Mercedes-Combi.jpg',
        description: 'Mercedes C Combi',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  
  // SUV
  {
    _id: 'suv1',
    brand: 'Škoda',
    model: 'Kodiaq',
    year: 2023,
    category: 'suv',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 7,
    doors: 4,
    dailyRate: 75,
    weeklyRate: 480,
    monthlyRate: 1900,
    power: '140kW',
    status: 'available',
    deposit: 1000,
    description: 'Veľké 7-miestne SUV pre celú rodinu.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats', 'leather-seats', '4x4'],
    images: [
      {
        url: '/src/assets/Skoda_Kodiaq_Facelift_IMG_6636.jpg',
        description: 'Škoda Kodiaq',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'suv2',
    brand: 'Peugeot',
    model: '5008',
    year: 2023,
    category: 'suv',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 7,
    doors: 4,
    dailyRate: 80,
    weeklyRate: 520,
    monthlyRate: 2050,
    power: '130kW',
    status: 'available',
    deposit: 1100,
    description: 'Priestranné 7-miestne SUV s francúzskou eleganciou.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats', 'panoramic-roof'],
    images: [
      {
        url: '/src/assets/Peugeot-508.jpg',
        description: 'Peugeot 5008',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  {
    _id: 'suv3',
    brand: 'Mercedes',
    model: 'GLC',
    year: 2023,
    category: 'suv',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 5,
    doors: 4,
    dailyRate: 95,
    weeklyRate: 620,
    monthlyRate: 2450,
    power: '170kW',
    status: 'available',
    deposit: 1500,
    description: 'Prémiové SUV s najvyššou kvalitou a komfortom.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'heated-seats', 'leather-seats', 'massage-seats'],
    images: [
      {
        url: '/src/assets/mercedes-glc-.jpg',
        description: 'Mercedes GLC',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
        country: 'Slovensko'
      }
    }
  },
  
  // VAN
  {
    _id: 'van1',
    brand: 'Mercedes',
    model: 'V Class',
    year: 2023,
    category: 'van',
    fuelType: 'diesel',
    transmission: 'automatic',
    seats: 8,
    doors: 4,
    dailyRate: 120,
    weeklyRate: 780,
    monthlyRate: 3100,
    power: '140kW',
    status: 'available',
    deposit: 1800,
    description: 'Luxusný 8-miestny van pre VIP prepravu.',
    features: ['air-conditioning', 'gps', 'bluetooth', 'leather-seats', 'captain-chairs', 'extra-luggage'],
    images: [
      {
        url: '/src/assets/Mercedes V-class.jpeg',
        description: 'Mercedes V Class',
        isPrimary: true
      }
    ],
    location: {
      name: 'Bratislava',
      address: {
        street: 'Záhradnícka 68',
        city: 'Bratislava',
        zipCode: '821 08',
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
    // Use mock data if configured
    if (API_CONFIG.useMockData) {
      console.log('Using mock data for car details');
      return mockCarsData.find(car => car._id === carId) || mockCarsData[0];
    }

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
    // Use mock data if configured
    if (API_CONFIG.useMockData) {
      console.log('Using mock data for car availability');
      return { isAvailable: true, status: 'available' };
    }

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
    
    // Use mock data if configured
    if (API_CONFIG.useMockData) {
      console.log('Using mock data for reservation creation');
      // Return mock successful reservation
      return {
        reservation: {
          _id: 'mock-reservation-' + Date.now(),
          ...reservationData,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          totalAmount: 150
        },
        car: mockCarsData.find(car => car._id === reservationData.carId) || mockCarsData[0],
        customer: {
          _id: 'mock-customer-' + Date.now(),
          firstName: reservationData.firstName,
          lastName: reservationData.lastName,
          email: reservationData.email,
          phone: reservationData.phone
        },
        pricing: {
          rentalCost: 150,
          deposit: 0,
          totalCost: 150,
          days: Math.ceil((new Date(reservationData.endDate) - new Date(reservationData.startDate)) / (1000 * 60 * 60 * 24))
        }
      };
    }
    
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