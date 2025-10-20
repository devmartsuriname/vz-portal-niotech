const AnimationStar = () => {
  return (
    <div className="animated-stars">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="shooting-star"></div>
      ))}
    </div>
  );
};

export default AnimationStar;
