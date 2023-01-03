import { toast } from "react-toastify";

const showSuccessToast = (text: string) => {
  toast.success(text, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      boxShadow: "none",
    },
  });
};

const showLoadingToast = (text: string) => {
  toast.loading(text, {
    position: "bottom-center",
    autoClose: 5000,
    closeOnClick: true,
    progress: undefined,
    style: {
      boxShadow: "none",
    },
  });
};

const showErrorToast = (text: string) => {
  toast.error(text, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    style: {
      boxShadow: "none",
    },
  });
};

export { showErrorToast, showLoadingToast, showSuccessToast };
