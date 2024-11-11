import React from "react";
import { useDeleteContact } from "../../hook/contact.hook";

const BtnContact = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteContact();
  return (
    <button
      onClick={() => mutate(id)}
      disabled={isPending}
      className="btn btn-error"
    >
      {isPending ? "Loading..." : "Delete"}
    </button>
  );
};

export default BtnContact;
