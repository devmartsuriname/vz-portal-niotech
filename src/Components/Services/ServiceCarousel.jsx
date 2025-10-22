import { useState, useEffect, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import data from '../../Data/feature1.json';

const ServiceCarousel = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <div className="service-carousel-wrapper">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="embla w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="embla__container">
          {data.map((service, index) => (
            <CarouselItem key={index} className="embla__slide">
              <div className="service-card-carousel">
                <div className="service-icon-wrapper">
                  <img src={service.img} alt={service.title} />
                </div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p className="text">{service.desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Navigation */}
      <div className="carousel-dots-container">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${current === index ? 'active' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
