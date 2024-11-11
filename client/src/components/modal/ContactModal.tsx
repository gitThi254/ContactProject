import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateContact, useUploadImage } from "../../hook/contact.hook";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
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
  image?: ImageData;
}
const yupSchema = yup.object({
  id: yup.string(),
  name: yup.string().required("* is required"),
  email: yup.string().required("* is required"),
  title: yup.string().required("* is required"),
  address: yup.string().required("* is required"),
  status: yup.string().required("* is required"),
  phone: yup.string().required("* is required"),
  image: yup.mixed().test("fileRequired", "File is required", (value: any) => {
    return value.length != 0;
  }),
});

const ContactModal = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const form = useForm<ContactHttpReq>({
    defaultValues: {
      name: "",
      email: "",
      title: "",
      address: "",
      status: "",
      phone: "",
    },
    resolver: yupResolver(yupSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutate, isPending } = useCreateContact();
  const { mutate: image, isPending: loading } = useUploadImage();
  const onSubmit = (data: ContactHttpReq) => {
    mutate(data, {
      onSuccess: (res) => {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("id", res.id);
        image(formData, {
          onSuccess: () => {
            toast.success("Create Contact Success");
            navigate({ to: "/contact" });
          },
        });
      },
    });
  };
  useEffect(() => {
    if (!open) {
      navigate({ to: "/contact" });
    }
  }, [open]);
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <h3 className="font-bold text-lg">New Contact</h3>
            <hr className="my-2" />
          </DialogTitle>
          <DialogContent>
            <div>
              <form
                className="flex flex-col w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-medium">Name</span>
                      <span className="text-red-500">
                        {errors.name?.message}
                      </span>
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
                      <span className="text-red-500">
                        {errors.email?.message}
                      </span>
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
                      <span className="text-red-500">
                        {errors.title?.message}
                      </span>
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
                      <span className="label-text font-medium">
                        Phone Number
                      </span>
                      <span className="text-red-500">
                        {errors.phone?.message}
                      </span>
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
                      <span className="label-text font-medium">
                        Account Status
                      </span>
                      <span className="text-red-500">
                        {errors.status?.message}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Status"
                      {...register("status")}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div className="mt-4 w-full">
                  <label className="labeltext font-medium my-2">
                    Phofile photo
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="file-input file-input-bordered file-input-sm w-full"
                  />
                  <span className="text-red-500">{errors.title?.message}</span>
                </div>
                <DialogActions>
                  {" "}
                   
                  <div className="flex gap-2 mt-2">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button className="btn btn-success">Save</button>
                  </div>
                </DialogActions>
              </form>
            </div>
          </DialogContent>{" "}
           {" "}
        </Dialog>
      </div>
    </>
  );
};

export default ContactModal;
