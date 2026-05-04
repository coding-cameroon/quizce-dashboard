import { redirect } from "next/navigation";

const RedirectPage = () => {
  return redirect("/dashboard");
};

export default RedirectPage;
