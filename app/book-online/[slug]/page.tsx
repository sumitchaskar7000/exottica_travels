import { redirect } from "next/navigation";

export default function BookOnlineSlugPage({ params }: { params: { slug: string } }) {
  // Currently, "Book online" categories are represented by packages in this site.
  // This route prevents 404s from the navigation menu.
  void params;
  return redirect("/packages");
}

