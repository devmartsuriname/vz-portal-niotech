import { useState } from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Naam moet minimaal 2 karakters bevatten").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  rating: z.string().min(1, "Selecteer een beoordeling"),
  category: z.string().min(1, "Selecteer een categorie"),
  message: z.string().trim().min(10, "Bericht moet minimaal 10 karakters bevatten").max(1000)
});

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(feedbackSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Bedankt voor uw feedback!", {
        description: "Uw feedback is ontvangen en wordt verwerkt."
      });
      reset();
    }, 1500);
  };

  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Feedback"
      />

      <div className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2>Uw Mening Helpt Ons Verbeteren</h2>
                <p className="text">
                  Wij waarderen uw feedback. Vertel ons over uw ervaring met ons portaal 
                  en help ons om onze dienstverlening te verbeteren.
                </p>
              </div>

              <div className="card shadow-sm">
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Naam *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        placeholder="Uw naam"
                        {...register("name")}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="uw.email@voorbeeld.sr"
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="rating" className="form-label">
                        Algemene Beoordeling *
                      </label>
                      <select
                        className={`form-select ${errors.rating ? 'is-invalid' : ''}`}
                        id="rating"
                        {...register("rating")}
                      >
                        <option value="">Selecteer...</option>
                        <option value="5">⭐⭐⭐⭐⭐ Uitstekend</option>
                        <option value="4">⭐⭐⭐⭐ Goed</option>
                        <option value="3">⭐⭐⭐ Voldoende</option>
                        <option value="2">⭐⭐ Matig</option>
                        <option value="1">⭐ Slecht</option>
                      </select>
                      {errors.rating && (
                        <div className="invalid-feedback">{errors.rating.message}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="category" className="form-label">
                        Categorie *
                      </label>
                      <select
                        className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                        id="category"
                        {...register("category")}
                      >
                        <option value="">Selecteer...</option>
                        <option value="website">Website Gebruiksvriendelijkheid</option>
                        <option value="service">Klantenservice</option>
                        <option value="process">Aanvraagproces</option>
                        <option value="information">Informatie Beschikbaarheid</option>
                        <option value="other">Overig</option>
                      </select>
                      {errors.category && (
                        <div className="invalid-feedback">{errors.category.message}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">
                        Uw Feedback *
                      </label>
                      <textarea
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        id="message"
                        rows="5"
                        placeholder="Deel uw ervaring, suggesties of zorgen..."
                        {...register("message")}
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message.message}</div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="theme-btn w-100"
                      disabled={loading}
                    >
                      <span>
                        {loading ? "Bezig met versturen..." : "Verstuur Feedback"}
                        {!loading && <i className="bi bi-send ms-2"></i>}
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              <div className="alert alert-info mt-4">
                <small>
                  <i className="bi bi-shield-check me-2"></i>
                  Uw gegevens worden vertrouwelijk behandeld en alleen gebruikt om onze dienstverlening te verbeteren.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
