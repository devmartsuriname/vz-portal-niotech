import { lazy, Suspense } from "react";
import About1 from "../Components/About/About1";
import HeroBanner1 from "../Components/HeroBanner/HeroBanner1";
import HowWork from "../Components/HowWork/HowWork";

// Lazy load heavy components to reduce initial bundle
const BlogCarousel = lazy(() => import("../Components/Blog/BlogCarousel"));
const Brand1 = lazy(() => import("../Components/Brand/Brand1"));
const Choose1 = lazy(() => import("../Components/Choose/Choose1"));
const Counter1 = lazy(() => import("../Components/Counter/Counter1"));
const Cta1 = lazy(() => import("../Components/Cta/Cta1"));
const Faq1 = lazy(() => import("../Components/Faq/Faq1"));
const Feature1 = lazy(() => import("../Components/Feature/Feature1"));

const Home = () => {
    return (
        <div>
            <HeroBanner1
                subtitle="<span>Welkom bij</span> Vreemdelingenzaken"
                title="Uw verblijfsaanvraag, digitaal en veilig"
                content="Het Ministerie van Justitie en Politie biedt u de mogelijkheid om alle vreemdelingenzaken-aanvragen digitaal in te dienen. Volg de instructies, download documentenlijsten, en verstuur uw aanvraag veilig."
                btnname="Aanvraag Indienen"
                btnurl="/aanvraag-indienen"
                btntwo="Lees Instructies"
                btn2url="/instructies"
                cusimg="/assets/images/intro/introProfileThumb1_1.png"
                cusnumber="Sinds 2020"
                cuscontent="Officiële Overheidsportaal"
                rating="Ministerie van Justitie"
                ratingcon="en Politie"
                img="/assets/images/intro/introThumb1_1.png"
            ></HeroBanner1>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <Brand1></Brand1>
            </Suspense>
            
            <About1
                img1="/assets/images/about/aboutThumb1_1.png"
                img2="/assets/images/about/aboutThumb1_2.png"
                subtitle="Over Vreemdelingenzaken"
                title="Uw partner voor verblijfs- en naturalisatiezaken"
                content="Het Directoraat Vreemdelingenzaken is verantwoordelijk voor het beheer van alle verblijfs-, vestiging- en naturalisatieverzoeken in Suriname. Wij zorgen voor een efficiënte en transparante dienstverlening aan alle burgers en vreemdelingen die in Suriname willen verblijven, vestigen of naturaliseren."
                FeatureList={[
                    "Erkend door het Ministerie van Justitie en Politie",
                    "Veilige en geëncrypteerde indiening van aanvragen",
                    "Ondersteuning voor alle vreemdelingenzaken procedures",
                ]}                
                btnname="Meer Informatie"
                btnurl="/about"
            ></About1>
            
            <HowWork></HowWork>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <Choose1
                    subtitle="Waarom Digitaal?"
                    title="Sneller, veiliger en transparanter"
                    content="Ons digitale portaal biedt u de mogelijkheid om uw vreemdelingenzaken-aanvragen online in te dienen, zonder dat u naar ons kantoor hoeft te komen. U kunt uw aanvraag 24/7 indienen en de status online volgen."
                    FeatureList={[
                        "24/7 Beschikbaar - Dien uw aanvraag in wanneer het u uitkomt",
                        "Directe Bevestiging - Ontvang direct een agenummer na indiening",
                    ]} 
                    FeatureList2={[
                        "Veilige Opslag - Uw documenten worden veilig opgeslagen",
                        "Tracking & Updates - Volg de status van uw aanvraag online",
                    ]}                 
                    btnname="Begin Aanvraag"
                    btnurl="/aanvraag-indienen"
                ></Choose1>
            </Suspense>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <Feature1></Feature1>
            </Suspense>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <Counter1></Counter1>
            </Suspense>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <Faq1></Faq1>
            </Suspense>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <Cta1
                    subtitle="Klaar om te beginnen?"
                    title="Dien vandaag nog uw aanvraag in via ons digitale portaal"
                    content="Begin met uw aanvraag door de wizard te volgen. Verzamel eerst uw documenten en volg de instructies voor een succesvolle indiening."
                    btnurl1="/aanvraag-indienen"
                    btnurl2="/instructies"
                    btnname1="Aanvraag Indienen"
                    btnname2="Lees Instructies"
                    img="/assets/images/cta/ctaThumb1_1.png"
                ></Cta1>
            </Suspense>
            
            <Suspense fallback={<div className="py-5"></div>}>
                <BlogCarousel></BlogCarousel>
            </Suspense>
        </div>
    );
};

export default Home;
