import Link from "next/link";
import FooterList from "./FooterList";
import Container from "../Container";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
    return (
    <footer className=" bg-slate-700 text-slate-200 
        text-sm mt-16">
            <Container>
            <div className="flex flex-col md:flex-row
            justify-between pt-16 pb-8">
                <FooterList>
<h3 className="text-base font-bold mb-2">Shop Categories</h3>
<Link href="#">Phones</Link>
<Link href="#">Laptops</Link>
<Link href="#">Desktops</Link>
<Link href="#">Watches</Link>
<Link href="#">Tvs</Link>
<Link href="#">Accessories</Link>
                </FooterList>
                <FooterList>
<h3 className="text-base font-bold mb-2">Customer Service</h3>
<Link href="#">Contact Us</Link>
<Link href="#">Shipping Policy</Link>
<Link href="#">Returns & Exchanges</Link>
<Link href="#">FAQs</Link>
                </FooterList>
                <div className="w-full md:w-1/3 nmb-6
                md:mb-0">
<h3 className="text-base font-bold mb-2">About Us</h3>
<p className="mb-2">At our electronics
    store, we are dedicated to provide the
    latest and greatest devices and accessories
    to our customers. With a wide selection of
    Phones, TVs, Laptops, Watches, and
    accessories
    </p>
    <p>&copy; {new Date().getFullYear()}.
        E~Shop (Rajesh & Umesh). All right reserved

    </p>
                </div>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">
                        Follow Us</h3>
                        <div className="flex gap-2">
                        <Link href="#">
                        <MdFacebook size={24} />
                        </Link>
                        <Link href="#">
                        <AiFillTwitterCircle size={24} />
                        </Link>
                        <Link href="https://github.com/razace50">
                        <FaGithub size={24} />
                        </Link>
                        </div>
                </FooterList>
            </div>
            </Container>
            </footer> );
};

export default Footer;