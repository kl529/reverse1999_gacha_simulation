export const getTranslations = jest
  .fn()
  .mockResolvedValue((key: string) => key);
export const getMessages = jest.fn().mockResolvedValue({});
