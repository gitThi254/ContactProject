import { ContactHttpReq } from "../components/modal/ContactModal";
import axios from "./axios";
export interface PageContact {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface Content {
  id: string;
  name: string;
  email: string;
  title: string;
  phone: string;
  address: string;
  status: string;
  photoUrl: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface ImageUpload {
  id: String;
  file: any;
}
export const getContant = async (id: string): Promise<Content> => {
  return await axios.get(`contacts/${id}`).then((res) => res.data);
};

export const getContants = async (page: number): Promise<PageContact> => {
  return await axios
    .get(`contacts?size=12&page=${page ? page - 1 : ""}`)
    .then((res) => res.data);
};
export const createContact = async (data: ContactHttpReq): Promise<Content> => {
  return await axios.post("contacts", data).then((res) => res.data);
};

export const deleteContact = async (id: string): Promise<Content> => {
  return await axios.delete(`contacts/${id}`);
};

export const updateImage = async (data: FormData): Promise<Content> => {
  return await axios.put("contacts/photo", data);
};
