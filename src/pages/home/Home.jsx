import {
  PopularProduct,
  ReviewUser,
  ProductCard,
} from "../../components/atoms/Card";
import { PrimaryButton, OutlineButton } from "../../components/atoms/Buttons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { Footer } from "../../components/organisms/Footer";
import { getAllProduct } from "../../services/api";
import {
  photoProfile,
  heroSectionDesktop,
  heroSectionMobile,
} from "../../assets/images";

const reviews = [
  {
    id: 1,
    name: "Mau_Lana",
    title: "Local Guide",
    image: photoProfile,
    text: "barangnya baru semua berkualitas gak nyesel pokoknya nyewa di kade outdoor ,harganya juga standar,nyesel saya min harus pulang gara²temen wkwkw trimss:).",
  },
  {
    id: 2,
    name: "Arief Zainullah",
    title: "Local Guide",
    image: photoProfile,
    text: "Oke sih, murah dan lumayan lengkap",
  },
  {
    id: 3,
    name: "King Production",
    title: "Local Guide",
    image: photoProfile,
    text: "Harga standar, lokasi termasuk hidden gem sih ini. Yang paling saya suka, barang2nya lengkap dan baru2, jadi gk ada yg buluk.. secara saya rental alat niat nya memang buat kebutuhan berkonten jadi ya paling suka perabotannya lengkap, bersih dan baru.",
  },
  {
    id: 4,
    name: "Adam Syabana",
    title: "Local Guide",
    image: photoProfile,
    text: "recommend banget buat kalian yg suka dengan kegiatan outdoor apa yg kalian butuhkan pasti mereka ada, sekut!",
  },
  {
    id: 5,
    name: "nurlaili . ira",
    title: "Local Guide",
    image: photoProfile,
    text: "top pelayanan ramah barang lengkap dan murce. sukses terosss",
  },
  {
    id: 6,
    name: "aliefia widyas",
    title: "Local Guide",
    image: photoProfile,
    text: "Pertama kali sewa alat camping disini, kemarin sewa 2 sandal gunung. Overall pelayanan baik sekali, tempat sewa bersih dan nyaman, no ribet krn bisa tf dan minta di keep in dulu via WhatsApp, barang siap dipakai (bersih), admin fastresp. Sukse selalu Kade Outdoor!",
  },
  {
    id: 7,
    name: "Ahmd doc",
    title: "Local Guide",
    image: photoProfile,
    text: "Tempatnya masuk gang, tapi mudah dicari, kebutuhan camping cukup lengkap disini, pelayanan juga ramah, top!",
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = () => {
    setLoading(true);
    getAllProduct()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Mengurutkan produk terbaru
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date_added) - new Date(a.date_added)
  );
  const latestProducts = sortedData.slice(0, 8);
  const limitedProducts = data.slice(0, 6);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    variableWidth: false,
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
          infinite: false,
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
          infinite: false,
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
                  className="mt-10 w-60 h-14 border-secondary hidden xl:block"
                />
              </div>
            </div>
            <img
              src={heroSectionDesktop}
              alt="img-gunung"
              className="rounded-3xl hidden xl:block"
            />
          </div>
          <p className="text-neutral text-md pt-5 xl:hidden">
            Jadikan petualanganmu berkesan
          </p>
          <div className="pt-10">
            <img
              src={heroSectionMobile}
              alt="img-gunung"
              className="rounded-3xl xl:hidden"
            />
          </div>
          <PrimaryButton
            text="Cara Pemesanan"
            className="mt-10 w-60 h-14  xl:hidden"
          />
          <OutlineButton
            text="Hubungi Admin"
            className="mt-4 w-60 h-14 border-secondary xl:hidden"
          />
        </div>
        <div className="text-center pt-10">
          <h1 className="font-bold text-primary text-2xl mt-16">
            Produk Terbaru
          </h1>
          <p className="text-md mt-5 w-96 xl:w-[35rem] text-neutral">
            Kami selalu menyediakan peralataan outdoor terbaik untuk menunjang
            pengalaman konsumen ketika berpetualang
          </p>
        </div>
        <div className="w-96 xl:w-[55rem] full xl:mt-12">
          <Slider {...settings}>
            {latestProducts.map((product) => (
              <div key={product.id}>
                <PopularProduct product={product} />
              </div>
            ))}
          </Slider>
        </div>
        <PrimaryButton
          text="Selengkapnya"
          className="mt-16 w-full h-14  xl:w-40 xl:"
        />
        <div className="text-center pt-10 xl:pt-20 mt-16">
          <h1 className="font-bold text-secondary text-2xl">
            Testimoni Pelanggan
          </h1>
          <p className="text-md mt-4 text-neutral">
            Kami memberikan pelayanan terbaik kepada pelanggan setia kami
          </p>
        </div>
        <div className="w-96 pt-10 xl:w-full">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col items-center">
                <ReviewUser review={review} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="text-center pt-12 mt-16">
          <h1 className="font-bold text-primary text-2xl">Produk Kami</h1>
          {/* <div className="flex justify-center items-center pt-5 gap-5">
            <input
              type="text"
              placeholder="Cari"
              className="w-full max-w-md p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary text-left xl:max-w-full "
            />
            <PrimaryButton text="Filter" className=" w-24" />
          </div> */}
          <p className="text-md pt-10 text-neutral mb-5 xl:mb-0">
            Peralatan outdoor dengan standar yang baik menjadi fokus kami,
            karena keselamatan dan kenyamanan adalah faktor penting
          </p>
        </div>
        <div className="w-96 xl:hidden">
          <Slider {...settings}>
            {limitedProducts.map((product) => (
              <div key={product.id}>
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
          {limitedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
