/**
 * Converts a JavaScript object into FormData
 * @param obj - The object to convert
 * @param formData - Optional existing FormData instance to append to
 * @param parentKey - Optional parent key for nested objects
 * @returns FormData object containing all the object's data
 */
export function objectToFormData(
  obj: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey: string = ''
): FormData {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value === null || value === undefined) {
        continue;
      }

      if (value instanceof Date) {
        formData.append(formKey, value.toISOString());
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (typeof item === 'object' && !(item instanceof File || item instanceof Blob)) {
            objectToFormData(item, formData, arrayKey);
          } else {
            formData.append(arrayKey, item);
          }
        });
      } else if (typeof value === 'object') {
        objectToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, String(value));
      }
    }
  }

  return formData;
}
