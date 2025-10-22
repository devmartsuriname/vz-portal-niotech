import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import data from '../../Data/feature1.json';

const ServiceCarousel = () => {
  return (
    <div className="service-carousel-wrapper">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.map((service, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
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
        <CarouselPrevious className="carousel-nav-btn" />
        <CarouselNext className="carousel-nav-btn" />
      </Carousel>
    </div>
  );
};

export default ServiceCarousel;
