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

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Product validation
export const validateProduct = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Product name is required' });
  } else if (data.name.length < 3) {
    errors.push({ field: 'name', message: 'Product name must be at least 3 characters' });
  } else if (data.name.length > 100) {
    errors.push({ field: 'name', message: 'Product name must not exceed 100 characters' });
  }

  if (data.price === undefined || data.price === null || data.price === '') {
    errors.push({ field: 'price', message: 'Product price is required' });
  } else {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      errors.push({ field: 'price', message: 'Product price must be a valid number' });
    } else if (price < 0) {
      errors.push({ field: 'price', message: 'Product price cannot be negative' });
    } else if (price > 1000000) {
      errors.push({ field: 'price', message: 'Product price seems unreasonably high' });
    }
  }

  if (data.stock !== undefined && data.stock !== null && data.stock !== '') {
    const stock = parseInt(data.stock);
    if (isNaN(stock)) {
      errors.push({ field: 'stock', message: 'Stock must be a valid number' });
    } else if (stock < 0) {
      errors.push({ field: 'stock', message: 'Stock cannot be negative' });
    }
  }

  if (!data.categoryId || data.categoryId.trim() === '') {
    errors.push({ field: 'categoryId', message: 'Category is required' });
  }

  return errors;
};

// Category validation
export const validateCategory = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Category name is required' });
  } else if (data.name.length < 2) {
    errors.push({ field: 'name', message: 'Category name must be at least 2 characters' });
  } else if (data.name.length > 50) {
    errors.push({ field: 'name', message: 'Category name must not exceed 50 characters' });
  }

  if (data.description && data.description.length > 500) {
    errors.push({ field: 'description', message: 'Description must not exceed 500 characters' });
  }

  return errors;
};

// Order validation
export const validateOrder = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.customerName || data.customerName.trim() === '') {
    errors.push({ field: 'customerName', message: 'Customer name is required' });
  } else if (data.customerName.length < 2) {
    errors.push({ field: 'customerName', message: 'Customer name must be at least 2 characters' });
  }

  if (!data.customerEmail || data.customerEmail.trim() === '') {
    errors.push({ field: 'customerEmail', message: 'Customer email is required' });
  } else if (!isValidEmail(data.customerEmail)) {
    errors.push({ field: 'customerEmail', message: 'Please provide a valid email address' });
  }

  if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
    errors.push({ field: 'products', message: 'At least one product is required' });
  } else {
    data.products.forEach((product: any, index: number) => {
      if (!product.productId) {
        errors.push({ 
          field: `products[${index}].productId`, 
          message: `Product ID is required for item ${index + 1}` 
        });
      }
      if (!product.quantity || product.quantity < 1) {
        errors.push({ 
          field: `products[${index}].quantity`, 
          message: `Valid quantity is required for item ${index + 1}` 
        });
      }
    });
  }

  if (data.totalAmount === undefined || data.totalAmount === null) {
    errors.push({ field: 'totalAmount', message: 'Total amount is required' });
  } else if (data.totalAmount < 0) {
    errors.push({ field: 'totalAmount', message: 'Total amount cannot be negative' });
  }

  return errors;
};

// User validation (for auth)
export const validateUserRegistration = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!data.email || data.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!data.password || data.password.trim() === '') {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (data.password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  return errors;
};

export const validateUserLogin = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.email || data.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!data.password || data.password.trim() === '') {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};
