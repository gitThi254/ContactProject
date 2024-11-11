import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createContact,
  deleteContact,
  getContant,
  getContants,
  updateImage,
} from "../api/contact.api";
import toast from "react-hot-toast";

export const useContacts = (page: number) => {
  return useQuery({
    queryKey: ["contact", page],
    queryFn: () => getContants(page),
    placeholderData: keepPreviousData,
  });
};
export const useContact = (id: string) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContant(id),
  });
};

export const useCreateContact = () => {
  return useMutation({
    mutationFn: createContact,
    onError: () => {
      toast.success("Fail Create Contact");
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      toast.success("Delete Contact success");
    },
    onError: () => {
      toast.success("Fail Delete Contact");
    },
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"], exact: true });
    },
    onError: () => {
      toast.success("Fail Create Contact");
    },
  });
};
