import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import ContactModal from "../../../components/modal/ContactModal";

export const Route = createFileRoute("/contact/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContactModal />;
}
