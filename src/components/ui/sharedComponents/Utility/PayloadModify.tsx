/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PayloadModify(dynamicFormSchema: any, data: any) {
  console.log(data);
  const nameTypeMapping: any = {};
  const exclude: string[] = [];
  dynamicFormSchema?.fields?.forEach((element: any) => {
    nameTypeMapping[element.name] = element.type;
    //remove display only objects from data
    if (element.isHidden) {
      exclude.push(element.name);
    }
  });
  const payloadObj: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (!exclude.includes(key)) {
      if (key === "isInactive") {
        payloadObj[key] = value ? 1 : 0;
      } else if (["select", "autoComplete"].includes(nameTypeMapping[key])) {
        if (value && value !== "undefined") {
          payloadObj[key] = { id: Number(value) };
        }
      } else if (nameTypeMapping[key] === "number") {
        payloadObj[key] = Number(value);
      } else {
        payloadObj[key] = value;
      }
    }
  }
  payloadObj.createdDate = new Date();
  payloadObj.modifiedDate = new Date();

  return payloadObj;
}
