import React from "react";
import Slider from "react-slick";

const FeedbackData = [
  {
    id: 1,
    name: "Dilshad",
    text: "Managing my home stock has never been easier! This website keeps my pantry organized and ensures I never forget a grocery item. Highly recommended!",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Sabir Ali",
    text: "Managing my home stock has never been easier! This website keeps my pantry organized and ensures I never forget a grocery item. Highly recommended!",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Dipankar Kumar",
    text: "Managing my home stock has never been easier! This website keeps my pantry organized and ensures I never forget a grocery item. Highly recommended!",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 4,
    name: "Satya Narayan",
    text: "Managing my home stock has never been easier! This website keeps my pantry organized and ensures I never forget a grocery item. Highly recommended!",
    img: "https://picsum.photos/103/103",
  },
];

const Feedback = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default slidesToShow
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header section */}
        <div className="mb-10 text-center">
          <h1 data-aos="fade-up" className="text-4xl font-bold font-cursive">
            Feedback
          </h1>
        </div>

        {/* Feedback cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {FeedbackData.map((data) => (
              <div key={data.id} className="my-6 px-2">
                <div className="flex flex-col items-center gap-4 shadow-lg py-8 px-6 rounded-xl bg-primary/10 relative">
                  {/* Image */}
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  {/* Content section */}
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-xs text-gray-500">{data.text}</p>
                    <h1 className="text-xl font-bold text-black/80 font-cursive2">
                      {data.name}
                    </h1>
                  </div>
                  {/* Quote Icon */}
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Feedback;