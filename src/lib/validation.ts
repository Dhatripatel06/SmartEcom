// Validation utility functions for API endpoints

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationException extends Error {
  errors: ValidationError[];
  
  constructor(errors: ValidationError[]) {
    super('Validation failed');
    this.errors = errors;
    this.name = 'ValidationException';
  }
}

// Email validation with improved regex
export const isValidEmail = (email: string): boolean => {
  // More comprehensive email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321
};

// Product validation with enhanced edge case handling
export const validateProduct = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Please enter a product name' });
  } else {
    const trimmedName = data.name.trim();
    if (trimmedName.length < 3) {
      errors.push({ field: 'name', message: 'Product name should be at least 3 characters (currently: ' + trimmedName.length + ')' });
    } else if (trimmedName.length > 100) {
      errors.push({ field: 'name', message: 'Product name is too long. Maximum 100 characters allowed (currently: ' + trimmedName.length + ')' });
    }
    // Check for special characters only
    if (/^[^a-zA-Z0-9]+$/.test(trimmedName)) {
      errors.push({ field: 'name', message: 'Product name must contain at least some letters or numbers' });
    }
  }

  // Price validation with comprehensive edge cases
  if (data.price === undefined || data.price === null || data.price === '') {
    errors.push({ field: 'price', message: 'Please enter a price for this product' });
  } else {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      errors.push({ field: 'price', message: 'Please enter a valid price (numbers only, e.g., 29.99)' });
    } else if (!isFinite(price)) {
      errors.push({ field: 'price', message: 'Price must be a valid number' });
    } else if (price < 0) {
      errors.push({ field: 'price', message: 'Price cannot be negative. Please enter a positive value' });
    } else if (price === 0) {
      errors.push({ field: 'price', message: 'Price must be greater than $0.00. Free products should be marked as such in the description' });
    } else if (price < 0.01) {
      errors.push({ field: 'price', message: 'Price must be at least $0.01' });
    } else if (price > 1000000) {
      errors.push({ field: 'price', message: 'Price seems unusually high ($' + price.toLocaleString() + '). Please verify the amount' });
    } else if (price > 99999.99) {
      errors.push({ field: 'price', message: 'Price exceeds maximum recommended value of $99,999.99' });
    }
    // Check for too many decimal places
    const decimalPlaces = (data.price.toString().split('.')[1] || '').length;
    if (decimalPlaces > 2) {
      errors.push({ field: 'price', message: 'Price can have at most 2 decimal places (e.g., $29.99)' });
    }
  }

  // Stock validation with edge cases
  if (data.stock !== undefined && data.stock !== null && data.stock !== '') {
    const stock = parseInt(data.stock);
    if (isNaN(stock)) {
      errors.push({ field: 'stock', message: 'Stock quantity must be a whole number' });
    } else if (!Number.isInteger(parseFloat(data.stock))) {
      errors.push({ field: 'stock', message: 'Stock quantity cannot have decimal values. Please enter a whole number' });
    } else if (stock < 0) {
      errors.push({ field: 'stock', message: 'Stock quantity cannot be negative. Use 0 for out-of-stock items' });
    } else if (stock > 1000000) {
      errors.push({ field: 'stock', message: 'Stock quantity seems unusually high (' + stock.toLocaleString() + '). Please verify the amount' });
    }
  }

  // Category validation
  if (!data.categoryId || (typeof data.categoryId === 'string' && data.categoryId.trim() === '')) {
    errors.push({ field: 'categoryId', message: 'Please select a category for this product' });
  }

  // Description validation (if provided)
  if (data.description && typeof data.description === 'string' && data.description.length > 2000) {
    errors.push({ field: 'description', message: 'Product description is too long. Maximum 2000 characters allowed' });
  }

  return errors;
};

// Category validation
export const validateCategory = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Please enter a category name' });
  } else {
    const trimmedName = data.name.trim();
    if (trimmedName.length < 2) {
      errors.push({ field: 'name', message: 'Category name should be at least 2 characters' });
    } else if (trimmedName.length > 50) {
      errors.push({ field: 'name', message: 'Category name is too long. Maximum 50 characters allowed (currently: ' + trimmedName.length + ')' });
    }
  }

  if (data.description && typeof data.description === 'string') {
    if (data.description.length > 500) {
      errors.push({ field: 'description', message: 'Category description is too long. Maximum 500 characters allowed (currently: ' + data.description.length + ')' });
    }
  }

  return errors;
};

// Order validation with enhanced status and amount checks
export const validateOrder = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Customer name validation
  if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim() === '') {
    errors.push({ field: 'customerName', message: 'Please enter the customer\'s name' });
  } else if (data.customerName.trim().length < 2) {
    errors.push({ field: 'customerName', message: 'Customer name should be at least 2 characters' });
  } else if (data.customerName.trim().length > 100) {
    errors.push({ field: 'customerName', message: 'Customer name is too long (maximum 100 characters)' });
  }

  // Products array validation with detailed checks
  if (!data.products || !Array.isArray(data.products)) {
    errors.push({ field: 'products', message: 'Please add at least one product to this order' });
  } else if (data.products.length === 0) {
    errors.push({ field: 'products', message: 'Order must contain at least one product' });
  } else if (data.products.length > 100) {
    errors.push({ field: 'products', message: 'Order cannot exceed 100 products. Please split into multiple orders' });
  } else {
    data.products.forEach((product: any, index: number) => {
      if (!product.productId) {
        errors.push({ 
          field: `products[${index}].productId`, 
          message: `Item #${index + 1}: Product selection is required` 
        });
      }
      
      // Check for qty field (updated schema)
      const qty = product.qty || product.quantity;
      if (!qty || isNaN(parseInt(qty))) {
        errors.push({ 
          field: `products[${index}].qty`, 
          message: `Item #${index + 1}: Please enter a valid quantity` 
        });
      } else if (parseInt(qty) < 1) {
        errors.push({ 
          field: `products[${index}].qty`, 
          message: `Item #${index + 1}: Quantity must be at least 1` 
        });
      } else if (parseInt(qty) > 10000) {
        errors.push({ 
          field: `products[${index}].qty`, 
          message: `Item #${index + 1}: Quantity seems unusually high (${qty}). Please verify` 
        });
      } else if (!Number.isInteger(parseFloat(qty))) {
        errors.push({ 
          field: `products[${index}].qty`, 
          message: `Item #${index + 1}: Quantity must be a whole number` 
        });
      }
    });
  }

  // Total amount validation with edge cases
  if (data.totalAmount === undefined || data.totalAmount === null || data.totalAmount === '') {
    errors.push({ field: 'totalAmount', message: 'Order total amount is required' });
  } else {
    const amount = parseFloat(data.totalAmount);
    if (isNaN(amount)) {
      errors.push({ field: 'totalAmount', message: 'Total amount must be a valid number' });
    } else if (!isFinite(amount)) {
      errors.push({ field: 'totalAmount', message: 'Total amount must be a valid number' });
    } else if (amount < 0) {
      errors.push({ field: 'totalAmount', message: 'Order total cannot be negative' });
    } else if (amount === 0) {
      errors.push({ field: 'totalAmount', message: 'Order total must be greater than $0.00' });
    } else if (amount > 1000000) {
      errors.push({ field: 'totalAmount', message: 'Order total seems unusually high ($' + amount.toLocaleString() + '). Please verify' });
    }
  }

  // Status validation (for order updates)
  if (data.status !== undefined) {
    const validStatuses = ['pending', 'shipped', 'delivered'];
    if (!validStatuses.includes(data.status)) {
      errors.push({ 
        field: 'status', 
        message: 'Invalid order status. Must be one of: ' + validStatuses.join(', ') 
      });
    }
  }

  return errors;
};

// User validation (for auth) with improved messaging
export const validateUserRegistration = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Please enter your full name' });
  } else {
    const trimmedName = data.name.trim();
    if (trimmedName.length < 2) {
      errors.push({ field: 'name', message: 'Name should be at least 2 characters long' });
    } else if (trimmedName.length > 100) {
      errors.push({ field: 'name', message: 'Name is too long (maximum 100 characters)' });
    }
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
    errors.push({ field: 'email', message: 'Please enter your email address' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address (e.g., user@example.com)' });
  }

  if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
    errors.push({ field: 'password', message: 'Please create a password' });
  } else if (data.password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters for security (currently: ' + data.password.length + ')' });
  } else if (data.password.length > 128) {
    errors.push({ field: 'password', message: 'Password is too long (maximum 128 characters)' });
  } else if (data.password === '123456' || data.password === 'password' || data.password === '123456789') {
    errors.push({ field: 'password', message: 'Please choose a stronger password. This password is too common' });
  }

  return errors;
};

export const validateUserLogin = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
    errors.push({ field: 'email', message: 'Please enter your email address' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
    errors.push({ field: 'password', message: 'Please enter your password' });
  }

  return errors;
};
