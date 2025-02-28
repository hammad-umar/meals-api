export const STATIC_MEAL_PLANS = {
  vegetarian: [
    'Veggie Stir Fry',
    'Lentil Soup',
    'Chickpea Salad',
    'Grilled Veggies',
    'Tofu Scramble',
    'Pasta Primavera',
    'Vegetable Curry',
  ],
  glutenFree: [
    'Grilled Chicken',
    'Quinoa Salad',
    'Rice & Beans',
    'Oven Baked Fish',
    'Egg Scramble',
    'Beef Stir Fry',
    'Gluten-Free Pasta',
  ],
};

export const COMMON_MESSAGE = {
  SIGNUP_SUCCESSFULLY: 'Signed up successfully.',
  SIGNIN_SUCCESSFULLY: 'Signed in successfully.',
  SUCCESSFULLY_CREATED: (documentName: string) =>
    `${documentName} created successfully.`,
  SUCCESSFULLY_UPDATED: (documentName: string) =>
    `${documentName} updated successfully.`,
  SUCCESSFULLY_DELETED: (documentName: string) =>
    `${documentName} deleted successfully.`,
  SUCCESSFULLY_GET: (documentName: string) =>
    `${documentName} fetched successfully.`,
};

export const ERROR_MESSAGE = {
  INVALID_CREDENTIALS: 'Invalid Credentials.',
  EMAIL_TAKEN: 'Email is already taken.',
  ALREADY_EXIST: (entityName: string) => `${entityName} already exists.`,
  NOT_FOUND: (entityName: string) => `${entityName} not found.`,
};
