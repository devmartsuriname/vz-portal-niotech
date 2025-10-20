import About4 from "../Components/About/About4";
import Choose2 from "../Components/Choose/Choose2";
import Choose4 from "../Components/Choose/Choose4";
import BreadCumb from "../Components/Common/BreadCumb";
import HowWork from "../Components/HowWork/HowWork";
import Testimonial4 from "../Components/Testimonial/Testimonial4";

const AboutPage = () => {
    return (
        <div>
            <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Over Vreemdelingenzaken"
            ></BreadCumb>
            <About4
                img1="/assets/images/about/aboutThumb1_1.png"
                img2="/assets/images/about/aboutThumb1_2.png"
                subtitle="Over Vreemdelingenzaken"
                title="Uw partner voor verblijfs- en naturalisatiezaken"
                content="Het Directoraat Vreemdelingenzaken is verantwoordelijk voor het beheer van alle verblijfs-, vestiging- en naturalisatieverzoeken in Suriname. Wij bieden een veilige, digitale omgeving voor het indienen van aanvragen en zorgen voor transparante communicatie tijdens het hele proces."
                FeatureList={[
                    "Erkend door het Ministerie van Justitie en Politie",
                    "Veilige en geëncrypteerde indiening van documenten",
                    "Ondersteuning voor alle vreemdelingenzaken-procedures",
                ]}                
                btnname="Meer Informatie"
                btnurl="/contact"
            ></About4> 
            <Choose2
               img1="/assets/images/wcu/wcuThumb2_1.png" 
               img2="/assets/images/wcu/wcuThumb2_2.png" 
               img3="/assets/images/wcu/wcuThumb2_3.png" 
               subtitle="Digitale Dienstverlening" 
               title="Efficiënt en transparant proces" 
               content="Ons digitale platform maakt het mogelijk om uw volledige aanvraag online in te dienen. U kunt documenten uploaden, de status van uw aanvraag volgen, en belangrijke updates ontvangen via e-mail." 
               boximg1="/assets/images/icon/wcuIcon2_1.svg" 
               boxtitle1="Online Aanvragen" 
               boxcontent1="Dien uw aanvraag 24/7 in via onze gebruiksvriendelijke wizard. Geen lange wachtrijen meer." 
               boximg2="/assets/images/icon/wcuIcon2_2.svg" 
               boxtitle2="Veilige Opslag" 
               boxcontent2="Al uw documenten worden veilig opgeslagen volgens overheidsstandaarden en zijn altijd toegankelijk." 
            ></Choose2>
            <HowWork></HowWork>  
            <Choose4
                subtitle="Ondersteuning & Contact"
                title="Wij staan voor u klaar"
                content1="Heeft u vragen over uw aanvraag of het proces? Ons team staat klaar om u te helpen. Bezoek ons kantoor tijdens openingstijden of neem contact met ons op."
                content2="Wij zijn bereikbaar van maandag tot vrijdag en streven ernaar om binnen 48 uur te reageren op alle vragen."
                btnname="Contacteer Ons"
                btnurl="/contact"
                counter1Number="2000"
                counter1Suffix="+"
                counter1Text="Verwerkte Aanvragen"
                counter2Number="15"
                counter2Suffix="+"
                counter2Text="Jaar Ervaring"
                counter3Number="98"
                counter3Suffix="%"
                counter3Text="Tevredenheid"
                thumbBoxTitle="Klanttevredenheid"
                thumbBoxText="Hoge tevredenheid onder aanvragers"
                thumbBoxMetricTitle="Succes Rate"
                thumbBoxMetricValue="98%"
            ></Choose4> 
            <Testimonial4></Testimonial4>
        </div>
    );
};

export default AboutPage;