/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getData from "@/api/getData.api";;

type MenuRouteType = {
  [key: string]:
    | ReactNode
    | string
    | {
        [key: string]: string | any;
      }[];
}[];

interface MenuRouteState {
  menuRoutes: MenuRouteType;
  //   flattenedMenu: {
  //     [key: string]: string | boolean;
  //   };
  //   routingAssign: {
  //     [key: string]: string | boolean;
  //   };
  //   applicableObjectTypes: {
  //     [key: number]: boolean;
  //   };
  //   pagePermissions: {
  //     [key: string]: Object;
  //   };
  //   logRoutes: {
  //     [key: number]: string;
  //   };
}

const initialState: MenuRouteState = {
  menuRoutes: [],
  //   flattenedMenu: {},
  //   routingAssign: {},
  //   applicableObjectTypes: {},
  //   pagePermissions: {},
  //   logRoutes: {},
};

export const fetchHeaderMenus = createAsyncThunk(
  "fetchHeaderMenus",
  async (): Promise<any> => {
    const menus = await getData("/menu-headers");
    return menus.data;
  }
);

const headerMenuSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHeaderMenus.fulfilled, (state, action) => {
      state.menuRoutes = action.payload;
      //   state.flattenedMenu = flattenMenuRoutes(action.payload);
      //   state.routingAssign = flattenRoutingAssign(action.payload);
      //   state.applicableObjectTypes = getApplicableObjectTypes(action.payload);
      //   state.pagePermissions = extractPagePermission(action.payload);
      //   state.logRoutes = extractLogRoutes(action.payload);
      return state;
    });
  },
});

// // Function to flatten the menu routes
// const flattenMenuRoutes = (menuRoutes: MenuRouteType): { [key: string]: string | boolean } => {
//   const flattenedMenu: { [key: string]: string | boolean } = {};
//   //Traversing menu routes
//   menuRoutes &&
//     menuRoutes?.forEach((objLevel1) => {
//       if (objLevel1?.collapse && Array.isArray(objLevel1?.collapse)) {
//         objLevel1.collapse.forEach((objLevel2) => {
//           if (objLevel2.collapse && Array.isArray(objLevel2.collapse)) {
//             objLevel2.collapse.forEach((objLevel3) => {
//               flattenedMenu[objLevel3.id] = objLevel3.isCodeEditable;
//             });
//           }
//         });
//       }
//     });
//   return flattenedMenu;
// };

// const getApplicableObjectTypes = (
//   menuRoutes: MenuRouteType
// ): {
//   [key: number]: boolean;
// } => {
//   const flattenedApplicableObj: {
//     [key: number]: boolean;
//   } = {};
//   //Traversing menu routes
//   menuRoutes &&
//     menuRoutes?.forEach((objLevel1) => {
//       if (objLevel1?.collapse && Array.isArray(objLevel1?.collapse)) {
//         objLevel1?.collapse?.forEach((objLevel2) => {
//           if (objLevel2.collapse && Array.isArray(objLevel2.collapse)) {
//             objLevel2.collapse?.forEach((objLevel3) => {
//               // flattenedApplicableObj.push(objLevel3.id);
//               flattenedApplicableObj[objLevel3.id] = true;
//             });
//           }
//         });
//       }
//     });
//   return flattenedApplicableObj;
// };

// const flattenRoutingAssign = (menuRoutes: MenuRouteType): { [key: string]: string | boolean } => {
//   const routingAssign: { [key: string]: string | boolean } = {};
//   // Populate routingAssign based on menuRoutes structure
//   // Example logic:
//   menuRoutes &&
//     menuRoutes.forEach((objLevel1) => {
//       if (objLevel1.collapse && Array.isArray(objLevel1.collapse)) {
//         objLevel1.collapse.forEach((objLevel2) => {
//           if (objLevel2.collapse && Array.isArray(objLevel2.collapse)) {
//             objLevel2.collapse.forEach((objLevel3) => {
//               routingAssign[objLevel3.id] = objLevel3.isCodeEditable;
//             });
//           }
//         });
//       }
//     });
//   return routingAssign;
// };

// // Extract Role Permission data
// const extractPagePermission = (menuRoutes: MenuRouteType): { [key: string]: string | boolean } => {
//   const pagePermissions: { [key: string]: any } = {};
//   menuRoutes &&
//     menuRoutes?.forEach((objLevel1) => {
//       if (objLevel1?.collapse && Array.isArray(objLevel1.collapse)) {
//         objLevel1.collapse.forEach((objLevel2) => {
//           if (objLevel2.collapse && Array.isArray(objLevel2.collapse)) {
//             objLevel2.collapse.forEach((objLevel3) => {
//               if (objLevel3?.permission) {
//                 pagePermissions[objLevel3.id] = objLevel3.permission;
//               }
//             });
//           }
//         });
//       }
//     });
//   return pagePermissions;
// };

// //Extract objectypeid and menu route for logs
// const extractLogRoutes = (menuRoutes: MenuRouteType): { [key: string]: string } => {
//   const logRoutes: { [key: number]: string } = {};
//   menuRoutes &&
//     menuRoutes?.forEach((objLevel1) => {
//       if (objLevel1?.collapse && Array.isArray(objLevel1?.collapse)) {
//         objLevel1?.collapse?.forEach((objLevel2) => {
//           if (objLevel2.collapse && Array.isArray(objLevel2.collapse)) {
//             objLevel2.collapse?.forEach((objLevel3) => {
//               logRoutes[objLevel3.id] = objLevel3.route;
//             });
//           }
//         });
//       }
//     });
//   return logRoutes;
// };

export default headerMenuSlice.reducer;
