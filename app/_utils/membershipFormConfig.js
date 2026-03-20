// These are the fields that must be filled in before submit
export const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "birthday",
  "address",
  "city",
  "postalCode",
  "email",
  "password",
  "confirmPassword",
  "phone",
  "emailNotifications",
  "agreedToPrivacy",
  "hasChildren",
];

// This is the starting/default form state, we then export it so the main form file stays cleaner
export const initialMembershipForm = {
  firstName: "",
  lastName: "",
  preferredName: "",
  birthday: "",
  address: "",
  city: "",
  postalCode: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  currentOrgInvolvement: "",
  positionsHeld: "",
  addressPhilippines: "",
  hasChildren: "",
  dependants: [
    {
      firstName: "",
      lastName: "",
      birthday: "",
    },
  ],
  emailNotifications: "",
  agreedToPrivacy: false,
};