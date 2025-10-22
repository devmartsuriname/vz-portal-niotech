import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import data from '../../Data/feature1.json';

const ServiceCarousel = () => {
  return (
    <div className="service-carousel-wrapper relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {data.map((service, index) => (
            <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
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
        <CarouselPrevious className="carousel-nav-btn -left-12 lg:-left-16" />
        <CarouselNext className="carousel-nav-btn -right-12 lg:-right-16" />
      </Carousel>
    </div>
  );
};

export default ServiceCarousel;
