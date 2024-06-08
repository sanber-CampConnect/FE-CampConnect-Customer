import Slider from "react-slick";
import { PopularProduct, ReviewUser } from "../../components/atoms/Card";
import { PrimaryButton, OutlineButton } from "../../components/atoms/Buttons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ImgHerosection from "../../assets/images/hero-section.png";
import Product1 from "../../assets/images/Product_1.png";
import Product2 from "../../assets/images/Product_2.png";
import Product3 from "../../assets/images/Product_3.png";
import Profile from "../../assets/images/Profile.png";
import iconInstagram  from "../../assets/icons/iconInstagram.png";
import iconWhatsApp  from "../../assets/icons/iconWhatsApp.png";

const products = [
    { id: 1, name: "Tenda 2L Kap. 4-5P Naturhike", image: Product1 },
    { id: 2, name: "Tenda 2L Kap. 6-7P Forester", image: Product2 },
    { id: 3, name: "Headlamp", image: Product3 },
];

const reviews = [
    { id: 1, name: "John Carter", title: "Head of Marketing", subtext: "“An amazing service”", image: Profile, text:"Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc auris scelerisque sed egestas." },
    { id: 2, name: "Jane Doe", title: "Manajer Produk", subtext: "“An amazing service”", image: Profile, text:"Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc auris scelerisque sed egestas." },
    { id: 3, name: "Sam Smith", title: "CEO", subtext: "“An amazing service”", image: Profile, text:"Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc auris scelerisque sed egestas." },
];

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <>
            <div className="flex justify-center items-center flex-col">
                <div className="text-center">
                    <h1 className="font-bold text-primary text-[36px]">
                        Sewa Alat Camping Terbaik Malang Raya
                    </h1>
                    <p className="text-neutral text-md pt-5">
                        Jadikan petualanganmu berkesan
                    </p>
                    <div className="pt-10">
                        <img
                            src={ImgHerosection}
                            alt="img-gunung"
                            className="rounded-tl-3xl rounded-tr-3xl"
                        />
                    </div>
                    <PrimaryButton
                        text="Cara Pemesanan"
                        className="mt-10 w-60 h-14 rounded-full"
                    />
                    <OutlineButton
                        text="Hubungi Admin"
                        className="mt-4 w-60 h-14 rounded-full"
                    />
                </div>
                <div className="text-center pt-10">
                    <h1 className="font-bold text-primary text-2xl">
                        Produk Terpopuler
                    </h1>
                    <p className="text-md mt-5 w-96 text-neutral">
                        Kami selalu menyediakan peralataan outdoor terbaik untuk
                        menunjang pengalaman konsumen ketika berpetualang
                    </p>
                </div>
                <div className="w-96">
                    <Slider {...settings}>
                        {products.map((product) => (
                            <div key={product.id} className="px-44 ">
                                <PopularProduct product={product} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <PrimaryButton text="Selengkapnya"
                        className="mt-16 w-full h-14 rounded-full"
                    />
                    <div className="text-center pt-10">
                        <h1 className="font-bold text-secondary text-2xl"> Testimoni Pelanggan</h1>
                        <p className="text-md mt-4 text-neutral"> Kami memberikan pelayanan terbaik kepada pelanggan setia kami</p>
                    </div>
                    <div className="w-96 pt-10">
                    <Slider {...settings}>
                        {reviews.map((review) => (
                            <div key={review.id} className="px-44 ">
                                <ReviewUser review={review} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="text-center pt-12">
                    <h1 className="font-bold text-primary text-2xl"> Produk Kami</h1>
                    <div className="flex">
                        <PrimaryButton text="Filter" className="rounded-full"/>
                    </div>
                    <p className="text-md pt-10 text-neutral"> Peralatan outdoor dengan standar yang baik menjadi fokus kami, karena keselamatan dan kenyamanan adalah faktor penting</p>
                </div>
                <div className="w-96">
                    <Slider {...settings}>
                        {products.map((product) => (
                            <div key={product.id} className="px-44 ">
                                <PopularProduct product={product} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <PrimaryButton text="Selengkapnya"
                        className="mt-16 w-full h-14 rounded-full"
                    />
                <footer className="pt-20">
                        <h2 className="text-center text-neutral">
                        © 2024 Camp Connect <br /> Hak cipta dilindungi.
                        </h2>
                        <div className="flex justify-center mt-5 gap-5 mb-10">
                            <img src={iconInstagram} alt="instagram" className="w-10 h-10" />
                            <img src={iconWhatsApp} alt="WhaatsApp" className="w-10 h-10" />
                        </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
