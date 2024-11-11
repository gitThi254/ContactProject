import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  useContact,
  useCreateContact,
  useUploadImage,
} from "../../../hook/contact.hook";
import Loading from "../../../components/Loading/Loading";
import * as yup from "yup";
import * as v from "valibot";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const Route = createFileRoute("/(hidden-folder)/contact/$id")({
  component: RouteComponent,
});
export interface ImageData {
  base64?: string;
  file?: File;
}
export interface ContactHttpReq {
  id?: string;
  name: string;
  email: string;
  title: string;
  address: string;
  status: string;
  phone: string;
  photoUrl: string;
}
const yupSchema = yup.object({
  id: yup.string(),
  name: yup.string().required("* is required"),
  email: yup.string().required("* is required"),
  title: yup.string().required("* is required"),
  address: yup.string().required("* is required"),
  status: yup.string().required("* is required"),
  phone: yup.string().required("* is required"),
  photoUrl: yup.string().required("* is required"),
});

type ImageHttpReq = {
  id: string;
  image?: ImageData;
};
const yupSchemaImage = yup.object({
  id: yup.string().required("* is required"),
  image: yup.mixed().test("fileRequired", "File is required", (value: any) => {
    return value?.length != 0;
  }),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isPending } = useContact(id);
  if (isPending) return <Loading />;
  return data && !isPending ? (
    <>
      <FormContact data={data as ContactHttpReq} />
    </>
  ) : (
    <></>
  );
}

function FormContact({ data }: { data: ContactHttpReq }) {
  const form = useForm<ContactHttpReq>({
    defaultValues: data,
    resolver: yupResolver(yupSchema),
  });
  const formImage = useForm<ImageHttpReq>({
    defaultValues: {
      id: data.id,
    },
    resolver: yupResolver(yupSchemaImage),
  });
  const {
    register: registerImage,
    handleSubmit: handleSubmitImage,
    formState: formStateImage,
    watch,
  } = formImage;
  const { errors: errorImage } = formStateImage;

  const navigate = useNavigate();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutate, isPending } = useCreateContact();
  const queryClient = useQueryClient();
  const onSubmit = (data: ContactHttpReq) => {
    mutate(data, {
      onSuccess: (data) => {
        toast.success("Update Contact Success");
        queryClient.setQueryData(["contact", data.id], data);
        navigate({ to: "/contact" });
      },
    });
  };
  const { mutate: image, isPending: loading } = useUploadImage();
  const onSubmitImage = (dataImage: ImageHttpReq) => {
    const formData = new FormData();
    formData.append("file", dataImage.image[0]);
    formData.append("id", dataImage.id);
    image(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["contact", dataImage.id],
          exact: true,
        });

        toast.success("Upload Image success");
      },
    });
  };
  return (
    <>
      <div className="container mx-auto m-4 flex gap-4 items-center justify-center">
        <div className="self-start bg-slate-50 p-6 shadow-md">
          <form
            onSubmit={handleSubmitImage(onSubmitImage)}
            className="flex flex-col gap-2 items-center"
          >
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={data.photoUrl} />
              </div>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              {...registerImage("image")}
            />
            <div className="text-red-500">{errorImage.image?.message}</div>
            <button className="btn btn-success">Upload Image</button>
          </form>
        </div>
        <div className="bg-slate-50 p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Name</span>
                  <span className="text-red-500">{errors.name?.message}</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter a Name"
                  {...register("name")}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Email</span>
                  <span className="text-red-500">{errors.email?.message}</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter a Email"
                  {...register("email")}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium ">Title</span>
                  <span className="text-red-500">{errors.title?.message}</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter title"
                  {...register("title")}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Phone Number</span>
                  <span className="text-red-500">{errors.phone?.message}</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter a phone Number"
                  {...register("phone")}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Address</span>
                  <span className="text-red-500">
                    {errors.address?.message}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter a Address"
                  {...register("address")}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium">Account Status</span>
                  <span className="text-red-500">{errors.status?.message}</span>
                </div>
                <input
                  type="text"
                  placeholder="Status"
                  {...register("status")}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary">Save Contact</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
