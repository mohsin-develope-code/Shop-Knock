import { useRef } from "react";

const CardSlide = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const cards = [
    { id: 1, img: "src/assets/sales/kurti.jpg", title: "New Kurti " },
    { id: 2, img: "src/assets/sales/cargo.jpg", title: "New Men Cargo" },
    {
      id: 3,
      img: "src/assets/sales/women-jeans.webp",
      title: "New Women Jeans",
    },
    { id: 4, img: "src/assets/sales/plazo.webp", title: "New Plazo" },
    {
      id: 5,
      img: "src/assets/sales/jacket.webp",
      title: "New Leather Jacket ",
    },
    { id: 6, img: "src/assets/sales/tshirt.webp", title: "New Tshirt " },
    { id: 7, img: "src/assets/sales/hoody.jpg", title: "New Women Hoody " },
  ];

  return (
    <div className="w-[1100px] mx-auto my-4">
      <div className="text-center text-4xl font-semibold mb-10">
        Fashion <span className="bg-red-600 text-white pl-2 pr-5">Sale</span>
      </div>

      <div>
        <div className="relative w-full max-w-full mx-auto py-5">
          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth"
            style={{
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-[260px] h-80 bg-slate-300 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center flex-shrink-0"
              >
                <img src={card.img} className="h-56 w-[170px] object-fill  " />
                <h2 className="text-xl w-full text-center font-medium text-black mt-6">
                  {card.title}
                </h2>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            onClick={scrollLeft}
          >
            ❮
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            onClick={scrollRight}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSlide;
