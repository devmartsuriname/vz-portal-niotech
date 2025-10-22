import { useState, useEffect, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import data from "../../Data/blog.json";

const BlogCarousel = () => {
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
    <section className="blog-section section-padding fix">
      <div className="container">
        <div className="blog-wrapper style1">
          {/* Updated Section Title */}
          <div className="section-title text-center mxw-685 mx-auto">
            <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
              Nieuws & Updates <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
            </div>
            <h2 className="title wow fadeInUp" data-wow-delay=".4s">
              Laatste Nieuws & Updates
            </h2>
            <p className="blog-description wow fadeInUp" data-wow-delay=".6s">
              Blijf op de hoogte van het laatste nieuws van de Hoofdafdeling Vreemdelingenzaken.
            </p>
          </div>

          {/* Blog Carousel */}
          <div className="blog-carousel-wrapper">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
              className="embla w-full max-w-7xl mx-auto"
            >
              <CarouselContent className="embla__container">
                {data.map((item, index) => (
                  <CarouselItem key={index} className="embla__slide">
                    <div className="blog-card style1 wow fadeInUp" data-wow-delay={`.${(index + 1) * 2}s`}>
                      <div className="thumb">
                        <img src={item.img} alt="thumb" />
                      </div>
                      <div className="body">
                        <div className="tag-meta">
                          <img src="/assets/images/icon/FolderIcon.svg" alt="icon" />
                          {item.category}
                        </div>
                        <h3><Link to="/blog/blog-details">{item.title}</Link></h3>
                        <div className="blog-meta">
                          <div className="item child1">
                            <span className="icon">
                              <img src="/assets/images/icon/userIcon.svg" alt="icon" />
                            </span>
                            <span className="text">{item.author}</span>
                          </div>
                          <div className="item">
                            <span className="icon">
                              <img src="/assets/images/icon/calendar.svg" alt="icon" />
                            </span>
                            <span className="text">{item.date}</span>
                          </div>
                        </div>
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
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
