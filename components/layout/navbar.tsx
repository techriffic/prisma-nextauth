"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import React, { useEffect, useState } from 'react';
import { NextResponse } from 'next/server'

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const [randomAlphaNum, setRandomAlphaNum] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetch('/api/random')
      .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => setRandomAlphaNum(data.randomAlphaNum))
    .catch((error) => {
        console.log('Fetch Error: ', error);
    });
}, []);

const arrayData = [
  "VZC2-H27R-yIFi-jtQt", 
  "A1B2-C3D4-E5F6-G7H8", 
  "I9J0-K1L2-M3N4-O5P6", 
  "Q7R8-S9T0-U1V2-W3X4", 
  "Y5Z6-A7B8-C9D0-E1F2",
  "G3H4-I5J6-K7L8-M9N0", 
  "O1P2-Q3R4-S5T6-U7V8", 
  "W9X0-Y1Z2-A3B4-C5D6", 
  "E7F8-G9H0-I1J2-K3L4", 
  "M5N6-O7P8-Q9R0-S1T2", 
  "U3V4-W5X6-Y7Z8-A9B0",
  "C1D2-E3F4-G5H6-I7J8", 
  "K9L0-M1N2-O3P4-Q5R6", 
  "S7T8-U9V0-W1X2-Y3Z4", 
  "A5B6-C7D8-E9F0-G1H2", 
  "I3J4-K5L6-M7N8-O9P0", 
  "Q1R2-S3T4-U5V6-W7X8", 
  "Y9Z0-A1B2-C3D4-E5F6", 
  "G7H8-I9J0-K1L2-M3N4", 
  "O5P6-Q7R8-S9T0-U1V2"
];


useEffect(() => {

 fetch('/api/selectwinner', {
    method: 'POST',
    body: JSON.stringify(arrayData) // your array of values
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.randomValue); // The randomly selected value from your array
    setWinner(data.randomValue);
  });
}, [])


 

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        {randomAlphaNum === null ? (
        <p>Loading...</p>
      ) : (
        <>
        {/* <p>{randomAlphaNum}</p> */}
        <p>{winner}</p>
        </>
      )}
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Precedent</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
