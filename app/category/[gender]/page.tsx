"use client";

import GenderPage from "@/app/components/GenderPage/GenderPage";
import React from "react";

interface Props {
  params: { gender: string };
}

export default function CategoryGenderPage({ params }: Props) {
  const { gender } = React.use(params); // unwrap Promise
  const genderValue = gender.toLowerCase() as "man" | "woman";

  return <GenderPage gender={genderValue} />;
}
