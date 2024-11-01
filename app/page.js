"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [pins, setPins] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const getPins = async () => {
    const url = search
      ? `http://localhost:3000/api/pin?search=${search}`
      : "http://localhost:3000/api/pin";
    const response = await axios.get(url);
    setPins(response.data.pins);
  };

  useEffect(() => {
    getPins();
  }, [search, session]);

  return (
    <>
      <div className="container mx-auto p-4">
        {(!pins || pins.length <= 0) && !search ? (
          <div className="flex justify-center items-center min-h-[750px]">
            <ClipLoader color="#ef4444" size={120} />
          </div>
        ) : pins.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {pins.map((item) => {
              return (
                <Link
                  href={`/pin/${item._id}`}
                  key={item._id}
                  className="relative mb-4 group"
                >
                  <Image
                    src={item?.image?.url}
                    alt={item.title}
                    height={300}
                    width={300}
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                  <span className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              );
            })}
          </div>
        ) : (
          <h3 className="min-h-[750px] flex justify-center items-center text-red-500 text-4xl font-semibold">
            No results found for your search.
          </h3>
        )}
      </div>
    </>
  );
}
