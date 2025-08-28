import {
  MOROCCAN_CITIES,
  PACKAGE_TYPES,
  PRICE_RANGES,
  TRANSPORT_STATUS,
  ANNOUNCEMENT_STATUS,
  USER_TYPES,
  APP_LIMITS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  API_CONFIG,
  APP_CONFIG,
} from '../index';

describe('Constants', () => {
  describe('MOROCCAN_CITIES', () => {
    it('should contain major Moroccan cities', () => {
      expect(MOROCCAN_CITIES).toContain('Casablanca');
      expect(MOROCCAN_CITIES).toContain('Rabat');
      expect(MOROCCAN_CITIES).toContain('Marrakech');
      expect(MOROCCAN_CITIES).toContain('Fès');
      expect(MOROCCAN_CITIES).toContain('Tanger');
      expect(MOROCCAN_CITIES).toContain('Agadir');
    });

    it('should have at least 15 cities', () => {
      expect(MOROCCAN_CITIES.length).toBeGreaterThanOrEqual(15);
    });

    it('should have exactly 18 cities', () => {
      expect(MOROCCAN_CITIES).toHaveLength(18);
    });

    it('should contain all expected cities', () => {
      const expectedCities = [
        'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir',
        'Meknès', 'Oujda', 'Tétouan', 'Safi', 'El Jadida', 'Nador',
        'Kénitra', 'Témara', 'Mohammedia', 'Béni Mellal', 'Taza', 'Larache'
      ];
      expectedCities.forEach(city => {
        expect(MOROCCAN_CITIES).toContain(city);
      });
    });

    it('should have unique city names', () => {
      const uniqueCities = new Set(MOROCCAN_CITIES);
      expect(uniqueCities.size).toBe(MOROCCAN_CITIES.length);
    });

    it('should have cities as strings', () => {
      MOROCCAN_CITIES.forEach(city => {
        expect(typeof city).toBe('string');
        expect(city.length).toBeGreaterThan(0);
      });
    });
  });

  describe('PACKAGE_TYPES', () => {
    it('should have correct structure for each package type', () => {
      PACKAGE_TYPES.forEach((pkg) => {
        expect(pkg).toHaveProperty('value');
        expect(pkg).toHaveProperty('label');
        expect(pkg).toHaveProperty('maxWeight');
        expect(typeof pkg.value).toBe('string');
        expect(typeof pkg.label).toBe('string');
        expect(typeof pkg.maxWeight).toBe('number');
      });
    });

    it('should have 4 package types', () => {
      expect(PACKAGE_TYPES).toHaveLength(4);
    });

    it('should have correct package type values', () => {
      const expectedValues = ['small', 'medium', 'large', 'bulky'];
      const actualValues = PACKAGE_TYPES.map(pkg => pkg.value);
      expect(actualValues).toEqual(expectedValues);
    });

    it('should have reasonable weight limits', () => {
      PACKAGE_TYPES.forEach(pkg => {
        expect(pkg.maxWeight).toBeGreaterThan(0);
        expect(pkg.maxWeight).toBeLessThanOrEqual(100);
      });
    });

    it('should have ascending weight limits', () => {
      for (let i = 1; i < PACKAGE_TYPES.length; i++) {
        expect(PACKAGE_TYPES[i].maxWeight).toBeGreaterThan(PACKAGE_TYPES[i-1].maxWeight);
      }
    });

    it('should have descriptive labels in French', () => {
      PACKAGE_TYPES.forEach(pkg => {
        expect(pkg.label).toContain('colis');
        expect(pkg.label.length).toBeGreaterThan(10);
      });
    });
  });

  describe('PRICE_RANGES', () => {
    it('should have correct structure for each price range', () => {
      PRICE_RANGES.forEach((range) => {
        expect(range).toHaveProperty('min');
        expect(range).toHaveProperty('max');
        expect(range).toHaveProperty('label');
        expect(typeof range.min).toBe('number');
        expect(typeof range.max).toBe('number');
        expect(typeof range.label).toBe('string');
      });
    });

    it('should have 5 price ranges', () => {
      expect(PRICE_RANGES).toHaveLength(5);
    });

    it('should have ascending price ranges', () => {
      for (let i = 1; i < PRICE_RANGES.length; i++) {
        expect(PRICE_RANGES[i].min).toBeGreaterThanOrEqual(PRICE_RANGES[i-1].max);
      }
    });

    it('should start from 0', () => {
      expect(PRICE_RANGES[0].min).toBe(0);
    });

    it('should have reasonable price limits', () => {
      PRICE_RANGES.forEach(range => {
        expect(range.min).toBeGreaterThanOrEqual(0);
        expect(range.max).toBeGreaterThan(range.min);
        expect(range.max).toBeLessThanOrEqual(2000);
      });
    });

    it('should have MAD currency in labels', () => {
      PRICE_RANGES.forEach(range => {
        expect(range.label).toContain('MAD');
      });
    });

    it('should have last range as open-ended', () => {
      const lastRange = PRICE_RANGES[PRICE_RANGES.length - 1];
      expect(lastRange.label).toContain('+');
    });
  });

  describe('TRANSPORT_STATUS', () => {
    it('should have all required status values', () => {
      expect(TRANSPORT_STATUS).toHaveProperty('PENDING');
      expect(TRANSPORT_STATUS).toHaveProperty('CONFIRMED');
      expect(TRANSPORT_STATUS).toHaveProperty('IN_PROGRESS');
      expect(TRANSPORT_STATUS).toHaveProperty('COMPLETED');
      expect(TRANSPORT_STATUS).toHaveProperty('CANCELLED');
    });

    it('should have exactly 5 status values', () => {
      const statusCount = Object.keys(TRANSPORT_STATUS).length;
      expect(statusCount).toBe(5);
    });

    it('should have string values', () => {
      Object.values(TRANSPORT_STATUS).forEach(status => {
        expect(typeof status).toBe('string');
        expect(status.length).toBeGreaterThan(0);
      });
    });

    it('should have unique status values', () => {
      const uniqueStatuses = new Set(Object.values(TRANSPORT_STATUS));
      expect(uniqueStatuses.size).toBe(Object.keys(TRANSPORT_STATUS).length);
    });

    it('should have lowercase status values', () => {
      Object.values(TRANSPORT_STATUS).forEach(status => {
        expect(status).toBe(status.toLowerCase());
      });
    });
  });

  describe('ANNOUNCEMENT_STATUS', () => {
    it('should have all required status values', () => {
      expect(ANNOUNCEMENT_STATUS).toHaveProperty('ACTIVE');
      expect(ANNOUNCEMENT_STATUS).toHaveProperty('INACTIVE');
      expect(ANNOUNCEMENT_STATUS).toHaveProperty('EXPIRED');
      expect(ANNOUNCEMENT_STATUS).toHaveProperty('COMPLETED');
    });

    it('should have exactly 4 status values', () => {
      const statusCount = Object.keys(ANNOUNCEMENT_STATUS).length;
      expect(statusCount).toBe(4);
    });

    it('should have string values', () => {
      Object.values(ANNOUNCEMENT_STATUS).forEach(status => {
        expect(typeof status).toBe('string');
        expect(status.length).toBeGreaterThan(0);
      });
    });

    it('should have unique status values', () => {
      const uniqueStatuses = new Set(Object.values(ANNOUNCEMENT_STATUS));
      expect(uniqueStatuses.size).toBe(Object.keys(ANNOUNCEMENT_STATUS).length);
    });

    it('should have lowercase status values', () => {
      Object.values(ANNOUNCEMENT_STATUS).forEach(status => {
        expect(status).toBe(status.toLowerCase());
      });
    });
  });

  describe('USER_TYPES', () => {
    it('should have all required user types', () => {
      expect(USER_TYPES).toHaveProperty('SHIPPER');
      expect(USER_TYPES).toHaveProperty('CARRIER');
      expect(USER_TYPES).toHaveProperty('BOTH');
    });

    it('should have exactly 3 user types', () => {
      const typeCount = Object.keys(USER_TYPES).length;
      expect(typeCount).toBe(3);
    });

    it('should have string values', () => {
      Object.values(USER_TYPES).forEach(type => {
        expect(typeof type).toBe('string');
        expect(type.length).toBeGreaterThan(0);
      });
    });

    it('should have unique user type values', () => {
      const uniqueTypes = new Set(Object.values(USER_TYPES));
      expect(uniqueTypes.size).toBe(Object.keys(USER_TYPES).length);
    });

    it('should have lowercase user type values', () => {
      Object.values(USER_TYPES).forEach(type => {
        expect(type).toBe(type.toLowerCase());
      });
    });
  });

  describe('APP_LIMITS', () => {
    it('should have reasonable limits', () => {
      expect(APP_LIMITS.MAX_PACKAGE_WEIGHT).toBeLessThanOrEqual(100);
      expect(APP_LIMITS.MAX_PACKAGE_DIMENSIONS).toBeLessThanOrEqual(300);
      expect(APP_LIMITS.MAX_DESCRIPTION_LENGTH).toBeGreaterThan(100);
      expect(APP_LIMITS.MAX_TITLE_LENGTH).toBeGreaterThan(50);
      expect(APP_LIMITS.MAX_IMAGES_PER_ANNOUNCEMENT).toBeGreaterThan(1);
    });

    it('should have exactly 5 limit properties', () => {
      const limitCount = Object.keys(APP_LIMITS).length;
      expect(limitCount).toBe(5);
    });

    it('should have all required limit properties', () => {
      expect(APP_LIMITS).toHaveProperty('MAX_PACKAGE_WEIGHT');
      expect(APP_LIMITS).toHaveProperty('MAX_PACKAGE_DIMENSIONS');
      expect(APP_LIMITS).toHaveProperty('MAX_DESCRIPTION_LENGTH');
      expect(APP_LIMITS).toHaveProperty('MAX_TITLE_LENGTH');
      expect(APP_LIMITS).toHaveProperty('MAX_IMAGES_PER_ANNOUNCEMENT');
    });

    it('should have numeric limit values', () => {
      Object.values(APP_LIMITS).forEach(limit => {
        expect(typeof limit).toBe('number');
        expect(limit).toBeGreaterThan(0);
      });
    });

    it('should have specific limit values', () => {
      expect(APP_LIMITS.MAX_PACKAGE_WEIGHT).toBe(50);
      expect(APP_LIMITS.MAX_PACKAGE_DIMENSIONS).toBe(200);
      expect(APP_LIMITS.MAX_DESCRIPTION_LENGTH).toBe(500);
      expect(APP_LIMITS.MAX_TITLE_LENGTH).toBe(100);
      expect(APP_LIMITS.MAX_IMAGES_PER_ANNOUNCEMENT).toBe(5);
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('should have French error messages', () => {
      expect(ERROR_MESSAGES.REQUIRED_FIELD).toContain('requis');
      expect(ERROR_MESSAGES.INVALID_EMAIL).toContain('email');
      expect(ERROR_MESSAGES.PASSWORD_TOO_SHORT).toContain('caractères');
    });

    it('should have exactly 9 error messages', () => {
      const messageCount = Object.keys(ERROR_MESSAGES).length;
      expect(messageCount).toBe(9);
    });

    it('should have all required error message properties', () => {
      expect(ERROR_MESSAGES).toHaveProperty('REQUIRED_FIELD');
      expect(ERROR_MESSAGES).toHaveProperty('INVALID_EMAIL');
      expect(ERROR_MESSAGES).toHaveProperty('INVALID_PHONE');
      expect(ERROR_MESSAGES).toHaveProperty('PASSWORD_TOO_SHORT');
      expect(ERROR_MESSAGES).toHaveProperty('PASSWORDS_DONT_MATCH');
      expect(ERROR_MESSAGES).toHaveProperty('TERMS_NOT_ACCEPTED');
      expect(ERROR_MESSAGES).toHaveProperty('NETWORK_ERROR');
      expect(ERROR_MESSAGES).toHaveProperty('UNAUTHORIZED');
      expect(ERROR_MESSAGES).toHaveProperty('FORBIDDEN');
    });

    it('should have string error messages', () => {
      Object.values(ERROR_MESSAGES).forEach(message => {
        expect(typeof message).toBe('string');
        expect(message.length).toBeGreaterThan(0);
      });
    });

    it('should have descriptive error messages', () => {
      Object.values(ERROR_MESSAGES).forEach(message => {
        expect(message.length).toBeGreaterThan(5);
        expect(message).toContain(' ');
      });
    });
  });

  describe('SUCCESS_MESSAGES', () => {
    it('should have French success messages', () => {
      expect(SUCCESS_MESSAGES.LOGIN_SUCCESS).toContain('Bienvenue');
      expect(SUCCESS_MESSAGES.REGISTER_SUCCESS).toContain('Bienvenue');
      expect(SUCCESS_MESSAGES.PROFILE_UPDATED).toContain('succès');
    });

    it('should have exactly 7 success messages', () => {
      const messageCount = Object.keys(SUCCESS_MESSAGES).length;
      expect(messageCount).toBe(7);
    });

    it('should have all required success message properties', () => {
      expect(SUCCESS_MESSAGES).toHaveProperty('LOGIN_SUCCESS');
      expect(SUCCESS_MESSAGES).toHaveProperty('REGISTER_SUCCESS');
      expect(SUCCESS_MESSAGES).toHaveProperty('PROFILE_UPDATED');
      expect(SUCCESS_MESSAGES).toHaveProperty('ANNOUNCEMENT_CREATED');
      expect(SUCCESS_MESSAGES).toHaveProperty('ANNOUNCEMENT_UPDATED');
      expect(SUCCESS_MESSAGES).toHaveProperty('TRANSPORT_CONFIRMED');
      expect(SUCCESS_MESSAGES).toHaveProperty('MESSAGE_SENT');
    });

    it('should have string success messages', () => {
      Object.values(SUCCESS_MESSAGES).forEach(message => {
        expect(typeof message).toBe('string');
        expect(message.length).toBeGreaterThan(0);
      });
    });

    it('should contain app name in welcome messages', () => {
      expect(SUCCESS_MESSAGES.LOGIN_SUCCESS).toContain('VoyagaBagae');
      expect(SUCCESS_MESSAGES.REGISTER_SUCCESS).toContain('VoyagaBagae');
    });

    it('should have descriptive success messages', () => {
      Object.values(SUCCESS_MESSAGES).forEach(message => {
        expect(message.length).toBeGreaterThan(10);
        expect(message).toContain(' ');
      });
    });
  });

  describe('API_CONFIG', () => {
    it('should have valid API configuration', () => {
      expect(API_CONFIG.TIMEOUT).toBeGreaterThan(0);
      expect(API_CONFIG.RETRY_ATTEMPTS).toBeGreaterThan(0);
      expect(typeof API_CONFIG.BASE_URL).toBe('string');
    });

    it('should have exactly 3 configuration properties', () => {
      const configCount = Object.keys(API_CONFIG).length;
      expect(configCount).toBe(3);
    });

    it('should have all required API config properties', () => {
      expect(API_CONFIG).toHaveProperty('BASE_URL');
      expect(API_CONFIG).toHaveProperty('TIMEOUT');
      expect(API_CONFIG).toHaveProperty('RETRY_ATTEMPTS');
    });

    it('should have specific timeout value', () => {
      expect(API_CONFIG.TIMEOUT).toBe(10000);
    });

    it('should have specific retry attempts value', () => {
      expect(API_CONFIG.RETRY_ATTEMPTS).toBe(3);
    });

    it('should have valid base URL format', () => {
      expect(API_CONFIG.BASE_URL).toMatch(/^https?:\/\/.+/);
    });

    it('should have reasonable timeout value', () => {
      expect(API_CONFIG.TIMEOUT).toBeGreaterThan(1000);
      expect(API_CONFIG.TIMEOUT).toBeLessThan(60000);
    });

    it('should have reasonable retry attempts', () => {
      expect(API_CONFIG.RETRY_ATTEMPTS).toBeGreaterThan(0);
      expect(API_CONFIG.RETRY_ATTEMPTS).toBeLessThan(10);
    });
  });

  describe('APP_CONFIG', () => {
    it('should have valid app configuration', () => {
      expect(APP_CONFIG.NAME).toBe('VoyagaBagae');
      expect(APP_CONFIG.VERSION).toMatch(/^\d+\.\d+\.\d+$/);
      expect(APP_CONFIG.DESCRIPTION).toContain('Maroc');
      expect(APP_CONFIG.SUPPORT_EMAIL).toContain('@');
      expect(APP_CONFIG.SUPPORT_PHONE).toContain('+212');
    });

    it('should have exactly 5 configuration properties', () => {
      const configCount = Object.keys(APP_CONFIG).length;
      expect(configCount).toBe(5);
    });

    it('should have all required app config properties', () => {
      expect(APP_CONFIG).toHaveProperty('NAME');
      expect(APP_CONFIG).toHaveProperty('VERSION');
      expect(APP_CONFIG).toHaveProperty('DESCRIPTION');
      expect(APP_CONFIG).toHaveProperty('SUPPORT_EMAIL');
      expect(APP_CONFIG).toHaveProperty('SUPPORT_PHONE');
    });

    it('should have specific app name', () => {
      expect(APP_CONFIG.NAME).toBe('VoyagaBagae');
    });

    it('should have specific version format', () => {
      expect(APP_CONFIG.VERSION).toBe('1.0.0');
    });

    it('should have specific description', () => {
      expect(APP_CONFIG.DESCRIPTION).toBe('Plateforme de transport de colis au Maroc');
    });

    it('should have valid email format', () => {
      expect(APP_CONFIG.SUPPORT_EMAIL).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    });

    it('should have valid phone format', () => {
      expect(APP_CONFIG.SUPPORT_PHONE).toMatch(/^\+212\s*\d{1,2}-\d{3}-\d{3}$/);
    });

    it('should have descriptive content', () => {
      expect(APP_CONFIG.DESCRIPTION.length).toBeGreaterThan(20);
      expect(APP_CONFIG.SUPPORT_EMAIL.length).toBeGreaterThan(10);
      expect(APP_CONFIG.SUPPORT_PHONE.length).toBeGreaterThan(10);
    });
  });

  describe('Constants Integration', () => {
    it('should have consistent data types across all constants', () => {
      // Arrays should contain objects or primitives consistently
      expect(Array.isArray(MOROCCAN_CITIES)).toBe(true);
      expect(Array.isArray(PACKAGE_TYPES)).toBe(true);
      expect(Array.isArray(PRICE_RANGES)).toBe(true);

      // Objects should have consistent structure
      expect(typeof TRANSPORT_STATUS).toBe('object');
      expect(typeof ANNOUNCEMENT_STATUS).toBe('object');
      expect(typeof USER_TYPES).toBe('object');
      expect(typeof APP_LIMITS).toBe('object');
      expect(typeof ERROR_MESSAGES).toBe('object');
      expect(typeof SUCCESS_MESSAGES).toBe('object');
      expect(typeof API_CONFIG).toBe('object');
      expect(typeof APP_CONFIG).toBe('object');
    });

    it('should have no duplicate values across different constant groups', () => {
      const allValues = [
        ...Object.values(TRANSPORT_STATUS),
        ...Object.values(ANNOUNCEMENT_STATUS),
        ...Object.values(USER_TYPES)
      ];
      const uniqueValues = new Set(allValues);
      expect(uniqueValues.size).toBe(allValues.length);
    });

    it('should have reasonable relationships between constants', () => {
      // Package weight limits should be within app limits
      PACKAGE_TYPES.forEach(pkg => {
        expect(pkg.maxWeight).toBeLessThanOrEqual(APP_LIMITS.MAX_PACKAGE_WEIGHT);
      });

      // Price ranges should be reasonable for transport services
      PRICE_RANGES.forEach(range => {
        expect(range.max).toBeLessThanOrEqual(2000); // Max 2000 MAD
      });
    });
  });
});

