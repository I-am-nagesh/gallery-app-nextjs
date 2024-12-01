"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">jst</span>
            <span className="text-slate-700">Clk</span>
          </h1>
        </Link>
        <ul className="hidden lg:flex gap-5">
          <li className="text-xs md-text-base text-slate-700 hover:underline">
            <Link href="/about">About </Link>
          </li>

          <li className="text-xs md-text-base text-slate-700 hover:underline">
            <Link href="/gallery">Gallery </Link>
          </li>

          <li className="text-xs md-text-base text-slate-700 hover:underline">
            <Link href="/register">Contact </Link>
          </li>

          <li className="text-xs md-text-base text-slate-700 hover:underline">
            <Link href="/upload">Upload Image </Link>
          </li>

          <li className="text-xs md-text-base text-slate-700 hover:underline">
            <Link href="/uploaded">uploaded Images </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
