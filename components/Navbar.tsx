import PillNav from "./PillNav";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="container flex justify-center items-center ">
      <PillNav
        logo="/Logo.png"
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/" },
          { label: "Account", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
    </div>
  );
};

export default Navbar;
