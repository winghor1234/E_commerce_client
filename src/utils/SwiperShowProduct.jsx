
import { Swiper,  } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import PropTypes from "prop-types";

const SwiperShowProduct = ({ children }) => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      pagination={true}
      navigation={true}
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        1280: {
            slidesPerView: 6,
            spaceBetween: 50,
       },
      }}
      className="mySwiper object-cover rounded-md"
    >
      {children}
    </Swiper>
  );
};

SwiperShowProduct.propTypes = {
  children: PropTypes.node,
};

export default SwiperShowProduct;
