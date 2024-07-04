"use client";
import { apiInstance } from "@/lib/axios";
import Image from "next/image";
import { useState } from "react";

export default function ImageUploader() {
  return (
    <div className="relative max-xl:h-[206px] max-xl:w-[206px] max-sm:h-[167px] max-sm:w-[167px] xl:h-[180px] xl:w-[180px]">
      <Image fill src="/UploadImage.svg" alt="이미지 등록하기" />
    </div>
  );
}
