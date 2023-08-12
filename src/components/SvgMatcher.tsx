const FaIcons = require("react-icons/fa6");

type SvgMatcherProps = {
  code: string;
};

export default async function SvgMatcher(props: SvgMatcherProps) {
  const { code } = props;
  if (!code) return <>Type something</>;
  const { list }: { list: { difference: number; name: string }[] } =
    await fetch("/api/get-icons", {
      method: "POST",
      body: JSON.stringify({ svg_code: code }),
    }).then((data) => {
      return data.json();
    });

  return (
    <>
      {list.map((icon) => {
        const Component = (FaIcons as any)[icon.name];

        return (
          <div>
            {icon.difference} - <Component />
          </div>
        );
      })}
    </>
  );
}
