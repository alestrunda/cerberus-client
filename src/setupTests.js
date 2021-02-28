import "@testing-library/jest-dom";

//mock react-i18next so we won't get warning about it not being initialized
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key })
}));
