"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function NewSectionWoman() {
  const containerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1.5);
  const [speed, setSpeed] = useState(1.5);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let offset = 0;

    const loop = () => {
      if (!container) return;
      offset -= speedRef.current;
      if (offset <= -container.scrollWidth / 2) offset = 0;
      container.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  const items = Array(6).fill("NEW IN WOMAN");

  const cards = Array(3).fill({
    imgFront:
      "https://www.duelunecalzature.com/ecommerce/wp-content/uploads/2025/06/D816-SABBIA-960x1202.jpg",
    imgBack:
      "https://www.duelunecalzature.com/ecommerce/wp-content/uploads/2025/06/D816-SABBIA-1-960x1202.jpg",
    name: "NAME",
    price: "PRICE",
  });

  return (
    <div className="new-wrapper">
      {/* 🔹 Marquee */}
      <div className="marquee-content" ref={containerRef}>
        {items.map((t, idx) => (
          <span key={idx} className="marquee-item">
            {t}
          </span>
        ))}
        {items.map((t, idx) => (
          <span key={`dup-${idx}`} className="marquee-item">
            {t}
          </span>
        ))}
      </div>

      {/* 🔹 Cards with scroll-trigger animation */}
      <div className="new-card">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="card-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // yalnız bir dəfə animasiya etsin
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.3, // kartlar ardıcıl gəlsin
            }}
          >
            <div className="image-wrapper">
              <img className="img-front" src={card.imgFront} alt="" />
              <img className="img-back" src={card.imgBack} alt="" />
            </div>
            <div className="new-card-detail">
              <h2>{card.name}</h2>
              <p>{card.price}</p>
            </div>
            <div className="add-to-cart">
              <button>Add to Cart</button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "60%",
                }}
              >
                <p>36</p>
                <p>37</p>
                <p>38</p>
                <p>39</p>
                <p>40</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
