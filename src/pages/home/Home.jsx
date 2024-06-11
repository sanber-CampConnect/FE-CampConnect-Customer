import {
  PopularProduct,
  ReviewUser,
  ProductCard,
} from "../../components/atoms/Card";
import { PrimaryButton, OutlineButton } from "../../components/atoms/Buttons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  heroSectionDesktop,
  heroSectionMobile,
  Product1,
  Product2,
  Product3,
  Product4,
  Product5,
  photoProfile,
} from "../../assets/images/index";
import { Footer } from "../../components/organisms/Footer";

const products = [
  {
    id: 1,
    product_name: "Tenda 2L Kap. 4-5P Naturhike",
    image: Product1,
    description: "Tenda yang kokoh dan nyaman untuk 4-5 orang.",
    link: "#",
  },
  {
    id: 2,
    product_name: "Tenda 2L Kap. 6-7P Forester",
    image: Product2,
    description: "Tenda luas untuk 6-7 orang.",
    link: "#",
  },
  {
    id: 3,
    product_name: "Headlamp",
    image: Product3,
    description: "Lampu kepala dengan pencahayaan terang.",
    link: "#",
  },
  {
    id: 4,
    product_name: "Lampu Tenda Bakpao",
    image: Product4,
    description: "Lampu tenda yang hemat energi.",
    link: "#",
  },
  {
    id: 5,
    product_name: "Tenda 2L Kap. 4-5P Borneo",
    image: Product5,
    description: "Tenda yang cocok untuk keluarga kecil.",
    link: "#",
  },
  {
    id: 6,
    product_name: "Tenda EXL CHANODOUG KAP. 12 P",
    image: Product5,
    description: "Tenda besar untuk 12 orang.",
    link: "#",
  },
];

const reviews = [
  {
    id: 1,
    name: "John Carter",
    title: "Head of Marketing",
    subtext: "“An amazing service”",
    image: photoProfile,
    text: "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc auris scelerisque sed egestas.",
  },
  {
    id: 2,
    name: "Jane Doe",
    title: "Manajer Produk",
    subtext: "“An amazing service”",
    image: photoProfile,
    text: "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc auris scelerisque sed egestas.",
  },
  {
    id: 3,
    name: "Sam Smith",
    title: "CEO",
    subtext: "“An amazing service”",
    image: photoProfile,
    text: "Lorem ipsum dolor sit ametolil col consectetur adipiscing lectus a nunc auris scelerisque sed egestas.",
  },
];

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 -right-16 z-5 transform -translate-y-1/2 cursor-pointer text-black bg-white  p-2 shadow-md hover:bg-gray-200 hidden xl:block "
      onClick={onClick}
    >
      &#9654;
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 -left-12 z-5 transform -translate-y-1/2 cursor-pointer text-black bg-white  p-2 shadow-md hover:bg-gray-200 hidden xl:block"
      onClick={onClick}
    >
      &#9664;
    </div>
  );
};

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow className="hidden xl:block" />,
    prevArrow: <PrevArrow className="hidden xl:block" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          nextArrow: <NextArrow className="hidden xl:block" />,
          prevArrow: <PrevArrow className="hidden xl:block" />,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="text-center xl:text-left xl:px-30">
          <h1 className="font-bold text-primary text-[36px] xl:hidden">
            Sewa Alat Camping Terbaik Malang Raya
          </h1>
          <div className="flex gap-4 justify-center items-center">
            <div>
              <h1 className="font-bold text-primary text-[56px] text-left mr-5 hidden xl:block xl:w-full">
                Sewa Alat Camping Terbaik Malang Raya
              </h1>
              <p className="text-neutral text-[18px] pt-5 xl:w-full hidden xl:block">
                Jadikan petualanganmu berkesan
              </p>
              <div className="flex gap-5">
                <PrimaryButton
                  text="Cara Pemesanan"
                  className="mt-10 w-60 h-14  hidden xl:block"
                />
                <OutlineButton
                  text="Hubungi Admin"
                  className="mt-10 w-60 h-14  hidden xl:block"
                />
              </div>
            </div>
            <img
              src={heroSectionDesktop}
              alt="img-gunung"
              className="rounded-tl-3xl rounded-tr-3xl hidden xl:block"
            />
          </div>
          <p className="text-neutral text-md pt-5 xl:hidden">
            Jadikan petualanganmu berkesan
          </p>
          <div className="pt-10">
            <img
              src={heroSectionMobile}
              alt="img-gunung"
              className="rounded-tl-3xl rounded-tr-3xl xl:hidden"
            />
          </div>
          <PrimaryButton
            text="Cara Pemesanan"
            className="mt-10 w-60 h-14  xl:hidden"
          />
          <OutlineButton
            text="Hubungi Admin"
            className="mt-4 w-60 h-14  xl:hidden"
          />
        </div>
        <div className="text-center pt-10">
          <h1 className="font-bold text-primary text-2xl">Produk Terpopuler</h1>
          <p className="text-md mt-5 w-96 xl:w-[35rem] text-neutral">
            Kami selalu menyediakan peralataan outdoor terbaik untuk menunjang
            pengalaman konsumen ketika berpetualang
          </p>
        </div>
        <div className="w-96 xl:w-[55rem] full xl:mt-12">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-44 xl:px-2">
                <PopularProduct product={product} />
              </div>
            ))}
          </Slider>
        </div>
        <PrimaryButton
          text="Selengkapnya"
          className="mt-16 w-full h-14  xl:w-40 xl:"
        />
        <div className="text-center pt-10 xl:pt-20">
          <h1 className="font-bold text-secondary text-2xl">
            Testimoni Pelanggan
          </h1>
          <p className="text-md mt-4 text-neutral">
            Kami memberikan pelayanan terbaik kepada pelanggan setia kami
          </p>
        </div>
        <div className="w-96 pt-10 xl:w-[55rem]">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-44 xl:px-52 ">
                <ReviewUser review={review} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="text-center pt-12">
          <h1 className="font-bold text-primary text-2xl">Produk Kami</h1>
          <div className="flex justify-center items-center pt-5 gap-5">
            <input
              type="text"
              placeholder="Cari"
              className="w-full max-w-md p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary text-left xl:max-w-full "
            />
            <PrimaryButton text="Filter" className=" w-24" />
          </div>
          <p className="text-md pt-10 text-neutral mb-5 xl:mb-0">
            Peralatan outdoor dengan standar yang baik menjadi fokus kami,
            karena keselamatan dan kenyamanan adalah faktor penting
          </p>
        </div>
        <div className="w-96 xl:hidden">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-44 ">
                <PopularProduct product={product} />
              </div>
            ))}
          </Slider>
        </div>
        <PrimaryButton
          text="Selengkapnya"
          className="mt-16 w-full h-14  xl:hidden"
        />
        <div className="xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 hidden ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
