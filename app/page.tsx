import Image from "next/image";

export default function Home() {
  const images = [0, 1];
  return (
    <div className="items-center justify-items-center ">
      <header>
        <h1 className="text-2xl font-semibold text-neutral-700">
          Hey, I'm a Designer!
        </h1>
        <p className=" text-md font-medium text-orange-500">
          + I do code sometimes
        </p>
      </header>
      <main>
        <p>This is what I contribute previously</p>
        {images.map((n) => (
          <div key={n} className="rounded-2xl overflow-hidden">
            <Image
              src={`/Images/example-work-${n + 1}.png`}
              width={250}
              height={250}
              alt={`Example of my work ${n + 1}`}
            />
          </div>
        ))}
        <p>I can help you</p>
        <p>Design and build solutions that work</p>
        <p>What makes me different?</p>
        <p>Design that convert up to 30% of the readers</p>
        <p>Make your business easy to find by more than 1000+ local users</p>
        <p>Build that scale effortlessly on any device</p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-cente font-far">
        Footer
      </footer>
    </div>
  );
}
