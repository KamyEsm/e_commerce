export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ contact?: string }>
}) {
    const { contact } = await searchParams;
    return <div>My Post: {contact}</div>
}