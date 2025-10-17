"use client";

import { getProducts } from "@/app/lib/api/products";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GenderPageProps {
    gender?: "man" | "woman";
}

const PAGE_SIZE = 8;

export default function GenderPage({ gender }: GenderPageProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [appliedColors, setAppliedColors] = useState<string[]>([]);
    const [allColors, setAllColors] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [categories, setCategories] = useState<string[]>([]);

    // pagination
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 900);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    // whenever filters/category/gender change, reset page to 1
    useEffect(() => {
        setPage(1);
    }, [selectedCategory, appliedColors, gender]);

    useEffect(() => {
        setLoading(true);
        getProducts()
            .then((data) => {
                // base filtered by gender (for extracting categories)
                let base = data;
                if (gender === "man" || gender === "woman") {
                    base = base.filter((item) => item.gender === gender);
                }

                const cats = Array.from(
                    new Set(
                        base
                            .map((p) => String(p.category || "").trim())
                            .filter((c) => c !== "")
                    )
                );
                setCategories(cats);

                const colors = Array.from(
                    new Set(data.flatMap((p) => (p.color || []).map((c: string) => c.toLowerCase())))
                );
                setAllColors(colors);

                // Apply filters to data
                let filtered = data;
                if (gender === "man" || gender === "woman") {
                    filtered = filtered.filter((item) => item.gender === gender);
                }

                if (selectedCategory && selectedCategory !== "all") {
                    filtered = filtered.filter(
                        (item) => String(item.category || "").toLowerCase() === selectedCategory
                    );
                }

                if (appliedColors.length > 0) {
                    filtered = filtered.filter((item) =>
                        (item.color || []).some((c: string) => appliedColors.includes(c.toLowerCase()))
                    );
                }

                setProducts(filtered);
            })
            .catch((err) => {
                console.error("getProducts error:", err);
                setProducts([]);
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, [gender, appliedColors, selectedCategory]);

    // If page is out of range after products change, clamp it
    useEffect(() => {
        const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
        if (page > totalPages) setPage(totalPages);
    }, [products, page]);

    const toggleColor = (color: string) => {
        const lower = color.toLowerCase();
        setSelectedColors((prev) =>
            prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower]
        );
    };

    const applyFilter = () => {
        setAppliedColors(selectedColors);
        setIsFilterOpen(false);
        setPage(1);
    };

    const removeFilters = () => {
        setSelectedColors([]);
        setAppliedColors([]);
        setIsFilterOpen(false);
        setPage(1);
    };

    const onCategoryClick = (catKey: string, e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        if (selectedCategory === catKey) return; // ignore second click on same category
        setSelectedCategory(catKey);
        setPage(1);
    };

    // Pagination helpers
    const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
    const startIndex = (page - 1) * PAGE_SIZE;
    const displayed = products.slice(startIndex, startIndex + PAGE_SIZE);

    const goToPage = (p: number) => {
        if (p < 1 || p > totalPages || p === page) return;
        setPage(p);

        // 🔹 səhifə dəyişəndə məhsul kartlarının başladığı yerə scroll et
        if (typeof window !== "undefined") {
            const section = document.querySelector(".new-card");
            if (section) {
                const offsetTop = section.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            } else {
                window.scrollTo({ top: -20, behavior: "smooth" });
            }
        }
    };


    const prevPage = () => goToPage(page - 1);
    const nextPage = () => goToPage(page + 1);

    return (
        <section className="gender-container">
            <div className="gender-sort">
                <div className="gender-categories">
                    {["All Products", ...categories].map((cat) => {
                        const key = cat === "All Products" ? "all" : cat.toLowerCase();
                        const isActive = selectedCategory === key;
                        return (
                            <Link
                                key={cat}
                                href="#"
                                onClick={(e) => onCategoryClick(key, e)}
                                className={`category-link ${isActive ? "active disabled" : ""}`}
                                style={{
                                    pointerEvents: isActive ? "none" : "auto",
                                    opacity: isActive ? 0.7 : 1,
                                }}
                            >
                                {cat}
                            </Link>
                        );
                    })}
                </div>

                <div className="gender-filter" onClick={() => setIsFilterOpen((p) => !p)}>
                    Filters <span>+</span>
                </div>
            </div>


            <div className="new-card">
                {loading
                    ? Array.from({ length: 2 }).map((_, i) => <div key={i} className="card-container skeleton" />)
                    : displayed.map((card) => (
                        <motion.div
                            key={card._id}
                            className="card-container"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="image-wrapper">
                                <img className="img-front" src={card.imageFront} alt={card.name} />
                                <img className="img-back" src={card.imageBack} alt={card.name} />
                            </div>
                            <div className="new-card-detail">
                                <p className="card-title">{card.name}</p>
                                <div className="card-colors">
                                    {(card.color || []).map((c: string, i: number) => {
                                        const lower = c.toLowerCase();
                                        const outline = lower === "white" || lower === "#ffffff" ? "gray" : lower;
                                        return <div key={i} className="color-circle" style={{ backgroundColor: lower, color: outline }} />;
                                    })}
                                </div>
                                <p>${card.price}</p>
                            </div>
                            <div className="add-to-cart">
                                <button>Add to Cart</button>
                            </div>
                        </motion.div>
                    ))}
            </div>

            {/* Pagination controls */}
            <div className="pagination">
                <button className="page-btn next" onClick={() => goToPage(page - 1)} disabled={page === 1}>Prev</button>
                <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            // className={page === i + 1 ? "active" : ""}
                            className={`page-number ${page === i + 1 ? "active" : ""}`}
                            onClick={() => goToPage(i + 1)} // 🔹 bu da eyni funksiyanı çağırır
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button className="page-btn next" onClick={nextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </section>
    );
}
