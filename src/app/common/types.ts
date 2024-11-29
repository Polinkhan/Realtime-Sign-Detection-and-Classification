import { AlertColor, ButtonProps, SxProps } from "@mui/material";
import { EnqueueSnackbar } from "notistack";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type ToastStatusType = "success" | "error" | "warning" | "info";

export type rolesTypes = "View" | "Delete" | "Update" | "Add" | "Execute";

export type FetchPromiseType = { read: () => any };

export interface AircraftTypes {
  "Business Jet": string;
  "Commercial Aircraft": string;
  "General Aviation": string;
  "Govt. Aircraft": string;
  count: number;
}

export interface AircraftAclTypes {
  aircrafts?: any;
  status?: boolean;
}

export interface UserPrivilegeTypes {
  Aircraft: Array<string>;
  privilege: {
    "User Management": Array<rolesTypes>;
    "User Group Management": Array<rolesTypes>;
    "Aircraft Management": Array<rolesTypes>;
    Dashboard: Array<rolesTypes>;
    "Company Management": Array<rolesTypes>;
    "Remote Maintenance": Array<rolesTypes>;
    "Archive Management": Array<rolesTypes>;
    "Fleet Overview": Array<rolesTypes>;
    "Alarms And Notifications": Array<rolesTypes>;
  };
}

export interface UserGroupTypes {
  id: number;
  name: string;
  description: string;
  privilege: string;
  rank: string;
  report_email: string;
  last_update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface UserTypes {
  user: {
    id: number;
    login: string;
    password: string;
    status: string;
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    photo: string;
    group_id: number;
    last_update_by: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    group: UserGroupTypes;
  };
}

export type Callback = (any?: any) => any;

export interface AuthContextTypes {
  currentUser: UserTypes;
  setCurrentUser: any;
  loading: boolean;
  redirectTo: string;
  setRedirectTo: any;
  init: (delayTime?: number, callback?: Callback) => Promise<void>;
}

export interface ToastContextTypes {
  onOpen: (status: AlertColor, message: string) => void;
}

export type ActionTypes = {
  type: any;
  payload: any;
};

export type dispatchTypes = React.Dispatch<ActionTypes> | undefined;

export type ActivityStateType =
  | {
      time: any;
      aircraft_online: {
        online: AircraftTypes;
        offline: AircraftTypes;
      };
      device_online: any;
      pending_aircraft: any;
      attempts_blocked: any;
    }
  | undefined;

export interface MenuButtonProps {
  title: string;
  active: boolean;
  Icon?: any;
  url: string;
  disabled?: boolean;
  onClose?: () => void;
}

// Table

export type alignType = "left" | "right" | "center";

export interface View {
  [key: string]: boolean;
}
export interface PermissionsType {
  accessControlManagement: {
    userList: string;
    groupList: string;
    companyList: string;
  };
  aircraftManagement: {
    aircraftList: string;
    selectedAircraft: string;
  };
  archiveManagement: {
    aircraftList: string;
    aircraftArchiveList: string;
  };
  cloudArchive: {
    softwareUpdatePackage: string;
    remoteMaintenanceCertificate: string;
    sslCertificate: string;
  };
}

export interface HeaderTypes {
  label: string;
  align?: alignType;
  width?: number;
  sx?: SxProps;
}

export type ToggleTypes = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export type AircraftByIDType = {
  aircraft_sn: string;
  aircraft_tailno: string;
  aircraft_type_id: number;
  command_history: string;
  company_id: number;
  company_name: string;
  created_at: string;
  daily_report: string | null;
  deleted_at: string | null;
  device: string;
  email: string | null;
  global_report_enable: string | null;
  id: number;
  last_update_by: string;
  last_weekly_report_sent_at: string | null;
  manufacturer: string | null;
  model: string | null;
  ra_credential: string;
  router_hardware_sn: string;
  router_sn: string;
  status: "online" | "";
  updated_at: string;
  weekly_report: string | null;
};

// export type TableBodyKeyType =
//   | {
//       _key?: string;
//       width?: number;
//       Component: (props: any) => any;
//     }
//   | string;

type TableBodyKeyType1 = {
  key?: string;
  width?: number | string;
  align?: alignType;
  isActionComponent?: boolean;
  formatter?: (any: any) => any;
  Component: (props: any) => any;
};

type TableBodyKeyType2 = {
  key: string;
  width?: number | string;
  align?: alignType;
  Component?: null;
  isActionComponent?: boolean;
  formatter?: (any: any) => any;
};

export type TableBodyKeyType = TableBodyKeyType1 | TableBodyKeyType2;

export interface TableBodyComponentProps {
  data: any;
  onOpen: any;
  permissions: string[];
  callback: Callback;
}

export type arrowPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom";

export type modalContent = {
  title: string;
  content: JSX.Element;
  width?: number | string;
  actions?: Array<
    {
      name: string;
      onClick: () => void | Promise<void>;
      shouldLoading?: boolean;
    } & ButtonProps
  >;
};

export type ModalContextType = {
  content: JSX.Element;
  open: boolean;

  formState: {
    inputs: any;
    setInputs: React.Dispatch<any>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formFieldProps: (key: string) => void;
  };

  openModal: (content: modalContent) => void;
  closeModal: () => void;
  toggleModal: () => void;
  setContent: (any: any) => void;
  setModalContent: (content: modalContent) => void;
  setLoadingState: (flag: boolean) => void;
};

export type IconType =
  | "edit"
  | "delete"
  | "restore"
  | "reset"
  | "archive"
  | "sim"
  | "add-user"
  | "details"
  | "save"
  | "arrow-right"
  | "arrow-left"
  | "menu"
  | "notification"
  | "download"
  | "left-arrow-fill"
  | "add-company"
  | "add-group"
  | "cross"
  | "add-shild"
  | "search"
  | "export"
  | "upload"
  | "";

export type ServiceModuleRequestTypes = {
  action?: "start";
  params: {};
  router_sn: string;
  service_module_id: string;
};

export type getCommandStatusTypes = {
  router_sn: string;
  session_id: string;
  enqueueSnackbar: EnqueueSnackbar;
};
