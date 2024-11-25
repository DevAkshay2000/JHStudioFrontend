/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PayloadModify(dynamicFormSchema: any, data: any) {
  const nameTypeMapping: any = {};
  dynamicFormSchema?.fields?.forEach((element: any) => {
    nameTypeMapping[element.name] = element.type;
  });
  const payloadObj: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === "isInactive") {
      payloadObj[key] = value ? 1 : 0;
    } else if (["select", "autoComplete"].includes(nameTypeMapping[key])) {
      payloadObj[key] = { id: Number(value) };
    } else {
      payloadObj[key] = value;
    }
  }
  payloadObj.createdDate = new Date();
  payloadObj.modifiedDate = new Date();

  return payloadObj;
}
