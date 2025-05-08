"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dribbble, GitHub, Linkedin } from "react-feather";

export default function Home() {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  // const [copied, setCopied] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validate format here
    if (!validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImageFiles(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  useEffect(() => {
    if (sent) {
      const timeout = setTimeout(() => {
        setSent(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timeout); // cleanup
    }
  }, [sent]);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        const text = await res.text(); // get raw response
        console.error("Server error:", text); // log it
        throw new Error("Server responded with an error");
      }

      const result = await res.json();
      if (result.success) {
        setSent(true);
        setEmail("");
        setMessage("");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Failed to send. Please try again later.");
      console.error(error);
    }

    setSending(false);
  }

  // function handleCopyEmail() {
  //   navigator.clipboard.writeText("hanifbaharuddin@gmail.com").then(() => {
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  //   });
  // }

  return (
    <div className="items-center justify-items-center px-6 py-12 md:p-14 h-full md:h-full bg-[url(/Images/background.png)] bg-center bg-no-repeat bg-fixed">
      <div className="flex flex-col relative gap-8 w-full md:w-lg">
        <header className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col gap-2 px-6 items-center md:items-start">
            <h1 className="text-4xl font-semibold text-gray-700">
              UI/UX Designer
            </h1>
            <p className="text-md font-medium text-indigo-600">
              + I do code sometimes
            </p>
          </div>
          <div className="flex flex-row gap-2 px-6 w-fit">
            <a
              href="https://dribbble.com/badrulhanif"
              target="blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-white p-2 rounded-full hover:bg-pink-400"
            >
              <Dribbble className="stroke-[1.5] " />
            </a>
            <a
              href="https://github.com/badrulhanif"
              target="blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-white p-2 rounded-full hover:bg-black"
            >
              <GitHub className="stroke-[1.5]" />
            </a>
            <a
              href="https://www.linkedin.com/in/badrul-hanif-b01471196/"
              target="blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-white p-2 rounded-full hover:bg-blue-400"
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
        <footer className="flex flex-col border-1 border-gray-200 p-6 gap-2 rounded-3xl shadow-xl bg-white">
          <p className="text-md font-semibold text-gray-600">
            COLLABORATE WITH ME
          </p>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@example.com"
                required
                className={`text-md font-medium ${email ? `text-gray-600` : `text-gray-400`} border-1 border-gray-200 p-3 rounded-xl`}
              />
              {emailError && (
                <span className="text-sm text-red-500">{emailError}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-md font-medium text-gray-400"
              >
                Messages
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here..."
                required
                className={`text-md font-medium ${message ? `text-gray-600` : `text-gray-400`} border-1 border-gray-200 h-32 p-3 rounded-xl overflow-y-auto resize-none`}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="font-medium text-white  px-5 py-3 w-full cursor-pointer rounded-full bg-indigo-500 hover:bg-indigo-800 "
            >
              {sending ? "Shipping..." : "Lets ship this!"}
            </button>
          </form>
        </footer>
        {sent && (
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center px-4 py-2 rounded-full text-sm text-white bg-black/50">
            Your idea has set sail 🚀
          </p>
        )}
      </div>
    </div>
  );
}
