import Link from "next/link";

const Navlink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-3 text-[#344054] sm:text-base rounded md:p-0 hover:text-[#A9A9A9] font-onest"
    >
      {title}
    </Link>
  );
};

export default Navlink;