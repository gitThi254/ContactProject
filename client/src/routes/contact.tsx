import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Loading from "../components/Loading/Loading";
import { useContacts } from "../hook/contact.hook";
import * as v from "valibot";
import {
  BsCheckCircle,
  BsEnvelopeFill,
  BsFillGeoFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import BtnContact from "../components/Btn/BtnContact";

const contactFilters = v.object({
  page: v.optional(v.number()),
});
type contactFilters = v.InferOutput<typeof contactFilters>;

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
  validateSearch: (search) => v.parse(contactFilters, search),
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const { data, isPending } = useContacts(page ? page : 1);
  if (isPending) return <Loading />;
  return (
    <>
      <div className="min-h-screen grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 grid-rows-3 gap-4 m-4 relative">
        {data && !isPending ? (
          data.content.map((item) => (
            <div
              key={item.id}
              className="relative bg-white p-4 shadow-2 rounded-md"
            >
              <div className="absolute z-99 right-5 top-5">
                <BtnContact id={item.id} />
              </div>
              <Link to={"/contact/$id"} params={{ id: item.id }}>
                <div className="flex gap-4">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img src={item.photoUrl} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-medium text-slate-700">
                      {" "}
                      {item.name}
                    </div>
                    <div className="text-md text-primary font-normal">
                      {item.title}
                    </div>
                  </div>
                </div>
                <div className="h-[150px] flex flex-col items-start justify-around">
                  <div className="flex gap-2 items-center">
                    <div>
                      <BsFillGeoFill />
                    </div>

                    {item.address}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <BsEnvelopeFill />
                    </div>
                    {item.email}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <BsFillTelephoneFill />
                    </div>
                    {item.phone}
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheckCircle />
                    {item.status}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
        <Outlet />
      </div>
      <div className="p-5">
        <div className="join">
          {Array(data?.totalPages)
            .fill(0)
            .map((_, index) => (
              <Link
                className="join-item btn"
                key={index}
                activeProps={{
                  style: {
                    fontWeight: "bold",
                    backgroundColor: "rgb(50 70 229)",
                  },
                }}
                to={"/contact"}
                search={{ page: index + 1 }}
              >
                {index + 1}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
