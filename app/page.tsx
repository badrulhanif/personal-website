"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dribbble, GitHub, Linkedin, Mail } from "react-feather";

export default function Home() {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImageFiles(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  function handleMailTo() {
    window.open("mailto:hanifbaharuddin@gmail.com", "_blank");
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText("hanifbaharuddin@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  }

  return (
    <div className="items-center justify-items-center px-6 py-12 md:p-14 h-full md:h-full bg-[url(/Images/background.png)] bg-center bg-cover">
      <div className="flex flex-col gap-8 w-full md:w-lg">
        <header className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col gap-2 px-6">
            <h1 className="text-4xl font-semibold text-gray-700">
              UI/UX Designer
            </h1>
            <p className="text-md font-medium text-indigo-600">
              + I do code sometimes
            </p>
          </div>
          <div className="flex flex-row gap-8 md:gap-2">
            <a
              href="https://dribbble.com/badrulhanif"
              target="blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-pink-400"
            >
              <Dribbble className="stroke-[1.5] " />
            </a>
            <a
              href="https://github.com/badrulhanif"
              target="blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-black"
            >
              <GitHub className="stroke-[1.5]" />
            </a>
            <a
              href="https://www.linkedin.com/in/badrul-hanif-b01471196/"
              target="blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-blue-400"
            >
              <Linkedin className="stroke-[1.5]" />
            </a>
          </div>
        </header>
        <main className="flex flex-col border-1 border-gray-200 p-6 gap-8 rounded-3xl shadow-xl bg-white">
          <div className="flex flex-col gap-4">
            <p className="text-md font-semibold text-gray-600">
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
              <p className="text-md font-medium text-gray-400">
                I can help you
              </p>
              <p className="text-xl font-semibold text-gray-600">
                Design & build solutions that work
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-gray-400">
                What makes me different?
              </p>
              <div className="flex flex-col gap-8">
                <p className="text-xl font-semibold text-gray-600">
                  Design that <span className="">convert up to 30%</span> of the
                  readers
                </p>

                <p className="text-xl font-semibold text-gray-600">
                  Make your business easy to{" "}
                  <span className="">find by more than 1000+</span> local users
                </p>
                <p className="text-xl font-semibold text-gray-600">
                  Build that <span className="">scale effortlessly</span> on any
                  device
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-gray-400">Clients</p>
              <p className="text-xl font-semibold text-gray-600">
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
                      className="w-auto flex-shrink-0 snap-center relative "
                    >
                      <div className="relative">
                        <Image
                          src={`/Images/${filename}`}
                          width={0}
                          height={24}
                          className="w-auto h-5 object-cover "
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
        <footer className="flex flex-col border-1 border-gray-200 p-6 gap-8 rounded-3xl shadow-xl bg-white">
          <p className="text-md font-semibold text-gray-600">
            COLLABORATE WITH ME
          </p>
          <form onSubmit={handleMailTo} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                required
                className="text-md font-medium text-gray-400 border-1 border-gray-200 p-3 rounded-xl "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-400"
              >
                Messages
              </label>
              <textarea
                placeholder="Your message here..."
                required
                className="text-md font-medium text-gray-400 border-1 border-gray-200 h-32 p-3 rounded-xl overflow-y-auto resize-none"
              />
            </div>
            <button
              type="submit"
              className="font-medium text-white  px-5 py-3 w-full cursor-pointer rounded-full bg-indigo-500 hover:bg-indigo-800 "
            >
              Let's ship this!
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
