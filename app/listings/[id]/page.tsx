export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div className="">Listing {id}</div>;
}
