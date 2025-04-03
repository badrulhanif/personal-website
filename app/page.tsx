"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dribbble, GitHub, Linkedin } from "react-feather";

export default function Home() {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImageFiles(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  function handleMailTo() {
    const email = "hanifbaharuddin@gmail.com";
    const subject = "Subject goes here";
    const body = "Body text goes here";

    // Gmail specific URL structure
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl);
  }

  return (
    <div className="items-center justify-items-center p-6 md:p-12 h-full md:h-full">
      <div className="flex flex-col gap-8 w-full md:w-lg">
        <header className="flex flex-col gap-2 px-6">
          <h1 className="text-4xl font-semibold text-gray-700">
            UI/UX Designer
          </h1>
          <p className="text-md font-medium text-orange-500">
            + I do code sometimes
          </p>
        </header>
        <main className="flex flex-col border-1 border-gray-200 p-6 gap-8 rounded-3xl shadow-xl">
          <div className="flex flex-col gap-4">
            <p className="text-md font-semibold text-gray-700">
              WHAT I CONTRIBUTE PREVIOUSLY
            </p>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
              {imageFiles
                .filter((filename) => filename.startsWith("example-work"))
                .map((filename, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 snap-center relative"
                    >
                      <div className="relative">
                        <Image
                          src={`/Images/${filename}`}
                          width={360}
                          height={250}
                          className="w-full h-48 md:h-64 object-cover rounded-2xl"
                          alt={`Example of my work ${index + 1}`}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-gray-600">
                I can help you
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Design & build solutions that work
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-gray-600">
                What makes me different?
              </p>
              <div className="flex flex-col gap-8">
                <p className="text-xl font-semibold text-gray-700">
                  Design that convert up to 30% of the readers
                </p>

                <p className="text-xl font-semibold text-gray-700">
                  Make your business easy to find by more than 1000+ local users
                </p>
                <p className="text-xl font-semibold text-gray-700">
                  Build that scale effortlessly on any device
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-gray-600">Clients</p>
              <p className="text-xl font-semibold text-gray-700">
                Help fast-paced startups and visionaries accelerate growth
              </p>
            </div>
            <div className="flex flex-row gap-8 ">
              {imageFiles
                .filter((filename) => filename.includes("logo"))
                .map((filename, index) => {
                  return (
                    <div
                      key={index}
                      className="w-fit flex-shrink-0 snap-center relative "
                    >
                      <div className="relative">
                        <Image
                          src={`/Images/${filename}`}
                          width={0}
                          height={24}
                          className="w-fit h-5 object-cover "
                          alt={`Example of my work ${index + 1}`}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
        <footer className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <button
            onClick={handleMailTo}
            className="font-medium text-white hover:text-orange-500 px-5 py-3 w-full md:w-fit cursor-pointer rounded-full bg-orange-500 hover:bg-orange-200 "
          >
            Collaborate with me
          </button>
          <div className="flex flex-row gap-8 md:gap-2">
            <a
              href="https://dribbble.com/badrulhanif"
              target="blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-pink-400"
            >
              <Dribbble className="stroke-[1.5] " />
            </a>
            <a
              href="https://github.com/badrulhanif"
              target="blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-black"
            >
              <GitHub className="stroke-[1.5]" />
            </a>
            <a
              href="https://www.linkedin.com/in/badrul-hanif-b01471196/"
              target="blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-blue-400"
            >
              <Linkedin className="stroke-[1.5]" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
