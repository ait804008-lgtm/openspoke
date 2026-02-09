// Validation functions
export function validatePhone(phone: string): boolean {
  const phoneRegex = /\(\d{3}\)\s*\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

export function validateName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
}

export function validateStreet(street: string): boolean {
  return street.trim().length > 0 && street.trim().length <= 200;
}

export function validateCity(city: string): boolean {
  return city.trim().length > 0 && city.trim().length <= 100;
}

export function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && id.length < 100;
}

export function validateStatus(status: string): boolean {
  const validStatuses = ['pending', 'picked_up', 'in_transit', 'arrived', 'delivered', 'failed'];
  return validStatuses.includes(status);
}

export function validatePriority(priority: string): boolean {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority);
}
