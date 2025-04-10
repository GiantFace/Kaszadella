"use client";
import React from "react";

export default function DiagonalLogin() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white overflow-hidden">
      {/*
        Pink átlós rész a jobb oldalon
        A clip-path segítségével vágjuk ferdére.
      */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-pink-500 clip-diagonal"></div>

      {/* Bal oldali login box */}
      <div className="relative z-10 w-full max-w-md px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition-colors"
          >
            Login
          </button>
          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <a href="#" className="text-pink-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>

      {/* Jobb oldali „WELCOME BACK!” szöveg */}
      <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-2xl font-bold mb-2">WELCOME BACK!</h2>
        <p className="text-sm max-w-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio tenetur
          ipsum dolorem?
        </p>
      </div>
    </div>
  );
}
