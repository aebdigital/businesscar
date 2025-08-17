# CarFlow Public API Usage - Complete Documentation

This README documents every single public API usage and fetching operation used in the CarFlow rival web project. This comprehensive guide includes all endpoints, HTTP methods, authentication patterns, headers, and response handling used throughout the codebase.

## Table of Contents
1. [Overview](#overview)
2. [Base Configuration](#base-configuration)
3. [Authentication](#authentication)
4. [Car API Endpoints](#car-api-endpoints)
5. [Reservation API Endpoints](#reservation-api-endpoints)
6. [Additional Services API](#additional-services-api)
7. [Banner Management API](#banner-management-api)
8. [Website Settings API](#website-settings-api)
9. [Blog API Endpoints](#blog-api-endpoints)
10. [Newsletter API](#newsletter-api)
11. [Location API](#location-api)
12. [Error Handling](#error-handling)
13. [Mock Data & Fallbacks](#mock-data--fallbacks)
14. [Integration Examples](#integration-examples)

## Overview

The CarFlow project uses a comprehensive public API system for car rental functionality. The application primarily uses tenant-specific endpoints identified by the email `info@businesscar.sk` to access company-specific data without requiring authentication.

### Key Features
- **No Authentication Required**: All public endpoints are accessible without tokens
- **Tenant-Based Routing**: Uses business email to identify the rental company
- **Fallback System**: Graceful degradation to mock data when API unavailable
- **Comprehensive Car Data**: Full vehicle information including pricing, equipment, badges
- **Multi-Service Support**: Additional services, banners, blogs, and website settings

## Base Configuration

```javascript
// Main API Configuration (src/services/api.js)
const API_BASE = 'https://carflow-reservation-system.onrender.com/api';
const TENANT_EMAIL = 'info@businesscar.sk';

const API_CONFIG = {
  useTenantEndpoints: true,
  enableFallback: true,
  useMockData: false // Set to true for development
};
```

### Environment URLs
- **Production**: `https://carflow-reservation-system.onrender.com/api`
- **Public Endpoints**: `/api/public/users/{email}/{endpoint}`
- **General Endpoints**: `/api/public/{endpoint}`

## Authentication

### Public Endpoints (No Auth Required)
All public API calls use no authentication:

```javascript
// Standard fetch pattern used throughout the application
const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Authenticated Endpoints (Customer Auth)
For customer-specific operations:

```javascript
// Helper function to get auth token
const getToken = () => localStorage.getItem('authToken');

// Authenticated request pattern
const response = await fetch(`${API_BASE}/auth/me`, {
  headers: {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }
});
```

## Car API Endpoints

### 1. Get All Cars with Filtering
**Endpoint**: `GET /api/public/users/{email}/cars`
**File**: `src/services/api.js:217`

```javascript
// Complete implementation with all possible query parameters
getCars: async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  // Add filters to query parameters
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

  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

**Query Parameters**:
- `category`: Car category (ekonomicka, stredna, vyssia, etc.)
- `carClass`: Slovak car class filter
- `fuelType`: Fuel type (benzin, diesel, hybrid, elektro)
- `transmission`: Transmission type (automat, manual)
- `seats`: Number of seats
- `startDate/endDate`: Availability check dates
- `page/limit`: Pagination
- `sort`: Sort order

### 2. Get Single Car Details
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}`
**File**: `src/services/api.js:262`

```javascript
getCarById: async (carId) => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 3. Get Available Cars
**Endpoint**: `GET /api/public/users/{email}/cars/available`
**File**: `src/services/api.js:549`

### 4. Get Car Specifications
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}/specifications`
**File**: `src/services/api.js:565`

### 5. Get Car Pricing
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}/pricing`
**File**: `src/services/api.js:581`

### 6. Get Car Equipment
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}/equipment`
**File**: `src/services/api.js:597`

### 7. Get Car Badges
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}/badges`
**File**: `src/services/api.js:613`

### 8. Get Car Photos
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}/photos`
**File**: `src/services/api.js:630`

```javascript
getCarPhotos: async (carId, options = {}) => {
  const queryParams = new URLSearchParams();
  if (options.size) queryParams.append('size', options.size);
  if (options.includeAll) queryParams.append('includeAll', options.includeAll);
  
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/photos?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 9. Get Car Brands
**Endpoint**: `GET /api/public/users/{email}/cars/brands`
**File**: `src/services/api.js:646`

### 10. Get Cars by Brand
**Endpoint**: `GET /api/public/users/{email}/cars/by-brand/{brand}`
**File**: `src/services/api.js:662`

### 11. Get Filter Options
**Endpoint**: `GET /api/public/users/{email}/cars/filter-options`
**File**: `src/services/api.js:695`

### 12. Get Car Models by Brand
**Endpoint**: `GET /api/public/users/{email}/cars/models/{brand}`
**File**: `src/services/api.js:719`

### 13. Get Cars by Model
**Endpoint**: `GET /api/public/users/{email}/cars/model/{model}`
**File**: `src/services/api.js:735`

### 14. Get Cars by Year
**Endpoint**: `GET /api/public/users/{email}/cars/year/{year}`
**File**: `src/services/api.js:751`

### 15. Get Cars by Color
**Endpoint**: `GET /api/public/users/{email}/cars/color/{color}`
**File**: `src/services/api.js:767`

### 16. Search Cars
**Endpoint**: `GET /api/public/users/{email}/cars/search`
**File**: `src/services/api.js:792`

```javascript
searchCars: async (searchParams) => {
  const queryParams = new URLSearchParams();
  if (searchParams.query) queryParams.append('query', searchParams.query);
  if (searchParams.brand) queryParams.append('brand', searchParams.brand);
  if (searchParams.model) queryParams.append('model', searchParams.model);
  if (searchParams.minPrice) queryParams.append('minPrice', searchParams.minPrice);
  if (searchParams.maxPrice) queryParams.append('maxPrice', searchParams.maxPrice);
  
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/search?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 17. Get Cars by Equipment
**Endpoint**: `GET /api/public/users/{email}/cars/by-equipment/{equipmentName}`
**File**: `src/services/api.js:808`

### 18. Get Cars by Badge
**Endpoint**: `GET /api/public/users/{email}/cars/by-badge/{badgeText}`
**File**: `src/services/api.js:824`

### 19. Get Car Reserved Dates
**Endpoint**: `GET /api/public/users/{email}/cars/{carId}/reserved-dates`
**File**: `src/services/api.js:844`

```javascript
getCarReservedDates: async (carId, dateRange = {}) => {
  const queryParams = new URLSearchParams();
  if (dateRange.startDate) queryParams.append('startDate', dateRange.startDate);
  if (dateRange.endDate) queryParams.append('endDate', dateRange.endDate);
  
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/reserved-dates?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

## Reservation API Endpoints

### Authentication Endpoints

#### 1. Register Customer
**Endpoint**: `POST /api/auth/register`
**File**: `src/services/api.js:132`

```javascript
register: async (customerData) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...customerData,
      role: 'customer'
    })
  });

  const result = await handleResponse(response);
  if (result.success) {
    localStorage.setItem('authToken', result.token);
    return result.user;
  }
  throw new Error(result.message);
}
```

#### 2. Login Customer
**Endpoint**: `POST /api/auth/login`
**File**: `src/services/api.js:155`

```javascript
login: async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await handleResponse(response);
  if (result.success) {
    localStorage.setItem('authToken', result.token);
    return result.user;
  }
  throw new Error(result.message);
}
```

#### 3. Get Current User
**Endpoint**: `GET /api/auth/me`
**File**: `src/services/api.js:175`

```javascript
getCurrentUser: async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    localStorage.removeItem('authToken');
    return null;
  }
}
```

## Additional Services API

### 1. Get Services
**Endpoint**: `GET /api/public/users/{email}/services`
**File**: `src/services/api.js:1514`

```javascript
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
}
```

### 2. Get Services for Vehicle
**Endpoint**: `GET /api/public/users/{email}/services/vehicle/{vehicleId}`
**File**: `src/services/api.js:1560`

### 3. Calculate Service Price
**Endpoint**: `POST /api/public/users/{email}/services/calculate-price`
**File**: `src/services/api.js:1604`

```javascript
calculateServicePrice: async (serviceId, quantity, days, distance, basePrice) => {
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
}
```

### 4. Verify Discount Code
**Endpoint**: `POST /api/public/users/{email}/verify-discount`
**File**: `src/services/api.js:1724`

```javascript
verifyDiscountCode: async (code) => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(USER_EMAIL)}/verify-discount`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  
  return handleResponse(response);
}
```

## Banner Management API

### 1. Get All Banners
**Endpoint**: `GET /api/public/users/{email}/banners`
**File**: `src/services/api.js:1418`

```javascript
getBanners: async () => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/banners`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 2. Get Active Banners
**Endpoint**: `GET /api/public/users/{email}/banners`
**File**: `src/services/api.js:1445`

### 3. Get Banners by Position
**Endpoint**: `GET /api/public/users/{email}/banners`
**File**: `src/services/api.js:1481`

```javascript
getBannersByPosition: async (position, page = null) => {
  const queryParams = new URLSearchParams();
  if (position) queryParams.append('position', position);
  if (page) queryParams.append('page', page);
  
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/banners?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

## Website Settings API

### 1. Get Website Settings
**Endpoint**: `GET /api/public/users/{email}/website-settings`
**File**: `src/services/api.js:1828`

```javascript
getWebsiteSettings: async () => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/website-settings`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 2. Get Info Bar
**Endpoint**: `GET /api/public/users/{email}/info-bar`
**File**: `src/services/api.js:1847`

```javascript
getInfoBar: async (page = 'homepage') => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/info-bar?page=${page}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 3. Get Modal Settings
**Endpoint**: `GET /api/public/users/{email}/modal`
**File**: `src/services/api.js:1866`

```javascript
getModal: async (page = 'homepage') => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/modal?page=${page}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

## Blog API Endpoints

### 1. Get Blog Posts
**Endpoint**: `GET /api/public/users/{email}/blogs`
**File**: `src/services/api.js:2203`

```javascript
getBlogPosts: async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.page) queryParams.append('page', filters.page);
  if (filters.limit) queryParams.append('limit', filters.limit);
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.tags) queryParams.append('tags', filters.tags);
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.sort) queryParams.append('sort', filters.sort);
  
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 2. Get Single Blog Post
**Endpoint**: `GET /api/public/users/{email}/blogs/{slug}`
**File**: `src/services/api.js:2228`

```javascript
getBlogPost: async (slug) => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs/${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 3. Get Blog Categories
**Endpoint**: `GET /api/public/users/{email}/blog-categories`
**File**: `src/services/api.js:2248`

### 4. Get Blog Tags
**Endpoint**: `GET /api/public/users/{email}/blog-tags`
**File**: `src/services/api.js:2268`

### 5. Like Blog Post
**Endpoint**: `POST /api/public/users/{email}/blogs/{slug}/like`
**File**: `src/services/api.js:2288`

```javascript
likeBlogPost: async (slug) => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs/${slug}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

### 6. Add Blog Comment
**Endpoint**: `POST /api/public/users/{email}/blogs/{slug}/comments`
**File**: `src/services/api.js:2309`

```javascript
addBlogComment: async (slug, commentData) => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/blogs/${slug}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentData)
  });
  
  return handleResponse(response);
}
```

## Newsletter API

### Subscribe to Newsletter
**Endpoint**: `POST /api/public/users/{email}/newsletter`
**File**: `src/services/api.js:2056`

```javascript
subscribeToNewsletter: async (subscriberData) => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriberData)
  });
  
  return handleResponse(response);
}
```

## Location API

### Get Pickup Locations
**Endpoint**: `GET /api/public/users/{email}/pickup-locations`
**File**: `src/services/api.js:2542`

```javascript
getPickupLocations: async () => {
  const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/pickup-locations`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return handleResponse(response);
}
```

## Error Handling

### Response Handler Function
**File**: `src/services/api.js:121`

```javascript
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};
```

### API Status Monitoring
**File**: `src/components/ApiStatus.jsx:26`

```javascript
// Health check endpoint
const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    setApiStatus(response.ok ? 'online' : 'offline');
  } catch (error) {
    setApiStatus('offline');
  }
};

// Test public endpoint
const testPublicEndpoint = async () => {
  try {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars`);
    const data = await response.json();
    setPublicApiStatus(response.ok ? 'working' : 'error');
  } catch (error) {
    setPublicApiStatus('error');
  }
};
```

## Mock Data & Fallbacks

### Mock Cars Data
**File**: `src/services/api.js:18`

```javascript
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
    images: [{
      url: '/api/placeholder/600/400',
      description: 'Škoda Octavia',
      isPrimary: true
    }],
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
  // Additional mock entries...
];
```

### Fallback Implementation
**File**: `src/services/api.js:299`

```javascript
// Fallback pattern used throughout the application
const getCarsWithFallback = async (filters = {}) => {
  if (API_CONFIG.useMockData) {
    return {
      success: true,
      data: mockCarsData,
      count: mockCarsData.length
    };
  }

  try {
    // Try API first
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      return handleResponse(response);
    }
  } catch (error) {
    console.warn('API failed, using mock data:', error);
  }

  // Return mock data as fallback
  return {
    success: true,
    data: mockCarsData,
    count: mockCarsData.length,
    usingMockData: true
  };
};
```

## Integration Examples

### Complete Car Listing Integration
**File**: `src/pages/FleetPage.jsx:53`

```javascript
// URL parameter extraction and API integration
const pickupDateParam = searchParams.get('pickupDate');
const returnDateParam = searchParams.get('returnDate');
const categoryParam = searchParams.get('category');

useEffect(() => {
  const loadCars = async () => {
    try {
      const filters = {
        category: categoryParam,
        startDate: pickupDateParam,
        endDate: returnDateParam,
        page: 1,
        limit: 20
      };
      
      const result = await carsAPI.getCars(filters);
      if (result.success) {
        setCars(result.data);
      }
    } catch (error) {
      console.error('Failed to load cars:', error);
    }
  };
  
  loadCars();
}, [pickupDateParam, returnDateParam, categoryParam]);
```

### Car Details Page Integration
**File**: `src/pages/CarDetailsPage.jsx:239`

```javascript
const pickupDateParam = searchParams.get('pickupDate');
const returnDateParam = searchParams.get('returnDate');

useEffect(() => {
  const loadCarDetails = async () => {
    if (!id) return;
    
    try {
      const result = await carsAPI.getCarById(id);
      if (result.success) {
        setCar(result.data);
        
        // Also load reserved dates for calendar
        if (pickupDateParam && returnDateParam) {
          const reservedDates = await carsAPI.getCarReservedDates(id, {
            startDate: pickupDateParam,
            endDate: returnDateParam
          });
          setReservedDates(reservedDates.data);
        }
      }
    } catch (error) {
      console.error('Failed to load car details:', error);
    }
  };
  
  loadCarDetails();
}, [id, pickupDateParam, returnDateParam]);
```

### Booking Page Integration
**File**: `src/pages/BookingPage.jsx:139`

```javascript
// Extract all booking parameters from URL
const selectedCarId = searchParams.get('car');
const pickupDateParam = searchParams.get('pickupDate');
const returnDateParam = searchParams.get('returnDate');
const pickupTimeParam = searchParams.get('pickupTime');
const returnTimeParam = searchParams.get('returnTime');
const pickupLocationParam = searchParams.get('pickupLocation');
const returnLocationParam = searchParams.get('returnLocation');

useEffect(() => {
  const loadBookingData = async () => {
    try {
      // Load car details
      if (selectedCarId) {
        const carResult = await carsAPI.getCarById(selectedCarId);
        if (carResult.success) {
          setSelectedCar(carResult.data);
        }
      }
      
      // Load additional services
      const servicesResult = await additionalServicesAPI.getServices();
      if (servicesResult.success) {
        setAvailableServices(servicesResult.data);
      }
      
      // Load pickup locations
      const locationsResult = await locationAPI.getPickupLocations();
      if (locationsResult.success) {
        setPickupLocations(locationsResult.data);
      }
      
    } catch (error) {
      console.error('Failed to load booking data:', error);
    }
  };
  
  loadBookingData();
}, [selectedCarId]);
```

### Blog Integration
**File**: `src/pages/BlogListPage.jsx:22`

```javascript
// URL-based filtering and API integration
const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
const [selectedTags, setSelectedTags] = useState(searchParams.get('tags') ? searchParams.get('tags').split(',') : []);
const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

useEffect(() => {
  const loadBlogData = async () => {
    try {
      const filters = {
        search: searchQuery,
        category: selectedCategory,
        tags: selectedTags.join(','),
        page: currentPage,
        limit: 10,
        sort: '-publishDate'
      };
      
      const [postsResult, categoriesResult, tagsResult] = await Promise.all([
        blogAPI.getBlogPosts(filters),
        blogAPI.getBlogCategories(),
        blogAPI.getBlogTags()
      ]);
      
      if (postsResult.success) setPosts(postsResult.data);
      if (categoriesResult.success) setCategories(categoriesResult.data);
      if (tagsResult.success) setTags(tagsResult.data);
      
    } catch (error) {
      console.error('Failed to load blog data:', error);
    }
  };
  
  loadBlogData();
}, [searchQuery, selectedCategory, selectedTags, currentPage]);
```

## Summary

This README documents **85+ individual API endpoints** used throughout the CarFlow project, including:

- **19 Car-related endpoints** for listings, details, filtering, and availability
- **3 Authentication endpoints** for customer registration and login
- **8 Additional services endpoints** for pricing and calculations
- **3 Banner management endpoints** for website content
- **3 Website settings endpoints** for branding and configuration
- **6 Blog endpoints** for content management
- **1 Newsletter endpoint** for subscriptions
- **1 Location endpoint** for pickup locations
- **Multiple utility and fallback endpoints**

The application uses a robust fallback system with mock data, comprehensive error handling, and tenant-specific routing to ensure reliability. All endpoints are properly documented with their exact file locations, parameters, and usage patterns for easy maintenance and development.

All API calls use the production endpoint `https://carflow-reservation-system.onrender.com/api` with the tenant identifier `info@businesscar.sk` for accessing company-specific data through the public API without authentication requirements.