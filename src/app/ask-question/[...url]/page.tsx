
interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}
const Page = ({ params }: PageProps) => {
  console.log("params:", params);
  return <div className="pt-48 text-5xl">Hello baby</div>;
};

export default Page;
